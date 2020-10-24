const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const moment = require('moment');

const flags = {
	DISCORD_EMPLOYEE: '<:discordStaff:769575417149259777>',
	DISCORD_PARTNER: '<:partner:769575473574576138>',
	BUGHUNTER_LEVEL_1: '<:bughunter:769575521318207492>',
	BUGHUNTER_LEVEL_2: '<:goldenbughunter:769575548103032883>',
	HYPESQUAD_EVENTS: '<:hypesquad_events:769575949158580247>',
	HOUSE_BRAVERY: '<:bravery:769581984833732648>',
	HOUSE_BRILLIANCE: '<:brilliance:769582045255958540>',
	HOUSE_BALANCE: '<:balance:769582109102440498>',
	EARLY_SUPPORTER: '<:earlysupporter:769582182351110164>',
	TEAM_USER: '<:discord:769583062404694026>',
	SYSTEM: '<:verifiedsystem:769583297238925394>',
	VERIFIED_BOT: '<:verified_bot:769583359332188180>',
	VERIFIED_DEVELOPER: '<:verified:769583498037559336>'
};

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['user', 'ui']
		});
	}

	async run(message, [target]) {
		const member = message.mentions.members.last() || message.guild.members.cache.get(target) || message.member;
		const roles = member.roles.cache
			.sort((a, b) => b.position - a.position)
			.map(role => role.toString())
			.slice(0, -1);
		const userFlags = member.user.flags.toArray;
		const embed = new MessageEmbed()
			.setColor('00D977')
			.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.addField('User', [
				`**Username** ${member.user.tag}`,
				`**ID** ${member.id}`,
				`**Flags** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(' ') : 'None'}`,
				`**Avatar** [Click for Avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
				`**Account Creation** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
				`**Status** ${member.user.presence.status}`,
				`**Game** ${member.user.presence.game || 'Not playing a game'}`,
				'\u200b'
			], true)
			.addField('Member Stats', [
				`**Highest Role** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
				`**Server Join Date** ${moment(member.joinedAt).format('LL  LTS')}`,
				`**Hoisted Role** ${member.roles.hoist ? member.roles.hoist.name : 'None'}`,
				`**Roles [${roles.length}]** ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None'}`,
				'\u200b'
			], true);
		return message.channel.send(embed);
	}

};
