exports.run = {
usage: ['mediafire'],
hidden: ['mfire', 'mfdl'],
use: 'link mediafire',
category: 'downloader',
async: async (m, { func, mecha }) => {
if (!m.text) return m.reply(func.example(m.cmd, 'https://www.mediafire.com/file/a61862y1tgvfiim/ZackBotMans+(+Versi+1.0.1+).zip/file'))
if (!m.args[0].includes('mediafire.com')) return m.reply(global.mess.error.url)
mecha.sendReact(m.chat, '🕒', m.key)
await func.mediafire(m.args[0]).then(async (res) => {
if (!res.status) return m.reply(global.mess.error.api)
let txt = `乂  *MEDIAFIRE DOWNLOADER*\n`
txt += `\n◦ File Name: ${res.filename}`
txt += `\n◦ File Type: ${res.filetype}`
txt += `\n◦ File Size: ${res.filesize}`
txt += `\n◦ Upload At: ${res.uploadAt}`
txt += `\n\n_Please wait media is being sent..._`
mecha.reply(m.chat, txt, m)
await mecha.sendMedia(m.chat, res.link, m, { 
caption: global.mess.ok, 
fileName: res.filename, 
expiration: m.expiration 
})
})
},
premium: true,
limit: 5
}