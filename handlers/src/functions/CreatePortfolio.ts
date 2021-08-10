import { generateId, getEventBody } from "../resources/Utils"
import { dynamoDBDocumentClient } from "../resources/Clients"
import { CreatePortfolioResponse } from "../../../server/src/responses/CreatePortfolioResponse"

export async function handler(event: any): Promise<CreatePortfolioResponse> {
    const request = getEventBody(event)
    
    const portfolio = {
        id: generateId(),
        user: request.user,
        name: request.name
    }
    
    await dynamoDBDocumentClient.put({
        TableName: "CryptoPortfolios",
        Item: portfolio
    })
    
    return portfolio
}
