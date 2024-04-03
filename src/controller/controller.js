const { default: axios } = require("axios");
const dopplerData = require("../config/dopplerConfig.json");
const path = require("path");
const fs = require("fs");

const home = {
  testApi: (req, res) => {
    console.log("peticion test exitosa");
    res.json({ rspta: "peticion test exitosa" });
  },

  testCredenciales: async (req, res) => {
    try {
      const rspta = await axios.get(dopplerData.liga);
      console.log(rspta);
      res.json(rspta.status);
    } catch (error) {
      console.log("Error --", error);
      res.send(error);
    }
  },
  testEmailSend: async (req, res) => {
    // Funcion para encriptar imagen y enviar por correo en base64
    // function imageToBase64(imagePath) {
    //   const imageData = fs.readFileSync(imagePath);
    //   return imageData.toString('base64');
    // }
    try {
      const htmlPath = path.join(__dirname, "../public/html/layout.html");
      let htmlContent = undefined;
      try {

        dopplerData.config.html = fs.readFileSync(htmlPath, "utf-8");
        dopplerData.config.subject = 'Asunto del mensaje';
        dopplerData.config.recipients[0].email = 'correoDestinatario@prueba.com'
        dopplerData.config.recipients[0].name = 'nombre destinatario'

        const response = await axios.post(
          dopplerData.endPointSendMail,
          dopplerData.config,
          {
            params: { api_key: dopplerData.apikey },
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log('Rspta Doppler ---- ', response.status);

        res.json({ rspta: response.status });


      } catch (error) {
        console.log();
        res.send("Error al leer archivo", error);
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  },
};

module.exports = { home };
