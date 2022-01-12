import React from 'react'

export default function Pagination({ postsPerPage, totalPosts, paginate }) {
    const pageNumbers = [];

    for (let i=1; i<= Math.ceil(totalPosts/postsPerPage); i++ ){
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(num => (
                    <li key={num} className="page-item">
                        <a onClick={() => { paginate(num) }} className="page-link">{num}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
