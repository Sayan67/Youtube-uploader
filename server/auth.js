
const fs = require('fs')
const assert = require('assert')
const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;

let CREDENTIALS;
let GLOBAL_OAUTH_CLIENT;
const SCOPES = 'https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/userinfo.profile';

function init() {
    // Load client secrets from a local file.
    fs.readFile('./client_secret.json', function processClientSecrets(err, content) {
        if (err) {
            console.log('Error loading client secret file: ' + err);
            return;
        }
        CREDENTIALS = JSON.parse(content)
        GLOBAL_OAUTH_CLIENT = authorize(CREDENTIALS)
    });
}

function getGlobalClient() { return GLOBAL_OAUTH_CLIENT  }

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials) {
    const clientSecret = credentials.installed.client_secret;
    const clientId = credentials.installed.client_id;
    const redirectUrl = credentials.installed.redirect_uris[0];
    const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

    return oauth2Client
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getAuthUrl(oauth2Client) {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });

    return authUrl
}

function handleAuthCode(oauth2Client, code, callback) {
    return oauth2Client.getToken(code, function (err, token) {
        if (err) {
            console.log('Error while trying to retrieve access token', err);
            return;
        }
        //storeToken(token);
        callback(oauth2Client, token);
    });
}

init()

module.exports = {
    CREDENTIALS, getGlobalClient, authorize, getAuthUrl, handleAuthCode
}