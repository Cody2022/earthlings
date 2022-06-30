const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

//Add user to array
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

//Remove user from array
const removeUser = (socketId) => {
  users = users.find((user) => user.socketId !== socketId);
};

//Find users from array
const getUser = (userId) => {
    return users.find((user) => user.userId === userId)
};

io.on("connection", (socket) => {
    //When connected
  console.log("A user connected");
  //take userId and socketId after every connection
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });
    
    //Send and get message
    socket.on("sendMessage", ({ senderId, receiverId, message }) => {
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getMessage", {
            senderId,
            message,
        });
  })
    
    
//When disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected");
    removeUser(socket.Id);
    io.emit("getUsers", users);
  });
});
