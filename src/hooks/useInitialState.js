import { useState, useEffect } from 'react';

export default function useInitialState(API) {
  const [videos, setVideos] = useState(null);
  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => setVideos(data));
  }, []);

  return videos;
}
