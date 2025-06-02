import dotenv from "dotenv";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerBinanceSpotTools } from "./tools/binance-spot/index.js";
import { registerBinanceSimpleEarnTools } from "./tools/binance-simple-earn/index.js";
import { registerBinanceAlgoTools } from "./tools/binance-algo/index.js";
import { registerBinanceConvertTools } from "./tools/binance-convert/index.js";
import { registerBinanceC2CTradeHistoryTools } from "./tools/binance-c2c/index.js";
import { registerBinanceWalletTools } from "./tools/binance-wallet/index.js";
import { registerBinanceCopyTradingTools } from "./tools/binance-copy-trading/index.js";
import { registerBinanceFiatDepositWithdrawHistoryTools } from "./tools/binance-fiat/index.js";
import { registerBinanceNFTTools } from "./tools/binance-nft/index.js";
import { registerBinancePayTools } from "./tools/binance-pay/index.js";
import { registerBinanceRebateTools } from "./tools/binance-rebate/index.js";
import { registerBinanceDualInvestmentTools } from "./tools/binance-dual-investment/index.js";
import { registerBinanceMiningTools } from "./tools/binance-mining/index.js";
import { registerBinanceVipLoanTools } from "./tools/binance-vip-loan/index.js";
import { registerBinanceStakingTools } from "./tools/binance-staking/index.js";
import { registerHealthCheck } from "./health.js";
// Load environment variables
dotenv.config();

// Main server entry
export async function main() {
    const server = new McpServer({
        name: "binance-mcp",
        version: "1.0.0"
    });

    // Register health check
    registerHealthCheck(server);

    // Register all tools
    registerBinanceSpotTools(server);
    registerBinanceAlgoTools(server);
    registerBinanceSimpleEarnTools(server);
    registerBinanceC2CTradeHistoryTools(server);
    registerBinanceConvertTools(server);
    registerBinanceWalletTools(server);
    registerBinanceCopyTradingTools(server);
    registerBinanceFiatDepositWithdrawHistoryTools(server);
    registerBinanceNFTTools(server);
    registerBinancePayTools(server);
    registerBinanceRebateTools(server);
    registerBinanceDualInvestmentTools(server);
    registerBinanceMiningTools(server);
    registerBinanceVipLoanTools(server);
    registerBinanceStakingTools(server);

    const transport = new StdioServerTransport();
    await server.connect(transport);
}
main();
