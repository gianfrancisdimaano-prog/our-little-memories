mixin () {
  public query func getApiDoc() : async Text {
    "
# Backend API Documentation

## Purpose

This backend is the canister for a personal, static monthsary gift website. It
stores **no user data** and exposes **no domain endpoints**. All customizable
content (the letter, photos, captions, and music source) lives in the frontend
configuration; the canister only provides the standard authorization surface
and an empty OQL exposure.

## Public Methods

### Authorization

The following methods are provided by the authorization mixin
(`caffeineai-authorization`). They manage role-based access control for the
canister.

| Method | Kind | Description |
| --- | --- | --- |
| `_initialize_access_control()` | update | Registers the calling principal. The first caller to initialize becomes the **admin**; subsequent callers become regular **user**s. |
| `assignCallerUserRole(user : Principal, role : UserRole)` | update | Admin-only. Assigns a role (`#admin` or `#user`) to another principal. |
| `getCallerUserRole() : async UserRole` | query | Returns the role of the calling principal. |
| `isCallerAdmin() : async Bool` | query | Returns `true` when the calling principal is an admin. |
| `_internet_identity_sign_in_start()` | update | Begins the Internet Identity sign-in flow. |
| `_internet_identity_sign_in_finish(...)` | update | Completes the Internet Identity sign-in flow. |

### Data Query (OQL)

The canister includes the OQL `Expose` mixin with an **empty entity list**
(`entities = []`). It therefore exposes no queryable tables and no
`schema()`/`execute()` data surface. This is intentional: the app has no
structured data to query.

## Authentication and Authorization

- The authorization methods above are the only public surface. There are no
  domain endpoints that read or write application data.
- `_initialize_access_control` must be called once by a signed-in caller before
  role-guarded calls can succeed. The first initializer receives the `#admin`
  role; every later caller receives `#user`.
- A caller that has never registered (for example a principal that never signed
  in through the app's own frontend) is unregistered, and role-guarded calls
  reject it. A principal derived against a different origin is a different
  principal than the one the frontend registered.
- The app's frontend pins an Internet Identity derivation origin, published at
  `/.well-known/ii-derivation-origin` when available. An agent already holding
  the user's Internet Identity authorization derives the correct per-app
  principal against that origin (for example
  `icp identity link web <name> --app <host>`). Such a delegation acts with the
  user's full authority in this app until it expires.

## Units and Encodings

- `Principal` values are Internet Computer principals.
- `UserRole` is a variant with the tags `#admin` and `#user`.
- `getApiDoc` returns static Markdown text; it reads no runtime state.

## Lifecycle and Polling

- `getApiDoc` is a `query` call: it is read-only, fast, and unreplicated. It may
  be called at any time, including before any authorization call.
- There are no asynchronous jobs, no completion conditions, and no polling
  requirements in this backend.

## Mutation Retry Safety

- `_initialize_access_control` is idempotent with respect to an already
  registered caller: re-invoking it does not change an existing role.
- `assignCallerUserRole` is admin-only and overwrites the target principal's
  role; repeated calls with the same arguments are safe.
- No method in this backend is destructive, and no method deletes data.

## Errors and Limits

- Role-guarded calls reject unregistered or unauthorized callers.
- Because the OQL entity list is empty, there are no queryable tables and no
  data-query errors to handle.
- This backend performs no outbound HTTP calls and transfers no cycles.
";
  };
};
