LOG_FILE=logfile.log
LIGHT_GREEN='\033[1;32m'
RED='\033[0;31m'
NO_COLOUR='\033[0m'

# Clear log file
> ${LOG_FILE}

# Log everything by default
exec 3>&1 1>>${LOG_FILE} 2>&1

function createNetwork () {
  docker network create $1
}

function getNetwork (){
  docker network inspect $1
}

superNetwork="react2react"

if (getNetwork ${superNetwork}); then
  echo -e "${LIGHT_GREEN}network ${superNetwork} is ok!${NO_COLOUR}" | tee /dev/fd/3
else
  echo "creating network ${superNetwork}..." | tee /dev/fd/3
  createNetwork ${superNetwork} 
  echo -e "${LIGHT_GREEN}network ${superNetwork} is ok!${NO_COLOUR}" | tee /dev/fd/3
fi

echo "Starting api..." | tee /dev/fd/3
docker stop strapi-blog || true && docker rm strapi-blog || true
docker run -dp 1337:1337 --network ${superNetwork} --network-alias charis-blog --name strapi-blog strapi-blog

# Wait for the api to be functional
retries=0
while ! curl "http://localhost:1337"
do 
  echo "welp"
  sleep 2
  retries=$((retries+1))

  if ((retries > 10)); then
    echo -e "${RED}Something went wrong with the api. ${NO_COLOUR}"
    exit 125
  fi
done

echo -e "${LIGHT_GREEN}Api started successfully!${NO_COLOUR}" | tee /dev/fd/3

echo "Building next app..." | tee /dev/fd/3
docker build --network host -t gcharis/react2react .
echo -e "${LIGHT_GREEN}App built successfully!${NO_COLOUR}" | tee /dev/fd/3

echo "Starting next app" | tee /dev/fd/3
docker stop react2react || true && docker rm react2react || true
docker run -e API_HOST=charis-blog -dp 3000:3000 --network ${superNetwork} --name react2react gcharis/react2react
echo -e "${LIGHT_GREEN}App started successfully!${NO_COLOUR}" | tee /dev/fd/3

