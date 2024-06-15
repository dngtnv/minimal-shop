import { useEffect, useState } from 'react';

export function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!url) return;
    async function fetchData() {
      const response = await fetch(`http://localhost:5000/${url}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setData(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return { data, loading };
}
