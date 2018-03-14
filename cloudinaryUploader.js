require('dotenv').config();
const cloudinary = require('cloudinary');

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});


let suits = ["spades", "diamonds", "clubs", "hearts"];
let values = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let baseCardUrl = process.env.BASE_CARD_URL;

function buildDeck(){
	let deck = [];

	for(let i = 0; i < suits.length; i++) {
		for(let x = 0; x < values.length; x++) {
			let card = {
			  value: values[x].toLowerCase(), 
			  suit: suits[i]
			};
            card.name = card.value + card.suit[0];
            card.url = `${baseCardUrl}${card.name}.png`;
			deck.push(card);
		}
	}
    return deck;
}

let deck = buildDeck();
deck.forEach( (card) => {
    cloudinary.uploader.upload(`${process.env.SOURCE_CARD_URL}/${card.suit}/${card.name}.svg`,  
        (error, result) => { 
            console.log(result)
        },
        { public_id: `cards/${card.name}` }
    );
})
