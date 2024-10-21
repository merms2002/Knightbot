async function sayGoodbye(sock, chatId, removedMembers) {
    let goodbyeText = 'Goodbye ';
    removedMembers.forEach((member) => {
        goodbyeText += `@${member.split('@')[0]} `;
    });
    goodbyeText += '👋 غور في داهيه تمشي يجي مكانك طابور';

    await sock.sendMessage(chatId, {
        text: goodbyeText,
        mentions: removedMembers
    });
}

module.exports = sayGoodbye;
