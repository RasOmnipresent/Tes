/*

*UPDATE PLUGINS CATEGORY DOWNLOADER*

update plugin dengan cara salin dan tempel kode dibawah dengan perintah *.sp downloader/capcut*

*/

const axios = require('axios');

async function capcut(url) {
const requestData = { url };
try {
let { data } = await axios.post('https://api.teknogram.id/v1/capcut', requestData, {
headers: {
'Content-Type': 'application/json; charset=UTF-8'
}
})

return {
status: data.status,
title: data.title,
size: data.size,
url: data.url.replace('open.', '')
};
} catch (error) {
console.error("Error:", error);
return null;
}
}

exports.run = {
usage: ['capcut'],
hidden: ['cc'],
use: 'url capcut',
category: 'downloader',
async: async (m, { func, mecha }) => {
if (!m.text) return m.reply(`Masukkan URL!\n\nContoh: *${m.cmd} https://www.capcut.com/t/Zs8YEmRmj/*`)
if (!m.args[0].includes('www.capcut.com')) return m.reply(global.mess.error.url)
mecha.sendReact(m.chat, '🕒', m.key)
let result = await capcut(m.args[0])
if (result == null) return m.reply(global.mess.error.api)
let txt = `乂  *CAPCUT DOWNLOADER*

◦ Title: ${result.title}
◦ Size: ${result.size}`
mecha.sendMedia(m.chat, result.url, m, {
caption: txt,
expiration: m.expiration
})
},
premium: true,
limit: 5
}