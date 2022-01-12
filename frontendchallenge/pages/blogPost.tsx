import React from 'react'
import { useRouter } from 'next/router';

export default function blogPost() {
    const router = useRouter();
    const {query: {id}} = router;

    console.log(id)
    return (
        <div>
            blogpso
        </div>
    )
}
