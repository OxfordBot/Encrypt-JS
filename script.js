const EncryptJS = (function() {
        var encodings = []
    var count = 0
    var chars = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&()-=[];'\\,./~_+{}:"|<>? `
    for (var char in chars) {
        char = chars[char]
        encodings.push([count.toString(), char])
        count += 1
    }
    const read_key = async (text, key) => {
        var count = 0
        var ords = []
        while (ords.length < key.length) {
            ords.push(parseInt((key.charCodeAt(count)).toString()[0]))
            count += 1
        }
        while (ords.length < text.length) {
            ords += "," + ords
        }
        return ords
    }
    const encode = async (text) => {
        var count_letter = 0
        var encoded = ""
        for (var letter in text) {
            letter = text[letter]
            for (var encoding in encodings) {
                encoding = encodings[encoding]
                if (letter === encoding[1]) {
                    code = encoding[0]
                    break
                }
            }
            if (count_letter < text.length-1) {
                encoded += code + "-"
            } else {
                encoded += code
            }
            count_letter += 1
        }
        return encoded
    }
    const decode = async (text) => {
        text = text.split("-")
        var decoded = ""
        for (var number in text) {
            number = text[number]
            for (var encoding in encodings) {
                encoding = encodings[encoding]
                if (number === encoding[0]) {
                    char = encoding[1]
                    decoded += char
                    break
                }
            }
        }
        return decoded
    }
    const _encrypt = async (text, key) => {
        encoded = await encode(text) /*     Grade 1: Encoding     */
        encrypted = ""
        var count_num = 0
        for (var character in encoded) {
            character = encoded[character]
            code = character.charCodeAt(0)
            chr = String.fromCharCode(code + 9)
            encrypted += chr
            count_num += 1
        }
        return encrypted
    }
    const _decrypt = async (text, key) => {
        decrypted = ""
        var count_num = 0
        for (var character in text) {
            character = text[character]
            code = character.charCodeAt(0)
            chr = String.fromCharCode(code - 9)
            decrypted += chr
            count_num += 1
        }
        decoded = await decode(decrypted) /*     Grade 1: Encoding     */
        return decoded
    }
    return {
        encrypt(text, key) {
            return _encrypt(text, key)
        },
        decrypt(text, key) {
            return _decrypt(text, key)
        }
    }
})()
