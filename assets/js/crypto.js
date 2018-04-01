$(() => {
    const crypto = require('crypto')
    $('#PasswordField').bind('input propertychange', function () {
        const text = this.value;
        const key = 'qassim university';

        // Encryption
        const aes256 = crypto.createCipher('aes-256-ctr', key).update(text, 'utf8', 'hex')
        $('#aes-output').text(aes256)

        const des3 = crypto.createCipher('des3', key).update(text, 'utf8', 'hex')
        $('#des-output').text(des3)

        // Hashing
        const md5 = crypto.createHash('md5').update(text, 'utf8').digest('hex')
        $('#md5-output').text(md5)

        const sha1 = crypto.createHash('sha1').update(text, 'utf8').digest('hex')
        $('#sha1-output').text(sha1)

        const sha256 = crypto.createHash('sha256').update(text, 'utf8').digest('hex')
        $('#sha256-output').text(sha256)

        const sha512 = crypto.createHash('sha512').update(text, 'utf8').digest('hex')
        $('#sha512-output').text(sha512)


    })

})