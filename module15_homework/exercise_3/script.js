const Url = "wss://echo-ws-service.herokuapp.com";

//Geolocation
const btnGeo = document.getElementById("btn-geo");
const textArea = document.getElementById("area");
const btnSend = document.getElementById("btn-send");

let Geo = "";

let websocket;

const error = () => {
    status.textContent = "Невозможно получить ваше местоположение";
};

const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    let GeoValueMessage = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    Geo = GeoValueMessage;

    return GeoValueMessage;
};

function writeToScreenHref(message) {
    let pre = document.createElement("a");
    let linkText = document.createTextNode("Гео-локация");
    pre.appendChild(linkText);
    pre.title = "Гео-локация";
    pre.href = message;
    pre.setAttribute("class", "wrap-message");
    pre.setAttribute("target", "_blank");
    textArea.appendChild(pre);
}

btnGeo.addEventListener("click", () => {
    let webSocket = new WebSocket(Url);
    if (!navigator.geolocation) {
    status.textContent = "Geolocation не поддерживается вашим браузером";
} else {
    status.textContent = "Определение местоположения…";
    navigator.geolocation.getCurrentPosition(success, error);
}

    webSocket.onopen = function () {
    console.log("CONNECTED", Geo);
    webSocket.send(Geo);
};
    webSocket.onclose = function (event) {
    console.log("DISCONNECTED");
};
    webSocket.onmessage = function (event) {
    writeToScreenHref(event.data);
};
    webSocket.onerror = function (event) {
    writeToScreen('<span style="color: red;">ERROR:</span> ' + event.data);
};
    console.log(webSocket);
});

function writeToScreen(message) {
    let pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    pre.innerHTML = message;
    textArea.appendChild(pre);
}

btnSend.addEventListener("click", () => {
    let chatValueMessage = chatValue.value;
    textArea.innerHTML = chatValueMessage;

    let websocket = new WebSocket(Url);
    websocket.onopen = function (event) {
    console.log("CONNECTED");

    websocket.send(chatValueMessage);
};
    websocket.onclose = function (event) {
    console.log("DISCONNECTED");
};
    websocket.onmessage = function (event) {
    writeToScreen(
        '<div class="wrap-message">' +
        "<span>" +
        event.data +
        "</span>" +
        "</div>"
    );
};
    websocket.onerror = function (event) {
    writeToScreen('<span style="color: red;">ERROR:</span> ' + event.data);
};
    console.log(websocket);
});