const express = require('express');
const morgan = require('morgan');
const app = express();

const kDot = [
  {
    id: 1,
    name: 'Section.80',
    artist: 'Kendrick Lamar',
    date: 'July 2, 2011',
    label: 'Top Dawg',
    certification: 'RIAA: Gold',
    wiki: 'https://en.wikipedia.org/wiki/Section.80',
  },
  {
    id: 2,
    name: 'Good Kid, M.A.A.D City',
    artist: 'Kendrick Lamar',
    date: 'October 22, 2012',
    label: 'Top Dawg',
    certification: 'RIAA: 3x Platinum',
    wiki: 'https://en.wikipedia.org/wiki/Good_Kid,_M.A.A.D_City',
  },
  {
    id: 3,
    name: 'To Pimp a Butterfly',
    artist: 'Kendrick Lamar',
    date: 'March 16, 2015',
    label: 'Top Dawg',
    certification: 'RIAA: Platinum',
    wiki: 'https://en.wikipedia.org/wiki/To_Pimp_a_Butterfly',
  },
  {
    id: 4,
    name: 'Damn',
    artist: 'Kendrick Lamar',
    date: 'April 14, 2017',
    label: 'Top Dawg',
    certification: 'RIAA: 3x Platinum',
    wiki: 'https://en.wikipedia.org/wiki/Damn_(Kendrick_Lamar_album)',
  },
];

app.use(morgan('dev'));

app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = kDot[id];
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
      ${kDot
        .map(
          (ele, idx) => `
        <h1>${ele.name}</h1>
        <h2>${ele.artist}</h2>
        <a href=posts/${idx}>Details</a>
        <br>
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
