import {AzureFunction, Context, HttpRequest} from "@azure/functions"

const httpTrigger: AzureFunction = (
    context: Context,
    req: HttpRequest,
): void => {
    context.log("HTTP trigger function processed a request.")
    const name = req.query.name || (req.body && req.body.name) || "friend"
    
    context.res = {
        body: `Hello, ${name}!`
    }
}

export default httpTrigger
