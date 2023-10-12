/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Pokemon, Type, conn } = require("../../src/db.js");

const agent = session(app);
const pokemon2 = {
    name: "Pikachu",
    hp: 9,
    attack: 8,
    defense: 87,
    image: "imagen",
  };

describe("Type routes", () => {
  describe("GET /types", () => {
    it("should get 200", (done) => {
      agent
        .get("/type")
        .expect(200)
        .then(() => done())
        .catch(() => done(new Error("Cannot get types")));
    });

    it("should get be an array", () =>
      agent.get("/type").then((resp) => expect(resp.body).to.be.an("array")));

    it("should work when its a valid name", (done) => {
      Type.findOrCreate({
        where: { name: "atomictype" },
      })
        .then(() => done())
        .catch((err) => done(new Error(err)));
    });

    it("should throw an error if name is repeated", (done) => {
      Type.create({ name: "fire" })
        .then(() => done())
        .catch(() => done(new Error("The name is repeated")));
    });
    // it("should connect with pokemon type if i make a post", () =>
    //   agent
    //     .post("/pokemons")
    //     .send(pokemon2)
    //     .then((respuesta) =>
    //       agent.get(`/types/1`).then((e) => {
    //         expect(
    //           e.body.pokemons.filter((e) => e.id === respuesta.body.DATA.id)
    //         ).to.not.be.empty;
    //       })
    //     ));
  });
});
