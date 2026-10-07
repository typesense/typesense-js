import { describe, expectTypeOf, it } from "vitest";
import type Collection from "../src/Typesense/Collection";
import type {
  CollectionSchema,
  CollectionUpdateSchema,
} from "../src/Typesense/Collection";

describe("collection update", () => {
  it("resolves to the collection update schema", () => {
    expectTypeOf<ReturnType<Collection["update"]>>().toEqualTypeOf<
      Promise<CollectionUpdateSchema>
    >();
  });

  it("does not resolve to the full collection schema", () => {
    expectTypeOf<ReturnType<Collection["update"]>>().not.toEqualTypeOf<
      Promise<CollectionSchema>
    >();
  });
});
