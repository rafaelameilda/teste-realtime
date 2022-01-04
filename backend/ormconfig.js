require("dotenv/config");

module.exports = [
  {
    name: "default",
    type: "",
    port: 1521,
    host: "",
    username: "",
    password: "",
    sid: "wintp",
    entities: ["./src/modules/**/entities/*.ts"],
  },
];
