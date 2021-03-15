LOG_FILE=logfile.log
LIGHT_GREEN='\033[1;32m'
RED='\033[0;31m'
NO_COLOUR='\033[0m'

# Clear log file
>${LOG_FILE}

# Log everything by default
exec 3>&1 1>>${LOG_FILE} 2>&1

function createNetwork() {
  docker network create $1
}

function getNetwork() {
  docker network inspect $1
}

# function startApi() {
#   echo "Starting api..." | tee /dev/fd/3
#   docker stop blog-api || true && docker rm blog-api || true
#   docker run -dp 1337:1337 --network ${superNetwork} --network-alias blog-api --name blog-api gcharis/blog-api
# }

function startBackend() {
  docker-compose up -d | tee /dev/fd/3
}

function confirmApi() {
  # Wait for the api to be functional
  retries=0
  while ! curl "http://localhost:1337"; do
    sleep 2
    retries=$((retries + 1))

    if ((retries > 10)); then
      echo -e "${RED}Something went wrong with the api. ${NO_COLOUR}" | tee /dev/fd/3
      exit 125
    fi
  done
}

function buildApp() {
  dockerfile=""
  if [[ $1 == "dev" ]]; then
    dockerfile="Dockerfile.dev"
  else
    dockerfile="Dockerfile.prod"
  fi

  echo -e "${RED}$1${NO_COLOUR}: Building next app..." | tee /dev/fd/3
  docker build --network host -t gcharis/react2react -f ${dockerfile} .
  echo -e "${LIGHT_GREEN}App built successfully!${NO_COLOUR}" | tee /dev/fd/3
  echo -e "${LIGHT_GREEN}Api started successfully!${NO_COLOUR}" | tee /dev/fd/3
}

function startApp() {
  echo "Starting next app" | tee /dev/fd/3
  docker stop react2react || true && docker rm react2react || true
  docker run -e INTERNAL_API_HOST=superapi -dp 3000:3000 --network ${superNetwork} --name react2react gcharis/react2react

  echo -e "${LIGHT_GREEN}App started successfully!${NO_COLOUR}" | tee /dev/fd/3
}

env=$1

superNetwork="react2react-backend"

if (getNetwork ${superNetwork}); then
  echo -e "${LIGHT_GREEN}network ${superNetwork} is ok!${NO_COLOUR}" | tee /dev/fd/3
else
  echo "creating network ${superNetwork}..." | tee /dev/fd/3
  createNetwork ${superNetwork}
  echo -e "${LIGHT_GREEN}network ${superNetwork} is ok!${NO_COLOUR}" | tee /dev/fd/3
fi

# startApi
startBackend
confirmApi

buildApp ${env}
startApp
