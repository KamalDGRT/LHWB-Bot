const { Inhibitor } = require("discord-akairo");

class GuildBlacklistInhibitor extends Inhibitor {
	constructor() {
		super("guildBlacklist", {
			reason: "botBannedInServer",
			type: "all",
		});
	}

	async exec(message) {
		if (message.guild) {
			const blacklist = this.client.settings.get(message.guild.id, "ban");
			if (blacklist) return true;
		}
	}
}

module.exports = GuildBlacklistInhibitor;
