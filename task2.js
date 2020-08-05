import fs from 'fs'
import csv from 'csvtojson'
import { Transform, pipeline } from 'stream'

const inputFileName = './csv/nodejs-hw1-ex1.csv'
const outputFileStream = './nodejs-hw1-ex2.txt'

const readStream = fs.createReadStream(inputFileName)
const writeStream = fs.createWriteStream(outputFileStream)

const fitlerData = new Transform({
    transform(chunk, encoding, callback) {
        const parsed = JSON.parse(chunk)
        const newObj = {
            book: parsed.Book,
            author: parsed.Author,
            price: parsed.Price
        }
        this.push(JSON.stringify(newObj) + '\n');
        callback();
    }
});

pipeline(
    readStream,
    csv(),
    fitlerData,
    writeStream,
    error => console.log(error)
)