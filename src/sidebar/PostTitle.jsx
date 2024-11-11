import React from 'react'
import Button from './Button'
import InputField from '../components/InputField'

const PostTitle = ({ handleClick }) => {
    return (
        <div>
            <h4 className='text-lg font-medium mb-2'>Salary</h4>
            <div className='mb-4'>
                <Button onClickHandler={handleClick} value="" title="Hourly" />
                <Button onClickHandler={handleClick} value="Monthly" title="Monthly" />
                <Button onClickHandler={handleClick} value="Yearly" title="Yearly" />
            </div>
        </div>
    )
}

export default PostTitle