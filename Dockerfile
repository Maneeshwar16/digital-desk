 FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY server/package*.json ./
RUN npm install --production

# Copy server files
COPY server/ ./

# Expose the port
ENV PORT=5000
EXPOSE 5000

# Start the app
CMD ["node", "index.js"]
