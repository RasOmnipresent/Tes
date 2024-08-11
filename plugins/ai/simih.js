const axios = require('axios');

exports.run = {
usage: ['simi'],
hidden: ['simih'],
use: 'question',
category: 'ai',
async: async (m, { func, mecha }) => {
if (!m.text) return m.reply(func.example(m.cmd, 'halo'))
await mecha.sendReact(m.chat, '🕒', m.key)
let messageId = 'BAE5' + func.makeid(8).toUpperCase() + 'SIMI'
try {
let response = await chatWithSimi(m.text);
mecha.sendMessage(m.chat, {text: `${response}`}, {quoted: m, ephemeralExpiration: m.expiration, messageId: messageId});
await mecha.sendReact(m.chat, '✅', m.key)
} catch (e) {
mecha.sendReact(m.chat, '❌', m.key)
}
},
main: async (m, { func, mecha }) => {
if (m.budy && m.quoted && m.quoted.fromMe && m.quoted.id.endsWith('SIMI') && !m.isPrefix) {
await mecha.sendReact(m.chat, '🕒', m.key)
let messageId = 'BAE5' + func.makeid(8).toUpperCase() + 'SIMI'
try {
let response = await chatWithSimi(m.budy);
mecha.sendMessage(m.chat, {text: `${response}`}, {quoted: m, ephemeralExpiration: m.expiration, messageId: messageId});
global.db.users[m.sender].limit -= 1
await mecha.sendReact(m.chat, '✅', m.key)
} catch (e) {
mecha.sendReact(m.chat, '❌', m.key)
}
}
},
limit: true
}

async function chatWithSimi(text) {
try {
const response = await axios.post('https://simsimi.vn/web/simtalk', `text=${encodeURIComponent(text)}&lc=id`, {
headers: {
'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
Accept: 'application/json, text/javascript, */*; q=0.01',
'X-Requested-With': 'XMLHttpRequest',
'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36',
Referer: 'https://simsimi.vn/'
}
});
return response.data.success;
} catch (error) {
console.error('Error asking SimSimi:', error);
throw error;
}
}