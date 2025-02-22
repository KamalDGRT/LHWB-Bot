const { SlashCommand } = require('discord-akairo');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = class TourErasSlashCommand extends SlashCommand {
  constructor() {
    super('tourEras', {
      commandType: 'group',
      name: 'tour eras',
      description: 'View information about Taylor Swift\'s The Eras tour',
      parentCommand: 'tour',
      shortName: 'eras',
      slashOptions: [
        {
          name: 'setlist',
          description: 'Displays the setlist for Taylor Swift The Eras Tour',
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: 'secret-songs',
          description: 'Displays the secret songs from Taylor Swift The Eras Tour',
          type: ApplicationCommandOptionType.Subcommand,
        },
        /* {
          name: 'guests',
          description: 'Displays the guest list on Taylor Swift\'s reputation Stadium Tour',
          type: ApplicationCommandOptionType.Subcommand,
        }, */
      ],
    });
  }
};
