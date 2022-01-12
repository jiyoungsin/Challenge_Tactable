import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

// @TODO Abstract interface to new file.
interface BlogPost {
    title: string,
    description: string,
    createdAt: string,
    updatedAt: string,
    id: string,
    authors: [
      {
        createdAt: string,
        name: string,
        avatar: string,
        updatedAt: string,
        id: string,
        postId: string,
      }
    ],
    comments: [
      {
        createdAt: string,
        title: string,
        description: string,
        updatedAt: string,
        id: string,
        postId: string,
      }
    ]
}
interface commentDetails {
    createdAt: string,
    title: string,
    description: string,
    updatedAt: string,
    id: string,
    postId: string,
}
interface authors {
    createdAt: string,
    name: string,
    avatar: string,
    updatedAt: string,
    id: string,
    postId: string,
}


export default function blogPost() {
    const router = useRouter();
    const {query: {id}} = router;
    const [blogPost, setBlogPost] = useState<BlogPost>()
    // will give you the cached list. Index.
    // const { isSuccess, isLoading, isError, error, data } = useQuery('repoData');

    // Will give you a new query. Show method.
    const { isSuccess, isLoading, isError, error, data } = useQuery('repoData', () =>
        fetch('https://6144e843411c860017d256f0.mockapi.io/api/v1/posts').then(res =>
            res.json()
        )
    )

    useEffect(() => {
        if(data) setBlogPost(data.find((post:BlogPost) => post.id === id));
    }, [data])

    if(blogPost){
        return (
            <div className="container mt-2">
                <h1>Individual Blog Post</h1>
                <div className="row">
                    <div className="col-sm-6 col-md-4">
                        <img className="w-100" src="https://picsum.photos/400" alt="an image"/>
                        <span>Created By: </span>
                        {blogPost.authors.map((auth:authors) => (
                            <span>{auth.name}</span>
                        ))}
                    </div>
                    <div className="col-sm-6 col-md-8">
                        <h2>{blogPost.title}</h2>
                        
                        <div className="container">
                            <p>{blogPost.description}</p>
                        </div>
                        <p>{}</p>
                        {blogPost.comments.map((comment:commentDetails) => 
                            <>
                                <h5>{comment.title}</h5>
                                <div className="container">
                                    <span>{comment.description}</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    if (isLoading) {
        return <div className="center">Loading...</div>;
    }

    return <></>;
}
