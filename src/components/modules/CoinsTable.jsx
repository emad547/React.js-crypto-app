import { RotatingLines } from "react-loader-spinner"
import { getCoinChartData } from "../../services/cryptoApi"

import styles from "./CoinsTable.module.css"

import chartUp from "../../assets/chart-up.svg"
import chartDown from "../../assets/chart-down.svg"

function CoinsTable({ coins, isLoading, setChart, setIsShowModal, setSelectedCoin, currency }) {

  const setChartHandler = (id) => {
    fetch(getCoinChartData(id, currency))
      .then(res => res.json())
      .then(json => setChart(json))
  }

  const coinItemClickHandler = (coinId, coinData) => {
    setIsShowModal(isShow => !isShow)
    setSelectedCoin(coinData)
    setChartHandler(coinId)
  }

  return (
    <div className={styles.tableContainer}>
      {isLoading ? (
        <RotatingLines strokeWidth="3" strokeColor="#3874ff" />
      ) : (
        <table className={styles.coinsTable}>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h</th>
              <th>Total Volume</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {coins.map(coin => (
              <tr key={coin.id}>
                <td onClick={() => coinItemClickHandler(coin.id, coin)}><img src={coin.image} alt="coin image" className={styles.coinImage} /> {coin.symbol.toUpperCase()}</td>
                <td>{coin.name}</td>
                <td>{currency === "usd" ? "$" : currency === "eur" ? "€" : "¥"}{coin.current_price.toLocaleString()}</td>
                <td style={{ color: coin.price_change_percentage_24h >= 0 ? "#57bc7c" : "#d33636" }}>{coin.price_change_percentage_24h.toFixed(2)}</td>
                <td>${coin.total_volume.toLocaleString()}</td>
                <td><img src={coin.price_change_percentage_24h >= 0 ? chartUp : chartDown} alt="chart" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default CoinsTable