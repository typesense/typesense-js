import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Client as TypesenseClient } from "../../src/Typesense";
import ApiCall from "../../src/Typesense/ApiCall";
import {
  ObjectUnprocessable,
  TypesenseError,
} from "../../src/Typesense/Errors";
import fetchMock from "fetch-mock";
import timekeeper from "timekeeper";

let expect = chai.expect;
chai.use(chaiAsPromised);

let sharedNodeSelectionBehavior = (method) => {
  it("does not retry when HTTPStatus >= 300 and HTTPStatus < 500", async function () {
    fetchMock
      .mock(this.apiCall.uriFor("/", this.typesense.configuration.nodes[0]), {
        status: 409,
        body: JSON.stringify({ message: "Already exists" }),
        headers: { "content-type": "application/json" },
      })
      .mock(this.apiCall.uriFor("/", this.typesense.configuration.nodes[1]), {
        status: 422,
        body: JSON.stringify({ message: "Unprocessable" }),
        headers: { "content-type": "application/json" },
      })
      .mock(this.apiCall.uriFor("/", this.typesense.configuration.nodes[2]), {
        status: 500,
        body: JSON.stringify({ message: "Error message" }),
        headers: { "content-type": "application/json" },
      });

    await expect(this.apiCall[method]("/")).to.eventually.be.rejectedWith(
      "Request failed with HTTP code 409 | Server said: Already exists",
    );
    await expect(this.apiCall[method]("/")).to.eventually.be.rejectedWith(
      ObjectUnprocessable,
    );

    expect(fetchMock.calls().length).to.equal(2);
    expect(fetchMock.calls()[0][0]).to.equal("http://node0:8108/");
    expect(fetchMock.calls()[1][0]).to.equal("http://node1:7108/");
  });

  it("raises an error when no nodes are healthy", async function () {
    fetchMock
      .mock(this.apiCall.uriFor("/", this.typesense.configuration.nodes[0]), {
        status: 500,
        body: JSON.stringify({ message: "Error message" }),
        headers: { "content-type": "application/json" },
      })
      .mock(this.apiCall.uriFor("/", this.typesense.configuration.nodes[1]), {
        status: 500,
        body: JSON.stringify({ message: "Error message" }),
        headers: { "content-type": "application/json" },
      })
      .mock(this.apiCall.uriFor("/", this.typesense.configuration.nodes[2]), {
        status: 500,
        body: JSON.stringify({ message: "Error message" }),
        headers: { "content-type": "application/json" },
      });

    await expect(this.apiCall[method]("/")).to.eventually.be.rejectedWith(
      "Request failed with HTTP code 500 | Server said: Error message",
    );

    expect(fetchMock.calls().length).to.equal(4);
    expect(fetchMock.calls()[0][0]).to.equal("http://node0:8108/");
    expect(fetchMock.calls()[1][0]).to.equal("http://node1:7108/");
    expect(fetchMock.calls()[2][0]).to.equal("http://node2:9108/");
    expect(fetchMock.calls()[3][0]).to.equal("http://node0:8108/");
  });

  it("selects the next available node when there is a connection timeout", async function () {
    fetchMock
      .mock(this.apiCall.uriFor("/", this.typesense.configuration.nodes[0]), {
        throws: new TypesenseError("Network request failed"),
      })
      .mock(this.apiCall.uriFor("/", this.typesense.configuration.nodes[1]), {
        throws: new TypesenseError("Network request failed"),
      })
      .mock(this.apiCall.uriFor("/", this.typesense.configuration.nodes[2]), {
        status: 200,
        body: JSON.stringify({ message: "Success" }),
        headers: { "content-type": "application/json" },
      });

    await expect(this.apiCall[method]("/")).to.eventually.deep.equal({
      message: "Success",
    });

    expect(fetchMock.calls().length).to.equal(3);
    expect(fetchMock.calls()[0][0]).to.equal("http://node0:8108/");
    expect(fetchMock.calls()[1][0]).to.equal("http://node1:7108/");
    expect(fetchMock.calls()[2][0]).to.equal("http://node2:9108/");
  });

  it("removes unhealthy nodes out of rotation, until threshold", async function () {
    fetchMock
      .mock(this.apiCall.uriFor("/", this.typesense.configuration.nodes[0]), {
        throws: new TypesenseError("Network request failed"),
      })
      .mock(this.apiCall.uriFor("/", this.typesense.configuration.nodes[1]), {
        throws: new TypesenseError("Network request failed"),
      })
      .mock(this.apiCall.uriFor("/", this.typesense.configuration.nodes[2]), {
        status: 200,
        body: JSON.stringify({ message: "Success" }),
        headers: { "content-type": "application/json" },
      });

    let currentTime = Date.now();
    timekeeper.freeze(currentTime);
    await this.apiCall[method]("/");
    await this.apiCall[method]("/");
    await this.apiCall[method]("/");

    timekeeper.freeze(currentTime + 5 * 1000);
    await this.apiCall[method]("/");

    timekeeper.freeze(currentTime + 65 * 1000);
    await this.apiCall[method]("/");

    fetchMock.mock(
      this.apiCall.uriFor("/", this.typesense.configuration.nodes[0]),
      {
        status: 200,
        body: JSON.stringify({ message: "Success" }),
        headers: { "content-type": "application/json" },
      },
      { overwriteRoutes: true },
    );

    timekeeper.freeze(currentTime + 185 * 1000);
    await this.apiCall[method]("/");

    expect(fetchMock.calls().length).to.equal(10);

    expect(fetchMock.calls()[0][0]).to.equal("http://node0:8108/");
    expect(fetchMock.calls()[1][0]).to.equal("http://node1:7108/");
    expect(fetchMock.calls()[2][0]).to.equal("http://node2:9108/");

    expect(fetchMock.calls()[3][0]).to.equal("http://node2:9108/");
    expect(fetchMock.calls()[4][0]).to.equal("http://node2:9108/");
    expect(fetchMock.calls()[5][0]).to.equal("http://node2:9108/");

    expect(fetchMock.calls()[6][0]).to.equal("http://node0:8108/");
    expect(fetchMock.calls()[7][0]).to.equal("http://node1:7108/");
    expect(fetchMock.calls()[8][0]).to.equal("http://node2:9108/");
    expect(fetchMock.calls()[9][0]).to.equal("http://node0:8108/");

    timekeeper.reset();
  });

  describe("when a nearestNode is specified", function () {
    beforeEach(function () {
      this.typesense = new TypesenseClient({
        nearestNode: {
          host: "nearestNode",
          port: "6108",
          protocol: "http",
        },
        nodes: [
          {
            host: "node0",
            port: "8108",
            protocol: "http",
          },
          {
            host: "node1",
            port: "7108",
            protocol: "http",
          },
          {
            host: "node2",
            port: "9108",
            protocol: "http",
          },
        ],
        apiKey: "abcd",
        randomizeNodes: false,
        logLevel: "error",
        retryIntervalSeconds: 0.001,
      });
      fetchMock.reset();
      this.apiCall = new ApiCall(this.typesense.configuration);
    });

    it("uses the nearestNode if it is present and healthy, otherwise falls back to regular nodes", async function () {
      fetchMock
        .mock(
          this.apiCall.uriFor("/", this.typesense.configuration.nearestNode),
          { throws: new TypesenseError("Network request failed") },
          { overwriteRoutes: true },
        )
        .mock(
          this.apiCall.uriFor("/", this.typesense.configuration.nodes[0]),
          {
            throws: new TypesenseError("Network request failed"),
          },
          { overwriteRoutes: true },
        )
        .mock(
          this.apiCall.uriFor("/", this.typesense.configuration.nodes[1]),
          {
            throws: new TypesenseError("Network request failed"),
          },
          { overwriteRoutes: true },
        )
        .mock(
          this.apiCall.uriFor("/", this.typesense.configuration.nodes[2]),
          {
            status: 200,
            body: JSON.stringify({ message: "Success" }),
            headers: { "content-type": "application/json" },
          },
          { overwriteRoutes: true },
        );

      let currentTime = Date.now();
      timekeeper.freeze(currentTime);
      await this.apiCall[method]("/");
      await this.apiCall[method]("/");
      await this.apiCall[method]("/");

      timekeeper.freeze(currentTime + 5 * 1000);
      await this.apiCall[method]("/");

      timekeeper.freeze(currentTime + 65 * 1000);
      await this.apiCall[method]("/");

      fetchMock.mock(
        this.apiCall.uriFor("/", this.typesense.configuration.nearestNode),
        { status: 200, body: JSON.stringify({ message: "Success" }) },
        { overwriteRoutes: true },
      );

      timekeeper.freeze(currentTime + 185 * 1000);
      await this.apiCall[method]("/");
      await this.apiCall[method]("/");
      await this.apiCall[method]("/");

      expect(fetchMock.calls().length).to.equal(14);

      expect(fetchMock.calls()[0][0]).to.equal("http://nearestnode:6108/");
      expect(fetchMock.calls()[1][0]).to.equal("http://node0:8108/");
      expect(fetchMock.calls()[2][0]).to.equal("http://node1:7108/");
      expect(fetchMock.calls()[3][0]).to.equal("http://node2:9108/");
      expect(fetchMock.calls()[4][0]).to.equal("http://node2:9108/");
      expect(fetchMock.calls()[5][0]).to.equal("http://node2:9108/");
      expect(fetchMock.calls()[6][0]).to.equal("http://node2:9108/");
      expect(fetchMock.calls()[7][0]).to.equal("http://nearestnode:6108/");
      expect(fetchMock.calls()[8][0]).to.equal("http://node0:8108/");
      expect(fetchMock.calls()[9][0]).to.equal("http://node1:7108/");
      expect(fetchMock.calls()[10][0]).to.equal("http://node2:9108/");
      expect(fetchMock.calls()[11][0]).to.equal("http://nearestnode:6108/");
      expect(fetchMock.calls()[12][0]).to.equal("http://nearestnode:6108/");
      expect(fetchMock.calls()[13][0]).to.equal("http://nearestnode:6108/");

      timekeeper.reset();
    });

    it("raises an error when no nodes are healthy", async function () {
      fetchMock
        .mock(
          this.apiCall.uriFor("/", this.typesense.configuration.nearestNode),
          { status: 500, body: JSON.stringify({ message: "Error message" }) },
        )
        .mock(this.apiCall.uriFor("/", this.typesense.configuration.nodes[0]), {
          status: 500,
          body: JSON.stringify({ message: "Error message" }),
          headers: { "content-type": "application/json" },
        })
        .mock(this.apiCall.uriFor("/", this.typesense.configuration.nodes[1]), {
          status: 500,
          body: JSON.stringify({ message: "Error message" }),
          headers: { "content-type": "application/json" },
        })
        .mock(this.apiCall.uriFor("/", this.typesense.configuration.nodes[2]), {
          status: 500,
          body: JSON.stringify({ message: "Error message" }),
          headers: { "content-type": "application/json" },
        });

      await expect(this.apiCall[method]("/")).to.eventually.be.rejectedWith(
        "Request failed with HTTP code 500 | Server said: Error message",
      );

      expect(fetchMock.calls().length).to.equal(5);
      expect(fetchMock.calls()[0][0]).to.equal("http://nearestnode:6108/");
      expect(fetchMock.calls()[1][0]).to.equal("http://node0:8108/");
      expect(fetchMock.calls()[2][0]).to.equal("http://node1:7108/");
      expect(fetchMock.calls()[3][0]).to.equal("http://node2:9108/");
      expect(fetchMock.calls()[4][0]).to.equal("http://node0:8108/");
    });
  });
};

