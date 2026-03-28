import React, { useEffect, useState } from 'react';
import { ReactFlow, Background, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const makeStyle = (bg, border) => ({
  background: bg,
  border: `2px solid ${border}`,
  borderRadius: '8px',
  padding: '10px 16px',
  minWidth: '130px',
  textAlign: 'center',
  color: '#fff',
  fontFamily: "'Geist Mono', monospace",
  fontSize: '12px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
});

const StepNode = ({ data }) => (
  <div style={makeStyle(data.bg, data.border)}>
    <div style={{ fontWeight: 600, fontSize: '13px' }}>{data.label}</div>
    <div style={{ opacity: 0.8, marginTop: '3px', fontSize: '11px', fontFamily: "'Geist', sans-serif" }}>
      {data.description}
    </div>
  </div>
);

const nodeTypes = { step: StepNode };

const nodes = [
  {
    id: 'plan',
    type: 'step',
    position: { x: 300, y: 0 },
    data: { label: 'PLAN', description: 'Decompose into sub-queries', bg: '#F9D53F', border: '#C4A020' },
    sourcePosition: Position.Bottom,
    style: { color: '#1a1a2e' },
  },
  {
    id: 'search1',
    type: 'step',
    position: { x: 50, y: 120 },
    data: { label: 'SEARCH', description: 'Tavily', bg: '#00B4EF', border: '#0090C0' },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: 'search2',
    type: 'step',
    position: { x: 220, y: 120 },
    data: { label: 'SEARCH', description: 'DuckDuckGo', bg: '#00B4EF', border: '#0090C0' },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: 'search3',
    type: 'step',
    position: { x: 390, y: 120 },
    data: { label: 'SEARCH', description: 'Exa', bg: '#00B4EF', border: '#0090C0' },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: 'search4',
    type: 'step',
    position: { x: 560, y: 120 },
    data: { label: 'SEARCH', description: 'Brave', bg: '#00B4EF', border: '#0090C0' },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: 'analyze',
    type: 'step',
    position: { x: 300, y: 250 },
    data: { label: 'ANALYZE', description: 'Extract facts, quality gate', bg: '#0090C0', border: '#006890' },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: 'synthesize',
    type: 'step',
    position: { x: 300, y: 370 },
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
  { id: 'e5', source: 'search1', target: 'analyze', type: 'smoothstep', animated: true, style: { stroke: '#FF5F1F', strokeWidth: 2 } },
  { id: 'e6', source: 'search2', target: 'analyze', type: 'smoothstep', animated: true, style: { stroke: '#FF5F1F', strokeWidth: 2 } },
  { id: 'e7', source: 'search3', target: 'analyze', type: 'smoothstep', animated: true, style: { stroke: '#FF5F1F', strokeWidth: 2 } },
  { id: 'e8', source: 'search4', target: 'analyze', type: 'smoothstep', animated: true, style: { stroke: '#FF5F1F', strokeWidth: 2 } },
  { id: 'e9', source: 'analyze', target: 'synthesize', type: 'smoothstep', animated: true, style: { stroke: '#FF5F1F', strokeWidth: 2 } },
];

export default function PipelineFlow() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div style={{ height: '460px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Geist Mono', monospace", fontSize: '12px', color: '#8A8380', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        Loading pipeline...
      </div>
    );
  }

  return (
    <div style={{ height: '460px', width: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
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
