import axios from "axios";

export const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

export const multiFetcher = async (urls: string[]) => {
  const responses = await Promise.all(
    urls.map(async (url) => {
      const response = await axios.get(url);
      return response.data;
    })
  );

  const mergedData = responses.reduce((acc, response, index) => {
    const match = urls[index].match(/symbol=([^&]*)/);
    if (match) {
      const symbol = match[1].toLocaleLowerCase();
      acc[symbol] = response;
    }
    return acc;
  }, {});
  return mergedData;
};

export const newMultiFetcher = async (urls: string[]) => {
  try {
    const responses = await Promise.all(
      urls.map(async (url) => {
        const response = await axios.get(url);
        return response.data;
      })
    );

    // Merge all data arrays into one array
    const mergedData = responses.reduce((acc, data) => {
      return acc.concat(data);
    }, []);

    return mergedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
