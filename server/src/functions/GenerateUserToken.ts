export default async function generateUserToken(id: string): Promise<string> {
    // TODO replace with random number generator
    return Date.now().toString()
}
