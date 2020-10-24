const Event = require('../Structures/Event');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			once: true
		});
	}

	run() {
		console.log([
			`Logged in as ${this.client.user.tag}`,
			`Loaded ${this.client.commands.size} commands`,
			`Loaded ${this.client.events.size} events`
		].join('\n'));

		this.client.user.setStatus('dnd');

		const activities = [
			`Dylan code...`,
			`YouTube `,
			`Netflix`,
			`Among Us IRL`,
			`my bank balance fall`
		];

		let i = 0;
		setInterval(() => this.client.user.setActivity(`${activities[i++ % activities.length]}`, { type: 'WATCHING' }), 10000);


		// this.client.user.setActivity('Dylan code', { type: 'WATCHING', status: 'dnd' });
	}

};
