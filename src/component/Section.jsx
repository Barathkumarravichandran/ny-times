import React from 'react';
import Slider from 'react-slick';

const Section = ({ section, articles, handleMoreClick }) => {
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  // Use a Set to keep track of unique article IDs
  const uniqueArticles = Array.from(new Set(articles.map(article => article.id)))
    .slice(0, 10)
    .map(id => articles.find(article => article.id === id));

  return (
    <div className="section-wrapper my-4">
      <div className="d-flex align-items-center justify-content-between mb-3 px-2">
        <h3 className='section-title'>{section}</h3>
        <button className="view-all" onClick={() => handleMoreClick(section)}>View all</button>
      </div>
      <Slider {...sliderSettings}>
        {uniqueArticles.map(article => (
          <div key={article.id} className="card-spacing">
            <div className='article-card rounded-4'>
              <img
                src={article.media[0]['media-metadata'][2].url}
                className='img-fluid'
                alt={article.media[0].caption}
              />
              <div className='card-content text-white'>
                <h3>{article.title}</h3>
                <p>{article.abstract}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn-link">Read more</a>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Section;
