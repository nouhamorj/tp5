const express = require('express');
const mongoose = require('mongoose');
const Message = require('./models/message'); 
const app = express();

mongoose.connect('mongodb://localhost:27017/bd_kafka', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
