console.log("chat js");
const socket = io();

socket.on("countUpdated", (arg1, arg2) => {
  console.log("Listening ...", arg1, arg2);
});
