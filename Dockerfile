FROM node:20-alpine AS base
RUN npm i -g pnpm
FROM base AS dependencies
WORKDIR /
COPY /package.json /pnpm-lock.yaml ./
RUN pnpm install

FROM base AS build
WORKDIR /app
COPY ./ .
COPY --from=dependencies ./node_modules ./node_modules
RUN pnpm run build

# Stage 2: Serve the application from Nginx
FROM nginx:alpine
COPY --from=build /app/dist/ciri2/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
