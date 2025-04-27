const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

// 连接 MongoDB
mongoose.connect('mongodb://localhost:27017/expiryReminder', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Reminder = require('./models/Reminder');

app.use(cors());
app.use(express.json());

// 添加提醒
app.post('/api/reminders', async (req, res) => {
  const { name, expiryDate, note } = req.body;
  const reminder = new Reminder({ name, expiryDate, note });
  await reminder.save();
  res.json(reminder);
});

// 获取所有提醒
app.get('/api/reminders', async (req, res) => {
  const reminders = await Reminder.find();
  res.json(reminders);
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
