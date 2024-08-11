exports.run = {
usage: ['donate'],
hidden: ['donasi'],
category: 'special',
async: async (m, { mecha, fpayment }) => {
let caption = `Halo ${m.pushname}👋🏻

Kamu bisa mendukung agar bot ini tetap aktif dengan
⭝ Umobile : 601160696459

Hasil donasi akan digunakan untuk membeli *Paket Data* agar bot dapat aktif 24 jam tanpa kendala.
Berapapun donasi kamu akan sangat berarti, Terimakasih!`
mecha.sendMessage(m.chat, {
image: {
url: global.qrisUrl
}, 
caption: caption
}, {quoted: m, ephemeralExpiration: m.expiration});
}
}