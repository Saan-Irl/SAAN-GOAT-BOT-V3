const fs = require("fs-extra");
const request = require("request");
const path = require("path");

module.exports = {
  config: {
    name: "owner",
    aliases: ["info"],
    version: "1.3.0",
    author: "Siam Ahmed Saan",
    role: 0,
    shortDescription: "Owner information with image",
    category: "Information",
    guide: {
      en: "owner"
    }
  },

  onStart: async function ({ api, event }) {
    const ownerText = 
`╭─ 👑 Oᴡɴᴇʀ Iɴғᴏ 👑 ─╮
│ 👤 Nᴀᴍᴇ       : 𝗦𝗶𝗮𝗺 𝗔𝗵𝗺𝗲𝗱 𝗦𝗮𝗮𝗻 
│ 🦋 Nɪᴄᴋ       : 𝗦𝗮𝗮𝗻 𝗘𝘅𝗵𝗮𝘂𝘀𝘁𝗲𝗱 
│ 🎂 Aɢᴇ        : ?23+
│ 💘 Rᴇʟᴀᴛɪᴏɴ : Stfu
│ 🎓 Pʀᴏғᴇssɪᴏɴ : 𝗦𝘁𝘂𝗱𝗲𝗻𝘁
│ 📚 Eᴅᴜᴄᴀᴛɪᴏɴ : 𝗨𝗻𝗱𝗲𝗿𝗴𝗿𝗮𝗱𝘂𝗮𝘁𝗲 𝗥𝗲𝘀𝗲𝗮𝗿𝗰𝗵 𝗘𝗻𝘁𝗵𝘂𝘀𝗶𝗮𝘀𝘁 • 𝗡𝗼𝗿𝘁𝗵 𝗦𝗼𝘂𝘁𝗵 𝗨𝗻𝗶𝘃𝗲𝗿𝘀𝗶𝘁𝘆
│ 🏡 Lᴏᴄᴀᴛɪᴏɴ : Gulshan rd 133,Dhaka Bangladesh 
├─ 🔗 Cᴏɴᴛᴀᴄᴛ ─╮
│ 📘 Facebook  :  id=100075454605535
│ 💬 Messenger: id=100075454605535
│ 📞 WhatsApp  : 01898747***
╰────────────────╯`;

    const cacheDir = path.join(__dirname, "cache");
    const imgPath = path.join(cacheDir, "owner.jpg");

    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

    const imgLink = "https://i.imgur.com/gyVwtoC.gif";

    const send = () => {
      api.sendMessage(
        {
          body: ownerText,
          attachment: fs.createReadStream(imgPath)
        },
        event.threadID,
        () => fs.unlinkSync(imgPath),
        event.messageID
      );
    };

    request(encodeURI(imgLink))
      .pipe(fs.createWriteStream(imgPath))
      .on("close", send)
  }
};
