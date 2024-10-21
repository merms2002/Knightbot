const isAdmin = require('../helpers/isAdmin');

async function kickCommand(sock, chatId, senderId, mentionedJidList, replyMessage) {
    const { isSenderAdmin, isBotAdmin } = await isAdmin(sock, chatId, senderId);

    if (!isBotAdmin) {
        await sock.sendMessage(chatId, { text: 'Please make the bot an admin first.' });
        return;
    }

    if (!isSenderAdmin) {
        await sock.sendMessage(chatId, { text: 'الادمن بس يقدر يستخدم الامر ده وبطل لعب.' });
        return;
    }

    // If the command was a reply to a user
    if (replyMessage && replyMessage.participant) {
        const userToKick = replyMessage.participant;
        await sock.groupParticipantsUpdate(chatId, [userToKick], 'remove');
        await sock.sendMessage(chatId, { text: 'تم طرد العضو من الجروب 👍🏻.' });
        return;
    }

    // If the command mentioned users
    if (mentionedJidList.length > 0) {
        console.log(`Mentioned users to kick: ${mentionedJidList}`);  // Debugging log
        await sock.groupParticipantsUpdate(chatId, mentionedJidList, 'remove');
        await sock.sendMessage(chatId, { text: 'User(s) تم طرده من الجروب.' });
    } else {
        await sock.sendMessage(chatId, { text: 'اعمل منشن للعضو اللي عايز تطرده.' });
    }
}

module.exports = kickCommand;
