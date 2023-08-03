import React, { useEffect, useState } from 'react'
import { feedQuery, searchQuery } from '../utils/data';
import PostLayout from './PostLayout';
import { fetchJSON, urlFor } from '../client';
import Spinner from './Spinner';

const Search = ({searchTerm,setSearchTerm}) => {
  const [posts, setPosts] = useState([]);
  const [loading,setLoading]=useState(false);
  useEffect( () => {
    let query = '';
    if (searchTerm !== '') {
      query = searchQuery(searchTerm);
    } else {
      query= feedQuery;
    }

    const url=urlFor(query);

    fetchJSON(url).
    then(({result}) => {
      setPosts(result);
      setLoading(false);
    })
  }, [searchTerm]);

  return (
    <div>
      {loading && <Spinner message="Поиск по сайту" />}
      {posts?.length !== 0 && <PostLayout posts={posts} />}
      {posts?.length === 0 && searchTerm !== '' && !loading && (
        <div className="mt-10 text-center text-xl ">Не найдено!</div>
      )}
    </div>
  )
}

export default Search