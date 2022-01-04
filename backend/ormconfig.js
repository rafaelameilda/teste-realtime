require("dotenv/config");

module.exports = [
  {
    name: "default",
    type: "oracle",
    port: 1521,
    host: "10.69.1.16",
    username: "japao",
    password: "j3sw5oca1ru8",
    sid: "wintp",
    entities: ["./src/modules/**/entities/*.ts"],
  },
];
