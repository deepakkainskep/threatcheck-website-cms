import React, { useState, useEffect, useRef } from 'react';
import { Search, Globe, ShieldAlert, Cpu, HardDrive, FileText, X } from 'lucide-react';
import './CommandPalette.css';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const mockResults = [
    { icon: <Globe size={16} />, type: 'Domain', title: 'secure-login-example.com', desc: 'Recent scan • Phishing' },
    { icon: <Cpu size={16} />, type: 'IP', title: '192.168.45.2', desc: 'Threat Actor Infrastructure' },
    { icon: <ShieldAlert size={16} />, type: 'CVE', title: 'CVE-2024-21412', desc: 'High risk • Unpatched' },
    { icon: <FileText size={16} />, type: 'Hash', title: 'a2b3c4d5e6f7a8b9...', desc: 'Malware indicator' }
  ];

  const filtered = query
    ? mockResults.filter((r) => r.title.toLowerCase().includes(query.toLowerCase()) || r.type.toLowerCase().includes(query.toLowerCase()))
    : mockResults;

  return (
    <div className="tc-cmd-overlay" onClick={() => setIsOpen(false)}>
      <div className="tc-cmd-modal tc-glow-card" onClick={(e) => e.stopPropagation()}>
        <div className="tc-cmd-header">
          <Search size={20} className="tc-cmd-icon" />
          <input
            ref={inputRef}
            className="tc-cmd-input"
            placeholder="Search domains, IPs, CVEs, or hashes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="tc-cmd-close" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <div className="tc-cmd-body">
          <div className="tc-cmd-section-title">
            {query ? 'Search Results' : 'Recent Searches'}
          </div>
          <div className="tc-cmd-results">
            {filtered.length > 0 ? (
              filtered.map((result, idx) => (
                <button key={idx} className="tc-cmd-item">
                  <div className="tc-cmd-item-icon">{result.icon}</div>
                  <div className="tc-cmd-item-info">
                    <span className="tc-cmd-item-title">{result.title}</span>
                    <span className="tc-cmd-item-desc">{result.desc}</span>
                  </div>
                  <div className="tc-cmd-item-type">{result.type}</div>
                </button>
              ))
            ) : (
              <div className="tc-cmd-empty">No indicators found for "{query}"</div>
            )}
          </div>
        </div>
        <div className="tc-cmd-footer">
          <span><kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
          <span><kbd>Enter</kbd> to select</span>
          <span><kbd>Esc</kbd> to close</span>
        </div>
      </div>
    </div>
  );
}
