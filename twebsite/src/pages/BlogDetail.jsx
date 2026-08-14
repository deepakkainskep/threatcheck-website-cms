import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, Clock, Tag, ArrowLeft, ArrowRight } from 'lucide-react';
import CTA from '../components/CTA';
import BlogCard from '../components/BlogCard';
import { apiService } from '../services/api';
import { useApi } from '../hooks/useApi';
import './Blog.css';
import './BlogDetail.css';

function renderContent(blocks) {
  return blocks.map((block, idx) => {
    if (block.type === 'heading') {
      const Tag = `h${block.level}`;
      return <Tag key={idx} className="article-heading">{block.text}</Tag>;
    }
    if (block.type === 'paragraph') {
      return <p key={idx} className="article-paragraph">{block.text}</p>;
    }
    if (block.type === 'list') {
      return (
        <ul key={idx} className="article-list">
          {block.items.map((item, i) => {
            const parts = item.split('**');
            return (
              <li key={i}>
                {parts.length >= 3
                  ? <><strong>{parts[1]}</strong>{parts[2]}</>
                  : item
                }
              </li>
            );
          })}
        </ul>
      );
    }
    if (block.type === 'callout') {
      return (
        <div key={idx} className="article-callout">
          <strong>{block.title}</strong>
          <p>{block.text}</p>
        </div>
      );
    }
    return null;
  });
}

export default function BlogDetail() {
  const { id } = useParams();
  const { data: blogData = [], loading } = useApi(apiService.getBlogs);

  if (loading) {
    return <div className="blog-detail-page container" style={{ padding: '6rem 2rem', textAlign: 'center' }}>Loading article...</div>;
  }

  const article = blogData.find(a => a._id === id);

  if (!article && !loading) return <Navigate to="/blog" replace />;

  const related = blogData.filter(a => a._id !== id && a.category === article.category).slice(0, 3);
  const fallback = blogData.filter(a => a._id !== id).slice(0, 3);
  const relatedArticles = related.length > 0 ? related : fallback;

  return (
    <div className="blog-detail-page">
      {/* Back navigation */}
      <div className="container article-back">
        <Link to="/blog" className="back-link">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </div>

      {/* Article Header */}
      <header className="article-header container">
        <div className="article-meta-row">
          <span className="badge badge-primary">{article.category}</span>
          <span className="article-meta-item"><Calendar size={13} /> {article.date}</span>
          <span className="article-meta-item"><Clock size={13} /> {article.readingTime}</span>
        </div>
        <h1 className="article-title">{article.title}</h1>
        <p className="article-subtitle">{article.subtitle}</p>
        <div className="article-author-bar">
          <div className="article-author-avatar">{article.author.split(' ').map(n => n[0]).join('')}</div>
          <div>
            <span className="author-name">{article.author}</span>
            <span className="author-role">{article.role}</span>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="article-hero-image-wrapper container">
        <img
          src={article.image}
          alt={article.title}
          className="article-hero-image"
          onError={e => {
            e.target.onerror = null;
            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='500' viewBox='0 0 1200 500'%3E%3Crect width='100%25' height='100%25' fill='%230c0f17'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='sans-serif' font-size='24'%3E" + encodeURIComponent(article.category) + "%3C/text%3E%3C/svg%3E";
          }}
        />
      </div>

      {/* Article Body */}
      <div className="article-body container">
        <div className="article-content">
          {renderContent(article.content)}

          {/* Tags row */}
          <div className="article-tags">
            <Tag size={14} />
            {article.tags.map((tag, i) => (
              <span key={i} className="tag-pill">{tag}</span>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="article-sidebar">
          <div className="sidebar-card glass-panel">
            <h4 className="sidebar-title">About the Author</h4>
            <div className="sidebar-author">
              <div className="article-author-avatar">{article.author.split(' ').map(n => n[0]).join('')}</div>
              <div>
                <p className="author-name">{article.author}</p>
                <p className="author-role">{article.role}</p>
              </div>
            </div>
          </div>

          <div className="sidebar-card glass-panel sidebar-cta">
            <h4 className="sidebar-title">See ThreatCheck in Action</h4>
            <p>Continuously map SOC 2 and ISO 27001 controls automatically — no more screenshots.</p>
            <Link to="/request-demo" className="btn btn-primary sidebar-btn">
              Book a Demo <ArrowRight size={14} />
            </Link>
          </div>
        </aside>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="related-articles container">
          <h3 className="related-title">Related Articles</h3>
          <div className="blog-grid">
            {relatedArticles.map(a => <BlogCard key={a._id} article={a} />)}
          </div>
        </section>
      )}

      <CTA
        title="Ready to stop checkbox compliance?"
        subtitle="Book a personalized ThreatCheck walkthrough and see continuous posture management live."
      />
    </div>
  );
}
