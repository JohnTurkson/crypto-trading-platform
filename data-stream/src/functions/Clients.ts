import { ApiGatewayManagementApiClient } from "@aws-sdk/client-apigatewaymanagementapi"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"

export const apiGatewayManagementApiClient = new ApiGatewayManagementApiClient({
    region: "us-west-2",
    endpoint: process.env.DATA_STREAM_ENDPOINT
})

export const dynamoDBClient = new DynamoDBClient({
    region: "us-west-2"
})
