import { UploadedFile } from "express-fileupload";
import { existsSync, mkdirSync } from "fs";
import path from "path";
import { UuidAdapter } from "../../../config";

const validExtensionsTypes = ['png', 'jpg', 'jpeg', 'gif'] as const;

type ValidExtensions = typeof validExtensionsTypes[number];

interface IFileUploadParameters<T> {
    file: T;
    folder?: string;
    validExtensions?: ValidExtensions[];
}

export class FileUploadService {
    constructor(private readonly uuid = UuidAdapter.v4) { }

    private checkFolder(path: string) {
        if (!existsSync(path)) {
            mkdirSync(path);
        }
    }

    uploadFileMultiple = ({
        file,
        folder = 'uploads',
        validExtensions = validExtensionsTypes.slice() as ValidExtensions[],
    }: IFileUploadParameters<any[]>) => { };

    async uploadFileSingle({
        file,
        folder = 'uploads',
        validExtensions = validExtensionsTypes.slice() as ValidExtensions[],
    }: IFileUploadParameters<UploadedFile>) {
        try {
            const fileExtension = file.mimetype.split('/').at(1) as ValidExtensions;

            if (validExtensions && !validExtensions.includes(fileExtension)) {
                throw {
                    message: `Invalid file extension ${fileExtension}, valid ones ${validExtensions}`,
                    code: 400,
                };
            }

            const destination = path.resolve(__dirname, '../../../../', folder);
            this.checkFolder(destination);

            const fileName = `${this.uuid()}.${fileExtension}`;

            file.mv(`${destination}/${fileName}`, (err) => {
                if (err) throw { message: err, code: 500 };
            });

            return Promise.resolve({
                message: 'File uploaded',
                data: { fileName },
            });
        } catch (error) {
            throw error;
        }
    }
}
