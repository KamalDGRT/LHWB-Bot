const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { db } = require("../../models/db");

class VersionCommand extends Command {
	constructor() {
		super("lversion", {
			aliases: ["lversion", "uversion"],
			category: "utilities",
			description: {
				content: "Displays version information for the bot",
				usage: "lversion",
				examples: [
					"lversion",
				],
			},
		});
	}

	exec(message) {
		db.query("SELECT * FROM version", function(err, rows) {
			const embed = new MessageEmbed()
				// pink
				.setColor("#FF69B4")
				.setTitle("Patch Notes:")
				.setAuthor({
					name: `Version: ${rows[0]["versionNum"]}`,
					iconURL: "https://lhwb.dev/ts.png",
					url: "https://github.com/andrewc2/LHWB-Bot/wiki/Change-Log"
				})
				.setDescription(`${rows[0]["patchNotes"]}`);
			return message.channel.send({ embeds: [embed] });
		});
	}
}

module.exports = VersionCommand;
