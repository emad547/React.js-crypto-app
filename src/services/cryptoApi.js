const BASE_URL = "https://api.coingecko.com/api/v3"
const API_KEY = "x_cg_demo_api_key=CG-ASWPPbVNLeVrPrVmh8XSfBLq"

const getCoinList = (currency, currentPage) =>
  `${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=${currentPage}&sparkline=false&locale=en&${API_KEY}`

const searchCoin = (searchText) =>
  `${BASE_URL}/search?query=${searchText}&${API_KEY}`

const getCoinChartData = (id, currency) =>
  `${BASE_URL}/coins/${id}/market_chart?vs_currency=${currency}&days=7&${API_KEY}`

export { getCoinList, searchCoin, getCoinChartData }