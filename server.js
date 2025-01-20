const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API endpoint for handling form submissions
app.post('/send-mail', async (req, res) => {
    const { name, email, phone, message } = req.body;

    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // You can use other services like Outlook, Yahoo
        auth: {
            user: 'zaigham135@gmail.com', // Replace with your email
            pass: 'ejgr nhdc ducl ahyk'  // Replace with your email password or app-specific password
        }
    });

    const mailOptions = {
        from: email,
        to: 'zaigham135@gmail.com', // Replace with your email
        subject: 'New Contact Form Submission',
        text: `You received a new message from your portfolio website:
        
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Message sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending message. Please try again later.');
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
