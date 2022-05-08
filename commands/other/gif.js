const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { db } = require("../../models/db");
const { anyUsageFooter } = require("../../utilities/utilities");

class gifCommand extends Command {
	constructor() {
		super("gif", {
			aliases: ["gif"],
			category: "other",
			description: {
				content: "Displays a random Taylor related gif.",
				usage: "gif",
				examples: [
					"gif",
				],
			},
		});
	}

	exec(message) {
		db.query("SELECT path, type FROM media WHERE type = 'gif' ORDER BY RAND() LIMIT 1", function(err, rows) {
			const embed = new MessageEmbed()
				.setColor("#FF69B4")
				.setImage(`${rows[0].path}`)
				.setFooter({ 
					text: `Submit gifs to be added using: ${anyUsageFooter(message.guild, message.client, "request [imgur url]")}`,
					iconURL: message.client.user.displayAvatarURL({ dynamic: true, format: "png" }) 
				});
			message.channel.send({ embeds: [embed] });
		});
	}
}

module.exports = gifCommand;
