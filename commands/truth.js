const truths = [
    "ايه هي اكتر حاجه بتخاف منها?",
    "ايه هي اكتر حاجه كانت محرجه بالنسبالك?",
    "لو كنت تقدر تكون مخفي لمدة يوم ايه هي اول حاجه هتعملها?",
    "مين هي اول واحده حبيتها?",
    "ايه هو السر اللي عمرك ما قلته لحد?"
];

async function truthCommand(sock, chatId) {
    const randomTruth = truths[Math.floor(Math.random() * truths.length)];
    await sock.sendMessage(chatId, { text: `🔮 Truth: ${randomTruth}` });
}

module.exports = { truthCommand };
