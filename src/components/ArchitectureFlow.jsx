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

// Protocol boundary node: the line between the app and the kernel.
const BoundaryNode = ({ data }) => (
  <div style={{
    ...nodeStyles.boundary,
    minWidth: '520px',
    borderStyle: 'dashed',
  }}>
    <Handle type="target" position={Position.Top} style={handleStyle} />
    <Handle type="source" position={Position.Bottom} style={handleStyle} />
    <div style={{ fontWeight: 600, fontSize: '13px' }}>{data.label}</div>
    {data.description && (
      <div style={{ opacity: 0.85, marginTop: '4px', fontSize: '11px', fontFamily: "'Geist', sans-serif" }}>
        {data.description}
      </div>
    )}
  </div>
);

const nodeStyles = {
  entry:    makeNodeStyle('#F9D53F', '#C4A020'),
  boundary: makeNodeStyle('#00B4EF', '#0090C0'),
  runtime:  makeNodeStyle('#0090C0', '#006890'),
  infra:    makeNodeStyle('#FF5F1F', '#D15010'),
  binding:  makeNodeStyle('#8A8380', '#5C5855'),
};

const nodeTypes = {
  octos: OctosNode,
  entry: EntryNode,
  boundary: BoundaryNode,
};

const edge = (id, source, target, stroke) => ({
  id,
  source,
  target,
  type: 'smoothstep',
  animated: true,
  style: { stroke, strokeWidth: 2 },
});

const BLUE = '#4A7AB5';
const ORANGE = '#FF5F1F';
const GREY = '#8A8380';

const initialNodes = [
  {
    id: 'app',
    type: 'entry',
    position: { x: 300, y: 0 },
    data: { label: 'YOUR APP', description: 'OctoSense · Octoscode · your product', tier: 'entry' },
  },
  {
    id: 'oup',
    type: 'boundary',
    position: { x: 120, y: 110 },
    data: { label: 'OUP — Octos UI Protocol', description: 'JSON-RPC 2.0 over WebSocket · stdio · in-process', tier: 'boundary' },
  },
  {
    id: 'agent',
    type: 'octos',
    position: { x: 120, y: 240 },
    data: { label: 'octos-agent', description: 'Turns · tools · hooks · sandbox', tier: 'runtime' },
  },
  {
    id: 'bus',
    type: 'octos',
    position: { x: 360, y: 240 },
    data: { label: 'octos-bus', description: 'Sessions · profiles', tier: 'runtime' },
  },
  {
    id: 'fleet',
    type: 'octos',
    position: { x: 600, y: 240 },
    data: { label: 'octos-swarm / fleet', description: 'Peers · workers · goals', tier: 'runtime' },
  },
  {
    id: 'llm',
    type: 'octos',
    position: { x: 120, y: 390 },
    data: { label: 'octos-llm', description: 'Providers · routing · failover', tier: 'infra' },
  },
  {
    id: 'memory',
    type: 'octos',
    position: { x: 360, y: 390 },
    data: { label: 'octos-memory', description: 'Hybrid recall · 3 tiers', tier: 'infra' },
  },
  {
    id: 'core',
    type: 'octos',
    position: { x: 600, y: 390 },
    data: { label: 'octos-core', description: 'Types · OUP codecs', tier: 'infra' },
  },
  {
    id: 'bindings',
    type: 'octos',
    position: { x: 830, y: 110 },
    data: { label: 'bindings', description: 'ffi · uniffi · pyo3 · wasm', tier: 'binding' },
  },
];

const initialEdges = [
  edge('e-app-oup', 'app', 'oup', BLUE),
  edge('e-app-bindings', 'app', 'bindings', GREY),
  edge('e-oup-agent', 'oup', 'agent', BLUE),
  edge('e-oup-bus', 'oup', 'bus', BLUE),
  edge('e-oup-fleet', 'oup', 'fleet', BLUE),
  edge('e-bindings-agent', 'bindings', 'agent', GREY),
  edge('e-agent-bus', 'agent', 'bus', BLUE),
  edge('e-bus-fleet', 'bus', 'fleet', BLUE),
  edge('e-agent-llm', 'agent', 'llm', ORANGE),
  edge('e-agent-memory', 'agent', 'memory', ORANGE),
  edge('e-bus-memory', 'bus', 'memory', ORANGE),
  edge('e-fleet-core', 'fleet', 'core', ORANGE),
  edge('e-llm-memory', 'llm', 'memory', ORANGE),
  edge('e-memory-core', 'memory', 'core', ORANGE),
];

function Flow() {
  return (
    <div style={{ height: '520px', width: '100%' }}>
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
