import { Request, Response } from "express";
import { CustomError } from "../../../domain";
import { UploadedFile } from "express-fileupload";
import path from "path";
import { existsSync } from "fs";

export class ImagesController {

    //DI - Dependency Injection
    constructor(
    ) { }


    getImage = (req: Request, res: Response) => {
        const { type = '', id = '' } = req.params;

        const imagePath = path.join(__dirname, `../../../../uploads/${type}/${id}`);

        if (!existsSync(imagePath)) {
            return CustomError.notFound('Image not found', res);
        }

        res.sendFile(imagePath);
    }

}