const Discord = require('discord.js');
const util = require('util');
const moment = require('moment');
const chalk = require('chalk');
const Command = require('../../Structures/Command');
const OwnerID = 691994304885030972;

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['e', 'exec', 'ev'],
			description: 'Evalutate code',
			category: 'Owner'
		});
	}
	// eslint-disable-next-line consistent-return
	async run(msg, args) {
		try {
			// eslint-disable-next-line max-len
			if (args[0] === 'config' || msg.content.includes('msg.tokens') || msg.content.includes('client.token') || msg.content.includes('config.settings') || msg.content.includes('config')) return msg.channel.send('lmao nice try loser ');
			if (msg.author.id != OwnerID) return msg.channel.send('lmao nice try twat')
			if (!args.length) return msg.channel.send(`gimme some args`);
			const evaluated = await util.inspect(eval(args.join(' '), { depth: 0 }));
			const evalEmbed = new Discord.MessageEmbed()
				.setAuthor('Eval')
				.setColor('00D977')
				.addField('Input', `\`\`\`js\n${args.join(' ')}\n\`\`\``)
				.addField('Output', `\`\`\`js\n${evaluated}\n\`\`\``)
				.addField('Type', `\`\`\`js\n${typeof evaluated}\n\`\`\``)
				.setFooter(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true, size: 1024 }));
			msg.channel.send(evalEmbed);
		} catch (error) {
			await console.log(`[${moment().format('L LTS')}] ${chalk.red('[ERROR]')} ${error}`);
			await msg.channel.send(`Error: \`${error}\`.`);
		}
	}

};
