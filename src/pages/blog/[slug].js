import Link from 'next/link'
import Layout from '../../components/Layout'
import posts from '../../../public/data/posts.json'

const defaultHeroImage = '/img/34961490322_bb9611120a_k.jpg'

export default function BlogPost({ post }) {
  return (
    <Layout title={`${post.title} | Blog`}>
      <Link href="/blog"><a className="button mb-4">◀️ All Entries</a></Link>

      <div className="hero-image" style={{backgroundImage:`url(${post.heroImage || defaultHeroImage})`}}>
        <div className="title-block">
          <h1 className="title">{post.title}</h1>
          <em className="subtitle is-6 is-block">{post.dateFormatted}</em>
        </div>
      </div>

      <div className="content section" dangerouslySetInnerHTML={{__html:post.bodyHtml}}></div>
    </Layout>
  )
}

export async function getStaticProps(context) {
  return {
    props: {
      post: posts.find(post => post.slug === context.params.slug)
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: posts.map(post => ({ params: { slug: post.slug } })),
    fallback: false
  }
}