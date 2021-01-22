require("dotenv").config();
const  express=require('express');
const app=express();
const sequelize=require('./db')


const journal=require('./controllers/journalcontroller');
const user=require('./controllers/usercontroller');

sequelize.sync();

app.use(require('./middleware/headers'));
app.use(express.json());

//
// EXPOSED ROUTE
//
app.use('/user',user);

//
// PROTECTED ROUTE
//

app.use('/journal',journal);


app.listen(3000,function(){
    console.log("App is listening on port 3000")
})
