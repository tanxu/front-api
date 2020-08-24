import CryptoJS from 'crypto-js'
import config from '../config/index'

function getAesString(data) {//加密
  var key = CryptoJS.enc.Utf8.parse(config.CRYPTO_KEY);
  //alert(key）;
  var iv = CryptoJS.enc.Utf8.parse(config.CRYPTO_IV);
  var encrypted = CryptoJS.AES.encrypt(data, key,
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
  return encrypted.toString();    //返回的是base64格式的密文
}
function getDAesString(encrypted) {//解密
  var key = CryptoJS.enc.Utf8.parse(config.CRYPTO_KEY);
  var iv = CryptoJS.enc.Utf8.parse(config.CRYPTO_IV);
  var decrypted = CryptoJS.AES.decrypt(encrypted, key,
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
  return decrypted.toString(CryptoJS.enc.Utf8);      //
}
export const PassHandle = {
  getAES(data){ //加密
    const key = config.CRYPTO_KEY;  //密钥
    const iv = config.CRYPTO_IV;
    return getAesString(data, key, iv); //密文
  },
  getDAes(data){//解密
    const key = config.CRYPTO_KEY;  //密钥
    const iv = config.CRYPTO_IV;
    return getDAesString(data, key, iv);
  }
};
