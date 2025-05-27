import { describe, expectTypeOf, it } from "vitest";
import { CommaSeparated, OperationMode } from "../src/Typesense/Types";

describe("infix type", () => {
  it("it should parse valid comma separated values", () => {
    expectTypeOf<"always,fallback">().toEqualTypeOf<
      CommaSeparated<"always,fallback", OperationMode>
    >();
  });

  it("it should not parse double-comma separated values", () => {
    expectTypeOf<
      CommaSeparated<"always,,fallback", OperationMode>
    >().toEqualTypeOf<{
      error: "Invalid operation mode";
      value: "";
    }>();
  });

  it("should not parse a comma in the first position", () => {
    expectTypeOf<
      CommaSeparated<"always,fallback,", OperationMode>
    >().toEqualTypeOf<{
      error: "Invalid operation mode";
      value: "";
    }>();
  });

  it("should not parse a comma in the last position", () => {
    expectTypeOf<
      CommaSeparated<"always,fallback,", OperationMode>
    >().toEqualTypeOf<{
      error: "Invalid operation mode";
      value: "";
    }>();
  });

  it("should not parse an invalid operation mode in the middle of the string", () => {
    expectTypeOf<
      CommaSeparated<"always,fallback,xoff", OperationMode>
    >().toEqualTypeOf<{
      error: "Invalid operation mode";
      value: "xoff";
    }>();
  });

  it("should not care about whitespace", () => {
    expectTypeOf<" always,   fallback,   off ">().toEqualTypeOf<
      CommaSeparated<" always,   fallback,   off ", OperationMode>
    >();
  });
});
