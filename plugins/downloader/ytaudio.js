const { ytmp3, ytmp4 } = require('../../lib/youtube');

exports.run = {
    usage: ['ytaudio'],
    hidden: ['yta', 'ytmp3'],
    use: 'link youtube',
    category: 'downloader',
    async: async (m, { func, mecha, downloadMp3 }) => {
        if (!m.text) return m.reply(func.example(m.cmd, 'https://youtu.be/1fOBgosDo7s?si=fjD7OLAqD7wrzSSU'));
        if (!/^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/.test(m.text)) return m.reply(global.mess.error.url);

        mecha.ytaudio = mecha.ytaudio ? mecha.ytaudio : {};
        if (m.text in mecha.ytaudio) return m.reply("Harap tunggu, masih ada tugas yang belum terselesaikan.");

        mecha.ytaudio[m.text] = true;
        mecha.sendReact(m.chat, '🕒', m.key);

        try {
            const data = await ytmp3(m.text);
            let txt = `乂  *YOUTUBE DOWNLOADER MP3*\n`;
            txt += `\n◦  *Title:* ${data.title}`;
            txt += `\n◦  *Size:* ${data.size}`;
            txt += `\n◦  *Duration:* ${data.duration}`;
            txt += `\n◦  *Views:* ${data.views}${data.likes ? '\n◦  *Likes:* ' + data.likes : ''}${data.dislike ? '\n◦  *Dislike:* ' + data.dislike : ''}`;
            txt += `\n◦  *Channel:* ${data.channel}`;
            txt += `\n◦  *Upload Date:* ${data.uploadDate}`;

            mecha.reply(m.chat, txt, m);
            await downloadMp3(m.text);
            delete mecha.ytaudio[m.text];
        } catch (err) {
            delete mecha.ytaudio[m.text];
            m.reply(global.mess.error.api);
            mecha.reply(global.owner, "Error ytaudio: " + err, m);
        }
    },
    limit: 3
};