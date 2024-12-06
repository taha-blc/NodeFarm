// ! javascriptle dosya okuma

const fs = require('fs')
const textIn = fs.readFileSync('./inputs/yazi.txt', 'utf-8')
console.log(textIn)

const textOut = `This is what we know about the avacado: ${textIn}\nCreated on :${Date.now()}`
console.log(textOut)

/* !  dosya oluşturma */ fs.writeFileSync('./inputs/olusturulan.txt', textOut)

console.log('file written')