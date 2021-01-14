import React from 'react'

class Project extends React.Component{
render(){
    const {item}=this.props
    return (
        <div>
            <span>{item.title}</span>
        </div>
    )
}
}
export default Project