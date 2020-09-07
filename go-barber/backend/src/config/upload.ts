import multer, { StorageEngine } from 'multer';
import path from 'path'
import crypto from 'crypto'

const tmpFolder = path.resolve(__dirname, '..', '..' , 'tmp');


interface IUploadConfig {
    driver: 's3' | 'disk';

    tmpFolder: string;
    uploadsFolder: string;

    multer: {
        storage: StorageEngine;
    };

    config: {
        disk: {};
        aws: {
            bucket: string;
        };
    };
}

//@ts-ignore
export default {

    driver: process.env.STORAGE_DRIVER,

    //@ts-ignore
    tmpFolder: tmpFolder,
    uploadFolder: path.resolve(tmpFolder, 'uploads'),

    storage: multer.diskStorage ({
        destination: tmpFolder,
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('HEX');
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        }
    }),

    config: {
        disk: {},
        aws: {
            bucket: 'gobarber11',
        },
    },

} as IUploadConfig;