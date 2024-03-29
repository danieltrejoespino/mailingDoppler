const { default: axios } = require('axios');
const dopplerData = require('../config/dopplerConfig.json')


const home = {
  testApi: (req, res) => {
    console.log('peticion test exitosa');
    res.json({ rspta: 'peticion test exitosa' })
  },

  testCredenciales: async (req, res) => {
    try {
      const rspta = await axios.get(dopplerData.liga)
      console.log(rspta);
      res.json(rspta.status)
    } catch (error) {
      console.log('Error --', error);
      res.send(error)
    }
  },
  testEmailSend: async (req, res) => {
    try {
      const liga = `${dopplerData.liga}/accounts/${dopplerData.accountId}/messages`
      const htmlData = `
      <h2 style="color: red;">Correo enviado desde nodejs</h2>

      <img src="./src/public/img/dasa.png"> </img>
    `

      const emailData = {
        from_name: 'Impulse',
        from_email: 'reportes@impulse-telecom.com',
        messageId: '1',
        subject: 'Correo desde nodejs',
        text: 'hola mundo',
        html: `${htmlData}`,
        headers: [
          {
            key: 'string',
            value: 'string'
          }
        ],
        deliveryGuids: [
          'string'
        ],

        reply_to: {
          email: 'danieluaeh@gmail.com',
          name: 'daniel'
        },
        recipients: [
          {
            email: 'dtrejo@impulse-telecom.com',
            name: 'Daniel 2',
            type: 'to'
          }
        ],
        skip_track_opens: true,
        skip_track_clicks: true,
        metadata: [
          {
            key: 'string',
            value: 'string'
          }
        ],
        sendingIPAddresses: [
          'string'
        ],
        priority: 'string'
      };

      const response = await axios.post(liga, emailData, {
        params: { api_key: data.apikey },
        headers: { 'Content-Type': 'application/json' }
      })
      console.log(response.status);
      res.json({ rspta: response.status })

    } catch (error) {
      console.log(error);
      res.send(error)
    }


  }


}


module.exports = { home }