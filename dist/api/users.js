import { respondWithJSON } from "../json.js";
import { createUser } from "../db/queries/users.js";
import { BadRequestError } from "../errors.js";
import { hashPassword } from "../auth.js";
export async function handlerCreateUser(req, res) {
    const params = req.body;
    if (!params.email) {
        throw new BadRequestError("Missing email");
    }
    const hashedPassword = await hashPassword(params.password);
    const user = await createUser({
        email: params.email,
        hashedPassword: hashedPassword,
    });
    respondWithJSON(res, 201, {
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        email: user.email,
    });
}
