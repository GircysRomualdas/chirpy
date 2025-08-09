import bcrypt from "bcrypt";
export async function hashPassword(password) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}
export async function checkPasswordHash(password, hash) {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
}
