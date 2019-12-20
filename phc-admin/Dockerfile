FROM node:10-alpine as builder

COPY package.json package-lock.json ./

RUN npm ci && mkdir /ng-app && mv ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

RUN npm run build

RUN ls dist/phc-admin/

FROM nginx:1.14.1-alpine

COPY nginx/default.conf /etc/nginx/conf.d/

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /ng-app/dist/phc-admin /usr/share/nginx/html

RUN chmod -R 777 /var/run
RUN chmod -R 777 /etc/nginx/
RUN chmod -R 777 /var/cache/nginx

EXPOSE 8080

CMD ["nginx" ,"-g", "daemon off;"]