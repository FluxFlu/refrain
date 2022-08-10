let socket = io();
export { socket }

let id = null;

socket.on('idAssignment', (idt) => {
  id = idt;
});

const keys = [];

function keyPress(e) {
  keys[e.keyCode] = true;
}

function keyUnPress(e) {
  keys[e.keyCode] = false;
}


const div = document.querySelector("div");

let decklist;

let fileReader = new FileReader();
fileReader.readAsText(document.getElementById("decklist").files[0]);
fileReader.onload = () => {
  decklist = fileReader.result;
}

document.getElementById("matchmake").addEventListener("click", () => {
  socket.emit("matchmake", decklist);
});

function showCardBack(x, y, width, height, rotation) {
  const cardBack = document.createElement("img");
  cardBack.src = "./assets/cardBack.png";
  cardBack.classList.add("card");
  cardBack.style.position = "absolute";
  cardBack.style.transform = `rotate(${rotation}deg)`;
  cardBack.style.left = x + '%';
  cardBack.style.top = y + '%';
  cardBack.style.width = width + '%';
  cardBack.style.height = height + '%';
  div.appendChild(cardBack);
  return cardBack;
}

function camelCase(name) {
  return name.replace(' ', '_').replace(/[^A-Za-z_]/g, '').toLowerCase();
}

function showCard(name, x, y, width, height, rotation) {
  const card = document.createElement("img");
  card.src = `./cardArt/${camelCase(name)}.png`;
  card.classList.add("card");
  card.style.position = "absolute";
  card.style.transform = `rotate(${rotation}deg)`;
  card.style.left = x + '%';
  card.style.top = y + '%';
  card.style.width = width + '%';
  card.style.height = height + '%';
  div.appendChild(card);
  return card;
}

function showText(text, x, y, width, height, fontSize, color, font, align) {

  const a = document.createElementNS('http://www.w3.org/2000/svg', "svg");

  a.setAttribute("style", `position: absolute; text-align: center; left: ${x}%; top: ${y}%; width: ${width}%; height: ${height}%; pointer-events: none;`);

  a.setAttribute("viewBox", "0 0 100 100");



  const obj = document.createElementNS('http://www.w3.org/2000/svg', "text");


  obj.innerHTML = text;

  div.appendChild(a);
  a.appendChild(obj);

  obj.setAttribute("style", `fill: ${color}; font-family: ${font}; font-size: ${fontSize}px`);

  obj.setAttribute("x", 50);
  obj.setAttribute("y", 0);
  obj.setAttribute("width", 100);
  obj.setAttribute("height", 100);
  obj.setAttribute("text-anchor", align);

  obj.setAttribute("style", `fill: ${color}; font-family: ${font}; font-size: ${fontSize}px`);

  obj.setAttribute("dominant-baseline", "hanging");


  return a;
}

function showButton(x, y, width, height, backgroundColor, borderColor) {
  const obj = document.createElement("button");

  obj.style.position = "absolute";
  obj.style.left = x + '%';
  obj.style.top = y + '%';
  obj.style.width = width + '%';
  obj.style.height = height + '%';

  obj.style.backgroundColor = backgroundColor;
  obj.style.outlineColor = borderColor;


  div.appendChild(obj);

  return obj;
}

export { showCard, showCardBack, showText, showButton }
import { renderField } from "./outward/renderField.mjs";

socket.on('startGame', (game, player, opponent) => {
  document.getElementById("title").style.display = "none";
  document.getElementById("matchmake").style.display = "none";
  document.getElementById("decklist").style.display = "none";
  document.getElementById("background").style.display = "block";
  renderField(game, player, opponent);
});

socket.on('renderField', (game, player, opponent) => {
  renderField(game, player, opponent);
});