import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const fetchData = async (pageNum) => {
    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=5&page=${pageNum}&order=Desc`
      );
      const result = await response.json();

      if (result.length === 0) {
        setHasMore(false);
      } else {
        setData((prevData) => [...prevData, ...result]);
      }
    } catch (error) {
      console.error('Failed to fetch data');
    }
  };

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="container">
      <h1>Cat Gallery (Infinite Scroll)</h1>

      <InfiniteScroll
        dataLength={data.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>All images have been loaded.</p>}
      >
        <div className="column">
          {data.map((item) => (
            <div key={item.id} className="card">
              <img src={item.url} alt="cat" />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default App;
