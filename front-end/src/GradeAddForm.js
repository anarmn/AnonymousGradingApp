import React from 'react'

class GradeAddForm extends React.Component{
    //punem ceva in stare
    constructor (props){
        super(props)
        this.state={
            grade: 1
        }
        this.addGrade=()=>{
            this.props.onAddGrade({
                grade: this.state.grade
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
      <div>
          <label htmlFor='grade'>Nota: </label>
          <input type='text' name='grade' id='grade' value={this.state.grade}
        onChange={this.handleChange}></input>
          <br/>
          <input type='button' value='Adauga nota' onClick={this.addGrade}></input>
      </div>
        )   
    }
}

export default GradeAddForm