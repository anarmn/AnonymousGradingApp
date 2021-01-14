import React from 'react'

class StudentProjectList extends React.Component{
    //punem ceva in stare
    constructor (props){
        super(props)
        this.state={
        }
        this.proiecteCreare=()=>{
            this.props.onCreateProject({
            })
        }
        this.myProjects=()=>{
            this.props.onMyProjects({
            })
        }
        this.GradeProjects=()=>{
            this.props.onGradeProjects({
            })
        }
        //cum fac ca ceva ce se schimba in controale sa ajunga in stare=>ONCHANGE
this.handleChange=(evt)=>{
    this.setState({
        //evt are un target=> de unde a pornit evenimentul
        //target imi permite sa accesez propr elem resp
        [evt.target.name]:evt.target.value
    })
}
    }

    render(){
        return(
      <div style={{width: 300, border: 5 }}>
          <input type='button' value='proiecte' onClick={this.proiecteCreare} style={{width: 300}}></input>
          <br/>
            <input type='button' value='My projects' onClick={this.myProjects} style={{width: 150}}></input>
            <input type='button' value='Grade projects' onClick={this.gradeProjects} style={{width: 150}}></input>
      </div>
        )   
    }
}

export default StudentProjectList