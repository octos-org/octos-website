import React from 'react';
import { ReactFlow, ReactFlowProvider, Background, Position, Handle } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const makeStyle = (bg, border) => ({
  background: bg,
  border: `2px solid ${border}`,
  borderRadius: '12px',
  padding: '16px 24px',
  minWidth: '170px',
  textAlign: 'center',
  color: '#fff',
  fontFamily: "'Geist Mono', monospace",
  fontSize: '14px',
  boxShadow: '0 6px 24px rgba(0,0,0,0.4)',
  position: 'relative',
});

const handleStyle = {
  width: 8,
  height: 8,
  background: 'transparent',
  border: 'none',
};

const StepNode = ({ data }) => (
  <div style={makeStyle(data.bg, data.border)}>
    <Handle type="target" position={Position.Top} style={handleStyle} />
    <Handle type="target" position={Position.Left} style={handleStyle} />
    <Handle type="source" position={Position.Bottom} style={handleStyle} />
    <Handle type="source" position={Position.Right} style={handleStyle} />
    <div style={{ fontWeight: 700, fontSize: '16px', letterSpacing: '0.02em' }}>{data.label}</div>
    <div style={{ opacity: 0.8, marginTop: '6px', fontSize: '13px', fontFamily: "'Geist', sans-serif" }}>
      {data.description}
    </div>
  </div>
);

const nodeTypes = { step: StepNode };

const nodes = [
  {
    id: 'plan',
    type: 'step',
    position: { x: 440, y: 0 },
    data: { label: 'PLAN', description: 'Decompose into sub-queries', bg: '#F9D53F', border: '#C4A020' },
    sourcePosition: Position.Bottom,
    style: { color: '#1a1a2e' },
  },
  {
    id: 'search1',
    type: 'step',
    position: { x: 0, y: 160 },
    data: { label: 'SEARCH', description: 'Tavily', bg: '#00B4EF', border: '#0090C0' },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: 'search2',
    type: 'step',
    position: { x: 200, y: 160 },
    data: { label: 'SEARCH', description: 'DuckDuckGo', bg: '#00B4EF', border: '#0090C0' },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: 'search3',
    type: 'step',
    position: { x: 400, y: 160 },
    data: { label: 'SEARCH', description: 'Exa', bg: '#00B4EF', border: '#0090C0' },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: 'search4',
    type: 'step',
    position: { x: 600, y: 160 },
    data: { label: 'SEARCH', description: 'Brave', bg: '#00B4EF', border: '#0090C0' },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: 'search5',
    type: 'step',
    position: { x: 800, y: 160 },
    data: { label: 'SEARCH', description: 'You.com', bg: '#00B4EF', border: '#0090C0' },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: 'analyze',
    type: 'step',
    position: { x: 440, y: 340 },
    data: { label: 'ANALYZE', description: 'Extract facts, quality gate', bg: '#0090C0', border: '#006890' },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: 'synthesize',
    type: 'step',
    position: { x: 440, y: 500 },
    data: { label: 'SYNTHESIZE', description: 'Final report with citations', bg: '#FF5F1F', border: '#D15010' },
    targetPosition: Position.Top,
  },
];

const edgeStyle = { stroke: '#4A7AB5', strokeWidth: 2 };
const edges = [
  { id: 'e1', source: 'plan', target: 'search1', type: 'smoothstep', animated: true, style: edgeStyle },
  { id: 'e2', source: 'plan', target: 'search2', type: 'smoothstep', animated: true, style: edgeStyle },
  { id: 'e3', source: 'plan', target: 'search3', type: 'smoothstep', animated: true, style: edgeStyle },
  { id: 'e4', source: 'plan', target: 'search4', type: 'smoothstep', animated: true, style: edgeStyle },
  { id: 'e4b', source: 'plan', target: 'search5', type: 'smoothstep', animated: true, style: edgeStyle },
  { id: 'e5', source: 'search1', target: 'analyze', type: 'smoothstep', animated: true, style: { stroke: '#FF5F1F', strokeWidth: 2 } },
  { id: 'e6', source: 'search2', target: 'analyze', type: 'smoothstep', animated: true, style: { stroke: '#FF5F1F', strokeWidth: 2 } },
  { id: 'e7', source: 'search3', target: 'analyze', type: 'smoothstep', animated: true, style: { stroke: '#FF5F1F', strokeWidth: 2 } },
  { id: 'e8', source: 'search4', target: 'analyze', type: 'smoothstep', animated: true, style: { stroke: '#FF5F1F', strokeWidth: 2 } },
  { id: 'e8b', source: 'search5', target: 'analyze', type: 'smoothstep', animated: true, style: { stroke: '#FF5F1F', strokeWidth: 2 } },
  { id: 'e9', source: 'analyze', target: 'synthesize', type: 'smoothstep', animated: true, style: { stroke: '#FF5F1F', strokeWidth: 2 } },
];

function Flow() {
  return (
    <div style={{ height: '660px', width: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.1 }}
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
        <Background color="rgba(74, 122, 181, 0.06)" gap={20} size={1} />
      </ReactFlow>
    </div>
  );
}

export default function PipelineFlow() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}
