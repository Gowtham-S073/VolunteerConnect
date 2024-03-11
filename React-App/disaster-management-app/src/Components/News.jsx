import Stack from '@mui/material/Stack';
import React, { useState, useEffect } from "react";
import "./News.css";
import Pagination from '@mui/material/Pagination';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchNewsData() {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=Natural Disaster&apiKey=2a4e77b073ee49faae9f3912c0bd10c8&page=${page}`
        );
        const data = await response.json();
        if (data.articles && data.articles.length > 0) {
          setArticles(data.articles);
        }
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    }

    fetchNewsData();
  }, [page, props.newsName]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * 9;
  const endIndex = startIndex + 9;

  return (
    <>
        <div className="news-container">
      {articles.length > 0 ? (
        <>
          {articles.slice(startIndex, endIndex).map((article, index) => (
            <div key={index} className="news-card">
              <img src={article.urlToImage} alt={article.title} />
              <div className="news-card-content">
                <h2 style={{ color: '#436b95' }} className="news-title">
                  {article.title}
                </h2>
                <p className="news-description">{article.description}</p>
                <a href={article.url} className="read-more-link">
                  Read more
                </a>
                <div className="news-tags">
                  {article.tags &&
                    article.tags.map((tag, index) => (
                      <span key={index} className="news-tag">
                        #{tag}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>No news articles available.</p>
      )}
     </div>
      <div className='news'>
        <Stack
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ width: '100%', marginTop: '20px' }}
        >
          <Pagination
          className='newsPagination'
            count={14}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            color="primary"
          />
        </Stack>
      </div>
   
    </>
  );
};

export default News;
