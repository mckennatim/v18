import axios from 'axios';
import {cfg} from '../utilities/getCfg'

console.log('getCfg: ', cfg)

const fetchData = async (qry) => {
  const result = await axios(
    'http://hn.algolia.com/api/v1/search?query='+qry,
  );
  return result.data;
};

const fetchLocs = async (token) => {
  const url = `${cfg.url.api}/reg/locs`
  console.log('url: ', url)
  const result = await axios.get(url,{
    headers: {'Authorization': 'Bearer '+ token}
  });
  return result.data;
};

export {fetchData, fetchLocs}