import { useState, useEffect } from "react"
import { RotatingLines } from "react-loader-spinner"
import { searchCoin } from "../../services/cryptoApi"

import styles from "./Search.module.css"

function Search({ currency, setCurrency }) {
  const [search, setSearch] = useState("")

  const [searchedCoins, setSearchedCoins] = useState([])

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!search) return;

    setSearchedCoins([])

    setIsLoading(true)

    const controller = new AbortController()

    fetch(searchCoin(search), {signal: controller.signal})
      .then(res => res.json())
      .then(json => {
        setSearchedCoins(json.coins)
        setIsLoading(false)
      })
      .catch(error => {
        if (error.name !== "AbortError") {
          console.log(error);
        }
      })

    return () => {
      controller.abort()
    }
  }, [search])

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBox}>
        <input type="text" value={search} placeholder="Search..." className={styles.searchInput} onChange={(event) => setSearch(event.target.value)} />
        {
          search && (!!searchedCoins.length || isLoading) && (
            <div className={styles.searchResult}>
              {
                isLoading && (
                  <RotatingLines width="50px" height="50px" strokeWidth="2px" strokeColor="#3874ff" />
                )  
              }
              {
                searchedCoins.length !== 0 && (
                  searchedCoins.map(coin => (
                    <p key={coin.id}><img src={coin.thumb} alt={coin.name} /> {coin.name}</p>
                  ))
                )
              }
            </div>
          )
        }
      </div>

      <select value={currency} onChange={() => setCurrency(event.target.value)} className={styles.selectBox}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>
    </div>
  )
}

export default Search