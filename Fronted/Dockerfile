# Step 1: Build Stage
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install the dependencies
RUN npm install --force

# Copy the rest of the application code into the container
COPY . .

# Build the Angular application
RUN npm run build --prod

# Step 2: Production Stage
FROM nginx:alpine

# Copy the built Angular app from the build stage to the Nginx html directory
COPY --from=build /app/dist/cliente/ /usr/share/nginx/html


# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

ENV PORT=8000

# Expose port 80
EXPOSE 8000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
