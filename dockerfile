# Stage 1: Build the app
FROM node:18-alpine as builder

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy application code and build
COPY . .
RUN npm run build

# Stage 2: Run the app
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy only the build output and production dependencies
COPY package*.json ./
RUN npm install --production
COPY --from=builder /usr/src/app/dist ./dist

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]
