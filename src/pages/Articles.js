import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Section from '../component/Section';
import { fetchArticles } from '../api/api';
import AllCategories from '../component/AllCategories';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [sections, setSections] = useState({});
  const [selectedPeriod, setSelectedPeriod] = useState('1');
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles(selectedPeriod)
      .then(uniqueArticles => {
        setArticles(uniqueArticles);

        const categorizedArticles = uniqueArticles.reduce((acc, article) => {
          const section = article.section;
          if (!acc[section]) acc[section] = [];
          acc[section].push(article);
          return acc;
        }, {});

        setSections(categorizedArticles);
      })
      .catch(error => console.error('Error fetching the articles:', error));
  }, [selectedPeriod]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  const handleMoreClick = (section) => {
    navigate(`/${section.toLowerCase()}`, { state: { period: selectedPeriod } });
  };

  const handleCategoryClick = (category) => {
    navigate(`/${category.toLowerCase()}`, { state: { period: selectedPeriod } });
  };

  const handlePeriodChange = (e) => {
    setSelectedPeriod(e.target.value);
  };

  const renderRandomArticles = () => {
    if (articles.length < 2) return null;

    const randomArticles = getRandomElements(articles, 2);

    return randomArticles.map(article => (
      <div className="col-sm-12 col-md-6 col-lg-12" key={article.id}>
        <div className='article-card rounded-4'>
          <img
            src={article.media[0]['media-metadata'][2].url}
            className='img-fluid'
            alt={article.media[0].caption}
          />
          <div className='card-content text-white'>
            <h3>{article.title}</h3>
            <p>{article.abstract}</p>
            <Link to={article.url} target="_blank" rel="noopener noreferrer">Read more</Link>

          </div>
        </div>
      </div>
    ));
  };

  const getRandomElements = (array, count) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const sortSectionsByArticleCount = (sections) => {
    return Object.entries(sections).sort(([, aArticles], [, bArticles]) => {
      return bArticles.length - aArticles.length;
    });
  };

  const sortedSections = sortSectionsByArticleCount(sections);
  const categoryTitles = sortedSections.map(([section]) => section);

  return (
    <div className="container mt-4">
      <div className='row g-3'>
        <div className='col-lg-12'>
          <div className='page-title'>
            <h2>Latest Articles</h2>
            <div className='components'>
              <div className='select-input'>
                <select onChange={handlePeriodChange} value={selectedPeriod}>
                  <option value="1">1 Day</option>
                  <option value="7">7 Days</option>
                  <option value="30">30 Days</option>
                </select>
                <label>Select period</label>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-8'>
          <Slider {...sliderSettings} className="hero-slider rounded-4">
            {articles.map(article => (
              <div key={article.id} className="hero-slide">
                <img src={article.media[0]['media-metadata'][2].url} alt={article.media[0].caption} className="img-fluid rounded-4" />
                <div className="hero-content">
                  <h3>{article.title}</h3>
                  <p>{article.abstract}</p>
                  <Link to={article.url} target="_blank" rel="noopener noreferrer">Read more</Link>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className='col-lg-4 col-md-12'>
          <div className='row g-3'>
            {renderRandomArticles()}
          </div>
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-md-12'>
          <h2 className="mt-4 section-heading">Articles</h2>
        </div>
        <div className='col-md-9 col-lg-8'>
          {sortedSections.map(([section, articles]) => (
            <Section key={section} section={section} articles={articles} handleMoreClick={handleMoreClick} />
          ))}
        </div>
        <div className='col-md-3 col-lg-4'>
          <AllCategories
            categoryTitles={categoryTitles}
            handleCategoryClick={handleCategoryClick}
          />
          <div className='section-wrapper pt-4'>
            <h3 className='section-title'>Hot News</h3>
            <ul className='news-list'>
              {articles.slice(0, 5).map(article => (
                <Link to={article.url} target="_blank" rel="noopener noreferrer" className='text-decoration-none text-dark'>
                  <li>
                    <h4>{article.title}</h4>
                    <p>{article.abstract}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;
