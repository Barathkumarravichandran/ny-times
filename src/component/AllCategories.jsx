// src/component/AllCategories.js
import React from 'react';

const AllCategories = ({ categoryTitles, handleCategoryClick }) => {
  return (
    <div className='section-wrapper pt-0'>
      <h3 className='section-title'>All Categories</h3>
      <ul className='title-list'>
        {categoryTitles.map(category => (
          <li key={category}>
            <button className="btn btn-link" onClick={() => handleCategoryClick(category)}>
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllCategories;
