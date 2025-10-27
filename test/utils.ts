import { Client } from "../src/Typesense";

export async function isV30OrAbove(client: Client) {
  const debug = await client.debug.retrieve();
  if (debug.version === "nightly") {
    return true;
  }
  const numberedVersion = debug.version.startsWith("v")
    ? debug.version.split("v")[1]
    : debug.version;

  const majorVersion = numberedVersion.split(".")[0];
  return Number(majorVersion) >= 30;
}
