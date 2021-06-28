import bcrypt from "bcryptjs"

export default async function generatePasswordHash(password: string, rounds: number = 10): Promise<string> {
    return bcrypt.genSalt(rounds).then(salt => bcrypt.hash(password, salt))
}
