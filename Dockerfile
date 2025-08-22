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
CMD ["node", "index.js"]RKDIR /app

# Copy package files
COPY server/package*.json ./

# Install dependencies
RUN npm install

# Copy server files
COPY server/ ./

# Expose the port
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
