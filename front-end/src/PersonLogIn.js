import React from 'react'

class PersonLogIn extends React.Component{
    //punem ceva in stare
    constructor (props){
        super(props)
        this.state={
            username: '',
            password: ''
        }

        this.logIn=()=>{
            //foloseste ce am primit de la parent
            this.props.onLog({
                username: this.state.username,
                password: this.state.password
            })
        }
        this.signIn=()=>{
            //foloseste ce am primit de la parent
            this.props.onSign({
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
          <label htmlFor='username'>Username</label>
          <input type='text' name='username' id='username' value={this.state.username}
           onChange={this.handleChange}></input>
         <br/>
          <label htmlFor='password'>Password</label>
          <input type='text' name='password' id='password' value={this.state.password}
           onChange={this.handleChange}></input>
            <br/>
            <input type='button' value='Log in' onClick={this.logIn}></input>
            <input type='button' value='Sign in' onClick={this.signIn}></input>
      </div>
        )   
    }
}

export default PersonLogIn