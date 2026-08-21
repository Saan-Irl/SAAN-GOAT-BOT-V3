const axios = require("axios");

module.exports = {
    config: {
        name: "quiz",
        aliases: ["qz"],
        version: "0.0.7",
        author: "Siam Ahmed Saan",
        role: 0,
        category: "game",
    },

    onStart: async function ({ api, event, usersData }) {
        try {
            if (!global.GoatBot.onReply) global.GoatBot.onReply = new Map();

            const quizApi = "https://azadx69x-all-apis-top.vercel.app/api/quiz";
            const q = (await axios.get(quizApi)).data.data;

            const options = {
                A: q.options[0].slice(3),
                B: q.options[1].slice(3),
                C: q.options[2].slice(3),
                D: q.options[3].slice(3)
            };

            const quizMsg = `╭──❖  𝐐𝐔𝐈𝐙 𝐆𝐀𝐌𝐄  ❖──╮
😺 𝑸𝒖𝒆𝒔𝒕𝒊𝒐𝐧: ${q.question}

🅐 𝐎𝐩𝐭𝐢𝐨𝐧: ${options.A}
🅑 𝐎𝐩𝐭𝐢𝐨𝐧: ${options.B}
🅒 𝐎𝐩𝐭𝐢𝐨𝐧: ${options.C}
🅓 𝐎𝐩𝐭𝐢𝐨𝐧: ${options.D}

────────────────
📝 𝑹𝒆𝒑𝒍𝒚 𝒘𝒊𝒕𝒉 𝐀, 𝐁, 𝐂 𝒐𝐫 𝐃`;

            api.sendMessage(quizMsg, event.threadID, (err, info) => {
                global.GoatBot.onReply.set(info.messageID, {
                    type: "reply",
                    commandName: this.config.name,
                    author: event.senderID,
                    messageID: info.messageID,
                    correctAnswer: q.answer.toUpperCase()
                });

                setTimeout(() => {
                    try { api.unsendMessage(info.messageID); } catch {}
                    global.GoatBot.onReply.delete(info.messageID);
                }, 40000);
            }, event.messageID);

        } catch (error) {
            api.sendMessage(`❌ 𝐄𝐫𝐫𝐨𝐫: ${error.message}`, event.threadID, event.messageID);
        }
    },

    onReply: async function ({ api, event, Reply, usersData }) {
        if (!Reply) return;

        const { correctAnswer, author } = Reply;
      
        if (event.senderID !== author)
            return api.sendMessage(
                "🐸 𝐄𝐢𝐝𝐚 𝐭𝐦𝐫 𝐪𝐮𝐢𝐳 𝐧𝐚 𝐛𝐚𝐛𝐲, 𝐜𝐡𝐮𝐝𝐥𝐢𝐧𝐠 𝐩𝐨𝐧𝐠",
                event.threadID,
                event.messageID
            );

        const userReply = event.body.trim().toUpperCase();
      
        if (!["A", "B", "C", "D"].includes(userReply))
            return api.sendMessage(
                "❌ 𝐑𝐞𝐩𝐥𝐲 𝐨𝐧𝐥𝐲 𝐀, 𝐁, 𝐂 𝐨𝐫 𝐃!",
                event.threadID,
                event.messageID
            );

        const userData = await usersData.get(author);
        const rewardCoins = 500;
        const rewardExp = 121;

        try { await api.unsendMessage(Reply.messageID); } catch {}
        global.GoatBot.onReply.delete(Reply.messageID);

        if (userReply === correctAnswer.toUpperCase()) {
            await usersData.set(author, {
                money: userData.money + rewardCoins,
                exp: userData.exp + rewardExp,
                data: userData.data
            });

            return api.sendMessage(
                `✅ 𝐂𝐨𝐫𝐫𝐞𝐜𝐭 𝐀𝐧𝐬𝐰𝐞𝐫!\n🎁 +${rewardCoins} 𝐂𝐨𝐢𝐧𝐬\n⭐ +${rewardExp} 𝐄𝐗𝐏`,
                event.threadID,
                event.messageID
            );
        } else {
            return api.sendMessage(
                `💔 𝐍𝐨𝐩𝐞, 𝐭𝐡𝐚𝐭’𝐬 𝐰𝐫𝐨𝐧𝐠!\n✔ 𝐑𝐢𝐠𝐡𝐭 𝐀𝐧𝐬𝐰𝐞𝐫: ${correctAnswer}`,
                event.threadID,
                event.messageID
            );
        }
    }
};
