import React from 'react'
import { courseData } from '../data/courseData';
import { Link } from 'react-router-dom';

const Courses = () => {
  return (
    <div className="course-header">
        <h1 className='header'>Courses</h1>
        <div className="course-list">
            {courseData.map(course => (
                <div className="course-card" key={course.id}>
                    <h2>{course.title}</h2>
                    <p>{course.duration}</p>
                    <Link to={`/courses/${course.id}`}>View Details</Link>
                </div>
                
            ))}
        </div>
    </div>
  )
}

export default Courses