const bcrypt = require('bcrypt');
const saltRounds = 9;
const app = {};
app.hash= function(password){
    return bcrypt.hash(password, saltRounds);
}
app.confirm = function(hash,password){
    return bcrypt.compare(password, hash);
}
Object.freeze(app);
module.exports = app;