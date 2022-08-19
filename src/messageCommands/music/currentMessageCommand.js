const { MessageCommand } = require('discord-akairo');
const { EmbedBuilder } = require('discord.js');
const { db } = require('../../models/db');
const { GET_RECENT } = require('../../models/musicQueries');
const { isMusicServer } = require('../../utilities/permissions');

module.exports = class CurrentMessageCommand extends MessageCommand {
  constructor() {
    super('current', {
      aliases: ['current'],
      category: 'music',
      description: {
        content: 'Shows what song is currently playing.',
        usage: 'current',
        examples: ['current'],
      },
      channel: 'guild',
    });
  }

  userPermissions(message) {
    return isMusicServer(message);
  }

  async exec(message) {
    const embed = new EmbedBuilder().setColor('#FF69B4');

    db.query(GET_RECENT, [message.guild.id, 1], function(err, result) {
      const currentAlbum = result[0]['album'];
      const currentSong = result[0]['official_name'];
      const artistName = result[0]['artist_name'];
      const queuedBy = result[0]['queued_by'];
      const albumArt = result[0]['album_art_url'];

      embed
        .setTitle(currentSong)
        .setDescription(`${currentAlbum} - ${artistName}`)
        .setThumbnail(albumArt);

      if (queuedBy) embed.setFooter({ text: `Queued by: ${queuedBy}` });
      return message.channel.send({ embeds: [embed] });
    });
  }
};
