var socket = require("socket.io");
var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log("Server listening at port %d", port);
});

io.on("connection", function (socket) {
  socket.on("new_message", function (data) {
    io.sockets.emit("new_message", {
      message: data.message,
      user_send_id: data.user_send_id,
      user_receive_id: data.user_receive_id,
    });
  });
  socket.on("all_user", (data) => {
    io.sockets.emit("all_user", "all_user");
  });
  socket.on("get_message", function (data) {
    io.sockets.emit("get_message", {
      id: data.unique_id,
      image: data.bg_image,
    });
  });
});
