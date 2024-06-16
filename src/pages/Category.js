import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { fetchArticlesByCategory, sortArticles } from '../api/api';
import SearchBar from '../component/SearchBar';
import AllCategories from '../component/AllCategories';

const Category = () => {
  const { category } = useParams();
  const location = useLocation();
  const [articles, setArticles] = useState([]);
  const [period, setPeriod] = useState('1');
  const [categoryTitles, setCategoryTitles] = useState([]);
  const [sortMethod, setSortMethod] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    if (location.state && location.state.period) {
      setPeriod(location.state.period);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchArticles = async () => {
      const { sortedArticles, categories } = await fetchArticlesByCategory(category, period, sortMethod);
      setArticles(sortedArticles);
      setFilteredArticles(sortedArticles);
      setCategoryTitles(categories);
    };

    fetchArticles();
  }, [category, period, sortMethod]);

  const handleCategoryClick = (category) => {
    window.location.href = `/${category.toLowerCase()}`;
  };

  const handleSortChange = (e) => {
    const selectedSortMethod = e.target.value;
    setSortMethod(selectedSortMethod);

    const sortedArticles = sortArticles(filteredArticles, selectedSortMethod);
    setFilteredArticles(sortedArticles);
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value.toLowerCase().trim();
    setSearchQuery(query);

    const filtered = articles.filter(article =>
      article.title.toLowerCase().includes(query)
    );
    setFilteredArticles(filtered);
  };

  const handleClick = () => {
    setSearch(true);
  };

  const handleClose = () => {
    setSearch(false);
    setSearchQuery('');
    setFilteredArticles(articles);
  };

  return (
    <div className="container mt-5">
      <div className='row'>
        <div className='col-md-8'>
          <div className='page-title mb-4'>
            {search ? (
              <SearchBar 
                searchQuery={searchQuery} 
                handleSearchInputChange={handleSearchInputChange} 
                handleClose={handleClose} 
              />
            ) : (
              <>
                <h2 className='section-heading'>Articles in {category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                <div className='components d-flex align-items-center gap-3'>
                  <div className='select-input'>
                    <select onChange={handleSortChange} value={sortMethod}>
                      <option value="latest">Latest</option>
                      <option value="a-to-z">A to Z</option>
                      <option value="z-to-a">Z to A</option>
                    </select>
                    <label>Sort by</label>
                  </div>
                  <button className='search_btn' onClick={handleClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>
          {filteredArticles.length > 0 ? (
            filteredArticles.map(article => (
              <div className="card mb-3 article_list" key={article.id}>
                <div className="row g-0">
                  <div className="col-md-4">
                    {article.media && article.media[0] && article.media[0]['media-metadata'] && article.media[0]['media-metadata'][2] ? (
                      <img src={article.media[0]['media-metadata'][2].url} className="img-fluid rounded-start" alt={article.title} />
                    ) : (
                      <img src="https://via.placeholder.com/400" className="img-fluid rounded" alt="Placeholder" />
                    )}
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5>{article.title}</h5>
                      <p>{article.abstract}</p>
                      <p className="small text-muted"><small className="text-muted">Published at: {new Date(article.published_date).toLocaleDateString()}</small></p>
                      <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No articles found for {category}.</p>
          )}
        </div>
        <div className='col-md-4'>
          <AllCategories 
            categoryTitles={categoryTitles} 
            handleCategoryClick={handleCategoryClick} 
          />
        </div>
      </div>
    </div>
  );
};

export default Category;