describe("ApiCall", function () {
  describe("Method Calls", function () {
    beforeEach(function () {
      this.typesense = new TypesenseClient({
        nodes: [
          {
            host: "node0",
            port: "8108",
            protocol: "http",
          },
          {
            host: "node1",
            port: "7108",
            protocol: "http",
          },
          {
            host: "node2",
            port: "9108",
            protocol: "http",
          },
        ],
        apiKey: "abcd",
        randomizeNodes: false,
        logLevel: "error",
        retryIntervalSeconds: 0.001, // To keep tests fast
      });
      fetchMock.reset();
      this.apiCall = new ApiCall(this.typesense.configuration);
    });

    describe(".post", function () {
      sharedNodeSelectionBehavior("post");
    });

    describe(".put", function () {
      sharedNodeSelectionBehavior("put");
    });

    describe(".get", function () {
      sharedNodeSelectionBehavior("get");
    });

    describe(".delete", function () {
      sharedNodeSelectionBehavior("delete");
    });
  });

  describe("URL Construction", function () {
    it("constructs the URL based on the node params", function (done) {
      const client = new TypesenseClient({
        nodes: [
          {
            url: "https://node0/path",
          },
        ],
        apiKey: "abcd",
        randomizeNodes: false,
      });

      const apiCall = new ApiCall(client.configuration);

      expect(
        apiCall.uriFor("/collections", client.configuration.nodes[0]),
      ).to.equal("https://node0/path/collections");

      done();
    });
  });

  describe("Custom Headers", function () {
    it("passes on additional user-provided headers in the request", async function () {
      const client = new TypesenseClient({
        nodes: [
          {
            url: "https://node0/path",
          },
        ],
        apiKey: "abcd",
        randomizeNodes: false,
        additionalHeaders: {
          "x-header-name": "value",
        },
      });

      fetchMock.reset();
      const apiCall = new ApiCall(client.configuration);

      fetchMock.getOnce("https://node0/path/collections", {
        status: 200,
        body: JSON.stringify({}),
        headers: { "content-type": "application/json" },
      });

      // Will error out if request doesn't match the stub
      await apiCall.get("/collections", {});

      const lastCall = fetchMock.lastCall();
      expect(lastCall[0]).to.equal("https://node0/path/collections");
      expect(lastCall[1].headers).to.deep.include({
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "X-TYPESENSE-API-KEY": client.configuration.apiKey,
        "x-header-name": "value",
      });
    });
  });
});
