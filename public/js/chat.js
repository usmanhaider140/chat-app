const socket = io();

// Elements
const $messageForm = document.querySelector("#messageInput");
const $locationButton = document.querySelector("#send-location");
const $messageText = document.querySelector("#message-input");
const $sendMessageButton = document.querySelector("#send-message");
const $messages = document.querySelector("#messages");

// Templates

const messageTemplate = document.querySelector("#message-template").innerHTML;

socket.on("message", (message) => {
  console.log(message);
});

// socket.on("countUpdated", (arg1, arg2) => {
//   console.log("Listening ...", arg1, arg2);
// });

// const increment = document.querySelector("#increment");
// increment.addEventListener("click", () => {
//   socket.emit("increment");
// });

$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  $messageText.setAttribute("disabled", "disabled");
  $sendMessageButton.setAttribute("disabled", "disabled");

  const message = $messageForm.elements["messageInput"].value;
  socket.emit("sendMessage", message, (error, message) => {
    if (error) return console.log(error);
    $sendMessageButton.removeAttribute("disabled");
    $messageText.removeAttribute("disabled");
    $messageText.value = "";
    $messageText.focus();
    const html = Mustache.render(messageTemplate, { message });
    $messages.insertAdjacentHTML("beforeend", html);
  });
});

socket.on("broadCast", (message) => {
  console.log(message);
});

$locationButton.addEventListener("click", () => {
  $locationButton.setAttribute("disabled", "disabled");
  if (!navigator.geolocation)
    return alert("Geolocation is not supported by your browser");
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    socket.emit("sendLocation", { latitude, longitude }, () => {
      console.log("Location Shared");
      $locationButton.removeAttribute("disabled");
    });
  });
});
