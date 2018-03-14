require('dotenv').config();
const yaml = require('js-yaml');
const fs = require('fs');

let suits = ["spades", "diamonds", "clubs", "hearts"];
let values = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
let baseCardUrl = process.env.BASE_CARD_URL;

function buildDeck(){
	let deck = [];

	for(let i = 0; i < suits.length; i++) {
		for(let x = 0; x < values.length; x++) {
			let card = {
			  value: values[x].toLowerCase(), 
			  suit: suits[i]
			};
            card.name = card.value + card.suit[0].toUpperCase();
            card.url = `${baseCardUrl}${getCardSlug(card)}.png`;
            card.aliases = getCardAliases(card);
			deck.push(card);
		}
	}
    return deck;
}

function getCardSlug(card){
    if(Number.isInteger(card.value)){
        return card.value + card.suit[0];
    } else {
        return card.value[0] + card.suit[0];
    }
}

function getCardAliases(card) {
    let suit = card.suit;
    let value = card.value;
    let aliases = [];
    aliases.push(`${suit[0]}${value[0]}`);
    aliases.push(`${value[0]}${suit[0]}`);

    aliases.push(`${value[0]}${suit}`);
    aliases.push(`${suit[0]}${value}`);

    aliases.push(`${value}${suit[0]}`);
    aliases.push(`${suit}${value[0]}`);

    aliases.push(`${suit}${value}`);
    aliases.push(`${value}${suit}`);

    return aliases;
}

let yamlDeck = buildDeck().map( (card) => {
    return {
        name: card.name.toLowerCase(),
        aliases: card.aliases,
        src: card.url
    }
})

let yamlExport = {
    title: 'cards',
    emojis: yamlDeck
}

fs.writeFileSync( 'cards.yaml', yaml.safeDump(yamlExport, { lineWidth: 2000 }) )