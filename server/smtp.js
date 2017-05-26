Meteor.startup(function () {
  var sg = require('sendgrid')(Meteor.settings.private.sendgrid.apikey);
	Meteor.methods({

    // *** Function to send email using email data from client *** //
		sendEmail: function (message) {
			let request = sg.emptyRequest({
				method: 'POST',
				path: '/v3/mail/send',
				body: {
					personalizations: [{
						to: [{
							email: Meteor.settings.private.config.emailTo,
						}, ],
						subject: Meteor.settings.private.config.subject + '[ ' + message.firstname + ' ]',
					}, ],
					from: {
						email: message.email,
					},
					content: [{
						type: 'text/plain',
						value: message.message || '',
					}, ],
				},
			});

			// *** SendGrid API Request *** //
			sg.API(request)
				.then(response => {
					console.log(response.statusCode);
					// console.log(response.body);
					// console.log(response.headers);
					// console.log(message);
					Meteor.call('sendAutoresponse', message, function(e,r){
            if(e){
              console.log(e)
            }
            else {
              // console.log(r)
            }
          })
				})
				.catch(error => {
					//error is an instance of SendGridError
					//The full response is attached to error.response
					console.log(error.response.statusCode);
				});

		},

    // *** after sending to company mailbox, send autoresponder to client email address *** //
		sendAutoresponse: function (message) {

      // *** server side rendering of /private/*.html *** //
			SSR.compileTemplate('autoresponder', Assets.getText('autoresponder.html'));
			let emailData = {
        name_intro: 'Hi, ' + message.firstname,
				response1: Meteor.settings.private.autoresponder._body.line_1,
				response2: Meteor.settings.private.autoresponder._body.line_2,
				response3: Meteor.settings.private.autoresponder._body.line_3,
				address: Meteor.settings.private.autoresponder._body.address,
        tagline: 'Your Tagline Here',
        websiteurl: 'https://example.com',
        logourl: 'https://maintenance.xonesoftware.co.za/src/img/xone.png'
			};

			let htmlTemplate = SSR.render('autoresponder', emailData);
			let request = sg.emptyRequest({
				method: 'POST',
				path: '/v3/mail/send',
				body: {
					personalizations: [{
						to: [{
							email: message.email,
						}, ],
						subject: Meteor.settings.private.autoresponder.subject + ' ' + message.firstname + '! [ ' + Meteor.settings.private.autoresponder.fromEmail + ' ]',
					}, ],
					from: {
						email: Meteor.settings.private.autoresponder.fromEmail,
					},
					content: [{
						type: 'text/html',
						value: htmlTemplate
					}, ],
				},
			});

      // *** SendGrid API Request *** //
			sg.API(request)
			  .then(response => {
			    console.log(response.statusCode);
			    // console.log(response.body);
			    // console.log(response.headers);
			  })
			  .catch(error => {
			    //error is an instance of SendGridError
			    //The full response is attached to error.response
			    console.log(error.response.statusCode);
			  });
		},

	});
})
