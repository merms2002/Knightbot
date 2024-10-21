const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const sharp = require('sharp'); // Add sharp for image processing
const settings = require('../settings');

async function stickerCommand(sock, chatId, message) {
    let mediaMessage;

    if (message.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
        const quotedMessage = message.message.extendedTextMessage.contextInfo.quotedMessage;
        mediaMessage = quotedMessage.imageMessage || quotedMessage.videoMessage;
        message = { message: quotedMessage };
    } else {
        mediaMessage = message.message?.imageMessage || message.message?.videoMessage;
    }

    if (!mediaMessage) {
        await sock.sendMessage(chatId, { text: 'عشان تعمل استيكر اعمل منشن للفيديو او للصوره اللي عايز تعملها استيكر مع الامر.' });
        return;
    }

    try {
        const mediaBuffer = await downloadMediaMessage(message, 'buffer', {}, { logger: undefined, reuploadRequest: sock.updateMediaMessage });

        if (!mediaBuffer) {
            await sock.sendMessage(chatId, { text: 'حصلت حاجه غلط ابقا جري بعدين .' });
            return;
        }

        // Convert the downloaded media to WebP format using sharp
        const stickerBuffer = await sharp(mediaBuffer)
            .resize(512, 512, { fit: 'cover' })
            .webp()
            .toBuffer();

        await sock.sendMessage(chatId, {
            sticker: stickerBuffer,
            mimetype: 'image/webp',
            packname: settings.packname,
            author: settings.author,
        });
    } catch (error) {
        console.error('Error creating sticker:', error);
        await sock.sendMessage(chatId, { text: 'حصلت حاجه غلط وانا بعمل الاستيكر جرب تاني.' });
    }
}

module.exports = stickerCommand;
