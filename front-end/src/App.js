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
import TeacherProjectList from './TeacherProjectList'
import LivrabilAddForm from './LivrabilAddForm'
import GradeAddForm from './GradeAddForm'
import gradeStore from './GradeStore'
import btnStyle from './css/btnStyle.css'
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
      foreignProjects: [],
      projectsForTeacher: [],
      grades: [],
      registerType: 'Log In',
      projectStatus: 'myProjects',
      isCorrect: false,
      loggedPersonId: -1,
      loggedPersonType: '',
      selected: -1,
      link: 'www.youtube.com'
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
            if(person.type === 'TEACHER')
            {
              this.state.projects.forEach(project => {
                let proiectDummy
                let titleDeAdaugat = project.title + ', versiunea ' + project.version
                let contor = -1
                this.state.projectsForTeacher.forEach(projectDeVerificat => {
                  if(titleDeAdaugat === projectDeVerificat.title)
                  {
                    contor = 1
                  }
                })
                if(contor === -1)
                {
                  proiectDummy = {
                    id: project.id,
                    fileLink: project.fileLink,
                    version: project.version,
                    title: titleDeAdaugat,
                    deadline: project.deadline,
                    personID: project.personID
                  }
                  this.state.projectsForTeacher.push(proiectDummy)
                }
              })
              let numeProiect = ''
              let versiune = 0
              this.state.projectsForTeacher.forEach(project =>{
                this.state.projects.forEach(projectDeVerificat =>{
                  if(project.id === projectDeVerificat.id)
                  {
                    numeProiect = projectDeVerificat.title
                    versiune = projectDeVerificat.version
                  }
                })
                let grade = 0
                let sum = 0
                let count = 0
                let min = 11
                let max = 1
                this.state.grades.forEach(gradeDeAdaugat =>{
                  if(gradeDeAdaugat.projectTitle === numeProiect && gradeDeAdaugat.version === versiune)
                  {
                    count ++
                    sum = sum + gradeDeAdaugat.grade
                    if(gradeDeAdaugat.grade > max)
                    {
                      max = gradeDeAdaugat.grade
                    }
                    if(gradeDeAdaugat.grade < min)
                    {
                      min = gradeDeAdaugat.grade
                    }
                  }
                })
                if(count === 0)
                {
                  project.title = project.title + ", nu exista note"
                }
                else{
                  if(count >= 3){
                    sum = sum - max - min
                    grade = sum / (count - 2)
                  }
                  else{
                    grade = sum / count
                  }
                  project.title = project.title + ", nota: " + grade.toString()
                }
              })
            }
            else
            {
              this.state.projects.forEach(project => {
                if(project.personID === person.id && project.version === 1)
                {
                  this.state.myProjects.push(project)
                }
              })
              this.state.projects.forEach(project => {
                let contor = -1
                let proiectDummy
                let titleDeAdaugat = project.title + ', versiune ' + project.version
                this.state.myProjects.forEach(projectDeVerificat => {
                  if(project.title === projectDeVerificat.title)
                  {
                    contor = 1
                  }
                })
                this.state.foreignProjects.forEach(projectDeVerificat => {
                  if(titleDeAdaugat === projectDeVerificat.title)
                  {
                    contor = 1
                  }
                })
                if(contor === -1)
                {
                  proiectDummy = {
                    id: project.id,
                    fileLink: project.fileLink,
                    version: project.version,
                    title: titleDeAdaugat,
                    deadline: project.deadline,
                    personID: project.personID
                  }
                  this.state.foreignProjects.push(proiectDummy)
                }
              })
            }
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
        projectStatus: 'create',
        selected: -1
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
        projectStatus: 'myProjects',
        selected: -1
      })
    }
    this.gradeProjects=()=>{
      this.setState({
        projectStatus: 'gradeProjects',
        selected: -1
      })
    }
    this.addMembruToProject=()=>{
      if(selectedMemberId === -1)
      {
        alert('Trebuie selectat un membru pe care vreti sa il adaugati din lista')
      }
      else if(listaEchipa.length >= 3)
      {
        alert('Pot fi maxim 3 membrii intr-o echipa')
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
        check = false
        alert("Titlul nu trebuie sa fie gol")
      }
      let contor = -1
      this.state.projects.forEach(projectDeVerificat =>{
        if(project.title === projectDeVerificat.title)
        {
          check = false
          contor = 1
        }
      })
      if(contor === 1)
      {
        alert("Titlul proiectului trebuie sa fie unic")
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
            fileLink: project.link,
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
    this.Select = (id) =>
    {
      let linkDeAdaugat
      this.state.projects.forEach(project => {
        if(project.id === id)
        {
          linkDeAdaugat = project.fileLink
        }
      })
      this.setState({
        selected: id,
        link: linkDeAdaugat
      })
    }
    this.addLivrabil = (value) =>{
      let check = true
      if(value.link.toString().length === 0)
      {
        check = false
        alert('Link-ul trebuie completat')
      }
      if(check === true)
      {
        let numeProiect = ''
        this.state.projects.forEach(project => {
          if(project.id === this.state.selected)
          {
            numeProiect = project.title
          }
        })
        let contor = 1
        let index = this.state.projects.length-1
        let listaProiecteDeAdaugat = []
        while((contor === 1 || contor === 0) && index >= 0)
        {
          if(this.state.projects[index].title === numeProiect)
          {
            contor = 0
            let projectDeAdaugat = {
              fileLink: '',
              version: this.state.projects[index].version,
              title: numeProiect,
              deadline: this.state.projects[index].deadline,
              personID: this.state.projects[index].personID
            }
            listaProiecteDeAdaugat.push(projectDeAdaugat)
          }
          else if(contor === 0)
          {
            contor = 2
          }
          index--
        }
        listaProiecteDeAdaugat.forEach(project => {
          project.fileLink = value.link
          project.version++
          projectStore.addOne(project)
        })
      }
    }
    this.viziteazaLink=()=>{
      window.open(this.state.link.toString())
    }
    this.addGrade=(value)=>{
      let check = true
      if(isNaN(parseFloat(value.grade)))
      {
        check = false
        alert("Nota trebuie sa fie un numar")
      }
      else if(parseFloat(value.grade) < 1 || parseFloat(value.grade) > 10)
      {
        check = false
        alert("Nota trebuie sa fie intre 1 si 10")
      }
      if(check === true)
      {
        let numeProiect = ''
        let versionDeAdaugat = 0
        let deadlineDeParsat
        this.state.projects.forEach(project => {
          if(project.id === this.state.selected)
          {
            numeProiect = project.title
            versionDeAdaugat = project.version
            deadlineDeParsat = project.deadline
          }
        })
        if(Date.now - Date.parse(deadlineDeParsat) < 0)
        {
          alert("Nu a trecut deadline-ul inca")
        }
        else if (Date.now - Date.parse(deadlineDeParsat) > 2592000000)
        {
          alert("A trecut timpul destinat acordarii notelor")
        }
        else
        {
          let grade = 
          {
            projectTitle: numeProiect,
            version: versionDeAdaugat,
            grade: parseFloat(value.grade)
          }
          gradeStore.addOne(grade)
         }
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
        let listaProiecteDeNotat = []
        let listaProiecteForTeacher = []
        if(this.state.loggedPersonType === 'TEACHER')
        {
              projectStore.data.forEach(project => {
                let proiectDummy
                let titleDeAdaugat = project.title + ', versiunea ' + project.version
                let contor = -1
                listaProiecteForTeacher.forEach(projectDeVerificat => {
                  if(titleDeAdaugat === projectDeVerificat.title)
                  {
                    contor = 1
                  }
                })
                if(contor === -1)
                {
                  proiectDummy = {
                    id: project.id,
                    fileLink: project.fileLink,
                    version: project.version,
                    title: titleDeAdaugat,
                    deadline: project.deadline,
                    personID: project.personID
                  }
                  listaProiecteForTeacher.push(proiectDummy)
                }
              })
        }
        else 
        {
          projectStore.data.forEach(proiect => {
            if(proiect.personID === this.state.loggedPersonId && proiect.version === 1)
            {
              listaProiecteProprii.push(proiect)
            }
          })
        projectStore.data.forEach(proiect => {
          let proiectDummy
          let titleDeAdaugat = proiect.title + ', versiunea ' + proiect.version
          let contor = -1
          listaProiecteProprii.forEach(projectDeVerificat => {
            if(proiect.title === projectDeVerificat.title)
            {
              contor = 1
            }  
          })
          listaProiecteDeNotat.forEach(projectDeVerificat => {
            if(titleDeAdaugat === projectDeVerificat.title)
            {
              contor = 1
            }
          })
          if(contor === -1)
          {
            proiectDummy = {
              id: proiect.id,
              fileLink: proiect.fileLink,
              version: proiect.version,
              title: titleDeAdaugat,
              deadline: proiect.deadline,
              personID: proiect.personID
            }
            listaProiecteDeNotat.push(proiectDummy)
          }
        }) 
        }      
        this.setState({
          projects: projectStore.data,
          myProjects: listaProiecteProprii,
          foreignProjects: listaProiecteDeNotat,
          projectsForTeacher: listaProiecteForTeacher
        })
      }
      else
      {
        this.setState({
          projects:projectStore.data
        })
      }
    })
    gradeStore.getAll()
    gradeStore.emitter.addListener('GET_GRADES_SUCCES',()=>{
      let numeProiect = ''
      let versiune = 0
      this.state.projectsForTeacher.forEach(project =>{
        this.state.projects.forEach(projectDeVerificat =>{
          if(project.id === projectDeVerificat.id)
          {
            numeProiect = projectDeVerificat.title
            versiune = projectDeVerificat.version
          }
        })
        let grade = 0
        let sum = 0
        let count = 0
        let min = 11
        let max = 1
        this.state.grades.forEach(gradeDeAdaugat =>{
          if(gradeDeAdaugat.projectTitle === numeProiect && gradeDeAdaugat.version === versiune)
          {
            count ++
            sum = sum + gradeDeAdaugat.grade
            if(gradeDeAdaugat.grade > max)
            {
              max = gradeDeAdaugat.grade
            }
            if(gradeDeAdaugat.grade < min)
            {
              min = gradeDeAdaugat.grade
            }
          }
        })
        if(count === 0)
        {
          project.title = project.title + ", nu exista note"
        }
        else{
          if(count >= 3){
            sum = sum - max - min
            grade = sum / (count - 2)
          }
          else{
            grade = sum / count
          }
          project.title = project.title + ", nota: " + grade.toString()
        }
      })
      this.setState({
        grades:gradeStore.data
      })
    })
    setInterval(function(){
      store.getAll()
      projectStore.getAll()
      gradeStore.getAll()
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
      <StudentProjectList onCreateProject={this.createProject} onMyProjects={this.myProjects} onGradeProjects={this.gradeProjects}/>
      </div >
      <div style={{fontFamily:'Consolas',fontSize:16,fontWeight:'bold',fontStyle:'italic',marginTop:'10px',textAlign:'left'}}>Team members: </div>
      <br></br>
      <ul style={{fontFamily:'Consolas',fontSize:16,fontWeight:'bold',fontStyle:'italic',marginTop:'10px',width:'300px'}}>
        {listaEchipa.map(e=><li><Person item={e} key={e.id}/></li>)}
      </ul>
      <br/>
      <Select style={{width:'400px'}} name="membriiAditionali" id="membriiAditionali"  options={listaMembrii} onChange={this.selectieMembruEchipa}></Select>
      <br/>
      <input type="button" className='bCute' style={btnStyle} value="Add Member" onClick={this.addMembruToProject}></input>
      <br/>
      <br/>
      <div style={{display: 'block'}}>
      <ProjectAddForm onSaveProject={this.addProject}/>
      </div>
    </div>)
  }
  else if(this.state.isCorrect === true && this.state.projectStatus === 'myProjects' && this.state.loggedPersonType === 'STUDENT' && this.state.selected !== -1)
  {
    return (    
    <div>
      <div style={{fontFamily:'Consolas',fontSize:22,fontWeight:'bold',fontStyle:'italic',marginTop:'10px'}}>
      <StudentProjectList onCreateProject={this.createProject} onMyProjects={this.myProjects} onGradeProjects={this.gradeProjects}/>
      {
      this.state.myProjects.map(e=><Project item={e} key={e.id} onSelect={this.Select}/>)
    }
       <LivrabilAddForm onAddLivrabil={this.addLivrabil}/>
      </div>,
    </div>)
  }
  else if(this.state.isCorrect === true && this.state.projectStatus === 'myProjects' && this.state.loggedPersonType === 'STUDENT')
  {
    return (    <div>
      <div style={{fontFamily:'Consolas',fontSize:22,fontWeight:'bold',fontStyle:'italic',marginTop:'10px'}}>
      <StudentProjectList onCreateProject={this.createProject} onMyProjects={this.myProjects} onGradeProjects={this.gradeProjects}/>
      {
      this.state.myProjects.map(e=><Project item={e} key={e.id} onSelect={this.Select}/>)
    }
      </div>
    </div>)
  }
  else if(this.state.isCorrect === true && this.state.projectStatus === 'gradeProjects' && this.state.loggedPersonType === 'STUDENT' && this.state.selected !== -1)
  {
    return (    <div>
      <div style={{fontFamily:'Consolas',fontSize:22,fontWeight:'bold',fontStyle:'italic',marginTop:'10px'}}>
      <StudentProjectList onCreateProject={this.createProject} onMyProjects={this.myProjects} onGradeProjects={this.gradeProjects}/>
      {
      this.state.foreignProjects.map(e=><Project item={e} key={e.id} onSelect={this.Select}/>)
    }
    
    <input type='button' value='View Project' className='bCute' style={btnStyle} onClick={this.viziteazaLink}/>
    <br></br>
    <GradeAddForm onAddGrade={this.addGrade}/>
      </div>
    </div>)
  }
  else if(this.state.isCorrect === true && this.state.projectStatus === 'gradeProjects' && this.state.loggedPersonType === 'STUDENT')
  {
    return (    <div>
      <div style={{fontFamily:'Consolas',fontSize:22,fontWeight:'bold',fontStyle:'italic',marginTop:'10px'}}>
      <StudentProjectList onCreateProject={this.createProject} onMyProjects={this.myProjects} onGradeProjects={this.gradeProjects}/>
      {
      this.state.foreignProjects.map(e=><Project item={e} key={e.id} onSelect={this.Select}/>)
    }
      </div>
    </div>)
  }
  else if(this.state.isCorrect === true && this.state.loggedPersonType === 'TEACHER')
  {
    return(
      <div style={{fontFamily:'Consolas',fontSize:22,fontWeight:'bold',fontStyle:'italic',marginTop:'10px'}}>
         <TeacherProjectList style={btnStyle}/>
        {
          this.state.projectsForTeacher.map(e=><Project item={e} key={e.id} onSelect={this.Select}/>)
        }  
      </div>
    )
  }
}
}

export default App;
