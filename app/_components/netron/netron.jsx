'use client'
import React, { useCallback, useEffect } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import NetronNodeDot from "./node-dot";
import NetronNode0 from "./node-0";
import NetronNode1 from "./node-1";
import NetronNode2 from "./node-2";
import "@xyflow/react/dist/style.css";

const initialNodes = [
  {
    id: "n0d",
    type: "netronNodeDot",
    position: { x: 175, y: 30 },
    data: {
      nodeClassName:
        "netron dot",
    },
  },
  {
    id: "n1",
    type: "netronNode2",
    position: { x: 116, y: 60 },
    data: {
      label: "LayerNormalization",
      n1: "Scale",
      n1_data: "<320>",
      n2: "B",
      n2_data: "<320>",
      nodeClassName:
        "netron",
      labelClassName: "bg-[#f72585] text-white text-center",
    },
  },
  {
    id: "n2a",
    type: "netronNode1",
    position: { x: 20, y: 150 },
    data: {
      label: "MatMul",
      n1: "B",
      n1_data: "<320x320>",
      nodeClassName:
        "netron",
      labelClassName: "bg-[#7209b7] text-white text-center",
    },
  },
  {
    id: "n2b",
    type: "netronNode1",
    position: { x: 138, y: 150 },
    data: {
      label: "MatMul",
      n1: "B",
      n1_data: "<320x320>",
      nodeClassName:
        "netron",
      labelClassName: "bg-[#7209b7] text-white text-center",
    },
  },
  {
    id: "n2c",
    type: "netronNode1",
    position: { x: 256, y: 150 },
    data: {
      label: "MatMul",
      n1: "B",
      n1_data: "<320x320>",
      nodeClassName:
        "netron",
      labelClassName: "bg-[#7209b7] text-white text-center",
    },
  },
  {
    id: "n3a",
    type: "netronNode1",
    position: { x: 29, y: 220 },
    data: {
      label: "Reshape",
      n1: "shape",
      n1_data: "<4>",
      nodeClassName:
        "netron",
      labelClassName: "bg-[#3a0ca3] text-white text-center",
    },
  },
  {
    id: "n3b",
    type: "netronNode1",
    position: { x: 147, y: 220 },
    data: {
      label: "Reshape",
      n1: "shape",
      n1_data: "<4>",
      nodeClassName:
        "netron",
      labelClassName: "bg-[#3a0ca3] text-white text-center",
    },
  },
  {
    id: "n3c",
    type: "netronNode1",
    position: { x: 265, y: 220 },
    data: {
      label: "Reshape",
      n1: "shape",
      n1_data: "<4>",
      nodeClassName:
        "netron",
      labelClassName: "bg-[#3a0ca3] text-white text-center",
    },
  },
  {
    id: "n4a",
    type: "netronNode0",
    position: { x: 25, y: 290 },
    data: {
      label: "Transpose",
      nodeClassName:
        "netron",
      labelClassName: "bg-[#4361ee] text-white l0 text-center",
    },
  },
  {
    id: "n4b",
    type: "netronNode0",
    position: { x: 143, y: 290 },
    data: {
      label: "Transpose",
      nodeClassName:
        "netron",
      labelClassName: "bg-[#4361ee] text-white l0 text-center",
    },
  },
  {
    id: "n5d1",
    type: "netronNodeDot",
    position: { x: 9, y: 300 },
    data: {
      nodeClassName:
        "netron dot",
    },
  },
  {
    id: "n5d2",
    type: "netronNodeDot",
    position: { x: 127, y: 300 },
    data: {
      nodeClassName:
        "netron dot",
    },
  },
  {
    id: "n5a",
    type: "netronNode0",
    position: { x: 44, y: 340 },
    data: {
      label: "Mul",
      nodeClassName:
        "netron",
      labelClassName: "bg-[#4cc9f0] text-white l0 text-center",
    },
  },
  {
    id: "n5b",
    type: "netronNode0",
    position: { x: 162, y: 340 },
    data: {
      label: "Mul",
      nodeClassName:
        "netron",
      labelClassName: "bg-[#4cc9f0] text-white l0 text-center",
    },
  },
  {
    id: "n6b",
    type: "netronNode0",
    position: { x: 91, y: 390 },
    data: {
      label: "MatMul",
      nodeClassName:
        "netron",
      labelClassName: "bg-[#7209b7] text-white l0 text-center",
    },
  },
  {
    id: "n7b",
    type: "netronNode0",
    position: { x: 89, y: 440 },
    data: {
      label: "Softmax",
      nodeClassName:
        "netron",
      labelClassName: "bg-[#eb6424] text-white l0 text-center",
    },
  },
  {
    id: "n7c",
    type: "netronNode0",
    position: { x: 262, y: 440 },
    data: {
      label: "Transpose",
      nodeClassName:
        "netron",
      labelClassName: "bg-[#4361ee] text-white l0 text-center",
    },
  },
  {
    id: "n8",
    type: "netronNode0",
    position: { x: 151, y: 490 },
    data: {
      label: "MatMul",
      nodeClassName:
        "netron",
      labelClassName: "bg-[#7209b7] text-white l0 text-center",
    },
  },
  {
    id: "n9d",
    type: "netronNodeDot",
    position: { x: 176, y: 540 },
    data: {
      nodeClassName:
        "netron dot",
    },
  },
];

