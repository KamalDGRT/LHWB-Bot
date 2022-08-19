const { MessageCommand } = require('discord-akairo');
const { commandUsage } = require('../../utilities/utilities');

module.exports = class DisableMessageCommand extends MessageCommand {
	constructor() {
		super('disable', {
			aliases: ['disable'],
			category: 'bot',
			ownerOnly: true,
			channel: 'guild',
			description: {
				content: 'Disables a command globally.',
				usage: 'disable [command]',
				examples: [
					'disable lyrics',
				],
			},
			args: [
				{
					id: 'command',
					type: 'commandAlias',
					match: 'content',
					otherwise: message => commandUsage(this.id, message.guild, message.client, this.description.usage),
				},
			],
		});
	}

	exec(message) {
		return message.channel.send('tbd');
		/* const embed = this.client.util
			.embed()
			.setColor("GREEN");

		const guarded = ["botban", "botunban", "enable", "botdisable", "reload"];
		if (guarded.includes(args.command.id)) {
			return message.channel.send({ embeds: [
				embed
					.setDescription(`The \`${args.command.id}\` command cannot be disabled as it is an essential command.`)
					.setColor("RED"),
			] },
			);
		}

		const checkCommand = this.client.settings.get(args.command.id, "command");
		if (!checkCommand) {
			this.client.settings.set(args.command.id, "command", true);
			return message.channel.send({ embeds: [
				embed
					.setDescription(`The \`${args.command.id}\` command has been disabled globally.`),
			] },
			);
		}
		else {
			return message.channel.send({ embeds: [
				embed
					.setDescription(`The \`${args.command.id}\` command is already disabled globally.`)
					.setColor("RED"),
			] },
			);
		}*/
	}
};
