import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="navbar main-navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link href="/">
          <a className="navbar-item">
            <img src="https://avatars2.githubusercontent.com/u/259196?s=460&u=0d55dc7c6f0f2ef9dbd6d3f9cea9b1c876b66b73&v=4" className="navbar-logo" />
          </a>
        </Link>
      </div>

      <div className="navbar-menu is-active">
        <div className="navbar-start">
          <Link href="/projects">
            <a className="navbar-item">
              Projects
            </a>
          </Link>
          <Link href="/blog">
            <a className="navbar-item">
              Blog
            </a>
          </Link>
        </div>
      </div>
    </nav>
  )
}