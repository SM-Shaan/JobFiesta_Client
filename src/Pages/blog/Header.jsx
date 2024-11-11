import React from 'react'
import Button from '../../sidebar/Button'

const Header = ({ handleClick }) => {
    return (
        <div>
            <div className='mb-4'>
                <Button onClickHandler={handleClick} value="" title="All" />
                <Button onClickHandler={handleClick} value="Interviews" title="Interviews" />
                <Button onClickHandler={handleClick} value="Internship" title="Internship" />
                <Button onClickHandler={handleClick} value="Remote Jobs" title="Remote Jobs" />
                <Button onClickHandler={handleClick} value="Teaching" title="Teaching" />
                <Button onClickHandler={handleClick} value="Freelancing" title="Freelancing" />
                <Button onClickHandler={handleClick} value="Resume Writing" title="Resume Writing" />
                <Button onClickHandler={handleClick} value="Networking" title="Networking" />
                <Button onClickHandler={handleClick} value="Professional Development" title="Professional Development" />
            </div>
        </div>
    )
}

export default Header