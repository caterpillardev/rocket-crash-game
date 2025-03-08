# Use the official Node.js image
FROM node:16

# Create and change to the app directory.
WORKDIR /user/src/app

# Install and dependencies.
COPY package*.json ./
RUN npm install

# Copy app source code.
COPY . .

# Build the app
RUN npm run build

# Specify the command to run the app.
CMD [ "node", "dist/bundle.js" ]

# Expose the port the app runs on.
EXPOSE 4000