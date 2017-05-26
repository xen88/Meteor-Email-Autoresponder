// import includes from 'lodash/includes';

Meteor.startup(function () {
	let Api = new Restivus({
		prettyJson: true,
		useDefaultAuth: true,
	});
	Api.addRoute('email/', {
		authRequired: false,
		enableCors: true
	}, {
		get: function (x) {
			// console.log(this.queryParams);
			console.log(x);

			let message = this.queryParams;
			console.log(message);
			var status;
			Meteor.call('sendEmail', message, function (e, r) {
				if (e) {
					status = {
						"status": "failed",
						"data": {
							"message": "Error sending message",
							"callback": e
						}
					}
				} else {
					status = {
						"status": "success",
						"data": {
							"message": "Message sent successfully",
							"callback": r || ''
						}
					}
				}
			});
			return status
		}
	});
});
