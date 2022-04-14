if ! screen -list | grep -q 'd11'; then
  echo 'd11 already killed'
  exit 1
else
  echo "killing d11"
fi
. /media/sda1/deployment/ports.sh
screen -S 'd11' -X quit
echo "Checking if d11 still alive..."
lsof -i:$d11