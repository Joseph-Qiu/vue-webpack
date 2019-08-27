const path = require('path');
const os = require('os');
const fs = require('fs');

// 获取指定目录下的文件夹名字
exports.getFolderName = (p) => {
    console.log(p)
  let names = [];
  const files = fs.readdirSync(p);
  files.forEach((item, index) => {
    let stat = fs.lstatSync(p + "/" + item);
    if (stat.isDirectory() === true) { 
      names.push(item);
    }
  });
  return names;
};


// 获取ip
exports.getIPAdress = function() {
  let interFaces = os.networkInterfaces();
  let WLAN = interFaces.WLAN;
  let localIp = '127.0.0.1';

  if (!WLAN) {
    for (let i in interFaces) {
      let arr = interFaces[i] || [];
      if (!arr.length) continue;
      for (let j = 0; j < arr.length; j++) {
        if (arr[j]['family'] === 'IPv4' && arr[j].address !== localIp) {
          return arr[j].address;
        }
      }
    }
  }

  if (WLAN.length) {
    for (let i = 0; i < WLAN.length; i++) {
      let alias = WLAN[i];
      if (alias.family === 'IPv4' && alias.address !== localIp && !alias.internal) {
          return alias.address;
      }
    }
  }

  return localIp;
};