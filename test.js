const ipfsAPI = require('ipfs-api');
const express = require('express');
const fs = require('fs');
const app = express();

const ipfs = ipfsAPI('localhost', '5001', { protocol: 'http' })

let testFile = fs.readFileSync('/home/asus/Desktop/ipfslearn/meAndTheBoiis.jpg');
let testBuffer = new Buffer(testFile);

app.post('/addfile', function (req, res) {

  ipfs.files.add(testBuffer, function (err, file) {
    if (err) {
      console.log(err);
    }
    console.log(file)
  })

})
app.get('/getfile', async function (req, res) {
  console.log(req)

  const file = await ipfs.files.get(req.query.key)
  console.log("GET => ", file)
  return file
})

app.listen(3000, () => console.log('App listening on port 3000!'))
