const http = require('http');
const { BlobServiceClient } = require('@azure/storage-blob');

const hostname = '0.0.0.0';
const port = process.env.PORT || 8080;

// testing purpose *remove the connecton string and use env variable for deployment 
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

// Create the BlobServiceClient object which will be used to create a container client
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

const containerClient = blobServiceClient.getContainerClient("blob1");

const server = http.createServer((req, res) => {

  main().then((result) => {

    console.log('Listing Done!');

    // send back the response
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Blob contains: ${result}`);
    
  }).catch((ex) => {
    console.log(ex.message)
  });

});

async function main() {

  console.log('\nListing blobs...');

  let bolbContents = [];

  // List the blob(s) in the container.
  for await (const blob of containerClient.listBlobsFlat()) {
    console.log('\t', blob.name);
    bolbContents.push(blob.name);
  }

  return bolbContents;
}

server.listen(port, hostname, () => {
  console.log(`Server running on PORT ${port}`);
});