#!/bin/sh
# Inject PORT and API_URL into nginx config at container start.
# Single-quoted envsubst variable list means nginx's own $variables
# ($uri, $host, etc.) are left untouched.
set -e
PORT="${PORT:-80}"
API_URL="${API_URL:-http://api:3001}"
envsubst '${PORT} ${API_URL}' \
  < /etc/nginx/nginx.conf.template \
  > /etc/nginx/conf.d/default.conf
exec nginx -g 'daemon off;'
