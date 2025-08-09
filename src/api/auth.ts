import { Request, Response } from "express";
import { respondWithJSON } from "../json.js";
import { getUserByEmail } from "../db/queries/users.js";
import { UserNotAuthorizedError, NotFoundError } from "../errors.js";
import { checkPasswordHash } from "../auth.js";

export async function handlerLogin(req: Request, res: Response) {
  type parameters = {
    email: string;
    password: string;
  };
  const params: parameters = req.body;
  const user = await getUserByEmail(params.email);
  if (!user) {
    throw new UserNotAuthorizedError("Incorrect email or password");
  }
  const matching = await checkPasswordHash(
    params.password,
    user.hashedPassword,
  );
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
