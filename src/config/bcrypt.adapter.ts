import { compareSync, genSaltSync, hashSync } from 'bcryptjs';





export const bcryptAdapter = {
    hash: async (password: string): Promise<string> => {
        const salt = await genSaltSync();
        return await hashSync(password, salt);
    },
    compare: async (password: string, hash: string): Promise<boolean> => {
        return await compareSync(password, hash);
    }
}