const initialEdges = [
  {
    id: "e0d_1",
    source: "n0d",
    target: "n1",
    type: "default",
    style: {
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e1_2a",
    source: "n1",
    target: "n2a",
    type: "default",
    style: {
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e1_2b",
    source: "n1",
    target: "n2b",
    type: "default",
    style: {
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e1_2c",
    source: "n1",
    target: "n2c",
    type: "default",
    style: {
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e2a_3a",
    source: "n2a",
    target: "n3a",
    type: "default",
    style: {
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e2b_3b",
    source: "n2b",
    target: "n3b",
    type: "default",
    style: {
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e2c_3c",
    source: "n2c",
    target: "n3c",
    type: "default",
    style: {
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e3a_4a",
    source: "n3a",
    target: "n4a",
    type: "default",
    style: {
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
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
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
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
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
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
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e5d1_5a",
    source: "n5d1",
    target: "n5a",
    type: "default",
    style: {
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e5d2_5a",
    source: "n5d2",
    target: "n5b",
    type: "default",
    style: {
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e5a_6b",
    source: "n5a",
    target: "n6b",
    type: "default",
    style: {
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e5b_6b",
    source: "n5b",
    target: "n6b",
    type: "default",
    style: {
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e6b_7b",
    source: "n6b",
    target: "n7b",
    type: "default",
    style: {
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e3c_7c",
    source: "n3c",
    target: "n7c",
    type: "default",
    style: {
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e7b_8",
    source: "n7b",
    target: "n8",
    type: "default",
    style: {
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e7c_8",
    source: "n7c",
    target: "n8",
    type: "default",
    style: {
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
      width: 20,
      height: 20,
    },
    animated: true,
  },
  {
    id: "e8_9d",
    source: "n8",
    target: "n9d",
    type: "default",
    style: {
      stroke: "#f72684",
      strokeWidth: 1,
      strokeDasharray: 2,
      opacity: 1,
    },
    markerEnd: {
      type: "arrowclosed",
      color: "#f72684",
      width: 20,
      height: 20,
    },
    animated: true,
  },
];

function NetronFlow () {
  const nodeTypes = {
    netronNodeDot: NetronNodeDot,
    netronNode0: NetronNode0,
    netronNode1: NetronNode1,
    netronNode2: NetronNode2,
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
      className="px-5 xl:col-span-1 md:px-20 my-0 py-0 md:py-0 mx-0 !h-[600px]"
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

export default function Netron() {
  return (
    <ReactFlowProvider>
      <NetronFlow />
    </ReactFlowProvider>
  );
}
