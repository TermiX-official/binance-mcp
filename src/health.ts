import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerHealthCheck(server: McpServer) {
    server.tool(
        "health",
        "Check if the server is running",
        {},
        async () => {
            return {
                content: [
                    { type: "text", text: "Server is running" }
                ]
            };
        }
    );
}