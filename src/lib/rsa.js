const NodeRSA = require('node-rsa')

/**
 * RSA类
 * @param keyData {string|base64|buffer|object}
 * @method encrypt
 * @method decrypt
 */
const RSA = function(keyData) {
    if('string' === typeof keyData && !/-----BEGIN/.test(keyData)) keyData = Buffer.from(keyData, 'base64').toString()
    this._$nodeRsa = new NodeRSA(keyData, { encryptionScheme: 'pkcs1' });
}

//////  静态属性  //////
/**公钥 */
RSA.PUBLIC = 'public'
/**私钥 */
RSA.PRIAVET = 'priavet'

//////  实例方法  //////
RSA.prototype._$opensslEncrypt = function(input, type) {
    // 转换为openssl格式密钥
    if(this._$nodeRsa){
        if(RSA.PUBLIC === type){
            return this._$nodeRsa.encrypt(input, 'base64');
        } else if(RSA.PRIAVET === type){
            return this._$nodeRsa.encryptPrivate(input, 'base64');
        }
    }
    return '';
}
RSA.prototype._$opensslDecrypt = function(input, type) {
    if(this._$nodeRsa){
        if(RSA.PUBLIC === type){
            return this._$nodeRsa.decryptPublic(input, 'utf8');
        } else if(RSA.PRIAVET === type){
            return this._$nodeRsa.decrypt(input, 'utf8');
        }
    }
    return '';
}
/**
 * encrypt 加密函数
 * 
 * @param {string} data 需要加密的数据
 * @param {string} type 加密方式 RSA.PUBLIC or RSA.PRIAVET
 * @return {string}
 */
RSA.prototype.encrypt = function(data, type=RSA.PUBLIC) {
    return this._$opensslEncrypt(data, type);
}
/**
 * decrypt
 * 
 * @param {string} data 密文
 * @param {string} type 加密方式 RSA.PUBLIC or RSA.PRIAVET
 * @return {string}
 */
RSA.prototype.decrypt = function(data, type=RSA.PUBLIC) {
    return this._$opensslDecrypt(data, type);
}

module.exports = RSA