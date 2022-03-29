import axios from "axios";
import { API_TOKEN } from "@env";

const getEphemeride = async (text, page) => {
  const url =
    "https://api.meteo-concept.com/api/ephemeride/0?token=" +
    API_TOKEN +
    "&insee=67482";
  // await slowNetwork();
  const response = await axios.get(url);
  console.log("--getEphemeride--");
  console.log(url);
  console.log(response.data);
  console.log("--fin getEphemeride--");
  return response.data;
};

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

async function slowNetwork() {
  await sleep(5000);
}

export default getEphemeride;
