const express = require('express');
const app = express();
const path = require('path');
const usermodel = require('./models/user');

const ejs = require('ejs');
const user = require('./models/user');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use(express.static(path.join(__dirname, 'public')));

 app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/read', async (req, res) => {
  let allusers =  await usermodel.find();
  console.log(allusers);
  
    res.render('read',{users:allusers});
});

app.get('/Delete/:id', async (req, res) => {
    let allusers =  await usermodel.findOneAndDelete({_id:req.params.id});
      res.redirect("/read");
  });

  app.get('/edit/:userid', async (req, res) => {
    let user =  await usermodel.findOne({_id: req.params.userid});
      res.render("edit", {user});
  });

  app.post('/update/:id', async(req, res) => {
    let {name,email,password,image} =req.body;
    let user =  await usermodel.findOneAndUpdate({_id:req.params. id},{name,email,password,image}, {new:true});
    res.redirect('/read')
    
  });


  
app.post('/create', async(req, res) => {
    let { name, email, password, image } = req.body;

   let createduser = await usermodel.create({
        name: name,
        email: email,
        password: password,
        image:image,

    })
    console.log(createduser);
        res.redirect("/read");

});

app.listen(4000);