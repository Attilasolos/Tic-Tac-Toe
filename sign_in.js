import fs from 'fs-js'
import crypto from 'crypto-js'

function newProfile() {
    const username = document.getElementById("name");
    const password = document.getElementById("password");
    hash = crypto.getHashes()
    hashPwd = crypto.createHash('sha1').update(password.value).digest('hex')
    fs.writeFile('userData.csv', username.value, ";", hashPwd)
    console.log("file updated")
}