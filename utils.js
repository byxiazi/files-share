const fs = require("fs");
const path = require("path");
const address = require('address')

function readFiles(dir, { isRecursive }) {
  const dirents = fs.readdirSync(dir, { withFileTypes: true }); // 如果路径是文件或不存在，直接抛出错误

  const files = [];
  if (isRecursive) {
    function readFilesRecursive(dirents, baseDir) {
      dirents.forEach((d) => {
        if (d.isDirectory()) {
          const _dir = path.join(baseDir, d.name);
          const _dirents = fs.readdirSync(_dir, { withFileTypes: true });
          readFilesRecursive(_dirents, _dir);
        } else {
          const file = path.join(baseDir, d.name);
          const relative = path.relative(dir, file);
          files.push(relative);
        }
      });
    }
    readFilesRecursive(dirents, dir);
  } else {
    dirents.forEach((d) => {
      if (d.isFile()) {
        files.push(d.name);
      }
    });
  }

  return files;
}

function localIp() {
  return address.ip() || 'localhost'
}

module.exports = {
  readFiles,
  localIp
};
