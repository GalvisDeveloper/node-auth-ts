import { envs } from "../../config";
import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { MongoDB } from "../mongo/mongodb";



(async () => {
    await MongoDB.connect({
        uri: envs.MONGO_URI,
        dbName: envs.MONGO_DB_NAME
    });

    await mainSeed();

    await MongoDB.disconnect();
})();


async function mainSeed() {
    // create users
    // create categories
    // create products
}