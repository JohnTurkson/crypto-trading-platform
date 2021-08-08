import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { ApiGatewayManagementApiClient } from "@aws-sdk/client-apigatewaymanagementapi"
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb"
import { SNSClient } from "@aws-sdk/client-sns"

export const apiGatewayManagementApiClient = new ApiGatewayManagementApiClient({
    region: process.env.AWS_REGION,
    endpoint: process.env.DATA_STREAM_ENDPOINT,
})

export const dynamoDBDocumentClient = DynamoDBDocument.from(
    new DynamoDBClient({
        region: process.env.AWS_REGION,
    }),
    {
        marshallOptions: {
            removeUndefinedValues: true
        }
    }
)

export const snsClient = new SNSClient({
    region: process.env.AWS_REGION!
})
