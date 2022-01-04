require("dotenv/config");

module.exports = [
  {
    name: "default",
    type: "sqlite",
    database: "./src/database/database.sqlite",
    entities: ["./src/modules/**/entities/*.ts"],
  },
];
