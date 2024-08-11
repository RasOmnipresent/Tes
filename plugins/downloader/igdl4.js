// fitur igdl yang bisa lihat komentarnya

const fetch = require('node-fetch');

exports.run = {
usage: ['instagram4'],
hidden: ['igdl4', 'igc'],
use: 'link instagram',
category: 'downloader',
async: async (m, { func, mecha }) => {
if (!m.text) return m.reply(func.example(m.cmd, 'https://www.instagram.com/reel/C6F57rGrV_x/?igsh=OXJxanVpdHdiczVi'))
mecha.sendReact(m.chat, '🕒', m.key)
try {
let insta = await (await fetch(`https://api.shannmoderz.xyz/downloader/instagram?url=${m.text}`)).json()
let result = insta.result

function formatComments(comments) {
return comments.map((comment, index) => `${index + 1}. ${comment.username}\n- ${comment.comment}\n`).join('\n');
}

let caption = "- Komentar:\n\n" + formatComments(result.comments);
mecha.sendMessage(m.chat, {
video: {
url: result.videoLink
},
caption: caption
}, {quoted: m, ephemeralExpiration: m.expiration})
} catch (err) {
m.reply('masukkan query lainnya atau coba lagi nanti')
}
},
limit: true
}