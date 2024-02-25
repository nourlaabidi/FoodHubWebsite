#Prerequisites:
        Node.js installed 
        npm installed
        MongoDB installed and running locally or on a remote server
#Getting Started:
        cd foodhub
        cd client
        cd my-app
        npm install
        cd ..
        cd ..
        cd server
        npm install nodemon
        npm install
        edit the .env file in the folder server and configure your environment variables(you need to create a project in mongodb , you can use this link "https://account.mongodb.com/account/login" and copy the url and paste it in the input field "DATABASE" bellow ):
        PORT=8000
        DATABASE= 
        SECRET=enter any secret key you want
#run the project :
        cd server 
        npm start
        cd ..
        cd foodhub
        cd client
        cd my-app
        npm start


