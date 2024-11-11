/* eslint-disable react/prop-types */
import React from 'react'

const Card1 = ({ item }) => {
    return (
        <div className='card w-96 bg-base-100 shadow-xl'>
            <figure>
                <img src={item.companyLogo} alt='company' />
            </figure>
            <div className='card-body'>
                <h2 className='card-title'>{item.companyName}</h2>
                <p>Ding dong di ding dong di doo</p>
                <div className='card-actions justify-end'>
                    <button className='btn bg-blue btn-primary'>See now</button>
                </div>
            </div>
        </div>
    )
}

export default Card1