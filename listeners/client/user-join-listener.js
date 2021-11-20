const { Listener } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

class memberJoinListener extends Listener {
	constructor() {
		super("memberJoin", {
			event: "guildMemberAdd",
			emitter: "client",
		});
	}

	exec(member) {
        const embed = new MessageEmbed()
            .setColor("#FF69B4")

		if (member.guild.id === "689935210254696564") {
			if (member.guild.systemChannelId === null){
				console.log("Member joined but there is no system channel");
				return;
			}			
            //member.guild.systemChannel.send({ embeds: [embed.setDescription(`Welcome to the server, ${member.user.username} <@!${member.user.id}>! :wave:`)] });
	    }
    }
}

module.exports = memberJoinListener;
