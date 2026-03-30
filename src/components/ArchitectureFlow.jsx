import React from 'react';
import { ReactFlow, ReactFlowProvider, Background, Position, Handle } from '@xyflow/react';
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
  position: 'relative',
});

const handleStyle = {
  width: 6,
  height: 6,
  background: 'transparent',
  border: 'none',
};

// Custom node component
const OctosNode = ({ data }) => (
  <div style={nodeStyles[data.tier]}>
    <Handle type="target" position={Position.Top} style={handleStyle} />
    <Handle type="target" position={Position.Left} style={handleStyle} />
    <Handle type="source" position={Position.Bottom} style={handleStyle} />
    <Handle type="source" position={Position.Right} style={handleStyle} />
    <div style={{ fontWeight: 600, fontSize: '13px' }}>{data.label}</div>
    {data.description && (
      <div style={{ opacity: 0.8, marginTop: '4px', fontSize: '11px', fontFamily: "'Geist', sans-serif" }}>
        {data.description}
      </div>
    )}
  </div>
);

// Dark entry node
const EntryNode = ({ data }) => (
  <div style={{
    ...nodeStyles.entry,
    color: '#1a1a2e',
    minWidth: '200px',
    fontSize: '14px',
    fontWeight: 700,
  }}>
    <Handle type="source" position={Position.Bottom} style={handleStyle} />
    <div>{data.label}</div>
    {data.description && (
      <div style={{ opacity: 0.7, marginTop: '4px', fontSize: '11px', fontFamily: "'Geist', sans-serif" }}>
        {data.description}
      </div>
    )}
  </div>
);

const nodeStyles = {
  entry:    makeNodeStyle('#F9D53F', '#C4A020'),
  bus:      makeNodeStyle('#00B4EF', '#0090C0'),
  agent:    makeNodeStyle('#0090C0', '#006890'),
  infra:    makeNodeStyle('#FF5F1F', '#D15010'),
  plugin:   makeNodeStyle('#8A8380', '#5C5855'),
};

const nodeTypes = {
  octos: OctosNode,
  entry: EntryNode,
};

const initialNodes = [
  {
    id: 'cli',
    type: 'entry',
    position: { x: 370, y: 0 },
    data: { label: 'OCTOS CLI / API', description: '92 REST endpoints', tier: 'entry' },
  },
  {
    id: 'bus',
    type: 'octos',
    position: { x: 80, y: 140 },
    data: { label: 'octos-bus', description: '12 channels \u00B7 5 queue modes', tier: 'bus' },
  },
  {
    id: 'agent',
    type: 'octos',
    position: { x: 330, y: 140 },
    data: { label: 'octos-agent', description: 'Think \u00B7 Use tools \u00B7 Stay safe', tier: 'bus' },
  },
  {
    id: 'pipeline',
    type: 'octos',
    position: { x: 580, y: 140 },
    data: { label: 'octos-pipeline', description: 'Multi-step workflows', tier: 'bus' },
  },
  {
    id: 'llm',
    type: 'octos',
    position: { x: 80, y: 300 },
    data: { label: 'octos-llm', description: '15 providers \u00B7 3-layer failover', tier: 'infra' },
  },
  {
    id: 'memory',
    type: 'octos',
    position: { x: 330, y: 300 },
    data: { label: 'octos-memory', description: 'Never forgets \u00B7 3 layers', tier: 'infra' },
  },
  {
    id: 'core',
    type: 'octos',
    position: { x: 580, y: 300 },
    data: { label: 'octos-core', description: 'Shared types', tier: 'infra' },
  },
  {
    id: 'plugin',
    type: 'octos',
    position: { x: 800, y: 220 },
    data: { label: 'octos-plugin', description: 'Extensibility', tier: 'plugin' },
  },
];

const initialEdges = [
  // CLI -> Layer 1
  { id: 'e-cli-bus', source: 'cli', target: 'bus', type: 'smoothstep', animated: true, style: { stroke: '#4A7AB5', strokeWidth: 2 } },
  { id: 'e-cli-agent', source: 'cli', target: 'agent', type: 'smoothstep', animated: true, style: { stroke: '#4A7AB5', strokeWidth: 2 } },
  { id: 'e-cli-pipeline', source: 'cli', target: 'pipeline', type: 'smoothstep', animated: true, style: { stroke: '#4A7AB5', strokeWidth: 2 } },

  // Layer 1 cross-connections
  { id: 'e-bus-agent', source: 'bus', target: 'agent', type: 'smoothstep', animated: true, style: { stroke: '#4A7AB5', strokeWidth: 2 } },
  { id: 'e-agent-pipeline', source: 'agent', target: 'pipeline', type: 'smoothstep', animated: true, style: { stroke: '#4A7AB5', strokeWidth: 2 } },

  // Layer 1 -> Layer 2
  { id: 'e-bus-llm', source: 'bus', target: 'llm', type: 'smoothstep', animated: true, style: { stroke: '#FF5F1F', strokeWidth: 2 } },
  { id: 'e-bus-memory', source: 'bus', target: 'memory', type: 'smoothstep', animated: true, style: { stroke: '#FF5F1F', strokeWidth: 2 } },
  { id: 'e-agent-llm', source: 'agent', target: 'llm', type: 'smoothstep', animated: true, style: { stroke: '#FF5F1F', strokeWidth: 2 } },
  { id: 'e-agent-memory', source: 'agent', target: 'memory', type: 'smoothstep', animated: true, style: { stroke: '#FF5F1F', strokeWidth: 2 } },
  { id: 'e-pipeline-llm', source: 'pipeline', target: 'llm', type: 'smoothstep', animated: true, style: { stroke: '#FF5F1F', strokeWidth: 2 } },
  { id: 'e-pipeline-memory', source: 'pipeline', target: 'memory', type: 'smoothstep', animated: true, style: { stroke: '#FF5F1F', strokeWidth: 2 } },
  { id: 'e-pipeline-core', source: 'pipeline', target: 'core', type: 'smoothstep', animated: true, style: { stroke: '#FF5F1F', strokeWidth: 2 } },

  // Layer 2 cross-connections
  { id: 'e-llm-memory', source: 'llm', target: 'memory', type: 'smoothstep', animated: true, style: { stroke: '#FF5F1F', strokeWidth: 2 } },
  { id: 'e-memory-core', source: 'memory', target: 'core', type: 'smoothstep', animated: true, style: { stroke: '#FF5F1F', strokeWidth: 2 } },

  // Plugin
  { id: 'e-agent-plugin', source: 'agent', target: 'plugin', type: 'smoothstep', animated: true, style: { stroke: '#8A8380', strokeWidth: 1.5 } },
];

function Flow() {
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

export default function ArchitectureFlow() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}
