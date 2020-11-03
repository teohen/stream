const fs = require('fs');
var os = require("os");
const CsvReadableStream = require('csv-reader');

    let inputStream = fs.createReadStream('data/TUP.csv', 'utf8');
    const writeStreams = new Map()
    inputStream
    .on('open', function () {
        console.log('Read Stream open!')
    })
    .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
    .on('data', function (row) {        
        console.log('processing data')
        const stateUF = row[9]
        if(stateUF.length == 2 ){
            const writeStream = writableStreamManager(stateUF)
            writeStream.write(row.toString())
            writeStream.write(os.EOL)   
        }
    })
    .on('end', () => {
        console.log('Ended')
    })
    .on('error', (err) => {
        console.log('General on Reading Streams')
        console.log(err)
    })


function writableStreamManager(key){
    let writableStream = writeStreams.get(key)
    if (!writableStream)
        writableStream = fs.createWriteStream(`${__dirname}/data/${key}.csv`, 'utf-8')

    writeStreams.set(key, writableStream)

    return writableStream
}