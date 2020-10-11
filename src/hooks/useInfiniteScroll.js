import { useState, useEffect } from 'react';

export const useInfiniteScroll = (actions, pageNo) => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(pageNo+1);

  const handleScroll = () => {
    if(
      window.innerHeight + document.documentElement.scrollTop !== 
      document.documentElement.offsetHeight || 
      loading
    ){
      return false;
    }
    
    setLoading(true);
  };

  useEffect(() => {
    if(!loading) return;
    console.log("count", count);
    actions.onFetchOldPosts(count);
    setCount( count + 1);
    setLoading(false);
  });

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
};
