# Use an official Node runtime as a build image
FROM node:18 as build-stage

# Set the working directory in the container
WORKDIR /app

# Copy project files to the working directory
COPY . .

# Install dependencies and build
RUN npm install && npm run build

# Use nginx for the production environment
FROM nginx as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

