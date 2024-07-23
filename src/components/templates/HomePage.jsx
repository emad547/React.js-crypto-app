import { useEffect, useState } from "react"
import { getCoinList } from "../../services/cryptoApi"

import CoinsTable from "../modules/CoinsTable"
import Pagination from "../modules/Pagination"
import Search from "../modules/Search"
import CoinModal from "../modules/CoinModal"

function HomePage() {
  const [coins, setCoins] = useState([])

  const [isLoading, setIsLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)

  const [currency, setCurrency] = useState("usd")

  const [chart, setChart] = useState(null)

  const [isShowModal, setIsShowModal] = useState(false)

  const [selectedCoin, setSelectedCoin] = useState({})

  useEffect(() => {
    const controller = new AbortController()

    fetch(getCoinList(currency, currentPage), { signal: controller.signal })
      .then(res => res.json())
      .then(json => {
        setIsLoading(false)
        return setCoins(json);
      })
      .catch(error => {
        if (error.name !== "AbortError") {
          console.log(error);
        }
      })

    return () => {
      controller.abort()
    }
  }, [currentPage, currency])

  return (
    <div>
      <Search currency={currency} setCurrency={setCurrency} />
      <CoinsTable coins={coins} isLoading={isLoading} setChart={setChart} setIsShowModal={setIsShowModal} setSelectedCoin={setSelectedCoin} currency={currency} />
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {
        !!isShowModal && chart && (
          <CoinModal
            chart={chart}
            setChart={setChart}
            setIsShowModal={setIsShowModal}
            selectedCoin={selectedCoin}
            currency={currency}
          />
        )
      }
    </div>
  )
}

export default HomePage