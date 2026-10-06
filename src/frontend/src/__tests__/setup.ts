import "@testing-library/jest-dom/vitest";
import { cleanup, configure } from "@testing-library/react";
import { afterEach } from "vitest";

// Generated Caffeine components expose stable hooks as `data-ocid`, not the
// Testing Library default `data-testid`.
configure({ testIdAttribute: "data-ocid" });

afterEach(() => {
  cleanup();
});
