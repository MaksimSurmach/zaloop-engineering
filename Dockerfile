FROM node:24-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

ARG VITE_UMAMI_WEBSITE_ID=""
ARG VITE_UMAMI_SCRIPT_URL=""
ENV VITE_UMAMI_WEBSITE_ID=${VITE_UMAMI_WEBSITE_ID}
ENV VITE_UMAMI_SCRIPT_URL=${VITE_UMAMI_SCRIPT_URL}
RUN npm run build && npm run validate:static

FROM nginx:1.29-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
USER nginx

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/healthz >/dev/null || exit 1

CMD ["nginx", "-g", "daemon off;"]
