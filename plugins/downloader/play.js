const yts = require("yt-search");

exports.run = {
usage: ['play'],
hidden: ['song'],
use: 'judul lagu',
category: 'downloader',
async: async (m, { func, mecha }) => {
if (!m.text) return m.reply(func.example(m.cmd, 'legends never die'));
mecha.sendReact(m.chat, '🕒', m.key)
try {
var search = await yts(m.text);
var convert = search.videos[0];
if (!convert) return m.reply('Video/Audio tidak ditemukan.')
if (convert.seconds >= 3600) {
return mecha.reply(m.chat, 'Video is longer than 1 hour!', m);
} else {
var audioUrl
try {
audioUrl = `https://widipe.com/downloadAudio?URL=${convert.url}&videoName=ytdl`
} catch (e) {
mecha.reply(m.chat, global.mess.wait, m)
audioUrl = `https://widipe.com/youtube?url=${convert.url}&filter=audioonly&quality=highestaudio&contenttype=audio/mpeg`
} 
let caption = `∘ ID : ${convert.videoId}`;
caption += `\n∘ Title : ${convert.title}`;
caption += `\n∘ Duration : ${convert.timestamp}`;
caption += `\n∘ Views : ${convert.views}`;
caption += `\n∘ Upload : ${convert.ago}`;
caption += `\n∘ Author : ${convert.author.name}`;
caption += `\n∘ Channel : ${convert.author.url}`;
caption += `\n∘ Video URL : ${convert.url}`;
caption += `\n∘ Description : ${convert.description}`;
caption += `\n\nPlease wait, the audio file is being sent...\n\nJika error bisa ketik .ytmp3`;
await mecha.relayMessage(m.chat, {
extendedTextMessage:{
text: caption, 
contextInfo: {
externalAdReply: {
title: "Powered by SuryaDev",
mediaType: 1,
previewType: 0,
renderLargerThumbnail: true,
thumbnailUrl: convert.image,
sourceUrl: audioUrl
}
}, mentions: [m.sender]
}}, {quoted: m, ephemeralExpiration: m.expiration}).then((key) => {
mecha.sendMessage(m.chat, {
audio: {
url: audioUrl
},
mimetype: 'audio/mpeg',
contextInfo: {
externalAdReply: {
title: convert.title,
body: global.header,
thumbnailUrl: convert.image,
sourceUrl: audioUrl,
mediaType: 1,
showAdAttribution: true,
renderLargerThumbnail: true
}
}
}, {
quoted: key,
ephemeralExpiration: m.expiration
});
})
}
} catch (e) {
mecha.reply(m.chat, String(e), m);
}
},
limit: 3
}