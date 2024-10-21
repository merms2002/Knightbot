const isAdmin = require('../helpers/isAdmin');

async function deleteCommand(sock, chatId, message, senderId) {
    const { isSenderAdmin, isBotAdmin } = await isAdmin(sock, chatId, senderId);

    if (!isBotAdmin) {
        await sock.sendMessage(chatId, { text: 'خلي البوت ادمن الاول يحب.' });
        return;
    }

    if (!isSenderAdmin) {
        await sock.sendMessage(chatId, { text: 'الامر ده للادمن بس يحب وبطل لعب بقا😘.' });
        return;
    }

    const quotedMessage = message.message?.extendedTextMessage?.contextInfo?.stanzaId;
    const quotedParticipant = message.message?.extendedTextMessage?.contextInfo?.participant;

    if (quotedMessage) {
        await sock.sendMessage(chatId, { delete: { remoteJid: chatId, fromMe: false, id: quotedMessage, participant: quotedParticipant } });
    } else {
        await sock.sendMessage(chatId, { text: 'اعمل منشن للرساله اللي عايز تمسحها.' });
    }
}

module.exports = deleteCommand;
