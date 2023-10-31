"use client"
import React, { useState, useEffect } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { FiMoon, FiSun } from 'react-icons/fi';
import {NextUIProvider} from "@nextui-org/react";
import './globals.css'
import dynamic from "next/dynamic";
import axios from "axios";

const NoSSR = dynamic(() => import('../components/no-ssr'), { ssr: false })

export default function Home() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const availableFromCurrencies = ['EUR', 'USD', 'GBP', 'TRY', 'XAF'];
  const availableToCurrencies = ['EUR', 'USD', 'GBP', 'TRY', 'XAF'];
  const CurrenciesFromApi = ['EUR', 'USD', 'GBP', 'TRY', 'XAF','AED','NZD', 'CHF'];

  const filteredCurrenciesFromApi = CurrenciesFromApi.filter((currency) => !availableFromCurrencies.includes(currency));
  const [currencyData, setCurrencyData] = useState(null);

  const [amount, setAmount] = useState(0);
  const [selectedCurrencyFrom, setSelectedCurrency] = useState('EUR');
  const [selectedCurrencyTo, setSelectedToCurrency] = useState('USD');
  const [converted, setConverted] = useState(0);
  const handleAmountChange = (event) => {
    // Update the amount state when the input value changes
    setAmount(event.target.value);
  };
  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const response = await axios.get('/api/get-currency');
        setCurrencyData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    
    const SendFromToAmount = async () => {
      try {
        const data = {
          // Your data for the POST request
          fromCurrency: selectedCurrencyFrom,
          toCurrency: selectedCurrencyTo,
          amount: amount,
        };
        
        const response = await axios.post('/api/conversion', data);
        
        // Handle a successful response here
        console.log('POST request successful');
        //console.log('Response data:', response.data);
        setConverted(Number(response.data.convertedAmount).toFixed(2));

      } catch (error) {
        // Handle errors here
        console.error('POST request failed', error);
      }
    };

    fetchCurrencyData();
    SendFromToAmount();

  }, [selectedCurrencyFrom, selectedCurrencyTo, amount]);


  //console.log('front End COnverted',converted);
  const currencyCodes = currencyData ? Object.keys(currencyData.rates) : [];
 // const rates = currencyData ? currencyData.rates : null;
  //console.log('data:', currencyCodes);
  const filteredCurrencyCodes =  currencyCodes.filter((code) =>
  !availableToCurrencies.includes(code)
);





  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedCurrency(selectedOption);
  }

  const handleSelectChangeTo = (event) => {
    const selectedOption = event.target.value;
    setSelectedToCurrency(selectedOption);
  }
  const toggleDarkTheme = () => {
    setIsDarkTheme(true);
  };

  const toggleLightTheme = () => {
    setIsDarkTheme(false);
  };

  return (
    <NextUIProvider>
    <div className={`home ${isDarkTheme ? 'dark' : 'light'}`}>
      <div className='canvas'>
        <div className="navbar">
          <Dropdown backdrop="blur">
            <DropdownTrigger>
              <Button variant="bordered">
                {isDarkTheme ? <FiMoon /> : <FiSun/> } Theme
              </Button>
            </DropdownTrigger>
            <DropdownMenu variant="faded" aria-label="Theme Options">
              <DropdownItem key="dark" onClick={toggleDarkTheme}>
                <FiMoon /> Dark Theme
              </DropdownItem>
              <DropdownItem key="light" onClick={toggleLightTheme}>
                <FiSun /> Light Theme
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        <div className="converter">
          <div className="titles">
            <h1 className="heading"><strong>Exchange Currency</strong> Widget</h1>
            <p className="small-text">Real-time currency exchange widget</p>
          </div>
          <div className="logic-container">
            <NoSSR />
            <div className="from-to">
              <div className="currency-box">
                <strong>From</strong>
                <div className="pallet">
                  <div className="popular-currency">
                    {availableFromCurrencies.map((currency) => (
                      <button key={currency} onClick={() => setSelectedCurrency(currency)} className={`button-border ${selectedCurrencyFrom === currency ? 'active-button' : ''}`}>
                        {currency}
                      </button>
                    ))}
                  </div>

                  <div className="more-currency">
                  <select id="selectOption" value={selectedCurrencyFrom} onChange={handleSelectChange} className="button-border">
                    <option value="">MORE</option>
                      {filteredCurrencyCodes.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                </div>
                  <div className="results addoutline"> 
                    <input placeholder="1000" type="number" min={0} onChange={handleAmountChange} value={amount}/>
                    <p className="small-text">{selectedCurrencyFrom}</p>

                  </div>
              </div>

              <div className="currency-box">
              <strong>To</strong>
                <div className="pallet">
                  <div className="popular-currency">
                    {availableToCurrencies.map((currency) => (
                      <button key={currency} onClick={() => setSelectedToCurrency(currency)} className={`button-border ${selectedCurrencyTo === currency ? 'active-button' : ''}`}>
                        {currency}
                      </button>
                    ))}
                  </div>

                  <div className="more-currency">
                  <select id="selectOption2" value={selectedCurrencyTo} onChange={handleSelectChangeTo} className="button-border">
                    <option value="">MORE</option>
                      {filteredCurrencyCodes.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                </div>
                  <div className="results">
                    <h1>{converted}</h1>
                    <p className="small-text">{selectedCurrencyTo}</p>
                  </div>

              </div>
            </div>

          </div>
        </div>
        <p className="small-text developer">Developer | Jordan Junior</p>
      </div>
    </div>
    </NextUIProvider>
  );
}
