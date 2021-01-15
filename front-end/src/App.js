// import './App.css';
import React from 'react'
import store from './PersonStore'
import PersonAddForm from './PersonAddForm'
import PersonLogIn from './PersonLogIn'
import Person from './Person'
import StudentProjectList from './StudentProjectList'
import ProjectAddForm from './ProjectAddForm'
import projectStore from './ProjectStore'
import Project from './Project'
import Select from 'react-select'
let listaMembrii = []
let listaEchipa = []
let selectedMemberId = -1

class App extends React.Component{
  constructor(){
    super()
    this.state={
      people:[],
      projects: [],
      myProjects: [],
      registerType: 'Log In',
      projectStatus: 'myProjects',
      isCorrect: false,
      loggedPersonId: -1,
      loggedPersonType: ''
    }
    this.logIn =(value)=>
    {
        let check = false
        this.state.people.forEach(person => {
          if(person.username === value.username && person.password === value.password)
          {
            this.setState({
              isCorrect: true,
              loggedPersonId: person.id,
              loggedPersonType: person.type
            })
            this.state.projects.forEach(project => {
              if(project.personID === person.id && project.version === 1)
              {
                this.state.myProjects.push(project)
              }
            })
            check = true
          }
        })
        if(check === false)
        {
          alert('Nu sunt corecte datele introduse de logare.')
        }
    }
    this.signIn =()=>{
      this.setState({
        registerType: 'Sign In'
      })
    }
    this.add=(person)=>{
      let check = true
      if(person.type !== 'TEACHER' && person.type !== 'STUDENT')
      {
        check = false
        alert('Tipul trebuie sa fie STUDENT sau TEACHER')
      }
      let grupa = parseInt(person.group)
      let serie = parseInt(person.series)
      if(isNaN(grupa) && person.type === 'STUDENT')
      {
        check = false
        alert('Grupa trebuie sa fie numerica')
      }

      if(!isNaN(serie) && person.type === 'STUDENT')
      {
        check = false
        alert('Seria trebuie sa fie litera')
      }
      if(person.group.toString().length === 0 && person.type === 'STUDENT')
      {
        check = false
        alert('Grupa trebuie completata')
      }

      if(person.series.toString().length !== 1 && person.type === 'STUDENT')
      {
        check = false
        alert('Seria trebuie sa fie aiba o singura litera')
      }
      this.state.people.forEach(existentPerson => {
        if(person.username === existentPerson.username)
        {
          check = false
          alert('Username-ul exista deja')
        }
      })
      if(check === true)
      {
        person.series = person.series.toUpperCase()
        person.group = grupa
        if(person.type === 'TEACHER')
        {
          person.group = 0
          person.series = ''
        }
        store.addOne(person)
        this.state.people.push(person)
        this.setState({
          registerType: 'Log In'
        })
      }
    }
    this.cancel=()=>{
      this.setState({
        registerType: 'Log In'
      })
    }
    this.createProject=()=>{
      this.setState({
        projectStatus: 'create'
      })
      listaEchipa = []
      listaMembrii = []
      selectedMemberId = -1
      this.state.people.forEach(person=>{
        if(this.state.loggedPersonId !== person.id && person.type !== 'TEACHER')
        {
          let l = person.name + ", grupa " + person.group + ", seria " + person.series
          let v = person.id
          let item = {
            value: v,
            label: l
          }
          listaMembrii.push(item)
        }
        if(this.state.loggedPersonId === person.id)
        {
          listaEchipa.push(person)
        }
      })
    }
    this.selectieMembruEchipa=(evt)=>
    {
        selectedMemberId = evt.value
    }
    this.myProjects=()=>{
      this.setState({
        projectStatus: 'myProjects'
      })
    }
    this.gradeProjects=()=>{
      this.setState({
        projectStatus: 'gradeProjects'
      })
    }
    this.addMembruToProject=()=>{
      if(selectedMemberId === -1)
      {
        alert('Trebuie selectat un membru pe care vreti sa il adaugati din lista')
      }
      else
      {
        this.state.people.forEach(person =>{
          if(person.id === selectedMemberId)
          {
            listaEchipa.push(person)
          }
        })
        let contor = 0
        let index = 0
        listaMembrii.forEach(item => {
          if(item.value === selectedMemberId)
          {
            index = contor
          }
          contor++
        })
        listaMembrii.splice(index, 1)
        this.setState({
        })
        selectedMemberId = -1
      }
    }
    this.addProject=(project)=>{
      let check = true
      let an = parseInt(project.year)
      let luna = parseInt(project.month)
      let zi = parseInt(project.day)
      let ora = parseInt(project.hour)
      let minute = parseInt(project.minutes)
      let secunde = parseInt(project.seconds)
      if(project.title.toString().length === 0)
      {
        alert("Titlul nu trebuie sa fie gol")
      }
      if(isNaN(an))
      {
        check = false
        alert("Anul trebuie sa fie format din cifre")
      } 
      else if(an < 0 )
      {
        check = false
        alert("Anul trebuie sa fie un numar pozitiv")
      }
      else if(an.toString().length !== 4 || an < 1000)
      {
        check = false
        alert("Anul trebuie sa aiba 4 cifre si sa fie mai mare sau egal cu 1000")
      }
      if(isNaN(luna))
      {
        check = false
        alert("Luna trebuie sa fie formata din cifre")
      } 
      else if(luna <= 0 )
      {
        check = false
        alert("Luna trebuie sa fie un numar pozitiv mai mare ca 0")
      }
      else if(luna > 12)
      {
        check = false
        alert("Luna trebuie sa fie intre 1 si 12")
      }
      if(isNaN(zi))
      {
        check = false
        alert("Ziua trebuie sa fie formata din cifre")
      } 
      else if(zi <= 0 )
      {
        check = false
        alert("Ziua trebuie sa fie un numar pozitiv mai mare ca 0")
      }
      else if(zi > 31)
      {
        check = false
        alert("Ziua trebuie sa fie intre 1 si 31")
      }
      if(isNaN(ora))
      {
        check = false
        alert("Ora trebuie sa fie formata din cifre")
      } 
      else if(ora < 0 )
      {
        check = false
        alert("Ora trebuie sa fie un numar pozitiv")
      }
      else if(ora > 23)
      {
        check = false
        alert("Ora trebuie sa fie intre 0 si 23")
      }
      if(isNaN(minute))
      {
        check = false
        alert("Minutele trebuie sa fie formate din cifre")
      } 
      else if(minute < 0 )
      {
        check = false
        alert("Minutele trebuie sa fie un numar pozitiv")
      }
      else if(minute > 59)
      {
        check = false
        alert("Minutele trebuie sa fie intre 0 si 59")
      }
      if(isNaN(secunde))
      {
        check = false
        alert("Secundele trebuie sa fie formate din cifre")
      } 
      else if(secunde < 0 )
      {
        check = false
        alert("Secundele trebuie sa fie un numar pozitiv")
      }
      else if(secunde > 59)
      {
        check = false
        alert("Secundele trebuie sa fie intre 0 si 59")
      }
      if(check === true)
      {
        let deadlineDeAdaugat = ''
        if(luna.toString().length === 1)
        {
          luna = '0' + luna
        }
        if(zi.toString().length === 1)
        {
          zi = '0' + zi
        }
        if(ora.toString().length === 1)
        {
          ora = '0' + ora
        }
        if(minute.toString().length === 1)
        {
          minute = '0' + minute
        }
        if(secunde.toString().length === 1)
        {
          secunde = '0' + secunde
        }
        deadlineDeAdaugat = an + '-' + luna + '-' + zi + ' ' + ora + ':' + minute + ':' + secunde
        listaEchipa.forEach(membru => { 
          let proiectDeAdaugat ={
            version: 1,
            title: project.title,
            deadline: deadlineDeAdaugat,
            personID: membru.id
          }
          projectStore.addOne(proiectDeAdaugat)
        })
        this.setState({
          projectStatus: 'myProjects'
        })
      }
    }
  }

