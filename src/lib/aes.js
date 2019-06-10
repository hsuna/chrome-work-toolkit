const crypto = require("crypto");

/**
 * getMethod 根据密钥长度获取加密算法函数
 * 
 * @param mixed $str_data
 * @static 
 * @return void
 */
const getMethod = ($str_data='') => {
    if ($str_data.length === 32) {
        return 'aes-256-cbc'; // 32字节的密钥对应的256位的CBC算法
    } else {
        return 'aes-128-cbc'; // 16字节的密钥对应的128位的CBC算法
    }
}

const getIV = ($str_data='') => {
    if ($str_data.length !== 16 && $str_data.length !== 32) {
        return null;
    } else {
        //反正字符串
        return $str_data.split("").reverse().join("");
    }
}

const encrypt = ($plaintext, $pub_key='') => {
    let $ciphertext = null;
    if ($pub_key.length === 16 || $pub_key.length === 32) {
        const $iv = getIV($pub_key)
        let cipherChunks = [];
        // aes+base64_encode加密
        const cipher = crypto.createCipheriv(getMethod($pub_key), $pub_key, $iv);
        cipher.setAutoPadding(true);
        cipherChunks.push(cipher.update($plaintext, 'utf8', 'base64'));
        cipherChunks.push(cipher.final('base64'));
        $ciphertext = cipherChunks.join('');
    } else {
        throw new Error("aes key should be 16 bytes(128bits) or 32 bytes(256bits)");
    }
    return $ciphertext;
}

const decrypt = ($ciphertext, $pri_key='') => {
    let $plaintext = null;
    if ($pri_key.length === 16 || $pri_key.length === 32) {
        let plainChunks = []
        // hash md5 前16位作为向量
        const $iv = getIV($pri_key)
        // aes+base64_decode解密
        const plain = crypto.createDecipheriv(getMethod($pri_key), $pri_key, $iv);
        plain.setAutoPadding(true);
        plainChunks.push(plain.update($ciphertext, 'base64', 'utf8'));
        plainChunks.push(plain.final('utf8'));
        $plaintext = plainChunks.join('')
    } else {
        throw new Error("aes key should be 16 bytes(128bits) or 32 bytes(256bits)");
    }
    return $plaintext;
}

module.exports = {
    encrypt,
    decrypt
}