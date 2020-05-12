const Discord = require("discord.js");
const https = require('https');
const config = require('./config.json');

const client = new Discord.Client();

const url = "https://www.inspirobot.me/api?generate=true";

if (config.BotToken == "YOUR DISCORD BOT TOKEN HERE") {
	throw new Error("Discord bot token not specified. Please set it in config.json");
};

client.on("ready", () => {
	console.log("Started quote bot!");
	client.user.setActivity(`type !shittyquote to generate a shitty inspirational quote.`);
	console.log("Bot is in " + client.guilds.size + " servers.");
});

const quoteMessages = [
	"We've used AI to bring you this inspirational quote",
	"Only a robot could give you a quote this good",
	"Here's a quote that only a robot could create",
	"We've created a self-aware AI to bring you this quote",
	"Here's your shitty quote",
	"Feel free to frame this shitty quote on your wall"
];

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function createShittyQuote(message) {
	https.get(url, (resp) => {
		let data = '';

		resp.on('data', (chunk) => {
			data += chunk;
		});

		resp.on('end', () => {
			const quoteMessage = quoteMessages[getRandomInt(quoteMessages.length)] + ":";
			const embed = new Discord.RichEmbed();

			embed.setFooter("Generated with inspirobot.me", "https://i.imgur.com/p1SWSax.png")
				.setImage(data)
				.setColor([240, 240, 240])
				.setTimestamp()
				.setAuthor(quoteMessage, client.user.avatarURL);

			message.channel.send(embed);
		});

	}).on("error", (err) => {
		console.log("Got an error: ", e);
		message.channel.send("Error: Inspirobot API is down.")
	});
}

client.on("message", (message) => {
	if (message.content.toLowerCase() == "!shittyquote") {
		createShittyQuote(message)
	}
});

client.login(config.BotToken);

