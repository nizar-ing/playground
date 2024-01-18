/*import axios from 'axios';*/
import { useState } from 'react';

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
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const {data: posts, error, isLoading} = usePosts({page, pageSize});


  if (error) return <p>{error.message}</p>;
  if(isLoading) return <p>Is Loading ...isLoading</p>
  return (
     <>
       <ul className="list-group">
         {posts?.map((post) => (
             <li key={post.id} className="list-group-item">
               {post.title}
             </li>
         ))}
       </ul>
       <button disabled={page === 1} className="btn btn-primary my-3" onClick={() => setPage((p) => p - 1)}>Previous</button>
       <button className="btn btn-primary my-3 ms-1" onClick={() => setPage((p) => p + 1)}>Next</button>
     </>
  );
};

export default PostList;
