import styles from "./Layout.module.css"

function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <h1>Crypto App</h1>
        <p>React.js</p>
      </header>
      {children}
      <footer className={styles.footer}>
        <p>Developed by Emad with 💗</p>
      </footer>
    </>
  )
}

export default Layout