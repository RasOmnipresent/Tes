const cheerio = require("cheerio");

exports.run = {
  usage: ['mangasearch'],
  hidden: ['mangadetail'],
  use: 'judul manga',
  category: 'searching',
  async: async (m, { func, mecha, command }) => {
    switch (m.command) {
      case 'mangasearch': {
        if (!m.text) return m.reply(func.example(m.cmd, 'maou gakuin'));
        mecha.sendReact(m.chat, `⏱️`, m.key);

        try {
          let res = await fetch(`https://myanimelist.net/manga.php?${new URLSearchParams({ q: m.text })}`).then((v) => v.text());
          const $ = cheerio.load(res);
          const data = [];

          $("div#content").find("div.list > table > tbody").children("tr").slice(1).each((i, el) => {
            const at = $(el).find("td.ac");
            const manga = {
              title: $(el).find("strong").text().trim(),
              desc: $(el).find("div.pt4").text().trim(),
              id: $(el).find("div.picSurround > a").attr("id").replace(/sarea|[^\d]/gi, ""),
              link: $(el).find("div.picSurround > a").attr("href"),
              thumbnail: $(el).find("div.picSurround > a > img").attr("data-srcset").split(" ")[2].split("?")[0].replace(/\/r\/\d+x\d+/gi, ""),
              type: $(at).eq(0).text().trim(),
              volume: $(at).eq(1).text().trim(),
              score: $(at).eq(2).text().trim(),
              member: $(at).eq(3).text().trim() || 0,
            };
            data.push(manga);
          });

          if (data.length > 0) {
            let body ='```Result from:```' + ' `' + m.text + '`'
            let rows = [];
            data.forEach((result, index) => {
              rows.push({
                title: `${index + 1}. ${result.title}`,
                id: `${m.prefix}mangadetail ${result.id}`,
                description: `• Type: ${result.type}\n• Volume: ${result.volume}\n• Score: ${result.score}\n• Members: ${result.member}`
              });
            });

            let sections = [{
              title: 'PILIH MANGA DIBAWAH',
              rows: rows
            }];

            let buttons = [
              ['list', 'Click Here ⎙', sections],
            ];

            mecha.sendButton(m.chat, `M A N G A • S E A R C H`, body, 'select the list button below.', buttons, m, {
              userJid: m.sender,
              expiration: m.expiration
            });

            mecha.sendMessage(m.chat, { react: { text: `☑️`, key: m.key } });
          } else {
            m.reply('Hasil pencarian tidak ditemukan.');
          }
        } catch (err) {
          console.error(err);
          m.reply(global.mess.error.api);
        }
      }
      break;
      case 'mangadetail': {
  }

    // Construct the text message with manga details
    
break;

    }
  },
  premium: true, // Hanya member premium yang dapat mengakses fitur ini
  limit: 5
};