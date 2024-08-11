const fetch = require('node-fetch');

exports.run = {
usage: ['rules'],
hidden: ['rulesbot'],
category: 'special',
async: async (m, { mecha, setting }) => {
let id = `乂  *PERATURAN ${global.botName.toUpperCase()}*

1. Data pengguna, grup, dan obrolan akan dihapus secara otomatis jika tidak ada aktivitas yang terdeteksi selama 7 hari (alasan: pembersihan database).

2. Pengguna gratis mendapatkan ${setting.limit} limit / hari dan akan direset jam 12 malam. Untuk mendapatkan premium tinggal ketik *.addprem*

3. Jangan spam, jeda setiap penggunaan perintah selama 1 detik.

4. Jangan melakukan panggilan suara atau video (Telepon & Video Call), jika Anda melakukannya akan diblokir.

5. Jangan toxic kepada bot karena kalian akan mendapatkan sanksi berupa banned dan blokir. Bawa banyak bersabar nama juga bot free kalo ada error yah tinggal report owner, kalo ga suka beli aja bot punya orang.


6. Jika ingin membuka blokir dan banned, chat owner

7. Pelaku spam akan dibanned secara permanen

8. Semua Syarat & Ketentuan dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya.`

let en = `乂  *RULES ${global.botName.toUpperCase()}*

1. User, group and chat data will be automatically deleted if no activity is detected for 7 days (reason: database cleanup). 

2. Free users get ${setting.limit} limit / day and it will be reset at 12pm. To get premium, just type *.addprem* 

3. Don't spam, pause each command use for 1 second. 

4. Don't make voice or video calls (Phone & Video Call), if you do it will be blocked.

5. Don't be toxic to bots because you will get sanctions in the form of being banned and blocked. Be patient, as this is a free bot service. If there are any errors, please report them to the owner. If you are not satisfied, consider buying the boat from someone else.

6. If you want to unblock and ban, chat with the owner 

7. Spammers will be banned permanently

8. All Terms & Conditions may change at any time without prior notice.`
const rules = m.sender.startsWith('60') ? id : en;
mecha.sendMessageModify(m.chat, rules, m, {
title: global.header,
body: global.footer,
thumbnail: await (await fetch(setting.cover)).buffer(),
largeThumb: true, 
expiration: m.expiration
})
}
}