import { Client } from "../src/Typesense";

export async function isV30OrAbove(client: Client) {
  const debug = await client.debug.retrieve();
  if (debug.version === "nightly") {
    return true;
  }
  const numberedVersion = debug.version.split("v")[1];
  return Number(numberedVersion) >= 30;
}
