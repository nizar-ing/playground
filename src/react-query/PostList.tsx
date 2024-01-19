/*import axios from 'axios';*/
import React, { useState } from 'react';

import usePosts from "./hooks/usePosts";

const PostList = () => {
  /*const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((res) => setPosts(res.data))
      .catch((error) => setError(error));
  }, []);*/
   const pageSize = 10;
  const {data: posts, error, isLoading, fetchNextPage, isFetchingNextPage} = usePosts({pageSize});


  if (error) return <p>{error.message}</p>;
  if(isLoading) return <p>Is Loading ...isLoading</p>
  return (
     <>
       <ul className="list-group">
           {
               posts?.pages.map((page, index) => (<React.Fragment key={index}>
                   {
                       page.map((post) => <li key={post.id} className="list-group-item">
                           {post.title}
                       </li>)
                   }
               </React.Fragment>)
               )
           }
       </ul>
       <button className="btn btn-primary my-3 ms-1" disabled={isFetchingNextPage} onClick={() => fetchNextPage()}>
           {isFetchingNextPage ? '... is loading' : 'Load More'}
       </button>
     </>
  );
};

export default PostList;
