// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', (msg) => {
    //broadcast the received msg from one client to every clients
      const {username, content, type, newUser} = JSON.parse(msg);
      const id = uuidv4();
      let typeGeneral;

      switch(type) {
        case 'postMessage':
          // handle incoming message
          console.log('message',username, content);
          typeGeneral = 'incomingMessage';

          const resM = JSON.stringify({ typeGeneral, username, content, id })
          wss.clients.forEach((client) => {
            client.send(resM);
          })
          break;
          
        case 'postNotification':
          // handle incoming notification
          console.log('notfi', username);
          typeGeneral = 'incomingNotification';
          const resN = JSON.stringify({ typeGeneral, username, newUser})
          wss.clients.forEach((client) => {
            client.send(resN);
          })
          break;

        default:
          // show an error in the console if the message type is unknown
          throw new Error('Unknown event type ' + data.type);
      }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});