import React from 'react'

class ProjectAddForm extends React.Component{
    //punem ceva in stare
    constructor (props){
        super(props)
        this.state={
            title: 'Project title',
            link: 'www.youtube.com',
            year: 'Year',
            month: 'Month',
            day: 'Day',
            hour: 'Hour',
            minutes: 'Minutes',
            seconds: 'Seconds'
        }

        this.saveProject=()=>{
            this.props.onSaveProject({
                title: this.state.title,
                link: this.state.link,
                year: this.state.year,
                month: this.state.month,
                day: this.state.day,
                hour: this.state.hour,
                minutes: this.state.minutes,
                seconds: this.state.seconds
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
          <label htmlFor='title'>Title: </label>
          <input type='text' name='title' id='title' value={this.state.title}
        onChange={this.handleChange}></input>
          <br/>
          <label htmlFor='link'>Link: </label>
          <input type='text' name='link' id='link' value={this.state.link}
        onChange={this.handleChange}></input>
          <br/>
          <label htmlFor='year'>Year: </label>
          <input type='text' name='year' id='year' value={this.state.year}     
        onChange={this.handleChange}></input>
          <br/>
          <label htmlFor='month'>Month: </label>
          <input type='text' name='month' id='month' value={this.state.month}     
        onChange={this.handleChange}></input>
          <br/>
          <label htmlFor='day'>Day: </label>
          <input type='text' name='day' id='day' value={this.state.day}     
        onChange={this.handleChange}></input>
          <br/>
          <label htmlFor='hour'>Hour: </label>
          <input type='text' name='hour' id='gour' value={this.state.hour}     
        onChange={this.handleChange}></input>
          <br/>
          <label htmlFor='minutes'>Minutes: </label>
          <input type='text' name='minutes' id='minutes' value={this.state.minutes}     
        onChange={this.handleChange}></input>
          <br/>
          <label htmlFor='seconds'>Seconds: </label>
          <input type='text' name='seconds' id='seconds' value={this.state.seconds}     
        onChange={this.handleChange}></input>
          <br/>
          <input type='button' value='Create Project' onClick={this.saveProject}></input>
      </div>
        )   
    }
}

export default ProjectAddForm