var parse = require('co-busboy');
var fs = require('fs');
var path = require('path');


module.exports = {
    uploadImage: function *(next) {
        var parts = parse(this);
        var part;
        while (part = yield parts) {
            var stream = fs.createWriteStream('/uploads/' + part.filename);
            part.pipe(stream);
            console.log('uploading %s -> %s', part.filename, stream.path);
        }
        this.body = '/uploads/' + part.filename;
    },
}