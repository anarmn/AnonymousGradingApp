import React from 'react'

class PersonAddForm extends React.Component{
    //punem ceva in stare
    constructor (props){
        super(props)
        this.state={
            type:'STUDENT',
            name: 'Name',
            group: 'Group',
            series: 'Series',
            username: 'Username',
            password: 'Password'
        }

        this.add=()=>{
            //foloseste ce am primit de la parent
            this.props.onAdd({
                type: this.state.type,
                name: this.state.name,
                group: this.state.group,
                series: this.state.series,
                username: this.state.username,
                password: this.state.password
            })
        }
        this.cancel=()=>{
            this.props.onCancel({
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
          <label htmlFor='type'>Type: </label>
          <input type='text' name='type' id='type' value={this.state.type}
        onChange={this.handleChange}></input>
          <br/>
          <label htmlFor='name'>Name: </label>
          <input type='text' name='name' id='name' value={this.state.name}
           onChange={this.handleChange}></input>
          <br/>
          <label htmlFor='group'>Group: </label>
          <input type='text' name='group' id='group' value={this.state.group}
           onChange={this.handleChange}></input>
          <br/>
          <label htmlFor='series'>Series: </label>
          <input type='text' name='series' id='series' value={this.state.series}
           onChange={this.handleChange}></input>
          <br/>
          <label htmlFor='username'>Username: </label>
          <input type='text' name='username' id='username' value={this.state.username}
           onChange={this.handleChange}></input>
         <br/>
          <label htmlFor='password'>Password: </label>
          <input type='text' name='password' id='password' value={this.state.password}
           onChange={this.handleChange}></input>
            <br/>
            <input type='button' value='add' onClick={this.add}></input>
            <input type='button' value='cancel' onClick={this.cancel}></input>
      </div>
        )   
    }
}

export default PersonAddForm