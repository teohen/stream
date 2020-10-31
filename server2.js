const fs = require('fs');
const server = require('http').createServer();
const CsvReadableStream = require('csv-reader');
const { on } = require('csv-reader');

server.on('request', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let inputStream = fs.createReadStream('TUP.csv', 'utf8');
    inputStream
    .on('open', function () {
        res.write('[')
    })
    .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
    .on('data', function (row) {        
        let returnObject = {
            latitude: row[19],
            longitude: row[20]
        }
        res.write(JSON.stringify(returnObject))
        res.write(',')
    })
    .on('end', () => {
        let returnObject2 = {
            latitude: 0,
            longitude: 0
        }
        res.write(JSON.stringify(returnObject2))
        res.write(']')
        console.log('fim')
        res.end()
    })
});
server.listen(8000);