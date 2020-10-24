const Command = require('../../Structures/Command');
const moment = require('moment');
const { MessageEmbed } = require('discord.js');

const regions = {
	brazil: 'Brazil',
	europe: 'Europe',
	hongkong: 'Hong Kong',
	india: 'India',
	japan: 'Japan',
	russia: 'Russia',
	singapore: 'Singapore',
	southafrica: 'South Africa',
	sydney: 'Sydney',
	'us-central': 'US Central',
	'us-east': 'US East',
	'us-west': 'US West',
	'us-south': 'US South'
};


module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['server', 'guild', 'guildinfo', 'si']
		});
	}

	async run(message) {
		const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
		const members = message.guild.members.cache;
		const channels = message.guild.channels.cache;
		const emojis = message.guild.emojis.cache;

		const siEmbed = new MessageEmbed()
			.setDescription(`**Server Information for ${message.guild.name}**`)
			.setColor('00D977')
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.addField('Information', [
				`**Guild Name** ${message.guild.name}`,
				`**Guild ID** ${message.guild.id}`,
				`**Guild Owner** ${message.guild.owner.user.tag}`,
				`**Region** ${regions[message.guild.region]}`,
				`**Boost Level** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`,
				`**Guild Creation** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).fromNow()}`,
				'\u200b'
			], true)
			.addField('Stats', [
				`**Roles** ${roles.length}`,
				`**Emojis** ${emojis.size}`,
				`**Members** ${message.guild.memberCount}`,
				`**Humans** ${members.filter(member => !member.user.bot).size}`,
				`**Bots** ${members.filter(member => member.user.bot).size}`,
				`**Channels** ${channels.size}`,
				`**Boosters** ${message.guild.premiumSubscriptionCount || '0'}`,
				'\u200b'
			], true)
			.addField('Member Presence', [
				`<:status_online:769554587564638238> ${members.filter(member => member.presence.status === 'online').size}`,
				`<:status_idle:769554624239370261> ${members.filter(member => member.presence.status === 'idle').size}`,
				`<:status_dnd:769554542231683103> ${members.filter(member => member.presence.status === 'dnd').size}`,
				`<:status_offline:769554671379152917> ${members.filter(member => member.presence.status === 'offline').size}`
			], true)
			.addField(`Roles [${roles.length - 1}]`, roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None')
			.setTimestamp();
		message.channel.send(siEmbed);
	}

};
