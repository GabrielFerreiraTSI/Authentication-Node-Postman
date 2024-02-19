# Authentication-Node-Postman
 Testing the user authentication in Postman.

## Node js commands
Check first that all the folders and files are downloaded or copied in your project.
### Search folder
- cd backend
### Start project
- npm init -y

Important: It's necessary first initialize the file 'package.json' typing this command. Because the installs will be controlled by this file without vulnerabilities.
### Install dependencies
- npm i express
- npm i bcrypt
- npm i pg
- npm i dotenv
- npm i nodemon
### Install eslintrc.json
- npx eslint --init
### Run project
- npm run start
- node src/sever.js

Important: When this command is executed, you will have to answer some asks about your project. Remember, in this project we aren't using Vue, React or Typescript.

## Using Postman
Postman is a API REST application that makes the request to the URL where the server is running. Each request that is sent to the server, will return a response in JSON as a result of the entire operation. Requests can be sent using the GET, POST, PUT, DELETE and PATCH methods.

To sign in Postman, you need create or log your account to open this app, also necessary Internet acess to work. 

To start test your project, you should create a new tab to send a request according with corresponding method. Notice that below the URL field there are seven tabs. Click on tab 'Body', select the option 'raw' and then select the JSON language to request the data. 

Requesting the corresponding data, you need to check the database connection before. In this project we are using Postgre SQL, a liitle more different from MySQL we are already used to, but with the same SQL syntax. If you already did the connection, can test your project without difficulties.

However, we are requesting the data in JSON, so type a corresponding variable and the corresponding value in this way: {"email": "example@gmail.com", "password": "examplepassword"}. Click on button SEND to request the data and wait the server response.

## End
If you want make this project compatible with navigator, remember, the GET method send a request by navigator URL, and the POST method, executed by data send from forms. Also needs EJS to render the HTML when you request the URL on navigator, or send the data from forms.

Good practicing!