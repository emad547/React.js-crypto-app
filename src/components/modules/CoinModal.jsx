import { useState } from "react";

import { convertData } from "../../helpers/convertData";

import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import styles from "./CoinModal.module.css"

function CoinModal({ chart, setChart, setIsShowModal, selectedCoin, currency }) {

  const [type, setType] = useState("prices")

  const setTypeHandler = (chartType) => {
    if (chartType !== type) {
      setType(chartType)
    }
  }

  return (
    <div className={styles.modalContainer}>
      <button className={styles.closeModal} onClick={() => setIsShowModal(isShow => !isShow)}>X</button>
      <div className={styles.modal}>
        <h3><img src={selectedCoin.image} alt="icon" /> {selectedCoin.name}</h3>
        <div style={{width: "100%", height: "240px"}}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart width={400} height={400} data={convertData(chart, type)}>
              <CartesianGrid stroke="#404042" />
              <Line type="monotone" dataKey={type} stroke="#3874ff" strokeWidth="2px" />
              <YAxis dataKey={type} domain={["auto", "auto"]} />
              <XAxis dataKey="date" hide />
              <Legend />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.chartTypes}>
          <button className={`${type === "prices" ? styles.active : styles.unactive}`} onClick={() => setTypeHandler("prices")}>Prices</button>
          <button className={`${type === "market_caps" ? styles.active : styles.unactive}`} onClick={() => setTypeHandler("market_caps")}>Market Caps</button>
          <button className={`${type === "total_volumes" ? styles.active : styles.unactive}`} onClick={() => setTypeHandler("total_volumes")}>Total Volumes</button>
        </div>
        <div className={styles.coinInfo}>
          <p><span>Price:</span> {currency === "usd" ? "$" : currency === "eur" ? "€" : "¥"}{selectedCoin.current_price.toFixed(0).toLocaleString()}</p>
          <p><span>ATH:</span> {currency === "usd" ? "$" : currency === "eur" ? "€" : "¥"}{selectedCoin.ath.toFixed(0).toLocaleString()}</p>
          <p><span>Market Cap:</span> {currency === "usd" ? "$" : currency === "eur" ? "€" : "¥"}{selectedCoin.market_cap.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}

export default CoinModal