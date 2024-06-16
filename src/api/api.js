import axios from 'axios';

const API_KEY = 'fjB4GoB2t5ObRZfK1AL09JYFo9mOA1aA';

export const fetchArticles = (period) => {
    return axios.get(`https://api.nytimes.com/svc/mostpopular/v2/viewed/${period}.json?api-key=${API_KEY}`)
        .then(response => {
            const articlesData = response.data.results;

            // Filter articles to include only those with images
            const articlesWithImages = articlesData.filter(article =>
                article.media && article.media[0] && article.media[0]['media-metadata'] && article.media[0]['media-metadata'][2]
            );

            // Remove duplicate articles based on their IDs
            const uniqueArticles = Array.from(new Set(articlesWithImages.map(article => article.id)))
                .map(id => articlesWithImages.find(article => article.id === id));

            return uniqueArticles.slice(0, 10); // Latest 10 unique articles with images
        })
        .catch(error => {
            console.error('Error fetching the articles:', error);
            throw error;
        });
};

export const fetchArticlesByCategory = async (category, period, sortMethod) => {
    try {
        const response = await axios.get(`https://api.nytimes.com/svc/mostpopular/v2/viewed/${period}.json?api-key=fjB4GoB2t5ObRZfK1AL09JYFo9mOA1aA`);
        const articlesData = response.data.results;

        // Filter articles based on category (case insensitive)
        const filteredArticles = articlesData.filter(article =>
            article.section && article.section.toLowerCase() === category.toLowerCase()
        );

        // Extract and set unique category titles
        const categories = [...new Set(articlesData.map(article => article.section))];

        // Apply initial sort (latest)
        const sortedArticles = sortArticles(filteredArticles, sortMethod);

        return { sortedArticles, categories };
    } catch (error) {
        console.error('Error fetching articles:', error);
        return { sortedArticles: [], categories: [] };
    }
};

export const sortArticles = (articles, method) => {
    switch (method) {
        case 'latest':
            return [...articles].sort((a, b) => new Date(b.published_date) - new Date(a.published_date));
        case 'a-to-z':
            return [...articles].sort((a, b) => a.title.localeCompare(b.title));
        case 'z-to-a':
            return [...articles].sort((a, b) => b.title.localeCompare(a.title));
        default:
            return [...articles].sort((a, b) => new Date(b.published_date) - new Date(a.published_date));
    }
};