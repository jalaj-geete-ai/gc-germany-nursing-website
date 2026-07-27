import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import Icon from '../components/Icon';
import CTABanner from '../components/CTABanner';
import { fetchPost } from '../lib/blog';

function fmtDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch { return ''; }
}

// Renders one pictorial content block.
function Block({ b }) {
  switch (b.type) {
    case 'lead':
      return <p className="blog-lead">{b.text}</p>;
    case 'h2':
      return <h2 className="blog-h2">{b.text}</h2>;
    case 'p':
      return <p className="blog-p">{b.text}</p>;
    case 'quote':
      return (
        <blockquote className="blog-quote">
          <span>{b.text}</span>
          {b.cite && <cite>— {b.cite}</cite>}
        </blockquote>
      );
    case 'stat':
      return (
        <div className="blog-stat-single">
          <span className="blog-stat-value">{b.value}</span>
          <span className="blog-stat-label">{b.label}</span>
        </div>
      );
    case 'stats':
      return (
        <div className="blog-statrow">
          {b.items.map((s, i) => (
            <div className="blog-statrow-item" key={i}>
              <span className="blog-statrow-value">{s.value}</span>
              <span className="blog-statrow-label">{s.label}</span>
            </div>
          ))}
        </div>
      );
    case 'list':
      return (
        <ul className="blog-list">
          {b.items.map((it, i) => (
            <li key={i}><Icon name="check" size={17} /> <span>{it}</span></li>
          ))}
        </ul>
      );
    case 'callout':
      return (
        <div className="blog-callout">
          <Icon name={b.icon || 'info'} size={22} />
          <div>
            {b.title && <strong>{b.title}</strong>}
            <p>{b.text}</p>
          </div>
        </div>
      );
    default:
      return null;
  }
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(undefined); // undefined = loading, null = not found

  useEffect(() => {
    let alive = true;
    fetchPost(slug)
      .then((p) => { if (alive) setPost(p || null); })
      .catch(() => { if (alive) setPost(null); });
    return () => { alive = false; };
  }, [slug]);

  useEffect(() => {
    if (post) {
      document.title = `${post.seo_title || post.title} | Global Careers by Testbook`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta && (post.seo_description || post.excerpt)) {
        meta.setAttribute('content', post.seo_description || post.excerpt);
      }
    }
  }, [post]);

  if (post === undefined) {
    return <section className="section"><div className="container"><p className="blog-empty">Loading…</p></div></section>;
  }

  if (post === null) {
    return (
      <section className="section">
        <div className="container blog-notfound">
          <h1 className="page-hero-title">Article not found</h1>
          <p className="page-hero-sub">This article may have moved or been unpublished.</p>
          <Link to="/blog" className="btn btn-primary">Back to the blog</Link>
        </div>
      </section>
    );
  }

  const body = Array.isArray(post.body) ? post.body : [];

  return (
    <>
      <article className="blog-article">
        {/* Branded pictorial hero (no photo) */}
        <header className="blog-post-hero" style={{ '--accent': post.accent || '#14B8DD' }}>
          <div className="container">
            <Link to="/blog" className="blog-back"><Icon name="trend" size={15} className="blog-back-icon" /> All articles</Link>
            <span className="blog-post-cat">{post.category}</span>
            <h1 className="blog-post-title">{post.title}</h1>
            <div className="blog-post-meta">
              <span>{post.author}</span>
              <span>·</span>
              <span>{fmtDate(post.published_at)}</span>
              <span>·</span>
              <span>{post.read_minutes} min read</span>
            </div>
            <div className="blog-post-hero-graphic"><Icon name={post.icon || 'book'} size={44} /></div>
          </div>
        </header>

        <div className="container blog-post-body">
          {body.map((b, i) => (
            <Reveal delay={Math.min(i * 0.02, 0.2)} key={i}><Block b={b} /></Reveal>
          ))}
        </div>
      </article>

      <CTABanner />
    </>
  );
}
