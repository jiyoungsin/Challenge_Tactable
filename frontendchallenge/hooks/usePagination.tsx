import React, { useState, useEffect } from 'react'
import { string } from 'prop-types'

// Attempt at hook. Ran out of time.
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

export default function usePagination(data:BlogPost[]) {
    // State Variables
    const [postsPerPage, setPostsPerPage] = useState(5);
    const [pageNumbers, setPageNumbers] = useState<number[]>([])
    
    if (!data) return { pageNumbers };

    useEffect(() => {
        for (let i=1; i<= Math.ceil(data.length/postsPerPage); i++ ){
            setPageNumbers([...pageNumbers, i]);
        }
    },[data])

    return { pageNumbers };
}

