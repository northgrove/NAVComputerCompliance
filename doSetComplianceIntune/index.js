const getToken = require('./getAccesstoken')
const msgraph = require('./msgraph')
const config = require('./config')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    context.log('comName: ', req.query.compname)
    context.log('setCompliant: ', req.query.setcompliant)
    const token = await getToken.getAccessToken(config.tokenUri, config.resource)
    const token2 = await getToken.getAccessToken(config.tokenUri, config.resource2)
    let setCompliant = ''
    //context.log('token: ', token)
    if (req.query.setcompliant === "compliant") {
        const setCompliant = await msgraph.setCompliant(token, req.query.compname)
        console.log('setCompliant', setCompliant)
        const doCompliant = await msgraph.doSetCompliant(token2, setCompliant)
        context.log('setCompliant', setCompliant)
    }
   if (req.query.setcompliant === "noncompliant") {
        setCompliant = await msgraph.setNonCompliant(token, req.query.compname)
        context.log('setCompliant', setCompliant)
   }
    
    

    context.res = {
        body: setCompliant
    }
    /*
    if (req.body) {



        context.log(req.body)
        context.res = {
            // status: 200, /* Defaults to 200 

            //body: "Hello " + (req.query.name || req.body.name)
            body: req.body
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body - fra dev"
        };
    }
*/
};