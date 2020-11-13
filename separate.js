import { createReadStream, createWriteStream } from "fs"
import { EOL } from "os";
import CsvReadableStream from "csv-reader";
import { dirname, join } from "path"


const { pathname } = new URL(import.meta.url)

const cwd = dirname(pathname)

    let inputStream = createReadStream(`${cwd}/TUP.template.csv`, 'utf8');
    const writeStreams = new Map()
    inputStream
    .on('open', function () {
        console.log('Read Stream open!')
        console.log('Processing data...')
    })
    .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
    .on('data', function (row) {        
        const stateUF = row[9]
        if(stateUF.length == 2 ){
            const writeStream = writableStreamManager(stateUF)
            writeStream.write(row.toString())
            writeStream.write(EOL)   
        }
    })
    .on('end', () => {
        console.log('Ended')
    })
    .on('error', (err) => {
        console.log('General error on Read Stream')
        console.log(err)
    })


function writableStreamManager(key){
    let writableStream = writeStreams.get(key)
    if (!writableStream)
        writableStream = createWriteStream(`${cwd}/data/separated/${key}.csv`, 'utf-8')

    writeStreams.set(key, writableStream)

    return writableStream
}