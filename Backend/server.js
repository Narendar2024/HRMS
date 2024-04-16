const express = require('express');
const dotEnv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const bcrypt = require('bcryptjs');
const methodOverride = require('method-override');
const employeeController = require('./controllers/employeeController');
const employeeRoutes = require('./routes/employeeRoutes');
const User = require('./models/User');
const Employee = require('./models/Employee');
const { fetchEmployeeById } = require('./controllers/employeeController');
const { fetchEmployees } = require('./controllers/employeeController');
const app = express();

dotEnv.config();
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log(`Database connected successfully`);
}).catch((error) => {
    console.log(error);
});
const store = new MongoDBStore({
    uri: process.env.MONGO_URL,
    collection: 'mySession'
});

app.get('/employee-details', employeeController.getEmployeeDetails);
app.use('/employees', employeeRoutes);


// This code for express-session

app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false,
    store: store
}));

const checkAuth = (req, res, next) => {
    if (req.session.isAuthenticated) {
        next();
    } else {
        res.redirect('/login');
    }
};


app.get('/signup', (req, res) => {
    res.render('register');
});

app.get('/login', (req, res) => {
    res.render('login');
});


// app.get('/dashboard', checkAuth, async (req, res) => {
//     try {
//         const employees = await Employee.find();
//         console.log(employees);
//         res.render('welcome', { employees });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

app.get('/dashboard', checkAuth, async (req, res) => {
    try {
        const employees = await employeeController.getEmployeeDetails(req, res);
        res.render('welcome', { employees });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



// app.post('/register', async (req, res) => {
//     const { username, email, password } = req.body;
//     try {
//         const newUser = new User({
//             username, email, password
//         })
//         await newUser.save();
//         req.session.person = username
//         res.redirect('/login');
//     } catch (err) {
//         console.error(err);
//         res.redirect('/signup');
//     }
// })

// app.get('/', (req, res) => {
//     res.send(`Server is running at ${PORT}`);
// });

app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.redirect('/signup');
        }
        const hashPassword = await bcrypt.hash(password, 12);
        user = new User({
            username,
            email,
            password: hashPassword
        });
        req.session.person = user.username;

        await user.save();
        res.redirect('/login');
    } catch (error) {
        console.error(`${error}`);
    }
});

app.post('/user-login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.redirect('/signup');
        }
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.redirect('/signup');
        }
        req.session.isAuthenticated = true;
        res.redirect('/dashboard');
    } catch (error) {
        console.error(`${error}`);
    }
});
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect('/signup');
    });
});


// app.get('/update/:id', async (req, res) => {
//     try {
//         const updateEmployee = await employeeController.renderUpdateForm(req, res);
//         res.render('updateEmployeeForm', { updateEmployee });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });


app.get('/update/:id', async (req, res) => {
    try {
        const employee = await fetchEmployeeById(req.params.id);
        res.render('updateEmployeeForm', { employee });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is runnig successfully @ ${PORT}`);
});

app.get('/', (req, res) => {
    res.send(`Server is running successfully`);
});