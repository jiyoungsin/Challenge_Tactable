import Card from '../components/Card';
import { useState } from 'react';
import Pagination from '../components/Pagination';
import ChallengeRequirements from "../components/ChallengeRequirements";
import { useQuery } from 'react-query';


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

export default function Home() {
  
  // Fetching of data
  const { isSuccess, isLoading, isError, error, data } = useQuery('repoData', () =>
    fetch('https://6144e843411c860017d256f0.mockapi.io/api/v1/posts').then(res =>
        res.json()
    )
  )
  // State Variables
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  // Current Post
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = isLoading ? [] : data.slice(indexOfFirstPost, indexOfLastPost);

  // Change Page
  //@ TODO Make Pagination into Hook.
  const paginate = (pageNumber:any) => setCurrentPage(pageNumber);

  // Sorting by date
  // @ TODO Abstract Function out.
  function sortByDate(a:any, b:any){
    let d1 = new Date(a.createdAt);
    let d2 = new Date(b.createdAt);

    if(d1.getUTCFullYear() > d2.getUTCFullYear()){
      return 1;
    } else if (d1.getUTCFullYear() < d2.getUTCFullYear()){
      return -1;
    } else{
      return d1.getUTCMonth() - d2.getUTCMonth();
    }
  }

  if (isLoading) {
    return <div className="center">Loading...</div>;
  }

  if (isSuccess) {
    data.sort(sortByDate);

    return (
      <div className="container">
        <h1>
          Tactable Front-End Challenge!
        </h1>
        <ChallengeRequirements/>
        <div className="row mb-5">
          <div className="col-12 col-lg-9">
            <div className="container">
              <div className="row">
                  <h2 className="d-block">Recent Blog Posts</h2>
                  {/* @TODO // Make Card component take in less information */}
                  {currentPosts.map((post:BlogPost) => (
                    <Card 
                      key={post.id}
                      authors={post.authors}
                      comments={post.comments}
                      createdAt={post.createdAt}
                      description={post.description}
                      id={post.id}
                      title={post.title}
                      updatedAt={post.updatedAt}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <Pagination 
            postsPerPage={postsPerPage} 
            totalPosts={data.length} 
            paginate={paginate}
          />
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="center">
       {error}
      </div>
    );
  }

}
