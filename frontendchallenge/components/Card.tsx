import React from 'react'
import Link from 'next/link';
import blogPost from '../pages/blogPost';

export default function Card(props) {
    const {
        authors,
        comments,
        createdAt,
        description,
        id,
        title,
        updatedAt,
    } = props;

    return (
        <div className="col-4">
            <article className="card bg-theme">
                <Link href={{pathname: `/blogPost`, query: {id}}}>
                    <div className="position-relative">
                        <img className="card-img img-cover dynamic-cover-img-size" src="https://picsum.photos/200" alt="an image"/>
                        <div className="cover-text w-100">
                            <span className="px-1">
                                <i className="fas fa-user"></i>
                                <span>Unknown User</span>
                            </span>
                            <br/>
                            <span className="px-1">
                                <small>{ new Date(createdAt).toDateString() }</small>
                            </span>
                        </div>
                    </div>
                </Link>
                <div className="p-2">
                    <h6 className="text-truncate mb-0">
                        <a className="primary-color" href="/blogPost">
                            {title}
                        </a>
                    </h6>
                </div>
            </article>
        </div>
    )
}
