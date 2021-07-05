import path from "path";
import fs from "fs";

export const saveFile = (name: string, contents: any) => {
    const pathName = path.join(__dirname, '..', '..', 'src', 'mocks', 'data', 'raw', name + '.json')
    fs.writeFileSync(pathName, JSON.stringify(contents, null, 2) + '\n')
}
