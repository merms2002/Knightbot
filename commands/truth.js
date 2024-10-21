const truths = [
    "ايه هي اكتر حاجه بتخاف منها?",
    "ايه هي اكتر حاجه كانت محرجه بالنسبالك?",
    "If you could be invisible for a day, what would you do?",
    "Who was your first crush?",
    "What’s one thing you’ve never told anyone?"
];

async function truthCommand(sock, chatId) {
    const randomTruth = truths[Math.floor(Math.random() * truths.length)];
    await sock.sendMessage(chatId, { text: `🔮 Truth: ${randomTruth}` });
}

module.exports = { truthCommand };
