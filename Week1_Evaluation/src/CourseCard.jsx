import React from 'react'
import { Link } from 'react-router-dom'

const CourseCard = ({course, addToSaved}) => {
  return (
    <div style={{
        backgroundColor: "#dcdcdc",
        padding: "10px",
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    }}>
        <h3>{course.name}</h3>
        <p>Category: {course.category}</p>
        <p>Duration: {course.duration}</p>
        <p>Level: {course.level}</p>
        <div>
            <Link to={`/courses/${course.id}`}>View Details</Link>
        </div>
        <button style={{
            backgroundColor: "#6d9aca",
            padding: "5px",
            marginTop: "10px",
            borderRadius: "5px",
            cursor: "pointer"
            
        }} onClick={()=>addToSaved(course)}>Save Course</button>
    </div>
  )
}

export default CourseCard