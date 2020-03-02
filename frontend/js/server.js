// const CLIENT_ID = PROCESS.ENV.client_id;
// const API_KEY = PROCESS.ENV.api_key;
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

// Fetch API to write to Google Sheets API with oAuth but with API key?
// https://stackoverflow.com/questions/51081462/using-google-sheets-api-without-client-side-login
// Do I need a NodeJS server?
// Is a lightweight server properly setup?
// Look into gulp-live-server
// It doesn't seem like a server is setup...at all *face palm*