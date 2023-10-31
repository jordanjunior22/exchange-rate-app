/* eslint-disable import/no-anonymous-default-export */
// Import Axios
import axios from 'axios';

export default async (req, res) => {
  try {
    const endpoint = 'latest';
    const access_key = '03166ad59796856708593c63c3fe4c1a';
    const apiUrl = `http://data.fixer.io/api/${endpoint}?access_key=${access_key}`;

    // Specify the currency codes and amount from the request body
    const fromCurrency = req.body.fromCurrency;
    const toCurrency = req.body.toCurrency;
    const amount = parseFloat(req.body.amount);
    
    //const fromCurrency = 'EUR';
    //const toCurrency = 'USD';
    //const amount = 10.00;
    // console.log(fromCurrency);
    // console.log(toCurrency);
    // console.log(amount);

    // Use Axios to make the HTTP request
    const response = await axios.get(apiUrl);
    if (response.status === 200) {
      const data = response.data;

      if (data.rates[fromCurrency] && data.rates[toCurrency]) {
        // Calculate the conversion
        const exchangeRate = data.rates[toCurrency] / data.rates[fromCurrency];
        const convertedAmount = amount * exchangeRate;

        //console.log('CONVERTED AMOUNT :', convertedAmount);

        res.status(200).json({
          convertedAmount,
        });
        
      } else {
        console.log(`Exchange rates for ${fromCurrency} and/or ${toCurrency} not found`);
        res.status(404).json({ error: `Exchange rates for ${fromCurrency} and/or ${toCurrency} not found` });
      }
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
