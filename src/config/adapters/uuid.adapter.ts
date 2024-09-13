import { v4 as uuidV4 } from "uuid";




export class UuidAdapter {

    static v4 = () => {
        return uuidV4();
    }

}