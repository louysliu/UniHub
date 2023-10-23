FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy project files to the working directory
COPY . .

# Remove ./src and ./public, since they will be mounted from the host
RUN rm -rf ./src ./public

# Install dependencies
RUN npm install

# Expose port 8080
EXPOSE 8080

# Start development server
CMD ["npm", "run", "serve"]