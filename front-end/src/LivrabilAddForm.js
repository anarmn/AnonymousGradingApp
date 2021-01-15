import React from 'react'

class LivrabilAddForm extends React.Component{
    //punem ceva in stare
    constructor (props){
        super(props)
        this.state={
            link: ''
        }

        this.addLivrabil=()=>{
            this.props.onAddLivrabil({
                link: this.state.link
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
          <label htmlFor='link'>Link: </label>
          <input type='text' name='link' id='link' value={this.state.link}
        onChange={this.handleChange}></input>
          <br/>
          <input type='button' value='Adauga livrabil' onClick={this.addLivrabil}></input>
      </div>
        )   
    }
}

export default LivrabilAddForm