'use client'
import styles from "./page.module.css";

export default function Home() {

  function logIn(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    console.log("Log In")
  }
  
  return (
    <>
    <main className={`${styles.main}`}>
      <form onSubmit={logIn} className={`${styles.form}`}>
        <label htmlFor="email">Email</label>
        <input type="email" />
        <label htmlFor="password">Password</label>
        <input type="password" />
        <button type='submit'>Login</button>
      </form>
    </main>
    </>
  )
}
