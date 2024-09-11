import { Request, Response } from "express";
import { FileUploadService } from "../services";

export class FileUploadController {

    //DI - Dependency Injection
    constructor(
        private readonly fileUploadService: FileUploadService
    ) { }

    uploadFileMultiple = (req: Request, res: Response) => {
        res.json({ message: 'File uploaded multiple' });
    }


    uploadFile = (req: Request, res: Response) => {

        console.log(req.files);
        res.json({ message: 'File uploaded' });
    }

}