import axios, { AxiosError } from "axios";

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

// export const newMultiFetcher = async (urls: string[]) => {
//   try {
//     const responses = await Promise.all(
//       urls.map(async (url) => {
//         while (true) {
//           try {
//             const response = await axios.get(url);
//             return response.data;
//           } catch (error) {
//             // Handle Axios errors
//             if (axios.isAxiosError(error)) {
//               const axiosError = error as AxiosError;
//               console.error(
//                 `Axios error fetching data from ${url}:`,
//                 axiosError.message
//               );
//             } else {
//               console.error(`Error fetching data from ${url}:`, error);
//             }
//           }
//         }
//       })
//     );

//     // Merge all data arrays into one array
//     const mergedData = responses.reduce((acc, data) => {
//       return acc.concat(data);
//     }, []);

//     return mergedData;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error;
//   }
// };

export const newMultiFetcher = async (urls: string[]) => {
  try {
    const responses = await Promise.all(
      urls.map(async (url) => {
        let fetchSuccessful = false;
        while (!fetchSuccessful) {
          try {
            const response = await axios.get(url);
            fetchSuccessful = true;
            return response.data;
          } catch (error) {
            // Handle Axios errors
            if (axios.isAxiosError(error)) {
              const axiosError = error as AxiosError;
              console.error(
                `Axios error fetching data from ${url}:`,
                axiosError.message
              );
            } else {
              console.error(`Error fetching data from ${url}:`, error);
            }
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
          }
        }
      })
    );

    const retryUrls = urls.filter((url, index) => !responses[index]); // Filter out successful responses
    const retryResponses = await Promise.all(
      retryUrls.map(async (url) => {
        try {
          const response = await axios.get(url);
          return response.data;
        } catch (error) {
          // Handle Axios errors
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            console.error(
              `Axios error retrying fetching data from ${url}:`,
              axiosError.message
            );
          } else {
            console.error(`Error retrying fetching data from ${url}:`, error);
          }
          return null; // Return null for unsuccessful retry
        }
      })
    );

    retryUrls.forEach((url, index) => {
      const retryIndex = urls.indexOf(url);
      if (retryIndex !== -1) {
        responses[retryIndex] = retryResponses[index]; // Replace unsuccessful responses with retry responses
      }
    });

    // Merge all data arrays into one array
    const mergedData = responses.reduce((acc, data) => acc.concat(data), []);

    return mergedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
