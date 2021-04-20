# image cơ sở, node với mini linux 
FROM node:alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json /app/
RUN yarn --silent
COPY . /app
RUN yarn build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html 
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d
EXPOSE 80
# start the nginx web server
CMD ["nginx", "-g", "daemon off;"]

