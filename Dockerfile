FROM node:24-alpine

RUN apk add --no-cache nginx

WORKDIR /app

COPY package*.json ./
RUN npm i && npm i -g pm2

COPY . .

RUN npx prisma generate
RUN npm run build
RUN mkdir -p /run/nginx

ENV PORT=3000
# Producao: se quiser identificar o host esperado no container, voce pode adicionar:
# ENV APP_DOMAIN=time-trace-api.systemnear.com

COPY nginx.conf /etc/nginx/http.d/default.conf
COPY ecosystem.config.cjs /app/ecosystem.config.cjs

EXPOSE 80
# Producao com HTTPS no dominio https://time-trace-api.systemnear.com:
# publique o container atras de um proxy/load balancer com TLS e mapeie 80 do host -> 80 do container,
# ou 443 do host -> 80 do container se o TLS terminar fora do container.
# Para reiniciar o container automaticamente se ele inteiro cair, use tambem:
# docker run -d --name time-trace-api --restart unless-stopped -p 8000:80 --env-file .env time-trace-api

CMD ["sh", "-c", "npx prisma db push && nginx && exec pm2-runtime /app/ecosystem.config.cjs"]
