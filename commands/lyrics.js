const axios = require('axios');

async function lyricsCommand(sock, chatId, songTitle) {
    if (!songTitle) {
        await sock.sendMessage(chatId, { text: 'اديني اسم للاغنيه وهجيبهالك!' });
        return;
    }

    try {
        const response = await axios.get(`https://api.lyrics.ovh/v1/${songTitle}`);
        const lyrics = response.data.lyrics || 'Lyrics not found.';

        await sock.sendMessage(chatId, { text: `🎶 *${songTitle}* 🎶\n\n${lyrics}` });
    } catch (error) {
        await sock.sendMessage(chatId, { text: 'An error occurred while fetching the lyrics.' });
    }
}

module.exports = { lyricsCommand };
