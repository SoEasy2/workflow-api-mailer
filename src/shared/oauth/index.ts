import { google } from 'googleapis';
const OAuth2 = google.auth.OAuth2;
export const getOAUTH2Tokens = (refresh_token: string, clientId: string, clientSecret: string) => {
    const OAuth2_client = new OAuth2(clientId, clientSecret);
    OAuth2_client.setCredentials( { refresh_token } )
    const accessToken = OAuth2_client.getAccessToken();
    return {
        accessToken,
        refreshToken: refresh_token
    }
}
