function createNetwork () {
  docker network create $1 > logfile.log
}

function getNetwork (){
  docker network inspect $1 > logfile.log
}

superNetwork="react2react"

if (getNetwork ${superNetwork}); then
  echo "network ${superNetwork} is on"
else
  echo "creating network ${superNetwork}..."
  createNetwork ${superNetwork}
fi

echo "Stopping strapi-blog..."
docker stop strapi-blog > logfile.log || true && docker rm strapi-blog > logfile.log || true

echo "Starting strapi-blog..."
docker run -dp 1337:1337 --network ${superNetwork} --network-alias charis-blog --name strapi-blog strapi-blog

retries=0
while ! curl "http://localhost:1337" > logfile.log
do 
  echo "welp"
  sleep 2
  retries=$((retries+1))

  if ((retries > 10)); then
    echo "Something went wrong with the api!"
    exit 125
  fi
done

echo "strapi-blog started!"

echo "Building next app..."

docker build -t gcharis/react2react .

echo "Stopping existing next app"
docker stop react2react > logfile.log || true && docker rm react2react > logfile.log || true

echo "Starting next app"
docker run -e API_HOST=charis-blog -dp 3000:3000 --network ${superNetwork} --name react2react gcharis/react2react
