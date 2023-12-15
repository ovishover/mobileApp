const express = require('express');
const Parse = require('parse/node');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Ініціалізація Parse SDK
Parse.initialize('tbLcrYkzshV72QpCDQTNNlKEROIxCSJrCBsXkEjX', 'YJRICYfZQ9BSUivCYBEjX4GxJVxAXuxFu25RoNpg');
Parse.serverURL = 'https://parseapi.back4app.com/';

// Налаштування middleware для обробки POST-запитів
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Статична папка для зберігання стилів та скриптів (необов'язково)
app.use(express.static('public'));

// Маршрут для відображення головної сторінки
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Маршрут для обробки POST-запитів з форми
app.post('/submit', (req, res) => {
  // Зберігання введених даних у базу даних
  const MyObject = Parse.Object.extend('MyObject');
  const myObject = new MyObject();
  myObject.set('data', req.body.data);

  myObject.save().then(
    (result) => {
      console.log('Object saved successfully', result);
      res.send('Data submitted successfully!');
    },
    (error) => {
      console.error('Error while saving object', error);
      res.status(500).send('Error submitting data');
    }
  );
});

// Запуск серверу
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

