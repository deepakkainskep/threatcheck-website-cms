import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import './BlogCard.css';

export default function BlogCard({ article }) {
  const { _id, title, excerpt, category, author, date, readingTime, image } = article;

  return (
    <article className="blog-card glass-panel tc-premium-card">
      <div className="blog-card-image-wrapper">
        <img
          src={image}
          alt={title}
          className="blog-card-image"
          onError={e => {
            e.target.onerror = null;
            // Generate a simple colored placeholder if image fails
            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='100%25' height='100%25' fill='%231a1d2d'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236702ba' font-family='sans-serif' font-size='48'%3E" + encodeURIComponent(category) + "%3C/text%3E%3C/svg%3E";
          }}
        />
        <div className="blog-card-category">
          <span className="badge badge-primary">{category}</span>
        </div>
      </div>

      <div className="blog-card-content">
        <div className="blog-meta">
          {/* <span className="blog-meta-item"><Calendar size={12} /> {date}</span>
          <span className="blog-meta-item"><Clock size={12} /> {readingTime}</span> */}
        </div>

        <h3 className="blog-card-title">
          <Link to={`/blog/${_id}`}>{title}</Link>
        </h3>

        <p className="blog-card-excerpt">{excerpt}</p>

        <div className="blog-card-footer">
          <div className="blog-author">
            <div className="author-avatar">{author.split(' ').map(n => n[0]).join('')}</div>
            <span className="author-name">{author}</span>
          </div>
          <Link to={`/blog/${_id}`} className="blog-read-link">
            Read <ArrowRight size={14} className="arrow" />
          </Link>
        </div>
      </div>
    </article>
  );
}
