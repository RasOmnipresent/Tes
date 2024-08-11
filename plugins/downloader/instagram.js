exports.run = {
usage: ['instagram'],
hidden: ['igdl'],
use: 'link instagram',
category: 'downloader',
async: async (m, { func, mecha }) => {
if (!m.text) return m.reply('Masukkan linknya!')
if (!m.args[0].match(/https:\/\/www.instagram.com\/(p|reel|tv)/gi)) return m.reply(`*Link salah! Perintah ini untuk mengunduh postingan ig/reel/tv, bukan untuk highlight/story!*\n\ncontoh:\n${m.cmd} https://www.instagram.com/p/BmjK1KOD_UG/?utm_medium=copy_link`)
mecha.sendReact(m.chat, '🕒', m.key)
await func.instagram(m.args[0]).then(async (res) => {
if (!res.status) return m.reply(res.message)
if (res.media.length == 0) return m.reply(res.message)
for (let i of res.media) {
await mecha.sendMedia(m.chat, i.url, m, {
caption: global.mess.ok, 
expiration: m.expiration
})
}
}).catch(_ => m.reply(global.mess.error.api))
},
premium: true,
limit: 5
}