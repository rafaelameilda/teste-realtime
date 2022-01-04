import { server } from "./app";

const port = 3333;
server.listen(port, () => console.log(`Server running in port ${port}`));
