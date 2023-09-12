require('dotenv').config();
const config = require('config');

// our configurations => our environments
// output base on our environment.
console.log('App name: ' + config.get('name'));
console.log('Mail server: ' + config.get('mail.host'));

// NODE_ENV: This variable contains the name of your application's deployment environment.
console.log('NODE_ENV: ' + config.util.getEnv('NODE_ENV'));

// private config with custom environment variables:
// make a file with exact name "custom-environment-variables.json" in "config" folder
// and set that variable with environment variable's name.
/*
*** configuration json file:
{
    email: {
        password: "APP_PASSWORD"
    }
}
*** .env file:
APP_PASSWORD=1234
*/
console.log('Password: ' + config.get('mail.password')); // 1234

// Configuring from an External Source:
// Once connected to the external source,
// read additional configurations and add them to the config object returned from require('config');.
// Make sure any external overrides are done in the application bootstrap - before anyone calls the first config.get();,
// because the config object is made immutable as soon as any client uses the values via get().