FROM node:18-slim

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies and TypeScript globally
RUN npm install -g typescript @types/node
RUN npm install

# Copy source code
COPY . .

# Install Binance API type definitions
RUN npm install --save-dev @binance/connector-typescript

# Build TypeScript code
RUN npm run build

# Expose port if needed (for HTTP server)
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production

# Start the server
CMD ["node", "build/index.js"]