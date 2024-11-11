import React from 'react'
import EmploymentType from './EmploymentType'
import JobPostingData from './JobPostingData'
import Location from './Location'
import Salary from './Salary'
import WorkExperience from './WorkExperience'
import PostTitle from '../../sidebar/PostTitle'

const filter = ({ handleChange, handleClick }) => {
    return (
        <div className='space-y-5'>
            <h3 className='text-lg font-bold mb-2'>Filters</h3>
            <PostTitle handleClick={handleClick} />
            <JobPostingData handleChange={handleChange} />
        </div>
    )
}

export default filters