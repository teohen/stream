import { dirname, join } from 'path' 
import { promisify } from 'util'
import { promises, createReadStream, createWriteStream } from 'fs'
import { pipeline, Transform } from 'stream'
const pipelineAsync = promisify(pipeline)
import StreamConcat from 'stream-concat'

const { readdir } = promises

const { pathname } = new URL(import.meta.url)

const cwd = dirname(pathname)

const filesDir = `${cwd}/data/separated`
const output = `${cwd}/data/TUPJoined.csv`

const files = await readdir(filesDir)

const readStreams = files.map(
    item => createReadStream(join(filesDir, item))
)
const singleReadStream = new StreamConcat(readStreams)

const writeStream = createWriteStream(output)

const transformStream = new Transform({
    transform: (chunk, encoding, cb) => {
        return cb(null, chunk)
    }
})

await pipelineAsync(
    singleReadStream,
    transformStream,
    writeStream
)