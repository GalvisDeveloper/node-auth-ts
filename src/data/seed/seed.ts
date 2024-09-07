import _ from "lodash";
import { envs } from "../../config";
import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { CategoryModel } from "../mongo/models/category.model";
import { ProductModel } from "../mongo/models/product.model";
import { UserModel } from "../mongo/models/user.model";
import { MongoDB } from "../mongo/mongodb";
import { seedData } from "./seedData";



(async () => {
    await MongoDB.connect({
        uri: envs.MONGO_URI,
        dbName: envs.MONGO_DB_NAME
    });

    await mainSeed();

    await MongoDB.disconnect();
})();

const randomBetween0AndX: (x: number) => number = (x) => Math.floor(Math.random() * x);

async function mainSeed() {
    // delete all data
    await Promise.all([
        UserModel.deleteMany({}),
        CategoryModel.deleteMany({}),
        ProductModel.deleteMany({}),
    ])

    // create users
    const users = await UserModel.insertMany(seedData.users);

    // create categories
    const categories = await CategoryModel.insertMany(
        _.map(seedData.categories, (category) => ({ ...category, user: users[randomBetween0AndX(users.length)]._id }))
    );

    // create products
    const products = await ProductModel.insertMany(
        _.map(seedData.products, (product) => ({
            ...product,
            user: users[randomBetween0AndX(users.length - 1)]._id,
            category: categories[randomBetween0AndX(categories.length)]._id
        }))
    );

    console.log('SEEDED')
}