import server from "./app.js";
import env from "./configEnv.js";
import connectDB from "./db/configDB.js";

connectDB();
server.listen(env.PORT, () => {
  console.log(
    `Server listening on: http://localhost:${env.PORT}/realtimeproducts`
  );
});
