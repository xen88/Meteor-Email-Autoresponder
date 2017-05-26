# Meteor Sendgrid Email Autoresponder Client
Email Sending Client &amp; Autoresponder (SendGrid) built with Meteor / NodeJs. This app doesn't have any frontend / client code. The autoresponder is based on a well designed template from [Litmus free transactional email templates.](https://litmus.com/community/templates). You can add/edit templates inside the ```/private``` folder, using ```{{variablename}}``` to replace the content.


The app exposes an API endpoint at ```/email``` that accepts an object (send using an HTML form from a static website):
```
{
  email: 'somebody@gmail.com',
  firstname: 'Jack',
  message: 'Hi'
}
```


Once the object is sent to the API endpoint, an email is dispatched to the app owners email, then an autoresponder is sent to the senders email.

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

### Todo

 - Remove all own branding from Templates (make 100% generic)
