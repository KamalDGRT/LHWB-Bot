const { MessageCommand } = require('discord-akairo');
const { EmbedBuilder, Colors } = require('discord.js');
const { permissionType } = require('../../../utilities/permissions');
const { anyUsage, commandUsage } = require('../../../utilities/utilities');
const { db } = require('../../../models/db');

module.exports = class TrustedSetMessageCommand extends MessageCommand {
	constructor() {
		super('trustedSet', {
			aliases: ['trusted set'],
			category: 'permissions',
			channel: 'guild',
			description: {
				content: 'Set the trusted role in a server.',
				usage: 'trusted set <role>',
				examples: [
					'trusted set @verified',
				],
			},
			args: [
				{
					id: 'role',
					type: 'role',
					match: 'content',
					otherwise: message => commandUsage(this.aliases[0], message.guild, message.client, this.description.usage),
				},
			],
		});
	}

	exec(message, { role }) {
		db.query('SELECT * FROM permissions WHERE guild_id = ? AND permission_type = ?', [message.guild.id, permissionType.ROLE], function(err, row) {
			if (row.length !== 0) {
				const noRoleEmbed = new EmbedBuilder()
					.setDescription(`The trusted role has already been set in this server. To clear the trusted role, use the ${anyUsage(message.guild, message.client, 'trusted clear')} command.`)
					.setColor(Colors.Red);
				return message.channel.send({ embeds: [noRoleEmbed] });
			}

			const embed = new EmbedBuilder()
				.setDescription(`Successfully set ${role} as the trusted role. To remove ${role} as the trusted role, use the ${anyUsage(message.guild, message.client, 'trusted clear')} command.`)
				.setColor(Colors.Blue);

			db.query('INSERT INTO permissions (guild_id, role_id, permission_type) VALUES (?,?,?)', [message.guild.id, role.id, permissionType.ROLE]);
			return message.channel.send({ embeds: [embed] });
		});
	}
};
