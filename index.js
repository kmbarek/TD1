const express = require('express'); //import express
const app = express(); //instensation express

app.use(express.json())

const equipes = require('./equipes.json')

/** Importation du client MongoClient & connexion à la DB */
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'bdmonapi';
let db
MongoClient.connect(url, function(err, client){
    console.log("Connexion réussi avec Mango");
    db = client.db(dbName);
});


app.listen(83,()=> 
    { console.log ("Back express")
});

app.get('/equipes', (req,res) => {
    db.collection('equipe').find({}).toArray(function(err, docs
    ){
        if (err){
            console.log(err)
            throw err
        }
        res.status(200).json(docs)
    })
})

app.get('/equipes/:id', (req,res) => {
    const id = parseInt(req.params.id)
    db.collection('equipe').find({id}).toArray(function(err, docs
    ){
        if (err){
            console.log(err)
            throw err
        }
        res.status(200).json(docs)
    })
})

app.post('/equipes', async (req,res) => {
  try {
    const equipeData = req.body
    const equipe = await db.collection ('equipe').insertOne(equipeData)
    res.status(200).json(equipe)
  } catch (err)
    {
            console.log(err)
            throw err
        }
})

app.put('/equipes/:id', async (req,res) => {
    try {
      const id = parseInt(req.params.id)
      const newequipe = req.body
      const oldequipe = (await db.collection ('equipe').find({id}).toArray())[0]
      oldequipe.name=newequipe.name;
      oldequipe.country=newequipe.country;
       await db.collection ('equipe').replaceOne({id},oldequipe)

      res.status(200).json(oldequipe)
    } catch (err)
      {
              console.log(err)
              throw err
          }
})

app.put('/equipes2/:id', async (req,res) => {
        try {
          const id = parseInt(req.params.id)
          const newequipe = req.body
           await db.collection ('equipe').replaceOne({id},newequipe)
    
          res.status(200).json(newequipe)
        } catch (err)
          {
                  console.log(err)
                  throw err
              }
          })
    
app.delete('/equipes/:id', async (req,res) => {
  try {
    const id = (req.params.id)
    const equipe = await db.collection ('equipe').deleteOne({id})
    res.status(200).json(equipe)
  } catch (err)
    {
            console.log(err)
            throw err
        }
})

/* TD joueur */

// question1

app.get('/joueurs', (req,res) => {
    db.collection('joueur').find({}).toArray(function(err, docs
    ){
        if (err){
            console.log(err)
            throw err
        }
        res.status(200).json(docs)
    })
})

app.get('/joueurs/:id', (req,res) => {
    const id = parseInt(req.params.id)
    db.collection('joueur').find({id}).toArray(function(err, docs
    ){
        if (err){
            console.log(err)
            throw err
        }
        res.status(200).json(docs)
    })
})

app.post('/joueurs', async (req,res) => {
  try {
    const joueurData = req.body
    const joueur = await db.collection ('joueur').insertOne(joueurData)
    res.status(200).json(joueur)
  } catch (err)
    {
            console.log(err)
            throw err
        }
})

app.put('/joueurs/:id', async (req,res) => {
    try {
      const id = parseInt(req.params.id)
      const newjoueur = req.body
      const oldjoueur = (await db.collection ('joueur').find({id}).toArray())[0]
      oldjoueur.nom=newjoueur.nom;
      oldjoueur.numero=newjoueur.numero;
       await db.collection ('joueur').replaceOne({id},oldjoueur)

      res.status(200).json(oldjoueur)
    } catch (err)
      {
              console.log(err)
              throw err
          }
})

    
app.delete('/joueurs/:id', async (req,res) => {
  try {
    const id = (req.params.id)
    const joueur = await db.collection ('joueur').deleteOne({id})
    res.status(200).json(joueur)
  } catch (err)
    {
            console.log(err)
            throw err
        }
})

// question2
app.get('/equipes/:id/joueurs', (req,res) => {
    const idEquipe = parseInt(req.params.id)
    db.collection('joueur').find({idEquipe}).toArray(function(err, docs
    ){
        if (err){
            console.log(err)
            throw err
        }
        res.status(200).json(docs)
    })
})
// question3

app.get('/joueurs/:id/equipes',async (req,res) => {
    const id = parseInt(req.params.id)
    const joueur =await  db.collection('joueur').findOne({id});

    const equipe =await db.collection('equipe').findOne({id:joueur.idEquipe});
    res.status(200).json(equipe)
    
})
//question4
app.get('/joueurbyName/:nom', (req,res) => {
    const nom = req.params.nom
    db.collection('joueur').find({nom}).toArray(function(err, docs
    ){
        if (err){
            console.log(err)
            throw err
        }
        res.status(200).json(docs)
    })
})



/*
app.get('/equipes', (req,res) => {
    //res.send("Liste des equipes")
    res.status(200).json(equipes)
})
app.get('/equipes/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const equipe = equipes.find(equipe=> equipe.id === id)
    res.status(200).json(equipe)
})

app.post('/equipes/', (req,res) => {
    equipes.push(req.body)
    res.status(200).json(equipes)
})

app.put('/equipes/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const equipe = equipes.find(equipe=> equipe.id === id)
    equipe.name = req.body.name
    equipe.country = req.body.country
    res.status(200).json(equipe)
})

app.delete('/equipes/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let equipe = equipes.find(equipe=> equipe.id === id)
    equipes.splice(equipes.indexOf(equipe),1)
    res.status(200).json(equipe)
})*/