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
        // const { MongoClient } = await import('mongodb');
        // const client = new MongoClient(this.uri, { useUnifiedTopology: true });
        // await client.connect();
        // const db = client.db(this.dbName);
        // return db.collection(this.collection);
    }

    async disconnect() {
        // const { MongoClient } = await import('mongodb');
        // const client = new MongoClient(this.uri, { useUnifiedTopology: true });
        // await client.connect();
        // await client.close();
    }
}
