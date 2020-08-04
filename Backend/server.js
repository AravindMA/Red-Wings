const express=require('express');
const app=express();
const cors=require('cors')
const bcrypt=require('bcrypt-nodejs');
const knex=require('knex')

const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '12345',
    database : 'bloodbank'
  },
});
app.use(express.json());
app.use(cors())

app.get('/table',(req,res)=>{
  db.select('*').from('request')
  .then(user=>{ res.json(user)})
  .catch(err=>res.status(400).json('unable to load'))
})

app.post('/SignIn',(req,res)=>{
  if(!req.body.email || !req.body.password){
    res.status(400).json('fill up the details')
  }
	db.select('email','hash').from('login')
  .where('email','=',req.body.email)
  .then(data=>{
    const isValid=bcrypt.compareSync(req.body.password,data[0].hash);
    if(isValid){
      return db.select('*').from('users')
      .where('email','=',req.body.email)
      .then(user=>{
        res.json(user[0])
      })
      .catch(err=>res.status(400).json('unable to register'))
    }else{
      res.status(400).json('wrong credentials')
    }
  })
  .catch(err=>res.status(400).json('wrong credentials!!'))
})
app.post('/Register',(req,res)=>{
  if(!req.body.email || !req.body.password || !req.body.name || !req.body.age || !req.body.value){
    res.status(400).json('fill up the details')
  }
  if(req.body.age<=17){
    res.status(400).json('donors under 17 are not allowed to register')
  }
	const {email,name,password,age,value}=req.body;
	const hash=bcrypt.hashSync(password);
  db.transaction(trx=>{
    trx.insert({
      hash:hash,
      email:email
    }).into('login').returning('email')
    .then(loginEmail=>{
      return trx('users')
      .returning('*')
      .insert({
        email:loginEmail[0],
        name:name,
        age:age,
        value:value,
        joined:new Date()
      }).then(user=>{
        res.json(user[0]);
      })
    }).then(trx.commit)
      .catch(trx.rollback) 
  }).catch(err=>res.status(400).json('unable to register'))
})

app.put('/update/:id',(req,res)=>{
  if(!req.body.email || !req.body.name || !req.body.age || req.body.age===0){
    res.status(400).json('fill up the details')
  }
	const{id}=req.params;
  const {name,age,value,email}=req.body;
	db('users').where({id:id}).returning('*')
  .update({
     name:name,
     email:email,
     age:age
  })
  .then(user=>{
    res.json(user[0]);
  }).catch(err=>res.status(400).json('error!!'))
})

app.post('/request',(req,res)=>{
	const{phone,camp,name,age,value}=req.body;
  db('request').returning('*').insert({
     camp:camp,
     name:name,
     phone:phone,
     age:age,
     value:value
  })
	  .then(user=>{
      res.json(user[0]);
    })
    .catch(err=>res.status(400).json('error'))
  })

app.post('/donate',(req,res)=>{
  if(req.body.units<=0){
    res.status(400).json('invalid units')
  }
  const{units,name,age,value}=req.body;
   db('donor').returning('*').insert({
     name:name,
     age:age,
     value:value,
     units:units,
  })
    .then(user=>{
      res.json(user[0]);
    })
    .catch(err=>res.status(400).json('error!'))
  })
  
app.put('/counts',(req,res)=>{
  const{id}=req.body;
  db('users').where('id','=',id)
  .increment('donations',1)
  .returning('donations')
  .then(counts=>{
    res.json(counts[0]);
  })
  .catch(err=>res.status(400).json('unable to get counts'))
})


app.listen(3001,()=>{
	console.log('app is running');
})