const axios = require('axios'); 
const { fetchArticles } = require('../api/api');

it("Data fetch ", async()=>{
    const apiData = await fetchArticles()
    expect(apiData).toEqual(7)
});
