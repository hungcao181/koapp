var monkdb    = require('monk')('localhost/koapp');
var users = monkdb.get("users");
    users.drop();
users.find({}, function (err, docs) {
    if (err) { return;}
    if (docs.length == 0) {
        users.insert(
            {name: 'admin', description: 'he can do everything'}
            );
    };
})

module.exports = {
    monkdb: monkdb    
}