const nodemailer = require('nodemailer');
const validator = require('validator')

const contactform = async (req, res) => { 
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message){
            return res.status(400).json({error: 'Please fill in all the fields'})
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({error: 'Email is not valid'})
          }
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL, // Replace with your own email address
              pass: process.env.PASSWORD // Replace with your own email password
            } 
        });
    
        // send mail with defined transport object
        let emailtome = await transporter.sendMail({
          from: process.env.EMAIL, // Replace with your own email address
          to: process.env.EMAIL, // Replace with the email address you want to receive the form submissions
          subject: 'Contact Form',
          text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        });

        let emailtouser = await transporter.sendMail({
            from: process.env.EMAIL, // Replace with your own email address
            to: email, // Replace with the email address you want to receive the form submissions
            subject: 'Upcoming Sports Game Contact Form',
            text: `Dear ${name},\n\nWe have recieved your message. We will respond as soon as possible\n\nThanks,\nUpcoming Sports Games`
          });

          res.json({ message: 'Email sent successfully', details: `Name: ${name} Email: ${email} Message: ${message}`});

      } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Error sending email' });
      }
  }

  module.exports = {contactform}