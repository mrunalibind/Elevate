import React from 'react'
import { useParams } from 'react-router-dom';
import { courseData } from '../data/courseData';

const CourseDetails = () => {
    const {courseId} = useParams();
    const course = courseData.find(c => c.id === parseInt(courseId));
  return (
    <div className="course-detail-card">
      <h2>{course.title}</h2>
      <p>Duration: {course.duration}</p>
      <p>Instructor: {course.instructor}</p>
      <p>Description: {course.description}</p>
    </div>
  )
}

export default CourseDetails