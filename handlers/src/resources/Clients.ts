import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { ApiGatewayManagementApiClient } from "@aws-sdk/client-apigatewaymanagementapi"

export const apiGatewayManagementApiClient = new ApiGatewayManagementApiClient({
    region: process.env.AWS_REGION,
    endpoint: process.env.DATA_STREAM_ENDPOINT,
})

export const dynamoDBClient = new DynamoDBClient({
    region: process.env.AWS_REGION,
})
