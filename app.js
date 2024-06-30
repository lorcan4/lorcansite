const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (your CSS and JS files)
app.use(express.static(path.join(__dirname, 'views' ,)));

// Route to render the form for Lorcan (s1)
app.get('/', (req, res) => {
  res.render('lorcan');
});

// Route to render the form for Index (s2)
app.get('/store', (req, res) => {
  res.render('index');
});

//d1
 app.get('/d1', (req, res) => {
  res.render('shop');
});
//d2
app.get('/d2', (req, res) => {
  res.render('why');
});
//d3
app.get('/d3', (req, res) => {
  res.render('testimonial');
});
//d4
app.get('/d4', (req, res) => {
  res.render('contact');
});


// Route to handle form submission
app.post('/send', (req, res) => {
  const { name, email, subject, message, site } = req.body; // Assuming 'site' is part of the form data

  const transporter = nodemailer.createTransport({
    service: 'Gmail', // or any other email service you use
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: 'New Message From Website!',
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Failed to send message.');
    }
    res.render('thanks2'); // Pass 'name' or other necessary data to the view
  });
});



app.get('/login', (req, res) => {
  res.render('login');
});

// login
const user = { 
   username: process.env.USERNAME,
   password: process.env.PASSWORD,
  
};

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === user.username && password === user.password) {
    res.render('thanks', { username });
   } else {
res.send('Invalid username or password');
 }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
