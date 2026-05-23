import React from 'react'
import { Link } from 'react-router-dom'

const CourseCard = ({course, addToSaved}) => {
  return (
    <div>
        <h3>{course.title}</h3>
        <p>Category: {course.category}</p>
        <p>Duration: {course.duration}</p>
        <p>Level: {course.level}</p>
        <div>
            <Link to={`/courses/${course.id}`}>View Details</Link>
        </div>
        <button onClick={()=>addToSaved(course)}>Save Course</button>
    </div>
  )
}

export default CourseCard