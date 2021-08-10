import { getEventBody } from "../resources/Utils"
import { dynamoDBDocumentClient } from "../resources/Clients"
import Asset from "../../../server/src/data/Asset"
import { ListPortfolioAssetsRequest } from "../../../server/src/requests/ListPortfolioAssetsRequest"

export async function handler(event: any) {
    const request = getEventBody(event) as ListPortfolioAssetsRequest
    
    const response = dynamoDBDocumentClient.query({
        TableName: "CryptoAssets",
        KeyConditionExpression: "#portfolio = :portfolio",
        ExpressionAttributeNames: {
            "#portfolio": "portfolio"
        },
        ExpressionAttributeValues: {
            ":portfolio": request.portfolio
        }
    })
    
    return response.then(response => response.Items ?? []) as Promise<Asset[]>
}
