import { respondWithJSON } from "../json.js";
import { createUser } from "../db/queries/users.js";
import { BadRequestError } from "../errors.js";
export async function handlerCreateUser(req, res) {
    const params = req.body;
    if (!params.email) {
        throw new BadRequestError("Missing email");
    }
    const user = await createUser({ email: params.email });
    respondWithJSON(res, 201, {
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        email: user.email,
    });
}
