const auth = require("./auth")

module.exports = {createClient, getClient, fetchClient, doesClientExist}

const CLIENTS = {}

function createClient(uid, access_token) {
    const client = auth.authorize({...auth.getCredentials()})
    client.setCredentials({access_token})
    CLIENTS[uid] = client
    return client
}

function getClient(uid) {
    return CLIENTS[uid]
}

function doesClientExist(uid) {
    return Object.keys(CLIENTS).indexOf(uid) != -1
}

function fetchClient(uid, token) {
    if (!doesClientExist(uid)) {
        return createClient(uid, token)
    }
    const client = getClient(uid)
    client.setCredentials({access_token: token})
    return client;
}

