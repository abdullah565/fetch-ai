FROM node:14 AS builder
WORKDIR "/fetch_ai"
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 80
COPY --from=builder /fetch_ai/build /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf
CMD ["nginx","-g","daemon off;"]
