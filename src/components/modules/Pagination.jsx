import styles from "./Pagination.module.css"

function Pagination({ currentPage, setCurrentPage }) {

  const previousHandler = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage => currentPage - 1)
    }
  }

  const nextHandler = () => {
    if (currentPage < 10) {
      setCurrentPage(currentPage => currentPage + 1)
    }
  }

  const pageBtnClickHandler = (event) => {
    const pageButtonNumber = Number(event.target.innerText)

    if (currentPage !== pageButtonNumber) {
      setCurrentPage(Number(event.target.innerText))
    }
  }

  return (
    <div className={styles.paginationBox}>
      <button style={{backgroundColor: currentPage === 1 ? "#132648" : "#1a438d"}} onClick={previousHandler}>previous</button>
      <button style={{background: currentPage === 1 ? "#1a438d" : "transparent"}} onClick={pageBtnClickHandler}>1</button>
      <button style={{background: currentPage === 2 ? "#1a438d" : "transparent"}} onClick={pageBtnClickHandler}>2</button>
      {
        currentPage >= 3 && currentPage <= 8 && (
          <>
            <p>...</p>
            <button style={{background: "#1a438d"}} onClick={pageBtnClickHandler}>{currentPage}</button>
          </>
        )
      }
      <p>...</p>
      <button style={{background: currentPage === 9 ? "#1a438d" : "transparent"}} onClick={pageBtnClickHandler}>9</button>
      <button style={{background: currentPage === 10 ? "#1a438d" : "transparent"}} onClick={pageBtnClickHandler}>10</button>
      <button style={{backgroundColor: currentPage === 10 ? "#132648" : "#1a438d"}} onClick={nextHandler}>next</button>
    </div>
  )
}

export default Pagination