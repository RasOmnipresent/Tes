exports.run = {
usage: ['buylimit'],
use: 'jumlah',
category: 'games',
async: async (m, { func, mecha, setting, isPrem }) => {
if (!m.text) return m.reply(`Masukkan jumlahnya!\nContoh: ${m.cmd} 1`)
let amount = (m.args[0] || '').replace(/-/g, '')
if (isNaN(amount)) return m.reply(`Jumlah harus berupa angka!\nContoh: ${m.prefix + m.command} 1`)
let harga = isPrem ? 500 : ((global.db.users[m.sender].balance >= 1000000) ? 1500 : setting.hargalimit)
let total = Number(parseInt(amount) * harga) 
if (global.db.users[m.sender].balance < total) return m.reply(`Balance kamu tidak mencukupi untuk pembelian ini!`)
global.db.users[m.sender].limit += parseInt(amount)
global.db.users[m.sender].balance -= total
m.reply(`Membeli *${amount} limit* seharga *${func.rupiah(total)} balance*\n> sisa balance: ${func.rupiah(global.db.users[m.sender].balance)}\n> sisa limit: ${global.db.users[m.sender].limit}`)
}
}