const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['pong']
		});
	}

	async run(message, [command]) {
		const helpEmbed = new MessageEmbed()
			.setColor('00D977')
			.setAuthor(`${message.guild.name} Help Menu`, message.guild.iconURL({ dynamic: true }))
			.setThumbnail(this.client.user.displayAvatarURL())
			.setFooter(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();

		if (command) {
			const cmd = this.client.commands.get(command) || this.client.commands.get(this.aliases.get(command));

			if (!cmd) return message.channel.send(`Invalid Command given. \`${command}\``);

			helpEmbed.setAuthor(`${this.client.utils.capitalise(cmd.name)} Command Help`, this.client.user.displayAvatarURL);
			helpEmbed.setDescription([
				`**Aliases** ${cmd.aliases.length ? cmd.aliases.map(alias => `\`${alias}\``).join(' ') : 'No Aliases'}`,
				`**Description** ${cmd.description}`,
				`**Category** ${cmd.category}`,
				`**Usage** ${cmd.usage}`
			]);
			return message.channel.send(helpEmbed);
		} else {
			helpEmbed.setDescription([
				`These are the available commands for ${message.guild.name}`,
				`This bot's prefix is \`${this.client.prefix}\``,
				`Command Parameters: \`<>\` is a required & \`[]\` is an optional argument`
			]);
			let categories;
			if (!this.client.owners.includes(message.author.id)) {
				categories = this.client.utils.removeDuplicates(this.client.commands.filter(cmd => cmd.category !== ' Onwer').map(cmd => cmd.category));
			} else {
				categories = this.client.utils.removeDuplicates(this.client.commands.map(cmd => cmd.category));
			}

			for (const category of categories) {
				helpEmbed.addField(`**${this.client.utils.capitalise(category)}**`, this.client.commands.filter(cmd =>
					cmd.category === category).map(cmd => `\`${cmd.name}\``).join(' '));
			}
			return message.channel.send(helpEmbed);
		}
	}

};
