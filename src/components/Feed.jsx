import React, { useEffect, useState } from 'react';
import { feedQuery, searchQuery } from '../utils/data';
import { fetchJSON, urlFor } from '../client';
import PostLayout from './PostLayout';
import Spinner from './Spinner';
import { useLocation } from 'react-router-dom';
const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading,setLoading]=useState(true);

  const { search } = useLocation();
  const topic=new URLSearchParams(search).get('topic');

  useEffect( () => {

    const query = topic==undefined?feedQuery:searchQuery(topic);
    const url=urlFor(query);

    fetchJSON(url).
    then(({result}) => {
      setPosts(result);
      setLoading(false);
    })
  }, [topic]);

  if (loading) return <Spinner message="Мы добавляем новые видео в вашу ленту!"/>

  return (
    <div>
      <PostLayout posts={posts}/>
      {posts?.length === 0 && !loading && (
        <div className="mt-10 text-center text-xl ">Не найдено!</div>
      )}
    </div>
  )
}

export default Feed