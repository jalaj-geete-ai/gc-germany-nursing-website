import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import Icon from '../components/Icon';
import CTABanner from '../components/CTABanner';
import GermanyBackdrop from '../components/GermanyBackdrop';
import { fetchPosts } from '../lib/blog';

function fmtDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch { return ''; }
}

export default function Blog() {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    document.title = 'Insights & Guides | Global Careers by Testbook';
    fetchPosts().then(setPosts).catch(() => setError(true));
  }, []);

  return (
    <>
      <section className="page-hero">
        <GermanyBackdrop />
        <div className="container">
          <Reveal><span className="eyebrow">Insights &amp; guides</span></Reveal>
          <Reveal delay={0.06}><h1 className="page-hero-title">The Germany Nursing Blog</h1></Reveal>
          <Reveal delay={0.12}>
            <p className="page-hero-sub">
              Clear, practical guides on salary, language, visas and life in Germany — written for Indian nurses.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {error && <p className="blog-empty">Couldn't load articles right now. Please try again shortly.</p>}
          {!error && posts === null && <p className="blog-empty">Loading articles…</p>}
          {!error && posts && posts.length === 0 && <p className="blog-empty">New articles are on the way — check back soon.</p>}

          {posts && posts.length > 0 && (
            <div className="blog-grid">
              {posts.map((p, i) => (
                <Reveal delay={0.06 * i} key={p.slug}>
                  <Link to={`/blog/${p.slug}`} className="blog-card">
                    <div className="blog-card-cover" style={{ '--accent': p.accent || '#14B8DD' }}>
                      <Icon name={p.icon || 'book'} size={34} />
                    </div>
                    <div className="blog-card-body">
                      <span className="blog-card-cat">{p.category}</span>
                      <h3 className="blog-card-title">{p.title}</h3>
                      <p className="blog-card-excerpt">{p.excerpt}</p>
                      <div className="blog-card-meta">
                        <span>{fmtDate(p.published_at)}</span>
                        <span>{p.read_minutes} min read</span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
