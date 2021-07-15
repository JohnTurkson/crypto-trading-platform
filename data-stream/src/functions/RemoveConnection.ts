import {
    ApiGatewayManagementApiClient,
    ApiGatewayManagementApiClientConfig,
    PostToConnectionCommand,
    PostToConnectionCommandInput
} from "@aws-sdk/client-apigatewaymanagementapi"
import { TextEncoder } from "util"

const config: ApiGatewayManagementApiClientConfig = {
    region: "us-west-2",
    endpoint: process.env.DATA_STREAM_ENDPOINT
}
const client = new ApiGatewayManagementApiClient(config)

export async function handler(event: any) {
    const commandInput: PostToConnectionCommandInput = {
        ConnectionId: "...=",
        Data: new TextEncoder().encode("Remove Connection"),
    }
    const command = new PostToConnectionCommand(commandInput)
    await client.send(command)

    return {
        statusCode: 200,
        body: JSON.stringify(event)
    }
}
