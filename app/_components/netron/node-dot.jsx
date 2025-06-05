import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
 
const handleStyle = { left: 10 };
 
function NetronNodeDot({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
 
  return (
    <div className={data.nodeClassName}>
      <Handle className="conn"
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
      <Handle className="conn"
        type="target"
        position={Position.top}
        isConnectable={isConnectable}
      />
    </div>
  );
}
 
export default NetronNodeDot;