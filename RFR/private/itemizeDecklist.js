const { interpretDecklist } = require("./outward/decklist/interpretDecklist");

function snakeCase(name) {
    return name.replaceAll(' ', '_').replaceAll(/[^A-Za-z_]/g, '').toLowerCase();
}

function itemize(decklist) {
    return interpretDecklist(decklist).map(name => {return {name: snakeCase(name), visible: [false, false], owner: 0/*, width: ${width}, height: ${height}*/}});
}

module.exports = { itemize }