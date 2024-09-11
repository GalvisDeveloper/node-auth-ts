import mongoose from "mongoose";

interface Options {
    uri: string;
    dbName: string;
}

export class MongoDB {


    static async connect(options: Options) {

        const { uri, dbName } = options;

        try {
            await mongoose.connect(uri, {
                dbName,
            });

        } catch (error) {
            console.log('Mongo connection error')
            throw error;
        }
    }

    static async disconnect() {
        await mongoose.disconnect();
    }

}
