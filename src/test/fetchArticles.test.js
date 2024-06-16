const axios = require('axios');
const { fetchArticles } = require('../api/api');

jest.mock('axios');
describe('fetchArticles function', () => {
    it('fetches and processes articles correctly', async () => {

        const mockedData = {
            data: {
                results: [
                    {
                        id: 100000009522212,
                        title: 'Washington Post Publisher and Incoming Editor Are Said to Have Used Stolen Records in Britain',
                        media: [
                            {
                                'media-metadata': [
                                    {
                                        url: 'https://static01.nyt.com/images/2024/06/15/world/15wapo-publisher-top-01/15wapo-publisher-top-01-thumbStandard.jpg',
                                        format: 'Standard Thumbnail',
                                        height: 75,
                                        width: 75
                                    },
                                    {
                                        url: 'https://static01.nyt.com/images/2024/06/15/world/15wapo-publisher-top-01/15wapo-publisher-top-01-mediumThreeByTwo210.jpg',
                                        format: 'mediumThreeByTwo210',
                                        height: 140,
                                        width: 210
                                    },
                                    {
                                        url: 'https://static01.nyt.com/images/2024/06/15/world/15wapo-publisher-top-01/15wapo-publisher-top-01-mediumThreeByTwo440.jpg',
                                        format: 'mediumThreeByTwo440',
                                        height: 293,
                                        width: 440
                                    }
                                ]
                            }
                        ]
                    }
                    // Add more articles as needed for different scenarios
                ]
            }
        };

        // Mock axios.get to return a resolved promise with mockedData
        axios.get.mockResolvedValue(mockedData);

        // Call fetchArticles with a period parameter
        const period = '1'; // Example period
        const articles = await fetchArticles(period);

        // Assertions
        expect(articles).toHaveLength(1); 
        expect(articles[0].id).toBe(100000009522212);
        expect(articles[0].title).toBe(
            'Washington Post Publisher and Incoming Editor Are Said to Have Used Stolen Records in Britain'
        ); // Ensure correct article title
        expect(articles[0].media).toHaveLength(1); // Ensure article has media
        expect(articles[0].media[0]['media-metadata']).toHaveLength(3); // Ensure correct number of media-metadata entries
        expect(articles[0].media[0]['media-metadata'][0].url).toBe(
            'https://static01.nyt.com/images/2024/06/15/world/15wapo-publisher-top-01/15wapo-publisher-top-01-thumbStandard.jpg'
        ); // Ensure correct URL for the first media entry
    });

    it('handles errors properly', async () => {
        // Mock axios.get to return a rejected promise
        axios.get.mockRejectedValue(new Error('API Error'));

        // Call fetchArticles with a period parameter
        const period = '1'; // Example period
        try {
            await fetchArticles(period);
            // Fail the test if fetchArticles does not throw an error
            fail('fetchArticles did not throw an error');
        } catch (error) {
            // Expect an error to be thrown
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toEqual('API Error');
        }
    });
});
