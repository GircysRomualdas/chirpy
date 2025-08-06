import { respondWithJSON } from "../json.js";
import { BadRequestError } from "../errors.js";
export async function handlerValidateChirp(req, res) {
    const params = req.body;
    const maxChirpLength = 140;
    if (params.body.length > maxChirpLength) {
        throw new BadRequestError(`Chirp is too long. Max length is ${maxChirpLength}`);
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
