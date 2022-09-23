import { createApi } from "unsplash-js";

const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

const getListOfCoffeeStroresPhoto = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 30,
  });
  const unsplashResults = photos.response.results;
  return unsplashResults.map((result) => result.urls["small"]);
};

export const fetchCoffeeStore = async () => {
  const photos = await getListOfCoffeeStroresPhoto();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores("15.4703699140075,120.95061778264906", "coffee", 6),
    options
  );
  const data = await response.json();
  return data.results.map((result, idx) => {
    //idx is index

    return {
      id: result.fsq_id,
      address:
        result.location.formatted_address.length > 0
          ? result.location.formatted_address
          : "",
      region: result.location.postcode,
      imgUrl: photos.length > 0 ? photos[idx] : null,
      name: result.name, //photos is an array as well so we can loop here
    };
  });
  // .catch((err) => console.error(err));
};
