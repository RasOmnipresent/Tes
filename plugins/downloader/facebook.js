exports.run = {
usage: ['facebook'],
hidden: ['fbdl'],
use: 'link facebook',
category: 'downloader',
async: async (m, { func, mecha }) => {
if (!m.text) return m.reply(`Masukkan URL!\n\nContoh: *${m.cmd} https://www.facebook.com/watch/?v=1393572814172251*`)
if (!m.args[0].match(/(?:https?:\/\/(web\.|www\.|m\.)?(facebook|fb)\.(com|watch)\S+)?$/)) return m.reply(global.mess.error.url)
if (m.args[0].includes('https://l.facebook.com/l.php?u=')) return m.reply(global.mess.error.url)
mecha.sendReact(m.chat, '🕒', m.key)
await func.facebook(m.args[0]).then(async res => {
if (!res.status) return m.reply(global.mess.error.api)
let txt = res.caption ? res.caption : global.mess.ok
await mecha.sendMedia(m.chat, res.video_hd, m, { caption: txt, expiration: m.expiration });
})
},
premium: true,
limit: true
}