# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


### Running this on uva servers

Check which gpu server can run the backend

check all ports for availability
lsof -i :5001
lsof -i: :5003
lsof -i :3000
kill -9 <pid>




In a new terminal,
ssh gjf3sa@gpusrv11 
cd /p/realai/BioXplorer/WebApp/src
conda activate BioXplorer
node server.js
In another terminal,
ssh -L 5001:localhost:5001 gjf3sa@gpusrv11 



In a new terminal,
ssh gjf3sa@gpusrv11 
cd /p/realai/BioXplorer/WebApp
conda activate BioXplorer
npm start
In a new terminal,
ssh -L 3000:localhost:3000 gjf3sa@gpusrv11 


