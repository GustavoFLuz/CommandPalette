# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

RUN npm i -g serve

# Copy the rest of the application code to the working directory
COPY . .

# Build the frontend
RUN npm run build

# Expose the port that the application will run on
EXPOSE 3000

# Start the application
CMD [ "serve", "-s", "dist" ]