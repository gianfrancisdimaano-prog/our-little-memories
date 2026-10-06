import { PocketIc, createIdentity } from "@dfinity/pic";
import type { Actor, CanisterFixture } from "@dfinity/pic";
import { afterAll, beforeAll, expect, it } from "vitest";

import { idlFactory } from "../../src/frontend/src/declarations/backend.did.js";
import type { _SERVICE } from "../../src/frontend/src/declarations/backend.did";

/**
 * PocketIC backend lane for the monthsary canister.
 *
 * This installs the app's own compiled `src/backend/dist/backend.wasm` into the
 * platform's PocketIC replica and calls the real public API. It is the only
 * coverage in the build that exercises the canister rather than a typed mock.
 *
 * The canister stores no user data and exposes no domain endpoints. Its public
 * surface is the authorization mixin, the OQL `Expose` mixin with an empty
 * entity list, and a static `getApiDoc` query. The tests below assert that every
 * public method answers instead of trapping, that the empty entity surface
 * rejects queries rather than silently returning rows, and that the
 * authorization surface isolates callers.
 *
 * The canister is shared by every test in this file, so the admin is registered
 * once in `beforeAll` and each test seeds its own caller explicitly.
 */

const PIC_URL = process.env.POCKET_IC_URL ?? "";
const BACKEND_WASM = process.env.BACKEND_WASM ?? "";

let pic: PocketIc | undefined;
let actor: Actor<_SERVICE>;
let canisterId: CanisterFixture<_SERVICE>["canisterId"];

/** The first non-anonymous caller to initialize becomes the admin. */
const admin = createIdentity("lane-admin");

beforeAll(async () => {
  pic = await PocketIc.create(PIC_URL);
  ({ actor, canisterId } = await pic.setupCanister<_SERVICE>({
    idlFactory,
    wasm: BACKEND_WASM,
  }));

  const adminActor = pic.createActor<_SERVICE>(idlFactory, canisterId);
  adminActor.setIdentity(admin);
  await adminActor._initialize_access_control();
});

afterAll(async () => {
  // `?.` because `beforeAll` may not have got that far. A failed
  // `PocketIc.create` otherwise stacks "Cannot read properties of undefined"
  // on top of the real error and buries the one line that explains the run.
  await pic?.tearDown();
});

it("answers the static API-doc query instead of trapping", async () => {
  const doc = await actor.getApiDoc();
  expect(typeof doc).toBe("string");
  expect(doc).toContain("Backend API Documentation");
});

it("answers the OQL schema query with an empty entity surface", async () => {
  const schema = await actor.schema();
  expect(typeof schema).toBe("string");
});

it("rejects a malformed OQL query instead of silently succeeding", async () => {
  // `execute` parses its JSON argument; a query without a `start` entity is a
  // parse error and must trap rather than return an empty result.
  await expect(actor.execute("{}")).rejects.toThrow(/invalid query/i);
});

it("rejects a well-formed OQL query for an entity the canister does not expose", async () => {
  // The entity list is empty, so even a syntactically valid query has no table
  // to read and must trap rather than fabricate rows.
  await expect(actor.execute('{"start":"anything"}')).rejects.toThrow(
    /unknown entity/i,
  );
});

it("reports an anonymous caller as guest and not admin", async () => {
  // A freshly created actor calls as the anonymous principal until an identity
  // is set.
  const guest = pic!.createActor<_SERVICE>(idlFactory, canisterId);
  await expect(guest.getCallerUserRole()).resolves.toEqual({ guest: null });
  await expect(guest.isCallerAdmin()).resolves.toBe(false);
});

it("rejects a non-anonymous caller that never registered", async () => {
  const stranger = createIdentity("lane-stranger");
  const strangerActor = pic!.createActor<_SERVICE>(idlFactory, canisterId);
  strangerActor.setIdentity(stranger);

  await expect(strangerActor.getCallerUserRole()).rejects.toThrow(
    /not registered/i,
  );
  await expect(strangerActor.isCallerAdmin()).rejects.toThrow(
    /not registered/i,
  );
});

it("registers the first caller as admin and a later caller as user", async () => {
  const adminActor = pic!.createActor<_SERVICE>(idlFactory, canisterId);
  adminActor.setIdentity(admin);
  await expect(adminActor.isCallerAdmin()).resolves.toBe(true);
  await expect(adminActor.getCallerUserRole()).resolves.toEqual({
    admin: null,
  });

  const member = createIdentity("lane-member");
  const memberActor = pic!.createActor<_SERVICE>(idlFactory, canisterId);
  memberActor.setIdentity(member);
  await memberActor._initialize_access_control();
  await expect(memberActor.getCallerUserRole()).resolves.toEqual({
    user: null,
  });
  await expect(memberActor.isCallerAdmin()).resolves.toBe(false);
});

it("lets the admin assign a role and rejects a non-admin assignment", async () => {
  const target = createIdentity("lane-target");

  const adminActor = pic!.createActor<_SERVICE>(idlFactory, canisterId);
  adminActor.setIdentity(admin);
  await expect(
    adminActor.assignCallerUserRole(target.getPrincipal(), { user: null }),
  ).resolves.toBeNull();

  const targetActor = pic!.createActor<_SERVICE>(idlFactory, canisterId);
  targetActor.setIdentity(target);
  await expect(targetActor.getCallerUserRole()).resolves.toEqual({
    user: null,
  });

  // A registered non-admin cannot assign roles.
  await expect(
    targetActor.assignCallerUserRole(admin.getPrincipal(), { admin: null }),
  ).rejects.toThrow(/only admins/i);
});