  componentDidMount(){
    //iau persoane de pe server 
  //store se ocupa cu comunicarea cu serverul
    store.getAll()
    store.emitter.addListener('GET_PEOPLE_SUCCES',()=>{
      this.setState({
        people:store.data
      })
    })
    projectStore.getAll()
    projectStore.emitter.addListener('GET_PROJECTS_SUCCES',()=>{
      if(this.state.loggedPersonId !== -1)
      {
        let listaProiecteProprii = []
        projectStore.data.forEach(proiect => {
            if(proiect.personID === this.state.loggedPersonId && proiect.version === 1)
            {
              listaProiecteProprii.push(proiect)
            }
        })
        this.setState({
          projects:projectStore.data,
          myProjects: listaProiecteProprii
        })
      }
      else
      {
        this.setState({
          projects:projectStore.data
        })
      }
    })
    setInterval(function(){
      projectStore.getAll()
    },10000)
  }
render(){
  if((this.state.registerType === 'Log In') && (this.state.isCorrect === false))
  {
    return (
      <div>
        <PersonLogIn onLog = {this.logIn} onSign = {this.signIn}/>
        </div>
    )
  }
  else if(this.state.registerType === 'Sign In'&& (this.state.isCorrect === false))
  {return (
  <div>
{/* ii dau fct add ca proprietate */}
    <PersonAddForm onAdd={this.add} onCancel={this.cancel}/>
  </div>
  )
  }
  else if(this.state.isCorrect === true && this.state.projectStatus === 'create' && this.state.loggedPersonType === 'STUDENT')
  {
    return (    <div>
      <div style={{display: 'block'}}>
      <StudentProjectList onCreateProject={this.createProject} onMyProjects={this.myProjects}/>
      </div>
      <div>Membrii echipei: </div>
      <ul>
        {listaEchipa.map(e=><li><Person item={e} key={e.id}/></li>)}
      </ul>
      <br/>
      <Select name="membriiAditionali" id="membriiAditionali" options={listaMembrii} onChange={this.selectieMembruEchipa}></Select>
      <br/>
      <input type="button" value="addMembruToProject" onClick={this.addMembruToProject}></input>
      <br/>
      <br/>
      <div style={{display: 'block'}}>
      <ProjectAddForm onSaveProject={this.addProject}/>
      </div>
    </div>)
  }
  else if(this.state.isCorrect === true && this.state.projectStatus === 'myProjects' && this.state.loggedPersonType === 'STUDENT')
  {
    return (    <div>
      <div style={{display: 'block'}}>
      <StudentProjectList onCreateProject={this.createProject} onMyProjects={this.myProjects}/>
      {
      this.state.myProjects.map(e=><Project item={e} key={e.id}/>)
    }
      </div>
    </div>)
  }
}
}

export default App;
