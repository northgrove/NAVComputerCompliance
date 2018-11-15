const request = require('request-promise')


// GET USERS PHOTO FROM MICROSOFT GRAPH API
exports.getUserPhoto = async ({ userId, refreshToken, userUpn }) => {
  console.log("\x1b[33m%s\x1b[0m" ,' - requesting userphoto from graph.microsoft.com')
  let userPhoto = ''
  const resource = 'https://graph.microsoft.com'
  const accessToken = await token.validateRefreshAndGetToken(userId, refreshToken, resource)
  return request
    .get({
      headers: { 'content-type': 'image/jpg' },
      url: `https://graph.microsoft.com/beta/users/${userUpn}/photo/$value`,
      auth: { bearer: accessToken }
    })
    .then(response => {
      userPhoto = 'data:image/jpg;base64,' + new Buffer.from(response).toString('base64')
      console.log("\x1b[33m%s\x1b[0m" ,' - got users photo in return from graph.microsoft.com')
      return userPhoto
    })
    .catch(err => {
      console.log("\x1b[33m%s\x1b[0m" ,' - an error occured getting user photo, sending default photo. Make sure your Azure AD app has access to the Graph API and that the user has a photo uploaded')
      userPhoto = defaultPhoto
      return userPhoto
    })
}

exports.setCompliant = async (accessToken, compName) => {
  return request
  
  .get({
    headers: { 'content-type': 'application/json' },
    url: `https://graph.microsoft.com/beta/devices?$filter=startswith(displayName, '${compName}')`,
    auth: { bearer: accessToken }
  })
  .then(response => {
    const computerinfo = JSON.parse(response)
    //console.log(computerinfo)
    

   
    //console.log('response:', response)
    //console.log("\x1b[33m%s\x1b[0m" ,' - got users photo in return from graph.microsoft.com')
    return computerinfo
  })
  .catch(err => {
    //console.log('error', err)
    console.log("\x1b[33m%s\x1b[0m" ,' - an error occured getting user photo, sending default photo. Make sure your Azure AD app has access to the Graph API and that the user has a photo uploaded')

    return err
  })
}


exports.setNonCompliant = async ({}) => {
  
}

exports.doSetCompliant = async (accessToken, computerinfo) => {

  computerinfo.value.forEach(async (computer) => {
      
    const compparams = JSON.stringify({
      
        isCompliant: true,
        isManaged: true

      })
    /*
      const doCompliant= await request.patch({
        headers: { 'content-type': 'application/json' },
        auth: { bearer: accessToken },
        url: `https://graph.windows.net/navno.onmicrosoft.com/devices/${computer.id}/?api-version=beta`,
       // url: `https://graph.microsoft.com/beta/devices/${computer.id}`,
        body: compparams
    })
    .then(compresponse => {
      console.log('compresponse: ', compresponse)
    })
    .catch(err => {
      console.log('error: ', err)
    })
    */

    console.log('computer: ', computer.deviceId)
  
  });

}