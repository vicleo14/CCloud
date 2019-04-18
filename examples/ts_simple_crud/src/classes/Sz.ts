import fs from 'fs';

export class Sz {
    public static serialize(data: any, folder: string) {
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder);
        }
        fs.writeFile(folder + data.id, JSON.stringify(data),  (err) => {
            if (err) { throw err; }
            console.log('Saved!');
        });
    }

    public static deserialize(id: string, folder: string): any | null {
        if (fs.existsSync(folder)) {
            if (fs.existsSync(folder + id)) {
                 return JSON.parse(fs.readFileSync(folder + id).toString('UTF-8'));
            }
        }
        return null;
    }
}