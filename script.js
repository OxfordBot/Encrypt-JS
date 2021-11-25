const EncryptJS = (function() {
    const _generate_key = async (length) => {
        const characters = "abcdefghijklmnopqrstuvwxyz0123456789"
        if (length < characters.length || length === characters.length) {
            var key = ""
            var used_characters = []
            while (key.length < length) {
                const character = characters[Math.floor(Math.random() * characters.length)]
                if (used_characters.includes(character) != true) {
                    used_characters.push(character)
                    key += character
                }
            }
            return key
        } else {
            return null
        }
    }
    const read_key = async (text, key) => {
        var count = 0
        var ords = []
        while (ords.length < key.length) {
            ords.push(parseInt((key.charCodeAt(count)).toString()[0]))
            count += 1
        }
        while (ords.length < text.length) {
            ords += ords
        }
        return ords
    }
    const _encrypt = async (text, key) => {
        const ords = await read_key(text, key)
        var count = 0
        var encrypted = ""
        text = text.split("").reverse().join("")
        for (var char in text) {
            char = text[char].charCodeAt(0)
            ord = ords[count]
            if (ord > 4) {
                char += ord
            } else {
                char -= ord
            }
            char = String.fromCharCode(char)
            encrypted += char
            count += 1
        }
        return encrypted
    }
    const _decrypt = async (text, key) => {
        const ords = await read_key(text, key)
        var count = 0
        var decrypted = ""
        for (var char in text) {
            char = text[char].charCodeAt(0)
            ord = ords[count]
            if (ord > 4) {
                char -= ord
            } else {
                char += ord
            }
            char = String.fromCharCode(char)
            decrypted += char
            count += 1
        }
        decrypted = decrypted.split("").reverse().join("")
        return decrypted
    }
    return {
        generate_key(length) {
            return _generate_key(length)
        },
        encrypt(text, key) {
            return _encrypt(text, key)
        },
        decrypt(text, key) {
            return _decrypt(text, key)
        }
    }
})()
const App = (function(EncryptJS) {
    const start = async () => {
        const key = await EncryptJS.generate_key(36)
        const encrypted = await EncryptJS.encrypt("Hello! I am Zavier. How are you?", key)
        console.log(encrypted)
        const decrypted = await EncryptJS.decrypt(encrypted, key)
        console.log(decrypted)
    }
    start()
})(EncryptJS)