const express = require ('express')
const app = express()
const port = 3009
const routes = require('./src/routes/routes')
const cors = require('cors')
const fs = require('fs');
const https = require('https');


const privateKey = fs.readFileSync('./src/cert/clave-privada.key', 'utf8');
const certificate = fs.readFileSync('./src/cert/certificado.crt', 'utf8'); 

const credentials = {
  key: privateKey,
  cert: certificate,
 };

const httpsServer = https.createServer(credentials, app);

app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})


app.use('/mailDoppler',routes)


httpsServer.listen(port, () => {
  console.log(`API runing on port ${port}
    Ejemplo:  https://localhost:3009/mailDoppler/testApi`)
})