module.exports = {
  fs : require('fs'),
  _file : __dirname + '/archive.json',
  limit : 100,
  
  get : function(callback) {
    this.fs.readFile(this._file, 'utf8', function(error, data) {
      if(error === null) {
        callback(null, JSON.parse(data));
      } else {
        callback(error, null);
      }
    });
  },

  add : function(data, callback) {
    var chat = this;

    this.get(function(error, archive) {
      if(error !== null) {
        callback(error);
        return;
      }

      if(archive.length >= chat.limit) {
        archive.splice(0, 1);
      }

      archive.push(data);

      chat.fs.writeFile(chat._file, JSON.stringify(archive), function(err) {
        callback(err);
      });
    });
  }
};