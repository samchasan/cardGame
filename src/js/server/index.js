

const app = require('http').createServer((request, response) => {
    // console.log("Requested url: " + request.body);

    if (request.url.toLowerCase() === "/events") {
        response.writeHead(200, {
            Connection: "keep-alive",
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Access-Control-Allow-Origin": "*"
          });

      setInterval(() => {
        let users = JSON.stringify(activeUsers)
        response.write(`activeUsers: ${users}`);
        response.write("\n\n");
      }, 3000);

    //   setTimeout(() => {
    //     response.write('data: {"flight": "I768", "state": "landed"}');
    //     response.write("\n\n");
    //   }, 6000);
    } else {
      response.writeHead(404);
      response.end();
    }
  })

  
const io = module.exports.io = require('socket.io')(app)

const PORT = process.env.PORT || 3001

const SocketManager = require('./SocketManager')

io.on('connection', SocketManager)

app.listen(PORT, () => {
    console.log('connected to port:',  PORT)
})