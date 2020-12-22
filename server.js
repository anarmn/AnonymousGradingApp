const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const mysql = require('mysql2/promise')

let conn

//Se creaza baza de date in caz ca aceasta nu exista
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

//Se creeaza o instanta sequelize ce foloseste baza de date creata de noi
const sequelize = new Sequelize('anonymous_grading_app', 'root', 'CopilParinteBaba20', {
    dialect: 'mysql'
})

//Se creeaza tabela persoane si se definesc campurile aferente
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

//Se creeaza tabela proiecte si se definesc campurile aferente
//Cheia primara este compusa pentru a putea distinge intre versiuni si membrii ai echipei
const Project = sequelize.define('project', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
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
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    deadline: {
        type: Sequelize.DATE,
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

//Se creeaza tabela note si se definesc campurile aferente
//Cheia primara este compusa pentru a putea distinge intre versiuni si membrii ai juriului
const Grade = sequelize.define('grade', {
    projectID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    version: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    judgeID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    grade: {
        type: Sequelize.DOUBLE,
        allowNull: true
    }
},
    {
        timestamps: false
    })



const app = express()
app.use(bodyParser.json())

//Se creaza tabelele definite anterior in caz ca acestea nu exista
app.get('/create', async (req, res, next) => {
    try {
        await sequelize.sync({ alter: true })
        res.status(201).json({ message: 'created' })
    } catch (err) {
        next(err)
    }
})

//Se populeaza o intrare in tabela de persoane
app.post('/people', async (req, res, next) => {
    try {
        await Person.create(req.body)
        res.status(201).json({ message: 'created' })
    } catch (err) {
        next(err)
    }
})

//Se obtine lista de persoane
app.get('/people', async (req, res, next) => {
    try {
        const people = await Person.findAll()
        res.status(200).json(people)
    } catch (err) {
        next(err)
    }
})

//Se populeaza o intrare in tabela proiecte
app.post('/projects', async (req, res, next) => {
    try {
        await Project.create(req.body)
        res.status(201).json({ message: 'created' })
    } catch (err) {
        next(err)
    }
})

//Se actualizeaza datele unei intrari din tabela de proiecte
app.put('/projects/:id/:version/:personID', async (req, res, next) => {
    try {
        let projID = req.params.id
        let versionID = req.params.version
        let persID = req.params.personID
        await Project.update(req.body, {
            where: {
                id: projID,
                version: versionID,
                personID: persID
            }
        })
        res.status(200).json({ message: "updated" })
    } catch (err) {
        next(err)
    }
})

//Se obtine lista de proiecte
app.get('/projects', async (req, res, next) => {
    try {
        const projects = await Project.findAll()
        res.status(200).json(projects)
    } catch (err) {
        next(err)
    }
})

//Se obtine lista de proiecte pentru o anumita persoana
app.get('/projects/:personID', async (req, res, next) => {
    try {
        let persID = req.params.personID
        const projects = await Project.findAll({
            where:
            {
                personID: persID
            }
        })
        res.status(200).json(projects)
    } catch (err) {
        next(err)
    }
})

//Se populeaza o intrare in tabela de note
app.post('/grades', async (req, res, next) => {
    try {
        await Grade.create(req.body)
        res.status(201).json({ message: 'created' })
    } catch (err) {
        next(err)
    }
})

//Se obtine lista de note ale unui proiect cu o anumita versiune
app.get('/grades/:projectID/:version', async (req, res, next) => {
    try {
        let projID = req.params.projectID
        let versionID = req.params.version
        const grades = await Grade.findAll({
            where:
            {
                projectID: projID,
                version: versionID
            }
        })
        res.status(200).json(grades)
    } catch (err) {
        next(err)
    }
})

//Se obtine lista de proiecte de evaluat ale unui evaluator
app.get('/grades/:judgeID', async (req, res, next) => {
    try {
        let judge = req.params.judgeID
        const grades = await Grade.findAll({
            where:
            {
                judgeID: judge
            }
        })
        res.status(200).json(grades)
    } catch (err) {
        next(err)
    }
})

//Se modifica nota unui evaluator pentru un anumit proiect cu o anumita versiune
app.put('/grades/:projectID/:version/:judgeID', async (req, res, next) => {
    try {
        let projID = req.params.projectID
        let versionID = req.params.version
        let judge = req.params.judgeID
        await Grade.update(req.body, {
            where: {
                projectID: projID,
                version: versionID,
                judgeID: judge
            }
        })
        res.status(200).json({ message: "updated" })
    } catch (err) {
        next(err)
    }
})

//Aici revin toate erorile
app.use((err, req, res, next) => {
    console.warn(err)
    res.status(500).json({ message: 'server error' })
})

//Am definit portul pe care asculta aplicatia
app.listen(8080)