const account = require('./account/Lib.js')

module.exports =  (app) => {
    app.post('/login', account.login);
    app.post('/signup', account.signup);
};