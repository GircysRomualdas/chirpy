import { respondWithError, respondWithJSON } from "../json.js";
export async function handlerValidateChirp(req, res) {
    const params = req.body;
    const maxChirpsLength = 140;
    if (params.body.length > maxChirpsLength) {
        respondWithError(res, 400, "Chirp is too long");
        return;
    }
    respondWithJSON(res, 200, { valid: true });
}
