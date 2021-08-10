import { Buffer } from "buffer"
import * as crypto from "crypto"
import bcrypt from "bcryptjs"
import { UserCredentials } from "../../../server/src/data/UserCredentials"

export function getEventBody(event: any): any {
    if (event.isBase64Encoded) {
        return JSON.parse(Buffer.from(event.body, "base64").toString())
    } else {
        return JSON.parse(event.body)
    }
}

export function generateId(): string {
    return crypto.randomBytes(16).toString("hex")
}

export async function generatePasswordHash(password: string, rounds: number = 10): Promise<string> {
    return bcrypt.genSalt(rounds).then(salt => bcrypt.hash(password, salt))
}

export async function verifyUserPassword(
    credentials: UserCredentials,
    password: string
): Promise<boolean> {
    return bcrypt.compare(password, credentials.password)
}

export function generateConditionExpression(
    expressionAttributeName: string,
    comparison: string,
    expressionAttributeValueName: string,
    expressionAttributeValue: string | undefined
): string {
    if (expressionAttributeValue !== undefined) {
        return `${expressionAttributeName} ${comparison} ${expressionAttributeValueName}`
    } else {
        return `attribute_not_exists(${expressionAttributeName})`
    }
}
