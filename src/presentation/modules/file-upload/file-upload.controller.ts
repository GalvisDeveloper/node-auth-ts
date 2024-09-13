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
        res.json({ message: 'File uploaded multiple' });
    }


    uploadFile = (req: Request, res: Response) => {
        const filesRequest = req.files;

        if (!filesRequest || Object.keys(filesRequest).length === 0) {
            return CustomError.badRequest('No files were uploaded', res);
        }

        const file = filesRequest.file as UploadedFile;

        this.fileUploadService.uploadFileSingle({ file })
            .then((uploaded) => console.log(uploaded) )
            .catch((err: any) => res.status(err.code).json({ message: err.message }));

    }

}