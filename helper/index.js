const env      = require('../config/env');
const CryptoJS = require("crypto-js");
const path     = require('path');
const fs       = require('fs');


const helper = {};

helper.cryptPass = function (password){
	let salt = '';
  	for (var i = 0; i < 10; i++)
    	salt += env.CHARSET.charAt(Math.floor(Math.random() * 10));
	let crypt_pass = CryptoJS.AES.encrypt(password, salt + env.GLOBAL_SALT).toString();
	return {'pass': crypt_pass, 'salt': salt};
}

helper.writeImageInFile = function (imageBase64_withMetaData, nameFile) {

  let acceptType = [ 'png', 'jpg', 'jpeg' ];
  let typeFile = imageBase64_withMetaData.match(/^data:(.*?)\/([a-z]+);base64,(.+)$/)[2];
  if(!typeFile || acceptType.indexOf(typeFile) === -1) throw Error();
  let imageBase64_withoutMetaData = imageBase64_withMetaData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)[2];
  let bitmap = new Buffer(imageBase64_withoutMetaData , 'base64');
  let pathImage = path.join(env.DIR_PHOTO, `${nameFile}.${typeFile}`);
  fs.writeFile(pathImage, bitmap, 'base64', function(err) {
    if (err) {
      console.log('Fail', err);
    } else {
      console.log("Success");
    }
  });
  return "picture/photo_profile/" + `${nameFile}.${typeFile}`;
};

helper.checkPassword = function (crypt_pass, user_salt, pass, salt){
  let bytes  = CryptoJS.AES.decrypt(crypt_pass, user_salt + env.GLOBAL_SALT);
  let password = bytes.toString(CryptoJS.enc.Utf8);
  let hash = CryptoJS.PBKDF2(password, salt, { keySize: 128/32 });
	return hash.toString() === pass ? true : false;
}


module.exports = helper;