
/** Return a hashtable of the inputs */
export function parse(process, tl) {

  // configure the hash table to return
  let inputs = {};

  // if the node environment has been set, read the arguments from ENV
  if (process.env.NODE_ENV === "dev") {
    inputs["chefServerUrl"] = process.env.chefServerUrl;
    inputs["chefUsername"] = process.env.chefUsername;
    inputs["chefUserKey"] = process.env.chefUserKey;

    // get the chef environment name
    if (process.env.chefEnvName != null) {
      inputs["chefEnvName"] = process.env.chefEnvName;
    }

    if (process.env.chefCookbookName != null) {
      inputs["chefCookbookName"] = process.env.chefCookbookName;
    }

    if (process.env.chefCookbookVersion != null) {
      inputs["chefCookbookVersion"] = process.env.chefCookbookVersion;
    }

  } else {
    // get the necessary inputs from the specified endpoint
    //let username = tl.getEndpointAuthorizationParameter(tl.getInput("chefServerEndpoint", "username", true));
    //let key = "fred";

    //console.log("Username: %s", username);

    let auth = tl.getEndpointAuthorization(tl.getInput("chefServerEndpoint", true));
    console.log(tl.getEndpointUrl(tl.getInput("chefServerEndpoint", true)) + " " + auth.parameters.username + " " + auth.parameters.password + " " + JSON.stringify(auth));

    // get the URL from the endpoint
    inputs["chefServerUrl"] = tl.getEndpointUrl(tl.getInput("chefServerEndpoint"), true);
    inputs["chefUsername"] = tl.getInput("chefUsername"); //auth.parameters.username;
    inputs["chefUserKey"] = auth.parameters.password;

    // get the chef environment name
    if (tl.getInput("chefEnvName") != null) {
      inputs["chefEnvName"] = tl.getInput("chefEnvName");
    }

    if (tl.getInput("chefCookbookName") != null) {
      inputs["chefCookbookName"] = tl.getInput("chefCookbookName");
    }

    if (tl.getInput("chefCookbookVersion") != null) {
      inputs["chefCookbookVersion"] = tl.getInput("chefCookbookVersion");
    }
  }

  // decode the base64 encoding of the userkey
  inputs["chefUserKey"] = Buffer.from(inputs["chefUserKey"], "base64").toString("utf8");

  return inputs;
}