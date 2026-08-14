import React, { useState } from 'react';
import { Network, Server, Globe, Lock, AlertTriangle, FileCode } from 'lucide-react';
import './IntelligenceGraph.css';

const NODES = [
  { id: 'main', type: 'domain', label: 'secure-login-example.com', x: 250, y: 150, risk: 'high' },
  { id: 'ip1', type: 'ip', label: '192.168.45.2', x: 400, y: 80, risk: 'critical' },
  { id: 'ip2', type: 'ip', label: '192.168.45.3', x: 400, y: 220, risk: 'low' },
  { id: 'cert', type: 'cert', label: 'Let\'s Encrypt Auth', x: 100, y: 80, risk: 'safe' },
  { id: 'ns', type: 'ns', label: 'ns1.suspicious-host.net', x: 100, y: 220, risk: 'high' },
  { id: 'malware', type: 'malware', label: 'Trojan.Win32.Agent', x: 550, y: 80, risk: 'critical' }
];

const EDGES = [
  { source: 'main', target: 'ip1', label: 'Resolves to' },
  { source: 'main', target: 'ip2', label: 'Resolves to' },
  { source: 'main', target: 'cert', label: 'Secured by' },
  { source: 'main', target: 'ns', label: 'Hosted by' },
  { source: 'ip1', target: 'malware', label: 'Distributes' }
];

const ICON_MAP = {
  domain: Globe,
  ip: Server,
  cert: Lock,
  ns: Network,
  malware: AlertTriangle
};

const COLOR_MAP = {
  safe: 'var(--threat-safe)',
  low: 'var(--threat-low)',
  moderate: 'var(--threat-moderate)',
  high: 'var(--threat-high)',
  critical: 'var(--threat-critical)'
};

export default function IntelligenceGraph() {
  const [hoveredNode, setHoveredNode] = useState(null);

  return (
    <div className="tc-graph-container tc-glow-card">
      <div className="tc-graph-header">
        <h4>Threat Intelligence Graph</h4>
        <span className="tc-badge">Interactive Map</span>
      </div>
      
      <div className="tc-graph-viewport">
        <svg className="tc-graph-svg" viewBox="0 0 650 300">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="25" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="var(--text-muted)" />
            </marker>
          </defs>

          {/* Edges */}
          {EDGES.map((edge, idx) => {
            const sourceNode = NODES.find(n => n.id === edge.source);
            const targetNode = NODES.find(n => n.id === edge.target);
            const isHighlight = hoveredNode === edge.source || hoveredNode === edge.target;
            
            return (
              <g key={`edge-${idx}`} className={`tc-edge ${isHighlight ? 'tc-edge-highlight' : ''}`}>
                <line
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke={isHighlight ? 'var(--color-primary)' : 'var(--border-color-subtle)'}
                  strokeWidth={isHighlight ? 2 : 1.5}
                  markerEnd="url(#arrowhead)"
                  className={isHighlight ? 'tc-edge-anim' : ''}
                />
                <text
                  x={(sourceNode.x + targetNode.x) / 2}
                  y={(sourceNode.y + targetNode.y) / 2 - 8}
                  textAnchor="middle"
                  className={`tc-edge-label ${isHighlight ? 'visible' : ''}`}
                >
                  {edge.label}
                </text>
              </g>
            );
          })}

          {/* Nodes */}
          {NODES.map((node) => {
            const Icon = ICON_MAP[node.type] || FileCode;
            const color = COLOR_MAP[node.risk];
            const isHovered = hoveredNode === node.id;
            
            return (
              <g 
                key={node.id}
                className={`tc-node ${isHovered ? 'tc-node-hover' : ''}`}
                transform={`translate(${node.x}, ${node.y})`}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <circle
                  r={20}
                  fill="var(--bg-card)"
                  stroke={color}
                  strokeWidth={isHovered ? 3 : 2}
                  className="tc-node-bg"
                />
                <foreignObject x="-12" y="-12" width="24" height="24">
                  <div className="tc-node-icon" style={{ color }}>
                    <Icon size={16} />
                  </div>
                </foreignObject>
                <text y="35" textAnchor="middle" className="tc-node-label">
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
