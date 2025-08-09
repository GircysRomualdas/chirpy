import { respondWithJSON } from "../json.js";
import { getUserByEmail } from "../db/queries/users.js";
import { UserNotAuthorizedError } from "../errors.js";
import { checkPasswordHash } from "../auth.js";
export async function handlerLogin(req, res) {
    const params = req.body;
    const user = await getUserByEmail(params.email);
    if (!user) {
        throw new UserNotAuthorizedError("Incorrect email or password");
    }
    const matching = await checkPasswordHash(params.password, user.hashedPassword);
    if (!matching) {
        throw new UserNotAuthorizedError("Incorrect email or password");
    }
    respondWithJSON(res, 200, {
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        email: user.email,
    });
}
