FROM node:latest as builder
WORKDIR /app
COPY . .
COPY package*.json ./
RUN npm install
RUN npm run build

FROM nginx:latest
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]