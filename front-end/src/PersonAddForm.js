import React from 'react'
import sStyle from './css/signinCSS.css'
class PersonAddForm extends React.Component{
    //punem ceva in stare
    constructor (props){
        super(props)
        this.state={
            type:'STUDENT',
            name: '',
            group: '1',
            series: 'A',
            username: '',
            password: '',
            disabled:false
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
    if (evt.target.name==='type' && evt.target.value==='TEACHER'){
           this.state.disabled=true;
    }
    if (evt.target.name==='type' && evt.target.value==='STUDENT'){
        this.state.disabled=false;
}

}
    }

    render(){
        return(
      <div id='mainDivSignin' style={{sStyle}}>
          <div>

        
        <div>
        <label className='lSignin' htmlFor='type'>Type: </label>
          <select id='type' className='cSignin' value={this.state.type} name='type' onChange={this.handleChange} >
                    <option value="STUDENT">STUDENT</option>
                    <option value="TEACHER">TEACHER</option>
                    
        </select>
       </div>
        <br/>
        <div>
        <label className='lSignin' htmlFor='name'>Name: </label>
          <input type='text'   className='cSignin' name='name' id='name' value={this.state.name}
           onChange={this.handleChange}></input>
        </div>
       
        <br/>
        <div>
        <label className='lSignin' htmlFor='group'>Group: </label>
          <select id='group' className='cSignin' value={this.state.group} name='group' onChange={this.handleChange} disabled={this.state.disabled} >
                    <option value="1">Grupa 1</option>
                    <option value="2">Grupa 2</option>
                    <option value="3">Grupa 3</option>
                    <option value="4">Grupa 4</option>
        </select>
        </div>
         <br/>
         <div>
         <label className='lSignin' htmlFor='series'>Series: </label>
          <select   id='series' className='cSignin' value={this.state.series} name='series' onChange={this.handleChange} disabled={this.state.disabled} >
                    <option value="A">Seria A</option>
                    <option value="B">Seria B</option>
                    <option value="C">Seria C</option>
                    <option value="D">Seria D</option>
        </select>
         </div>
         <br/>
         <div>
         <label className='lSignin' htmlFor='username'>Username: </label>
          <input type='text' className='cSignin' name='username' id='username' value={this.state.username}
           onChange={this.handleChange}></input>
         </div>
         <br/>
         <div>
         <label className='lSignin' htmlFor='password'>Password: </label>
          <input type='text' className='cSignin' name='password' id='password' value={this.state.password}
           onChange={this.handleChange}></input>
         </div>
         </div>
          <br/>
          <div>
          <input id='bAdd' type='button' value='Add' onClick={this.add}></input>
            <input id='bCancel' type='button' value='Cancel' onClick={this.cancel}></input>
          </div>
            
      </div>
        )   
    }
}

export default PersonAddForm