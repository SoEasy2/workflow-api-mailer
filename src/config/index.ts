export default () => {
    console.log("process.env", process.env)
    return {
        smtp: {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            isSecure: process.env.SMTP_SECURE,
            auth: {
                user: process.env.SMTP_AUTH_USER,
                clientId: process.env.SMTP_AUTH_CLIENT_ID,
                clientSecret: process.env.SMTP_AUTH_CLIENT_SECRET,
                refreshToken: process.env.SMTP_AUTH_REFRESH_TOKEN,
                accessUrl: process.env.SMTP_AUTH_ACCESS_URL,
                accessToken: process.env.SMTP_AUTH_ACCESS_TOKEN,
            },
        },
    }
}