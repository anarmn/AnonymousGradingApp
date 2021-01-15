import React from 'react'

class StudentProjectList extends React.Component{
    //punem ceva in stare
    constructor (props){
        super(props)
        this.state={
        }
    }

    render(){
        return(
      <div style={{width: 300, border: 5 }}>
          <input type='button' value='proiecte' style={{width: 300}}></input>
      </div>
        )   
    }
}

export default StudentProjectList