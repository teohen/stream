# Project

This is an example of using Streams for processing large files in Node. In this case, a CSV file containing public telephone locations (TUP) all across Brazil.

# Stream

The Stream API (https://nodejs.org/api/stream.html) provides a set of powerful tools for node developers. One of many use cases for stream is to process large files. Using Streams, node will load one chunk of data at a time in memory, transform it or pipe it to another stream object. Thus, never having to load the whole file in memory, saving resources and producing a better processing flow.

# Running

To run this project, you'll need:
**Node 14** and **Yarn (or npm)**.
Also, you'll have to download the complete TUP file on the following adress and place it on the data (`./stream/data`) directory:
(https://sistemas.anatel.gov.br/geoserver/ANATEL/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ANATEL:TUP&outputFormat=CSV)

# Explanation for separate.js

After running the `separate.js` (`node separate.js`) file, node will use a Read Stream for reading the `TUP.csv` file, create one write stream based on the state UF data from each row, and then using them to produce one csv file for each state in the original `TUP.csv` file.

# Explanation for join.js

After running the `join.js` (`node join.js`) file, node will use several read streams to read the files located in the `separated` folder inside the `data` folder and pipe those read streams to the write stream, creating a single file containing all the data from the files.
PS: the `join.js` file was created base on the project found in (https://github.com/ErickWendel/concat-large-files-nodejs-yt), originally created by @ErickWendel

# Templates

A template of the `TUP.csv` file and the separated files are available on the `data` folder for testing porposes, in case that you don't want to download the complete file. It should be placed on the `data/` folder and renamed as `TUP.csv`
