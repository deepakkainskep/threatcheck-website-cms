import React, { useState } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight, Globe, Server, Hash } from 'lucide-react';
import './RecentChecksTable.css';

const MOCK_CHECKS = [
  { id: 1, indicator: 'secure-login-example.com', type: 'Domain', risk: 87, classification: 'Phishing', status: 'Analyzed', time: '10 mins ago', riskLevel: 'critical' },
  { id: 2, indicator: '192.168.45.2', type: 'IP', risk: 92, classification: 'Malware C2', status: 'Analyzed', time: '1 hour ago', riskLevel: 'critical' },
  { id: 3, indicator: 'google-analytics-api.net', type: 'Domain', risk: 45, classification: 'Suspicious', status: 'Analyzed', time: '3 hours ago', riskLevel: 'moderate' },
  { id: 4, indicator: 'a2b3c4d5e6f7a8b9', type: 'Hash', risk: 12, classification: 'Clean', status: 'Analyzed', time: '4 hours ago', riskLevel: 'safe' },
  { id: 5, indicator: 'app.slack.com', type: 'Domain', risk: 5, classification: 'Clean', status: 'Analyzed', time: '5 hours ago', riskLevel: 'safe' }
];

const TYPE_ICONS = {
  'Domain': Globe,
  'IP': Server,
  'Hash': Hash
};

export default function RecentChecksTable({ onRowClick }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = MOCK_CHECKS.filter(c => 
    c.indicator.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.classification.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="tc-table-container tc-glow-card">
      <div className="tc-table-header">
        <h4>Recent Threat Checks</h4>
        <div className="tc-table-actions">
          <div className="tc-table-search">
            <Search size={16} />
            <input 
              type="text" 
              placeholder="Search indicators..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="tc-table-btn"><Filter size={16} /> Filter</button>
        </div>
      </div>
      
      <div className="tc-table-wrapper">
        <table className="tc-table">
          <thead>
            <tr>
              <th>Indicator</th>
              <th>Type</th>
              <th>Risk Score</th>
              <th>Classification</th>
              <th>Timestamp</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? filtered.map((row, idx) => {
              const Icon = TYPE_ICONS[row.type] || Globe;
              return (
                <tr 
                  key={row.id} 
                  onClick={() => onRowClick && onRowClick(row)}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <td className="tc-cell-primary">
                    <Icon size={16} className="tc-cell-icon" />
                    {row.indicator}
                  </td>
                  <td><span className="tc-tag tc-tag-gray">{row.type}</span></td>
                  <td>
                    <span className={`tc-score-badge tc-score-${row.riskLevel}`}>
                      {row.risk}
                    </span>
                  </td>
                  <td className={`tc-text-${row.riskLevel}`}>{row.classification}</td>
                  <td className="tc-text-muted">{row.time}</td>
                  <td><span className="tc-tag tc-tag-green">{row.status}</span></td>
                </tr>
              );
            }) : (
              <tr>
                <td colSpan="6" className="tc-table-empty">No results found for "{searchTerm}"</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="tc-table-footer">
        <span className="tc-table-meta">Showing {filtered.length} results</span>
        <div className="tc-table-pagination">
          <button disabled><ChevronLeft size={16} /></button>
          <button disabled><ChevronRight size={16} /></button>
        </div>
      </div>
    </div>
  );
}
