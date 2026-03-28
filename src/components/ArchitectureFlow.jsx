import React, { useEffect, useState } from 'react';
import { ReactFlow, Controls, Background, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Octos-themed node styles
const makeNodeStyle = (bg, border) => ({
  background: bg,
  border: `2px solid ${border}`,
  borderRadius: '8px',
  padding: '10px 14px',
  minWidth: '140px',
  textAlign: 'center',
  color: '#fff',
  fontFamily: "'Geist Mono', monospace",
  fontSize: '12px',
  letterSpacing: '0.02em',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
});

const nodeStyles = {
  entry:    makeNodeStyle('#F9D53F', '#C4A020'),  // Yellow — entry point
  bus:      makeNodeStyle('#00B4EF', '#0090C0'),  // Ocean blue — bus layer
  agent:    makeNodeStyle('#0090C0', '#006890'),  // Deeper blue — agent layer
  infra:    makeNodeStyle('#FF5F1F', '#D15010'),  // Nemo orange — infra layer
  plugin:   makeNodeStyle('#8A8380', '#5C5855'),  // Neutral — plugin
};

// Custom node component
const OctosNode = ({ data }) => (
  <div style={nodeStyles[data.tier]}>
    <div style={{ fontWeight: 600, fontSize: '13px' }}>{data.label}</div>
    {data.description && (
      <div style={{ opacity: 0.8, marginTop: '4px', fontSize: '11px', fontFamily: "'Geist', sans-serif" }}>
        {data.description}
      </div>
    )}
  </div>
);

// Dark entry node (for CLI/API)
const EntryNode = ({ data }) => (
  <div style={{
    ...nodeStyles.entry,
    color: '#1a1a2e',
    minWidth: '200px',
    fontSize: '14px',
    fontWeight: 700,
  }}>
    <div>{data.label}</div>
    {data.description && (
      <div style={{ opacity: 0.7, marginTop: '4px', fontSize: '11px', fontFamily: "'Geist', sans-serif" }}>
        {data.description}
      </div>
    )}
  </div>
);

const nodeTypes = {
  octos: OctosNode,
  entry: EntryNode,
};

const initialNodes = [
  // Layer 0: Entry
  {
    id: 'cli',
    type: 'entry',
    position: { x: 370, y: 0 },
    data: { label: 'OCTOS CLI / API', description: '91 REST endpoints', tier: 'entry' },
    sourcePosition: Position.Bottom,
  },

  // Layer 1: Bus / Agent / Pipeline
  {
    id: 'bus',
    type: 'octos',
    position: { x: 80, y: 140 },
    data: { label: 'octos-bus', description: '14 channels · 5 queue modes', tier: 'bus' },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: 'agent',
    type: 'octos',
    position: { x: 330, y: 140 },
    data: { label: 'octos-agent', description: 'Tool system · Sandbox', tier: 'bus' },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: 'pipeline',
    type: 'octos',
    position: { x: 580, y: 140 },
    data: { label: 'octos-pipeline', description: 'DOT engine · Fan-out', tier: 'bus' },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },

  // Layer 2: LLM / Memory / Core
  {
    id: 'llm',
    type: 'octos',
    position: { x: 80, y: 300 },
    data: { label: 'octos-llm', description: '14 providers · 3-layer failover', tier: 'infra' },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: 'memory',
    type: 'octos',
    position: { x: 330, y: 300 },
    data: { label: 'octos-memory', description: 'HNSW + BM25 · Entity bank', tier: 'infra' },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: 'core',
    type: 'octos',
    position: { x: 580, y: 300 },
    data: { label: 'octos-core', description: 'Shared types · UTF-8 safe', tier: 'infra' },
    targetPosition: Position.Top,
  },

  // Layer 3: Plugin
  {
    id: 'plugin',
    type: 'octos',
    position: { x: 800, y: 220 },
    data: { label: 'octos-plugin', description: 'Extensibility', tier: 'plugin' },
    targetPosition: Position.Left,
  },
];

const edgeDefaults = {
  style: { stroke: '#4A7AB5', strokeWidth: 2 },
  animated: true,
  type: 'smoothstep',
};

const initialEdges = [
  // CLI -> Layer 1
  { id: 'e-cli-bus', source: 'cli', target: 'bus', ...edgeDefaults },
  { id: 'e-cli-agent', source: 'cli', target: 'agent', ...edgeDefaults },
  { id: 'e-cli-pipeline', source: 'cli', target: 'pipeline', ...edgeDefaults },

  // Layer 1 -> Layer 2
  { id: 'e-bus-llm', source: 'bus', target: 'llm', ...edgeDefaults, style: { stroke: '#FF5F1F', strokeWidth: 2 } },
  { id: 'e-agent-llm', source: 'agent', target: 'llm', ...edgeDefaults, style: { stroke: '#FF5F1F', strokeWidth: 2 } },
  { id: 'e-agent-memory', source: 'agent', target: 'memory', ...edgeDefaults, style: { stroke: '#FF5F1F', strokeWidth: 2 } },
  { id: 'e-pipeline-llm', source: 'pipeline', target: 'llm', ...edgeDefaults, style: { stroke: '#FF5F1F', strokeWidth: 2 } },
  { id: 'e-pipeline-core', source: 'pipeline', target: 'core', ...edgeDefaults, style: { stroke: '#FF5F1F', strokeWidth: 2 } },

  // Plugin connections
  { id: 'e-agent-plugin', source: 'agent', target: 'plugin', sourcePosition: Position.Right, ...edgeDefaults, style: { stroke: '#8A8380', strokeWidth: 1.5, strokeDasharray: '5 5' } },
];

export default function ArchitectureFlow() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{
        height: '460px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Geist Mono', monospace",
        fontSize: '12px',
        color: '#8A8380',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
      }}>
        Loading architecture...
      </div>
    );
  }

  return (
    <div style={{ height: '460px', width: '100%' }}>
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
        proOptions={{ hideAttribution: true }}
        style={{ background: 'transparent' }}
      >
        <Background color="rgba(74, 122, 181, 0.08)" gap={20} size={1} />
      </ReactFlow>
    </div>
  );
}
