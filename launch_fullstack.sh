
#!/bin/bash

# Launch Back-end
cd src/back-end
echo "Activating virtual environment..."
source myvenv/bin/activate
echo "Starting Django server..."
python manage.py runserver 8000 &


sleep 3
DJANGO_PID=$(lsof -ti:8000)

# Launch front-end
cd ..
cd ../front-end/koala_frontend
echo "Starting React server..."
npm start &
REACT_PID=$!


echo "Django PID: $DJANGO_PID"
echo "React PID: $REACT_PID"
trap 'echo "Stopping servers..."; kill -9 "$DJANGO_PID" "$REACT_PID";
exit' SIGINT
