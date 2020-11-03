# stream

This is an example of using Streams for processing large files in Node. In this case, a CSV file containing public telephone locations (TUP) all across Brazil.

# Running

To run this project, you'll need:
**Node**
**Yarn (or npm)**
Also, you'll have to download the complete TUP file on the following adress and place it on the [data] (`./stream/data`) directory
(https://sistemas.anatel.gov.br/geoserver/ANATEL/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ANATEL:TUP&outputFormat=CSV)

# Explanation

After running this code, node will use a Read Stream for reading the `TUP.csv` file, storing one "chunk" of data at a time in memory and processing it. Thus, never having to load the whole file in memory, saving resources and producing a faster response. The "processing" part is also using Streams, but for writing in files, creating specific csv file according to the property UF of the Brazilian States.

# Templates

A template of the `TUP.csv` file is available on the root directory for testing porpuses. If you don't want to download the complete file. It should be placed on the `data/` directory as renamed as `TUP.csv`
