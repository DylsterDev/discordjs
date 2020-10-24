const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['pong'],
			description: 'check bots stats i thonk',
			category: 'Information'
		});
	}

	async run(message) {
		const msg = await message.channel.send('Pinging...');

		const latency = msg.createdTimestamp - message.createdTimestamp;

		const pingEmbed = new MessageEmbed()
			.setTitle('🏓 Pong!')
			.setColor('00D977')
			.setDescription(`REST:\`${latency}ms\`\nWS: \`${Math.round(this.client.ws.ping)}ms\``);

		msg.edit('\u200b', pingEmbed);
	}

};
