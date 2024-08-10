import { envs } from './config/envs';
import { MongoDB } from './data';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';


(async()=> {
  main();
})();


async function main() {

  await MongoDB.connect({
    uri: envs.MONGO_URI,
    dbName: envs.MONGO_DB_NAME
  });

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
}