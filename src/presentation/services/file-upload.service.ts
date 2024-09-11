import { Request, Response } from "express";

type ValidExtensions = 'png' | 'jpg' | 'jpeg' | 'gif';

interface IFileUploadParameters<T> {
    file: T;
    folder: string;
    validExtensions?: ValidExtensions[];
}

export class FileUploadService {

    constructor() { }

    private checkFolder(path: string) {
        throw new Error('Not implemented yet');
    }

    uploadFileMultiple = ({ file, folder = 'uploads', validExtensions }: IFileUploadParameters<any[]>) => {
    }

    uploadFileSingle = ({ file, folder = 'uploads', validExtensions }: IFileUploadParameters<any>) => {
    }

}