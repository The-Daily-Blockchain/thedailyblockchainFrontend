import { useEffect, useRef } from "react";
import axios from "axios";

export const useDailyCurrencyFetch = () => {
  const intervalRef = useRef(null);

  const currencyUrl = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${process.env.NEXT_PUBLIC_API_CURRENCY_KEY}&symbols=PHP`;

  useEffect(() => {
    const fetchData = async () => {
      const lastFetchedDate = localStorage.getItem("currencyLastFetched");
      const currentDate = new Date().toISOString().slice(0, 10);

      if (lastFetchedDate !== currentDate) {
        try {
          const response = await axios.get(currencyUrl);
          intervalRef.current = response.data.rates.PHP;
          localStorage.setItem("currencyLastFetched", currentDate);
          localStorage.setItem(
            "cachedCurrencyData",
            JSON.stringify(response.data.rates.PHP)
          );
        } catch (error) {
          console.error("Error fetching currency data:", error);
        }
      } else {
        const cachedData = localStorage.getItem("cachedCurrencyData");
        if (cachedData) {
          intervalRef.current = JSON.parse(cachedData);
        }
      }
    };

    fetchData();
  }, [currencyUrl]);

  return { data: intervalRef.current };
};
