const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
//const Op = Sequelize.Op
const mysql = require('mysql2/promise')

let conn

mysql.createConnection({
    user: 'root',
    password: 'CopilParinteBaba20'
})
    .then((connection) => {
        conn = connection
        return connection.query('CREATE DATABASE IF NOT EXISTS anonymous_grading_app')
    })
    .then(() => {
        return conn.end()
    })
    .catch((err) => {
        console.warn(err.stack)
    })

const sequelize = new Sequelize('anonymous_grading_app', 'root', 'CopilParinteBaba20', {
    dialect: 'mysql'
})

const Person = sequelize.define('person', {
    type: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['STUDENT', 'TEACHER']
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    }
},
    {
        timestamps: false
    })

const Project = sequelize.define('project', {
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey : true
    },
    file: {
        type: Sequelize.BLOB,
        allowNull: true
    },
    version: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    deadline: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    final_grade: {
        type: Sequelize.DOUBLE,
        allowNull: true
    },
    personID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    }
},
    {
        timestamps: false
    })

const Grade = sequelize.define('grade', {
    grade: {
        type: Sequelize.DOUBLE,
        allowNull: true
    }
},
    {
        timestamps: false
    })


Person.hasMany(Grade)
Project.hasMany(Grade)

const app = express()
app.use(bodyParser.json())

app.get('/create', async (req, res, next) => {
    try {
        await sequelize.sync({ force: true })
        res.status(201).json({ message: 'created' })
    } catch (err) {
        next(err)
    }
})

app.post('/people', async (req, res, next) => {
    try {
        await Person.create(req.body)
        res.status(201).json({ message: 'created' })
    } catch (err) {
        next(err)
    }
})


app.get('/people', async (req, res, next) => {
    try {
        const people = await Person.findAll()
        res.status(200).json(people)
    } catch (err) {
        next(err)
    }
})

app.post('/projects/:id/:personID', async (req, res, next) => {
    try {
        req.body.id=req.params.id
        req.body.personID=req.params.personID
        await Project.create(req.body)
        res.status(201).json({ message: 'created' })
    } catch (err) {
        next(err)
    }
})

app.put('/projects/:id/:version/:personID', async (req, res, next) => {
    try {
        let idProj = req.params.id
        let versiuneProj = req.params.version
        let idPers = req.params.personID
        console.log(req.body)
        const project = await Project.findAll({
          where: {
              id: idProj,
              version: versiuneProj,
              personID: idPers
          }
      })
      console.log(project)
      if(project.length != 0)
      {
          await project.save(req.body)
          res.status(200).json({message: "created"})
      }
      else
      {
        res.status(404).json({message: "not found"})
      }
    } catch (err) {
      next(err)
    }
  })

app.use((err, req, res, next) => {
    console.warn(err)
    res.status(500).json({ message: 'server error' })
  })

app.listen(8080)