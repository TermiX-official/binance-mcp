import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerHealthCheck(server: McpServer) {
    console.log('Registering health check endpoint...');
    server.tool(
        "health",
        "Check if the server is running",
        {},
        async () => {
            const host = process.env.HOST || '0.0.0.0';
            const port = process.env.PORT || '8080';
            console.log(`Health check requested on ${host}:${port}`);
            return {
                content: [
                    { 
                        type: "text", 
                        text: `Server running on ${host}:${port}` 
                    }
                ]
            };
        }
    );
}