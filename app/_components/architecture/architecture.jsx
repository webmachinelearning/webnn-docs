'use client'
import React, { useCallback, useEffect } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider
} from "@xyflow/react";
import NetronNode0 from "../netron/node-0";
import "@xyflow/react/dist/style.css";

const initialNodes = [
  {
    id: "nt0",
    type: "netronNode0",
    position: { x: 0, y: 0 },
    data: {
      label: "Model",
      nodeClassName:
        "architecture",
      labelClassName: "title l0 text-center",
    },
  },
  {
    id: "n0a",
    type: "netronNode0",
    position: { x: 140, y: 0 },
    data: {
      label: "ONNX",
      nodeClassName:
        "architecture",
      labelClassName: "bg-[#f72585] model text-white l0 text-center",
    },
  },
  {
    id: "n0b",
    type: "netronNode0",
    position: { x: 249, y: 0 },
    data: {
      label: "TensorFlow",
      nodeClassName:
        "architecture",
      labelClassName: "bg-[#f72585] model text-white l0 text-center",
    },
  },
  {
    id: "n0c",
    type: "netronNode0",
    position: { x: 359, y: 0 },
    data: {
      label: "PyTorch",
      nodeClassName:
        "architecture",
      labelClassName: "bg-[#f72585] model text-white l0 text-center",
    },
  },
  {
    id: "n0d",
    type: "netronNode0",
    position: { x: 466, y: 0 },
    data: {
      label: "bin, npy, json",
      nodeClassName:
        "architecture",
      labelClassName: "bg-[#f72585] model text-white l0 text-center",
    },
  },
  {
    id: "n1a",
    type: "netronNode0",
    position: { x: 234, y: 50 },
    data: {
      label: "Transformers.js",
      nodeClassName:
        "architecture",
      labelClassName: "bg-[#7209b7] transformers text-white l0 text-center",
    },
  },
  {
    id: "nt1",
    type: "netronNode0",
    position: { x: 0, y: 100 },
    data: {
      label: "JS Framework",
      nodeClassName:
        "architecture",
      labelClassName: "title l0 text-center",
    },
  },
  {
    id: "n2a",
    type: "netronNode0",
    position: { x: 140, y: 100 },
    data: {
      label: "ONNX Runtime Web",
      nodeClassName:
        "architecture",
      labelClassName: "bg-[#7209b7] fw text-white l0 text-center",
    },
  },
  {
    id: "n2b",
    type: "netronNode0",
    position: { x: 358, y: 100 },
    data: {
      label: "LiteRT",
      nodeClassName:
        "architecture",
      labelClassName: "bg-[#7209b7] fw text-white l0 text-center",
    },
  },
  {
    id: "nt3",
    type: "netronNode0",
    position: { x: 0, y: 150 },
    data: {
      label: "Browser API",
      nodeClassName:
        "architecture",
      labelClassName: "title l0 text-center",
    },
  },
  {
    id: "n3a",
    type: "netronNode0",
    position: { x: 140, y: 150 },
    data: {
      label: "Wasm",
      nodeClassName:
        "architecture",
      labelClassName: "bg-[#3a0ca3] grey text-white l0 text-center",
    },
  },
  {
    id: "n3b",
    type: "netronNode0",
    position: { x: 284, y: 150 },
    data: {
      label: "WebNN",
      nodeClassName:
        "architecture",
      labelClassName: "bg-[#3a0ca3] text-white l0 text-center",
    },
  },
  {
    id: "n3c",
    type: "netronNode0",
    position: { x: 430, y: 150 },
    data: {
      label: "WebGPU",
      nodeClassName:
        "architecture",
      labelClassName: "bg-[#3a0ca3] grey text-white l0 text-center",
    },
  },
  {
    id: "nt4",
    type: "netronNode0",
    position: { x: 0, y: 200 },
    data: {
      label: "Native ML",
      nodeClassName:
        "architecture",
      labelClassName: "title l0 text-center",
    },
  },
  {
    id: "n4a",
    type: "netronNode0",
    position: { x: 205, y: 200 },
    data: {
      label: "LiteRT",
      nodeClassName:
        "architecture",
      labelClassName: "bg-[#4361ee] native text-white l0 text-center",
    },
  },
  {
    id: "n4b",
    type: "netronNode0",
    position: { x: 307, y: 200 },
    data: {
      label: "Windows ML",
      nodeClassName:
        "architecture",
      labelClassName: "bg-[#4361ee] native text-white l0 text-center",
    },
  },
  {
    id: "n4c",
    type: "netronNode0",
    position: { x: 410, y: 200 },
    data: {
      label: "CoreML",
      nodeClassName:
        "architecture",
      labelClassName: "bg-[#4361ee] native text-white l0 text-center",
    },
  },
  {
    id: "nt5",
    type: "netronNode0",
    position: { x: 0, y: 250 },
    data: {
      label: "Hardware",
      nodeClassName:
        "architecture",
      labelClassName: "title l0 text-center",
    },
  },
  {
    id: "n5a",
    type: "netronNode0",
    position: { x: 140, y: 250 },
    data: {
      label: "CPU",
      nodeClassName:
        "architecture",
      labelClassName: "bg-[#4cc9f0] text-white l0 text-center",
    },
  },
  {
    id: "n5b",
    type: "netronNode0",
    position: { x: 285, y: 250 },
    data: {
      label: "NPU",
      nodeClassName:
        "architecture",
      labelClassName: "bg-[#4cc9f0] text-white l0 text-center",
    },
  },
  {
    id: "n5c",
    type: "netronNode0",
    position: { x: 430, y: 250 },
    data: {
      label: "GPU",
      nodeClassName:
        "architecture",
      labelClassName: "bg-[#4cc9f0] text-white l0 text-center",
    },
  },
];

