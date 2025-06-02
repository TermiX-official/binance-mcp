FROM node:18-slim

# Create app directory
WORKDIR /usr/src/app

RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build TypeScript code
RUN npm run build

# Expose port if needed (for HTTP server)
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production

# Start the server
CMD ["node", "build/index.js"]