import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';

export default (filepath1, filepath2) => {
    const absolutePath1 = filepath1[0] !== '/' ? `${cwd()}/${filepath1}` : filepath1;
    const absolutePath2 = filepath2[0] !== '/' ? `${cwd()}/${filepath2}` : filepath2;

    const str1 = readFileSync(absolutePath1, 'utf8');
    const str2 = readFileSync(absolutePath2, 'utf8');

    const obj1 = JSON.parse(str1);
    const obj2 = JSON.parse(str2);

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const keys = new Set([...keys1, ...keys2].sort());

    let result = '';
    keys.forEach(key => {
        const isDeleted = obj1.hasOwnProperty(key) && !obj2.hasOwnProperty(key);
        if (isDeleted) {
            result += `  - ${key}: ${obj1[key]}\n`;
            return;
        }

        const isAdded = obj2.hasOwnProperty(key) && !obj1.hasOwnProperty(key);
        if (isAdded) {
            result += `  + ${key}: ${obj2[key]}\n`;
            return;
        }

        const isChanged = obj1[key] !== obj2[key];
        if (isChanged) {
            result += `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}\n`;
            return;
        }

        const isUnchanged = obj1[key] === obj2[key];
        if (isUnchanged) {
            result += `    ${key}: ${obj1[key]}\n`;
            return;
        }

        throw new Error('Неизвестный кейс');
    });

    console.log(`{\n${result}}`);
};