if screen -list | grep -q "d11"; then
  echo "d11 already started"
  exit 1
else
  echo "starting d11"
fi

. /media/sda1/deployment/ports.sh

# Start node server
screen -dmS 'd11'
screen -S 'd11' -X stuff "cd vue && yarn preview\n"

echo "Checking if node started..."
lsof -i:$d11

# Build vue client
# yarn build