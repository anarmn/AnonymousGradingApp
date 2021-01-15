import React from 'react'

class Project extends React.Component{
render(){
    const {item}=this.props
    this.Select = () => {
        this.props.onSelect(this.props.item.id)
    }
    return (
        <div>
            <span onClick={this.Select}>{item.title}</span>
        </div>
    )
}
}
export default Project