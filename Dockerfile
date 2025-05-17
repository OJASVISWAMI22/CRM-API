# Use an official Node image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy only package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose your app port (make sure your app uses this)
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
