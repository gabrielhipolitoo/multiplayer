import { serverHttp } from "./http.js";

serverHttp.listen(3000, () => {
  console.log("Servidor socket ativo");
});
