const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { DateTime } = require("luxon");
const { db } = require("../../models/db");

class CountdownCommand extends Command {
	constructor() {
		super("countdown", {
			aliases: ["countdown", "taysoon"],
			category: "other",
			description: {
				content: "Countdown to events.",
				usage: "countdown",
				examples: [
					"countdown",
				],
			},
		});
	}

	async exec(message) {
		const embed = new MessageEmbed()
			.setTitle("Countdowns")
			.setURL("https://www.taylorswift.com/events")
			.setColor("#9979FF")
			.setTimestamp()
			.setFooter("Times are now in your Local Timezone!");

		const allEvents = [];
		const [rows] = await db.promise().query("SELECT * FROM `countdown` WHERE enddate > ? ORDER BY `startdate`", [DateTime.local().setZone("America/New_York").toString()]);

		for (const event of rows.values()) {
			const startDate = DateTime.fromISO(event.startdate.toISOString()).setZone("America/New_York");
			const endTime = DateTime.fromISO(event.enddate.toISOString()).setZone("America/New_York");
			if (startDate > DateTime.local().setZone("America/New_York")) {
				const dateUntil = startDate.diff(DateTime.local().setZone("America/New_York")).toFormat("d 'Days' h 'Hours' m 'Minutes' s 'Seconds");
				allEvents.push(`${event.name} - <t:${startDate.toSeconds()}> - <t:${endTime.toSeconds()}:t> (Local)\n${dateUntil}\n\n`);
			}
			else {
				allEvents.push(`${event.name} - <t:${startDate.toSeconds()}> - <t:${endTime.toSeconds()}:t> (Local)\n\n`);
			}
		}
		if (allEvents.length < 1) return message.channel.send({ embeds: [embed.setDescription("There are no events scheduled. :sob:")] });
		return message.channel.send({ embeds: [embed.setDescription(allEvents.join(""))] });
	}
}

module.exports = CountdownCommand;
