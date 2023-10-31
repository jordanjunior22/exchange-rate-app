/* eslint-disable import/no-anonymous-default-export */
// pages/api/get-currency.js
import axios from 'axios';

export default async (req, res) => {
  try {
    const endpoint = 'latest';
    const access_key = '03166ad59796856708593c63c3fe4c1a';
    const apiUrl = `http://data.fixer.io/api/${endpoint}?access_key=${access_key}`;

    // Use Axios to make the HTTP request
    const response = await axios.get(apiUrl);

    if (response.status === 200) {
      const data = response.data;
      res.status(200).json(data);
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
