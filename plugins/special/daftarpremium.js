exports.run = {
usage: ['daftarpremium'],
hidden: ['daftarprem'],
category: 'special',
async: async (m, { func, mecha }) => {
let body = 'Jika kamu ingin menjadi Pengguna Premium, kamu cukup ketik *.addprem*, admin baik makanya gratis😁'
let txt = 'Yang Mau Donate klik dibawah😁🙏'
let button = [
['button', 'Donate', `${m.prefix}donasi`]
]
mecha.sendButton(m.chat, '', body, txt, button, m, {
userJid: m.sender,
expiration: m.expiration
})
}
}