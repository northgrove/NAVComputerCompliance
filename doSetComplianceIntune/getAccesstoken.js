const request = require('request-promise')
let ms_access_token = ''

// GET SERVICE-SERVICE ACCESSTOKEN - Not in Use in this example
exports.getAccessToken = async (tokenURI, resource) => {
  let parameters = ''
  try {
    parameters = {
      client_id: process.env['AZURECONFIG_CLIENTID'],
      resource: resource,
//      redirect_uri: process.env['AZURECONFIG_CALLBACKURI'],
      grant_type: 'client_credentials',
      client_secret: process.env['AZURECONFIG_CLIENTSECRET']
    }
    await request.post({ url: tokenURI, formData: parameters }, function callback(
      err,
      httpResponse,
      body
    ) {
      ///console.log('httpResponse', httpResponse)
      ms_access_token = JSON.parse(body).access_token
      return ms_access_token
    })
    return ms_access_token
  } catch (e) {
    console.log('error ', e)
    return e
  }
}
