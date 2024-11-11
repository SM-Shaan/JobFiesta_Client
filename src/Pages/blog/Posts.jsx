import React from 'react'

const Posts = ({ result }) => {
    return (
        <>
            <div>
                <h3 className="text-lg font-bold mb-1">{result.length} Posts</h3>
            </div>
            <section className='posts'>
                <div className='container posts__container'>
                    {result}
                </div>
            </section>
        </>
    );
};

export default Posts;