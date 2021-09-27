FROM node:14.15.1 as build
WORKDIR /node/release
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

FROM nginx
COPY --from=build /node/release/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]