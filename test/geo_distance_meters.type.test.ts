import { describe, expectTypeOf, it } from "vitest";
import type { SearchResponseHit } from "../src/Typesense/Documents";

type CoordinatesDoc = {
  coordinates: [number, number];
};

describe("geo_distance_meters type", () => {
  it("keys distance by the collection geopoint field name", () => {
    type Meters = NonNullable<
      SearchResponseHit<CoordinatesDoc>["geo_distance_meters"]
    >;

    expectTypeOf<Meters>().toHaveProperty("coordinates");
    expectTypeOf<Meters["coordinates"]>().toEqualTypeOf<number>();
  });

  it("allows a non-location field on the default document generic", () => {
    type Meters = NonNullable<SearchResponseHit<object>["geo_distance_meters"]>;

    expectTypeOf<Meters>().toHaveProperty("coordinates");
    expectTypeOf<Meters["coordinates"]>().toEqualTypeOf<number>();
    expectTypeOf<Meters>().toHaveProperty("location");
    expectTypeOf<Meters["location"]>().toEqualTypeOf<number>();
  });
});
