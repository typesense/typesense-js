import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import fetchMock from "fetch-mock";
import { fetchWithTimeout } from "../../src/Shared/FetchWithTimeout";

const expect = chai.expect;
chai.use(chaiAsPromised);

describe("fetchWithTimeout", function () {
  afterEach(function () {
    fetchMock.restore(); // Reset fetch-mock after each test to clean up
  });

  it("should call fetch with the provided URL and options", async function () {
    fetchMock.getOnce("https://example.com/api", {
      body: { success: true },
      headers: { "Content-Type": "application/json" },
    });

    const url = "https://example.com/api";
    const options = { method: "GET" };

    const response = await fetchWithTimeout(url, options);

    expect(fetchMock.called(url)).to.be.true;
    const data = await response.json();
    expect(data.success).to.be.true;
  });

  it("should throw a timeout error if the request takes too long", async function () {
    fetchMock.get(
      "https://example.com/api",
      () =>
        new Promise((resolve) => setTimeout(() => resolve({ body: {} }), 2000)),
    );

    const url = "https://example.com/api";
    const options = { method: "GET" };

    try {
      await fetchWithTimeout(url, options, 1000);
      throw new Error("Expected method to reject.");
    } catch (error) {
      expect(error).to.be.an.instanceof(Error);
      expect(error.message).to.equal("Request timed out after 1 seconds");
    }
  });

  it("should not throw a timeout error if the request completes in time", async function () {
    fetchMock.getOnce("https://example.com/api", {
      body: { success: true },
      headers: { "Content-Type": "application/json" },
    });

    const url = "https://example.com/api";
    const options = { method: "GET" };

    const response = await fetchWithTimeout(url, options, 2000);

    expect(fetchMock.called(url)).to.be.true;
    const data = await response.json();
    expect(data.success).to.be.true;
  });
});
