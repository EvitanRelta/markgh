import fs from 'fs'

export const writeToFile = (filePath: string, textContent: string) =>
    fs.promises.writeFile(filePath, textContent, 'utf8')
