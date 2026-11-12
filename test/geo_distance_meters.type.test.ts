import { describe, expectTypeOf, it } from "vitest";
import { SearchResponseHit } from "../src/Typesense/Documents";

describe("geo_distance_meters type", () => {
  it("accepts distances keyed by the collection's geopoint field names", () => {
    const distances: NonNullable<
      SearchResponseHit<{ coordinates: number[] }>["geo_distance_meters"]
    > = { coordinates: 95432, destination: 120 };

    expectTypeOf(distances.coordinates).toEqualTypeOf<number>();
    expectTypeOf(distances.destination).toEqualTypeOf<number>();
  });

  it("supports custom and location fields with the default document schema", () => {
    const distances: NonNullable<
      SearchResponseHit<object>["geo_distance_meters"]
    > = { coordinates: 95432, location: 120 };

    expectTypeOf(distances.coordinates).toEqualTypeOf<number>();
    expectTypeOf(distances.location).toEqualTypeOf<number>();
  });

  it("keeps distances numeric and the distance map optional", () => {
    expectTypeOf<SearchResponseHit<object>["geo_distance_meters"]>().toEqualTypeOf<
      Record<string, number> | undefined
    >();

    const distances: NonNullable<
      SearchResponseHit<object>["geo_distance_meters"]
    > = {
      // @ts-expect-error Distances are numbers, not strings.
      coordinates: "95432",
    };
    expectTypeOf(distances.coordinates).toEqualTypeOf<number>();
  });
});
