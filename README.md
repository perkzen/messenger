# 💭Messenger
This is a basic messenger web chat application. Where you can send private messages to online users. For this
application is used sockets for sending messages, express for backend server with mongodb for saving data and on the
frontend I used React with Next.js for search engine optimization.

## Getting Started

First you need to install all necessary packages on the frontend and backend:

```bash
cd frontend
npm i

cd backend
npm i
```
After that create a  `.env` file in the backend folder, it should look something like this.

```dotenv
DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.oop39.mongodb.net/<collection-name>?retryWrites=true&w=majority
PORT=5000
```


 To start the application you need to run the frontend and backend server with the following commands.
```bash
cd frontend
npm dev

cd backbend
npm dev
```

If everything works correctly you should get these two outputs in your terminal windows.

For frontend:
```bash
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
event - compiled client and server successfully in 553 ms (307 modules)
```

For backend:
```bash
Server is running on port 5000
MongoDB database connection established successfully
```

## Project details
NodeJS version: 14.18.1

Express version: 4.17.2

ReactJS version: 17.0.2

Typescript version: 4.5.5

Next version: 12.0.8

### Important frontend packages
- next
- redux
- redux-saga
- redux-toolkit
- typescript
- react-hook-form
- classnames
- uuid
- sass
- react-icons
- axios
- socket.io-client
- emoji-picker-react
- @dicebear/avatars-identicon-sprites
- react-intersection-observer

### Important backend packages
- bcrypt
- cors
- express
- mongoose
- socket.io
