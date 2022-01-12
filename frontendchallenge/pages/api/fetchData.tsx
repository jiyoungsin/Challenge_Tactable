import React from 'react'

export default function fetchData() {

    // Fetch a query:
    const getBlogData = async () => {
        try {
            const data = await fetch("https://6144e843411c860017d256f0.mockapi.io/api/v1/posts");
            return data;
        } catch (error) {
            // Error handling
            console.log(`Error : ${error}`);
            return null;
        }
    }

    return (
        <div>
            
        </div>
    )
}
