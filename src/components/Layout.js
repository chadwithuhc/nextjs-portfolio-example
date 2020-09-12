import Head from 'next/head'
import Navbar from './Navbar'

export default function Layout({ title = 'Portfolio', children = [] }) {
  return (
    <div className="container">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      
      <main className="content main-content">
        {children}
      </main>

      <footer>
        &copy; {(new Date()).getFullYear()}
      </footer>
    </div>
  )
}