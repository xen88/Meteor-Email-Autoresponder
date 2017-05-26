# Meteor Sendgrid Email Autoresponder Client

<table>
  <tbody>
    <tr>
      <th>Node Version</th>
      <td>v6.9.4</td>
    </tr>
    <tr>
      <th>Meteor Version</th>
      <td>v1.4.4.2</td>
    </tr>
  </tbody>
</table>


Email Autoresponder client for SendGrid built with Meteor / NodeJs. This app doesn't have any client-side code. The autoresponder is based on a template from [Litmus free transactional email templates.](https://litmus.com/community/templates). You can add/edit templates inside the ```/private``` folder, using ```{{variablename}}``` to replace the content.

```
/server/api.js [ REST endpoint by *nimble:restivus* ]
/server/smtp.js [ Transactional email & template config ]
```

The app exposes an API endpoint at ```/email``` that accepts an object:
```
{
  email: 'somebody@gmail.com',
  firstname: 'Jack',
  message: 'Hi'
}
```


- Email sent to the app owners email
- Autoresponder sent to the senders email

### Run

Rename ```settings-example.json``` to ```settings.json``` and enter your details. A SendGrid API key is required to connect to the SendGrid API.

```sh
{
    "public"     : {},
    "private"    : {
        "sendgrid": {
          "username": "youremail@gmail.com",
          "apikey": "sendgrid-api-key"
        },
        "config": {
          "emailTo": "youremail@company.com",
          "subject": "Website Contact Form",
          "apikey": "xxxxxxx",
          "origins": ["http://localhost"]
        },
        "autoresponder": {
          "websiteurl": "https://example.com",
          "logourl": "https://example.com/logo.png",
          "from": "Your Company Name",
          "fromEmail": "info@company.com",
          "subject": "Thanks for getting in touch",
          "_body": {
            "line_1": "Thanks for getting in touch!",
            "line_2": "We will get back to you as soon as possible.",
            "line_3": "We provide really amazing services.",
            "address": "123 Startup Lane, Cape Town."
          }
        }

    }
}

```

```sh
$ nvm use 6 (switch to Node v6)
$ meteor npm install
$ npm start
```



### Deployment

Deploy to your VPS using [Kadira: MeteorUp](https://github.com/kadirahq/meteor-up)