const initialEdges = [
  {
    id: "e0a_1a",
    source: "n0a",
    target: "n1a",
    type: "default",
    label: 'Path 1',
    style: {
      stroke: "#999",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 0.8,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#999",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e0a_2a",
    source: "n0a",
    target: "n2a",
    type: "default",
    label: 'Path 2',
    style: {
      stroke: "#999",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 0.8,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#999",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e1a_2a",
    source: "n1a",
    target: "n2a",
    type: "default",
    label: 'Path 1',
    style: {
      stroke: "#999",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 0.8,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#999",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e1b_2a",
    source: "n1b",
    target: "n2a",
    type: "default",
    style: {
      stroke: "#999",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 0.8,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#999",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  // {
  //   id: "e0c_2a",
  //   source: "n0c",
  //   target: "n2a",
  //   type: "default",
  //   style: {
  //     stroke: "#999",
  //     strokeWidth: 1,
  //     strokeDasharray: 2,
  //     opacity: 0.8,
  //   },
  //   markerEnd: {
  //     type: "arrowclosed",
  //     color: "#999",
  //     width: 20,
  //     height: 20,
  //   },
  //   animated: true,
  // },
  {
    id: "e0b_2b",
    source: "n0b",
    target: "n2b",
    type: "default",
    label: 'Path 3',
    style: {
      stroke: "#999",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 0.8,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#999",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  // {
  //   id: "e0c_2b",
  //   source: "n0c",
  //   target: "n2b",
  //   type: "default",
  //   style: {
  //     stroke: "#999",
  //     strokeWidth: 1,
  //     strokeDasharray: 2,
  //     opacity: 0.8,
  //   },
  //   markerEnd: {
  //     type: "arrowclosed",
  //     color: "#999",
  //     width: 20,
  //     height: 20,
  //   },
  //   animated: true,
  // },
  // {
  //   id: "e2a_3a",
  //   source: "n2a",
  //   target: "n3a",
  //   type: "default",
  //   style: {
  //     stroke: "#eee",
  //     strokeWidth: 1,
  //     strokeDasharray: 2,
  //     opacity: 0.8,
  //   },
  //   markerEnd: {
  //     type: "arrowclosed",
  //     color: "#eee",
  //     width: 20,
  //     height: 20,
  //   },
  //   animated: true,
  // },
  {
    id: "e2a_3b",
    source: "n2a",
    target: "n3b",
    type: "default",
    label: 'Path 1, Path 2',
    style: {
      stroke: "#999",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 0.8,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#999",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  // {
  //   id: "e2a_3c",
  //   source: "n2a",
  //   target: "n3c",
  //   type: "default",
  //   style: {
  //     stroke: "#eee",
  //     strokeWidth: 1,
  //     strokeDasharray: 2,
  //     opacity: 0.8,
  //   },
  //   markerEnd: {
  //     type: "arrowclosed",
  //     color: "#eee",
  //     width: 20,
  //     height: 20,
  //   },
  //   animated: true,
  // },
  // {
  //   id: "e2b_3a",
  //   source: "n2b",
  //   target: "n3a",
  //   type: "default",
  //   style: {
  //     stroke: "#eee",
  //     strokeWidth: 1,
  //     strokeDasharray: 2,
  //     opacity: 0.8,
  //   },
  //   markerEnd: {
  //     type: "arrowclosed",
  //     color: "#eee",
  //     width: 20,
  //     height: 20,
  //   },
  //   animated: true,
  // },
  // {
  //   id: "e2b_3c",
  //   source: "n2b",
  //   target: "n3c",
  //   type: "default",
  //   style: {
  //     stroke: "#eee",
  //     strokeWidth: 1,
  //     strokeDasharray: 2,
  //     opacity: 0.8,
  //   },
  //   markerEnd: {
  //     type: "arrowclosed",
  //     color: "#eee",
  //     width: 20,
  //     height: 20,
  //   },
  //   animated: true,
  // },
  {
    id: "e2b_3b",
    source: "n2b",
    target: "n3b",
    type: "default",
    label: 'Path 3',
    style: {
      stroke: "#999",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 0.8,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#999",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e0d_3b",
    source: "n0d",
    target: "n3b",
    type: "default",
    label: 'Path 4',
    // labelStyle: { fill: '#999' },
    style: {
      stroke: "#999",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 0.8,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#999",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  // {
  //   id: "e3a_5a",
  //   source: "n3a",
  //   target: "n5a",
  //   type: "default",
  //   style: {
  //     stroke: "#eee",
  //     strokeWidth: 1,
  //     strokeDasharray: 2,
  //     opacity: 0.8,
  //   },
  //   markerEnd: {
  //     type: "arrowclosed",
  //     color: "#eee",
  //     width: 20,
  //     height: 20,
  //   },
  //   animated: true,
  // },
  // {
  //   id: "e3c_5c",
  //   source: "n3c",
  //   target: "n5c",
  //   type: "default",
  //   style: {
  //     stroke: "#eee",
  //     strokeWidth: 1,
  //     strokeDasharray: 2,
  //     opacity: 0.8,
  //   },
  //   markerEnd: {
  //     type: "arrowclosed",
  //     color: "#eee",
  //     width: 20,
  //     height: 20,
  //   },
  //   animated: true,
  // },
  {
    id: "e3b_4a",
    source: "n3b",
    target: "n4a",
    type: "default",
    style: {
      stroke: "#999",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 0.8,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#999",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e3b_4b",
    source: "n3b",
    target: "n4b",
    type: "default",
    style: {
      stroke: "#999",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 0.8,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#999",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e3b_4c",
    source: "n3b",
    target: "n4c",
    type: "default",
    style: {
      stroke: "#999",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 0.8,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#999",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e4a_5a",
    source: "n4a",
    target: "n5a",
    type: "default",
    style: {
      stroke: "#999",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 0.8,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#999",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e4a_5b",
    source: "n4a",
    target: "n5b",
    type: "default",
    style: {
      stroke: "#999",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 0.8,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#999",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e4a_5c",
    source: "n4a",
    target: "n5c",
    type: "default",
    style: {
      stroke: "#999",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 0.8,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#999",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e4b_5a",
    source: "n4b",
    target: "n5a",
    type: "default",
    style: {
      stroke: "#999",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 0.8,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#999",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e4b_5b",
    source: "n4b",
    target: "n5b",
    type: "default",
    style: {
      stroke: "#999",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 0.8,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#999",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e4b_5c",
    source: "n4b",
    target: "n5c",
    type: "default",
    style: {
      stroke: "#999",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 0.8,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#999",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e4c_5a",
    source: "n4c",
    target: "n5a",
    type: "default",
    style: {
      stroke: "#999",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 0.8,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#999",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e4c_5b",
    source: "n4c",
    target: "n5b",
    type: "default",
    style: {
      stroke: "#999",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 0.8,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#999",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e4c_5c",
    source: "n4c",
    target: "n5c",
    type: "default",
    style: {
      stroke: "#999",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 0.8,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#999",
      width: 20,
      height: 20,
    },
    animated: true,
  },
];

function Architecture() {
  const nodeTypes = {
    netronNode0: NetronNode0,
  };


  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onResize = useCallback(() => {
    fitView({ padding: 0.2, duration: 200 });
  }, [fitView]);

  useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [onResize]);

  return (
    <ReactFlow
      className="px-0 md:px-5 py-0 md:py-5 !h-[360px]"
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      fitView
    >
      {
        /* <Controls /> <MiniMap /> */}
    </ReactFlow>
  );
}

export default function ArchitectureDiagram() {
  return (
    <ReactFlowProvider>
      <Architecture />
    </ReactFlowProvider>
  );
}
