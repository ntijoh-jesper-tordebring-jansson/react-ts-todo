#!/bin/sh

# Define the directory of the web app
API_DIR="./backend"

# Stop all running Docker containers
docker ps --format "{{.Names}}" | xargs -r docker stop
echo "Stopped all running Docker containers."

# Delete the database directory
rm -rf $HOME/docker/volumes/mariadb && echo "Removed directory $HOME/docker/volumes/mariadb"

# Close Docker Desktop application
osascript -e 'quit app "Docker"'
echo "Docker Desktop application closed."

# Check if any Docker processes are still running
if pgrep -f "Docker"; then
    echo "Some Docker processes are still running. Attempting to kill them..."
    pkill -f "Docker" && echo "All Docker processes terminated."
else
    echo "No Docker processes found."
fi

# Kill only API Node.js processes running in the Backend directory
echo "Checking for Node.js processes running in $API_DIR..."
API_PIDS=$(lsof +D "$API_DIR" 2>/dev/null | grep "node" | awk '{print $2}' | sort -u)

if [ -n "$API_PIDS" ]; then
    echo "Found Node.js processes in $API_DIR: $API_PIDS"
    echo "$API_PIDS" | xargs -r kill -9 && echo "Killed Node.js processes for the API."
else
    echo "No Node.js processes found in $API_DIR."
fi
