#!/bin/sh

# Install dependant softwares
brew update && echo "Brew Update"
brew upgrade && echo "Brew Upgrade"
brew install docker && echo "Installed Docker"
brew install node && echo "Installed Node"

# Open Docker
open -a docker && echo "Starting Docker"
until docker info > /dev/null 2>&1; do
    echo "Waiting for Docker to start..."
    sleep 0.5
done
echo "Docker is ready"

# Downloading and creating database
docker pull mariadb:11.4 && echo "Pulled MariaDB"
docker ps --filter "name=mariadb-docker" --format "{{.Names}}" | grep -q "^mariadb-docker$" && docker stop mariadb-docker && echo "Shut down all running mariadb-docker images"
rm -rf $HOME/docker/volumes/mariadb && echo "Removed directory $HOME/docker/volumes/mariadb"
mkdir -p $HOME/docker/volumes/mariadb && echo "Created new directory $HOME/docker/volumes/mariadb"
docker run --rm --name mariadb-docker -e MYSQL_ROOT_PASSWORD=mariadb -d -p 3306:3306 -v $HOME/docker/volumes/mariadb:/var/lib/mysql mariadb:11.4 && echo "Started a new mariadb-docker image"

# Creating .env file (if not already exists)
if [ ! -f ./backend/.env ]; then
  touch ./backend/.env && echo "Created the ./backend/.env file"
  echo "DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=mariadb
DB_NAME=ToDoDB" > ./backend/.env && echo "Wrote the default content of the ./backend/.env file"
else
  echo "./backend/.env file already exists, skipping creation"
fi

# Install npm packages in Backend
cd backend
npm install && echo "Installing backend npm dependencies"
cd ..

# Install npm packages in Frontend
#cd frontend
#npm install && echo "Installing frontend npm dependencies"




# echo "seeding db"

# echo -ne '\n' | dotnet run completeSeed && echo "Seed database"%