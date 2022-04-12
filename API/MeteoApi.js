import axios from "axios";
import { API_TOKEN } from "@env";

const getEphemeride = async (text) => {
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

  const url2 =
    "https://api.meteo-concept.com/api/forecast/daily/0?token=" +
    API_TOKEN +
    "&insee=67482";
  // await slowNetwork();
  const response2 = await axios.get(url2);

  return { e: response.data, f: response2.data };
};

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

//L'asynchrone, c'est ne pas attendre la fin de l'exécution d'une action avant de continuer l'exécution du code
async function slowNetwork() {
  await sleep(5000);
}

export default getEphemeride;
