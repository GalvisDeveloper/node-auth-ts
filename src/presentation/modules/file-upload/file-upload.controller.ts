import { Request, Response } from "express";
import { FileUploadService } from "./file-upload.service";
import { CustomError } from "../../../domain";
import { UploadedFile } from "express-fileupload";

export class FileUploadController {

    //DI - Dependency Injection
    constructor(
        private readonly fileUploadService: FileUploadService
    ) { }

    uploadFileMultiple = (req: Request, res: Response) => {
        const file = req.body.files as UploadedFile[];

        this.fileUploadService.uploadFileMultiple({ file, folder: `uploads/${req.params.type}` })
            .then((uploaded) => res.json(uploaded))
            .catch((err: any) => res.status(err.code).json({ message: err.message }));
    }


    uploadFile = (req: Request, res: Response) => {
        const file = req.body.files.at(0) as UploadedFile;

        this.fileUploadService.uploadFileSingle({ file, folder: `uploads/${req.params.type}` })
            .then((uploaded) => res.json(uploaded))
            .catch((err: any) => res.status(err.code).json({ message: err.message }));
    }

}