set -a
source .env
set +a

if [ -z "$MYSQL_ROOT_PASSWORD" ]; then
  echo 'Fill MYSQL_ROOT_PASSWORD variable in .env file'
else
  CREATE_DB='create database if not exists auth_app'

  docker exec ada_mysql \
  mysql --password="${MYSQL_ROOT_PASSWORD}" \
  -e "${CREATE_DB}"

  docker exec ada_api \
  npm run migrate
fi
