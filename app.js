const express = require('express');
const morgan = require('morgan');
const app = express();
const kdot = require('./kdot');

app.use(morgan('dev'));

app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = kdot[id];
  if (!post) {
    throw new Error('ID Not Found');
  }
  res.send(
    `<html lang="en">
    <head> </head>
    <body>
        <h1>${post.name}</h1>
        <h2>by ${post.artist}</h2>
        <p>Release Date: ${post.date}</p>
        <p>Label: ${post.label}</p>
        <p>Certifications: ${post.certification}</p>
        <a href=${post.wiki}>Even More Information</a>
        <a href=/>All Albums</a>
      
    </body>
  </html>
  `
  );
});

app.get('/', (req, res) =>
  res.send(
    `<html lang="en">
    <head> </head>
    <body>
      ${kdot
        .map(
          (ele, idx) => `
        <h1>${ele.name}</h1>
        <h2>${ele.artist}</h2>
        <a href=posts/${idx}>Details</a>
      `
        )
        .join('')}
    </body>
  </html>
  `
  )
);

app.use(function (req, res, next) {
  res.status(500).send('Something broke!');
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
