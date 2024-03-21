const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const { 
    APP_NAME, APP_ENV, APP_KEY, APP_DEBUG, APP_URL, APP_PORT, 
    DB_CONNECTION, DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD, 
    MAIL_MAILER, MAIL_HOST, MAIL_PORT, MAIL_USERNAME, MAIL_PASSWORD, MAIL_ENCRYPTION, MAIL_FROM_ADDRESS, MAIL_FROM_NAME 
} = process.env;

assert(APP_URL, 'APP_URL is required');
assert(APP_PORT, 'APP_PORT is required');
assert(APP_KEY, 'APP_KEY is required');

module.exports = {
    app_name: APP_NAME, 
    app_env: APP_ENV, 
    app_key: APP_KEY, 
    app_debug: APP_DEBUG, 
    app_url: APP_URL, 
    app_port: APP_PORT, 
    database: {
        connection: DB_CONNECTION, 
        host: DB_HOST, 
        port: DB_PORT, 
        database_name: DB_DATABASE, 
        username: DB_USERNAME, 
        password: DB_PASSWORD, 
    },
    mail: {
        mailer: MAIL_MAILER, 
        host: MAIL_HOST, 
        port: MAIL_PORT, 
        username: MAIL_USERNAME, 
        password: MAIL_PASSWORD, 
        encryption: MAIL_ENCRYPTION, 
        from_address: MAIL_FROM_ADDRESS, 
        from_name: MAIL_FROM_NAME 
    }
};
