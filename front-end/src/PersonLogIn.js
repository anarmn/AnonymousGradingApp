import React from 'react'
import styleLogin from './css/loginCSS.css'
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
      <div id='mainDivPersonLogin' style={styleLogin}>
          <div>
          <label htmlFor='username' className='labelPersonLogin'>Username</label>
          <input type='text' className='tbPersonLogin' name='username' id='username' value={this.state.username}
           onChange={this.handleChange}></input>
          </div>
          
         <div>
         <label htmlFor='password' className='labelPersonLogin'>Password</label>
          <input type='text' className='tbPersonLogin' name='password' id='password' value={this.state.password}
           onChange={this.handleChange}></input>
        </div>
          <div style={{display:'block'}}>
          <input type='button' id='bl1' value='Log in' onClick={this.logIn}></input>
            <input type='button' id='bl2' value='Sign in' onClick={this.signIn}></input>
          </div>
            
      </div>
        )   
    }
}

export default PersonLogIn