import { respondWithError, respondWithJSON } from "../json.js";
export async function handlerValidateChirp(req, res) {
    const params = req.body;
    const maxChirpsLength = 140;
    if (params.body.length > maxChirpsLength) {
        respondWithError(res, 400, "Chirp is too long");
        return;
    }
    const cleanedBody = getCleanedBody(params.body);
    respondWithJSON(res, 200, { cleanedBody: cleanedBody });
}
function getCleanedBody(body) {
    const words = body.split(" ");
    const badWords = ["kerfuffle", "sharbert", "fornax"];
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const lowerWord = word.toLowerCase();
        if (badWords.includes(lowerWord)) {
            words[i] = "****";
        }
    }
    const cleaned = words.join(" ");
    return cleaned;
}
