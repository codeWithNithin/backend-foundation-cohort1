import net from "node:net";

const clients = [];
const server = net.createServer((socket) => {
  console.log("client connected");

  clients.push(socket);

  socket.on("data", (chunk) => {
    console.log(`received: ${chunk}`);
    const message = chunk.toString().trim();
    clients.forEach((client) => {
      client.write(`echo: ${message}`);
    });

    socket.write(`echo: ${chunk}`);
    socket.end();
  });

  socket.on("error", (err) => {
    console.log(err);
  });

  socket.on("end", () => {
    console.log("client disconnected");
    let index = clients.indexOf(socket);

    if (index !== -1) {
      clients.splice(index, 1);
    }

    console.log("A client disconnected");
    console.log(`Total connected clients ${clients.length}`);
  });
});

server.listen(1337, () => {
  console.log("server is listening on port 1337");
});
