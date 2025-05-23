// src/tools/binance-staking/SOL-staking-api/getBoostRewardsHistory.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { stakingClient } from "../../../config/binanceClient.js";
import { z } from "zod";

export function registerBinanceGetBoostRewardsHistory(server: McpServer) {
    server.tool(
        "BinanceGetBoostRewardsHistory",
        "Get Boost Rewards History API allows users to retrieve their boost rewards history for staking activities. This includes the amount of rewards received, the token type (e.g., SOL), and the status of the rewards (e.g., CLAIM or DISTRIBUTE).",
        {
            type: z
                .enum(["CLAIM", "DISTRIBUTE"])
                .default("CLAIM")
                .describe('Type of action. Must be "CLAIM" or "DISTRIBUTE". Default: "CLAIM"'),
            startTime: z.number().int().optional().describe("Start time in milliseconds (optional)"),
            endTime: z.number().int().optional().describe("End time in milliseconds (optional)"),
            current: z
                .number()
                .int()
                .min(1)
                .default(1)
                .optional()
                .describe("Currently querying page. Start from 1. Default: 1"),
            size: z
                .number()
                .int()
                .min(1)
                .max(100)
                .default(10)
                .optional()
                .describe("Number of results per page. Default: 10, Max: 100"),
            recvWindow: z.number().int().optional().describe("Time window for request validity")
        },
        async (params) => {
            try {
                const response = await stakingClient.restAPI.getBoostRewardsHistory({
                    type: params.type,
                    ...(params.startTime !== undefined && { startTime: params.startTime }),
                    ...(params.endTime !== undefined && { endTime: params.endTime }),
                    ...(params.current !== undefined && { current: params.current }),
                    ...(params.size !== undefined && { size: params.size }),
                    ...(params.recvWindow !== undefined && { recvWindow: params.recvWindow })
                });
                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Successfully retrieved boost rewards history for staking activities. Response: ${JSON.stringify(
                                data
                            )}`
                        }
                    ]
                };
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                return {
                    content: [
                        {
                            type: "text",
                            text: `Failed to retrieve boost rewards history for staking activities. ${errorMessage}`
                        }
                    ],
                    isError: true
                };
            }
        }
    );
}
