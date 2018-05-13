const fs = require('fs');
const path = require('path');
const bluebird = require('bluebird');
const readFile = bluebird.promisify(fs.readFile);

class FileUtils {

  async readFiles(fileNames) {
    let data = [];
    for (let i = 0; i < fileNames.length; i++) {
      const filename = fileNames[i];
      let file;
      try {
        file = await (readFile(filename));
      } catch (Error) {
        throw new NotFoundError("readFiles func error")
      }
      data.push({name: filename, content: file.toString()});
    }
    return Promise.resolve(data);
  }

  /**
   * Explores recursively a directory and returns all the filepaths and folderpaths in the callback.
   *
   * @see http://stackoverflow.com/a/5827895/4241030
   * @param {String} dir
   * @param {Function} done
   */
  filewalker(dir, done) {
    let results = [];

    fs.readdir(dir, (err, list) => {
      if (err) return done(err);
      let pending = list.length;
      if (!pending) return done(null, results);

      list.forEach((file) => {
        file = path.resolve(dir, file);

        fs.stat(file, (err, stat) => {
          // If directory, execute a recursive call
          if (stat && stat.isDirectory()) {
            // Add directory to array [comment if you need to remove the directories from the array]
            results.push(file);

            filewalker(file, (err, res) => {
              results = results.concat(res);
              if (!--pending) done(null, results);
            });
          } else {
            results.push(file);

            if (!--pending) done(null, results);
          }
        });
      });
    });
  };
}

module.exports = new FileUtils();
