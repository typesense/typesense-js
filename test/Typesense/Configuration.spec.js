import chai from "chai";
import { Client as TypesenseClient } from "../../src/Typesense";
import { MissingConfigurationError } from "../../src/Typesense/Errors";

let expect = chai.expect;

describe("Configuration", function () {
  let typesense;

  it("throws an error if there is a missing host value in nodes", function (done) {
    expect(() => {
      typesense = new TypesenseClient({
        nodes: [
          {
            port: "8108",
            protocol: "http",
          },
        ],
        apiKey: "abcd",
        randomizeNodes: false,
      });
    }).to.throw(MissingConfigurationError);

    done();
  });

  it("throws an error if there is a missing protocol value in nodes", function (done) {
    expect(() => {
      typesense = new TypesenseClient({
        nodes: [
          {
            host: "node0",
            port: "8108",
          },
        ],
        apiKey: "abcd",
        randomizeNodes: false,
      });
    }).to.throw(MissingConfigurationError);

    done();
  });

  it("auto sets port if port is missing", function (done) {
    expect(() => {
      typesense = new TypesenseClient({
        nodes: [
          {
            host: "node0",
            protocol: "http",
          },
        ],
        apiKey: "abcd",
        randomizeNodes: false,
      });
      expect(typesense.configuration.nodes[0].port).to.equal(80);
    }).to.not.throw(MissingConfigurationError);

    done();
  });

  it("throws an error if nearestNode is missing values", function (done) {
    expect(() => {
      typesense = new TypesenseClient({
        nodes: [
          {
            host: "node0",
            protocol: "http",
          },
        ],
        nearestNode: {
          host: "node1",
        },
        apiKey: "abcd",
        randomizeNodes: false,
      });
    }).to.throw(MissingConfigurationError);

    done();
  });

  it("throws an error if apiKey is missing", function (done) {
    expect(() => {
      typesense = new TypesenseClient({
        nodes: [
          {
            host: "node0",
            protocol: "http",
          },
        ],
      });
    }).to.throw(MissingConfigurationError);

    done();
  });

  it("does not throw any errors if url is present", function (done) {
    expect(() => {
      typesense = new TypesenseClient({
        nodes: [
          {
            url: "https://example.net/",
          },
        ],
        apiKey: "abcd",
        randomizeNodes: false,
      });
      expect(typesense.configuration.nodes[0].url).to.equal(
        "https://example.net/"
      );
    }).to.not.throw(MissingConfigurationError);

    done();
  });

  it("randomizes nodes by default", function (done) {
    for (let i = 0; i < 10; i++) {
      typesense = new TypesenseClient({
        nodes: [
          { host: "node0", protocol: "https" },
          { host: "node1", protocol: "https" },
        ],
        apiKey: "abcd",
      });
      if (typesense.configuration.nodes[0].host === "node1") {
        expect(typesense.configuration.nodes[0].host).to.equal("node1");
        return done();
      }
    }
    expect(typesense.configuration.nodes[0].host).to.equal("node1");
    return done();
  });
});
