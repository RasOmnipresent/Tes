exports.run = {
  usage: ['sendtext'],
  hidden: [],
  use: 'text message',
  category: 'tools',
  async: async (m, { func, mecha, command }) => {
    switch (m.command) {
      //*Sumber* https://whatsapp.com/channel/0029VajrM9X1Hsq7EnAI4x0o//

case "sendtext": {
	if (!m.isRegistered) return m.reply(mess.regis);

    const commandPrefix = 'sendtext ';
    let fullText = m.text.slice(commandPrefix.length).trim(); 
    const lastSpaceIndex = fullText.lastIndexOf(' ');

    if (lastSpaceIndex === -1) {
        return m.reply('No phone number detected. Please include a valid number at the end.');
    }

    const phoneNumber = fullText.slice(lastSpaceIndex + 1).trim();
    
    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(phoneNumber)) {
        return m.reply('Invalid phone number. Please provide a valid number.');
    }

    const messageText = fullText.slice(0, lastSpaceIndex).trim();

    if (!messageText) {
        return m.reply('No text message detected. Please include a message.');
    }

    const additionalText = `*Permisi* _Ada yang ngirim pesan ke kamu lewat bot nih_\n*Ini pesannya:*`;

    const finalMessage = `${additionalText}\n\n${messageText}`;
    cha.sendMessage(phoneNumber + '@s.whatsapp.net', {
        text: finalMessage
    });
}
      break;

      // Add any other cases if needed

    }
  },
  premium: true, // Only premium members can access this feature
  limit: 5
};