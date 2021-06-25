export default async function generateUserId(): Promise<string> {
    // TODO replace with random number generator
    return Date.now().toString()
}
