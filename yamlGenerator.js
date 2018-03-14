require('dotenv').config();
const yaml = require('js-yaml');
const fs = require('fs');

let suits = ["spades", "diamonds", "clubs", "hearts"];
let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let baseCardUrl = process.env.BASE_CARD_URL;

function buildDeck(){
	let deck = [];

	for(let i = 0; i < suits.length; i++) {
		for(let x = 0; x < values.length; x++) {
			let card = {
			  value: values[x], 
			  suit: suits[i]
			};
            card.name = card.value + card.suit[0].toUpperCase();
            card.url = `${baseCardUrl}${card.name}.png`;
			deck.push(card);
		}
	}
    return deck;
}

let yamlDeck = buildDeck().map( (card) => {
    return {
        name: card.name,
        src: card.url
    }
})

let yamlExport = {
    title: 'cards',
    emojis: yamlDeck
}

fs.writeFileSync( 'cards.yaml', yaml.safeDump(yamlExport, { lineWidth: 2000 }) )