
#!/bin/bash

# Launch Back-end
cd src/back-end/

VENV_NAME="venv"

# Check if the virtual environment already exists
if [ ! -d "$VENV_NAME" ]; then
    python3 -m venv $VENV_NAME
fi
sleep 3
source $VENV_NAME/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
echo "Setup is complete and the virtual environment '$VENV_NAME' is activated."
echo "Starting Django server..."
python manage.py runserver 8000 &


sleep 3
DJANGO_PID=$(lsof -ti:8000)

# Launch front-end
cd ..
cd front-end/
echo "Starting React server..."
npm install --legacy-peer-deps
npm start &
REACT_PID=$!


echo "Django PID: $DJANGO_PID"
echo "React PID: $REACT_PID"
trap 'echo "Stopping servers..."; kill -9 "$DJANGO_PID" "$REACT_PID"; exit' SIGINT

# Wait for processes to exit
wait "$DJANGO_PID" "$REACT_PID"