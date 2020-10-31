const fs = require('fs');
const CsvReadableStream = require('csv-reader');
const http = require('http')


const server =  http.createServer((req, res) => {
    
})
 
let inputStream = fs.createReadStream('TUP.csv', 'utf8');

let tupDestinationStream = fs.createWriteStream('./orelhao_nordeste.json');

inputStream
    .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
    .on('open', function(){
        console.log('open readable')
    })
    .on('data', function (row) {        
        if (row[9] == 'MA') {
            let writableObject = {
                UF: row[9],
                latitude: row[19],
                longitute: row[20],
                numero: row[6],
                localidade: row[10]
            }
            //tupDestinationStream.write(JSON.stringify(writableObject));
            //tupDestinationStream.write('//n');

        }
    })
    .on('end', function (data) {
        console.log('No more rows!');
    });


