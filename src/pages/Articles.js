import axios from 'axios';
import { fetchArticles } from '../api/api'; // Adjust the import path as necessary

jest.mock('axios');

describe('fetchArticles', () => {
  const mockArticles = [
    {
      id: 1,
      title: "Article 1",
      abstract: "Abstract 1",
      media: [{ 'media-metadata': [{}, {}, { url: 'image_url_1' }] }],
      section: "Section 1",
      url: "url_1"
    },
    {
      id: 2,
      title: "Article 2",
      abstract: "Abstract 2",
      media: [{ 'media-metadata': [{}, {}, { url: 'image_url_2' }] }],
      section: "Section 2",
      url: "url_2"
    },
    // Add more mock articles as needed
  ];

  const mockResponse = {
    data: {
      results: mockArticles,
    },
  };

  it('should fetch and return unique articles with images', async () => {
    axios.get.mockResolvedValue(mockResponse);

    const result = await fetchArticles(1);

    expect(result).toEqual([
      {
        id: 1,
        title: "Article 1",
        abstract: "Abstract 1",
        media: [{ 'media-metadata': [{}, {}, { url: 'image_url_1' }] }],
        section: "Section 1",
        url: "url_1"
      },
      {
        id: 2,
        title: "Article 2",
        abstract: "Abstract 2",
        media: [{ 'media-metadata': [{}, {}, { url: 'image_url_2' }] }],
        section: "Section 2",
        url: "url_2"
      },
      // Add more expected articles as needed
    ]);

    expect(axios.get).toHaveBeenCalledWith(
      'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=fjB4GoB2t5ObRZfK1AL09JYFo9mOA1aA'
    );
  });

  it('should handle errors', async () => {
    const mockError = new Error('Network Error');
    axios.get.mockRejectedValue(mockError);

    await expect(fetchArticles(1)).rejects.toThrow('Network Error');

    expect(axios.get).toHaveBeenCalledWith(
      'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=fjB4GoB2t5ObRZfK1AL09JYFo9mOA1aA'
    );
  });
});
