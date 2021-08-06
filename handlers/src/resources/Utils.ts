import { Buffer } from "buffer"
import * as crypto from "crypto"

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
