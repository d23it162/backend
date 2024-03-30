// Backend (Node.js with Express and MongoDB)

const express = require('express');
const mongoose = require('mongoose');
const cros = require('cors')
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://henilborda123:' + encodeURIComponent('fjhahY7J9@gQt$U') + '@cluster0.7vriho6.mongodb.net/root?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Create a mongoose schema
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    class: String,
    enrollNo: String,
    college: String,
    city: String,
    state: String,
    country: String,
    email: String,
    phone: String
});

// Create mongoose model
const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());
app.use(cros());

// Route to get all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to create a new user
app.post('/api/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route to delete a user
app.delete('/api/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
