import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, ArrowRight } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import BlogCard from '../components/BlogCard';
import CTA from '../components/CTA';
import ScrollReveal from '../components/ScrollReveal';

import { apiService } from '../services/api';
import { useApi } from '../hooks/useApi';
import './Blog.css';

export default function BlogList() {
  const { data: blogData = [], loading } = useApi(apiService.getBlogs);

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'Risk Management', name: 'Risk Management' },
    { id: 'Security Operations', name: 'Security Operations' },
    { id: 'Compliance', name: 'Compliance' },
    { id: 'Automation', name: 'Automation' },
    { id: 'Insights', name: 'Insights' }
  ];

  const filteredArticles = blogData.filter(item => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.excerpt || item.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Pick first article as featured if no active filter is selected
  const featuredArticle = activeCategory === 'all' && searchQuery === '' && blogData.length > 0 ? blogData[0] : null;
  const standardArticles = featuredArticle ? filteredArticles.slice(1) : filteredArticles;

  return (
    <div className="blog-list-page">
      {/* Hero Section */}
      <section className="blog-hero">
        <ScrollReveal variant="fade-up">
          <span className="badge badge-primary">ThreatCheck Blog</span>
          <h1 className="pf-main-title">Cybersecurity & Compliance Insights</h1>
          <p className="pf-main-lead">
            Explore research and guides on continuous cloud posture management, threat auditing, and enterprise compliance mapping.
          </p>
        </ScrollReveal>
      </section>

      <div className="container">
      {loading ? (
        <div style={{ padding: '4rem', textAlign: 'center' }}>Loading articles...</div>
      ) : (
        <>
      {/* Featured Post Box (If activeCategory = all and no search query) */}
      {featuredArticle && (
        <section className="featured-post-section glass-panel">
          <ScrollReveal variant="fade-up" delay={150}>
          <div className="featured-post-grid">
            <div className="featured-post-image-wrapper">
              <img 
                src={featuredArticle.image} 
                alt={featuredArticle.title} 
                className="featured-post-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Crect width='100%25' height='100%25' fill='%230c0f17'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='sans-serif' font-size='20'%3EFeatured Security Post%3C/text%3E%3C/svg%3E";
                }}
              />
              <span className="badge badge-primary featured-category-badge">{featuredArticle.category}</span>
            </div>
            
            <div className="featured-post-content">
              <div className="blog-meta">
                <span className="blog-meta-item"><Calendar size={12} /> {featuredArticle.date}</span>
                <span className="blog-meta-item"><Clock size={12} /> {featuredArticle.readingTime}</span>
              </div>
              
              <h2 className="featured-post-title">
                <Link to={`/blog/${featuredArticle._id}`}>{featuredArticle.title}</Link>
              </h2>
              
              <p className="featured-post-excerpt">{featuredArticle.excerpt}</p>
              
              <div className="featured-post-footer">
                <div className="blog-author">
                  <span className="author-name">{featuredArticle.author}</span>
                  <span className="author-role">&bull; {featuredArticle.role}</span>
                </div>
                <Link to={`/blog/${featuredArticle._id}`} className="btn btn-secondary">
                  Read Article <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
          </ScrollReveal>
        </section>
      )}

      {/* Search and Filters Panel */}
      <ScrollReveal variant="fade-up" delay={200}>
        <div className="shared-search-controls">
          <div className="search-wrapper">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control search-input"
            />
          </div>

          <div className="category-filters">
            {categories.map((cat) => (
              <button 
                key={cat.id} 
                type="button" 
                className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Grid listing */}
      <div className="blog-grid">
        {standardArticles.length > 0 ? (
          standardArticles.map((article, idx) => (
            <ScrollReveal key={article._id} variant="fade-up" delay={idx * 100} style={{ height: '100%' }}>
              <BlogCard article={article} />
            </ScrollReveal>
          ))
        ) : (
          <ScrollReveal variant="fade-up">
            <div className="no-results-banner glass-panel">
              <p>No articles found matching your criteria.</p>
            </div>
          </ScrollReveal>
        )}
      </div>
      </>
      )}
      </div>

      {/* CTA */}
      <CTA />
    </div>
  );
}
