module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.body) {
        context.log(req.body)
        context.res = {
            // status: 200, /* Defaults to 200 */

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
};