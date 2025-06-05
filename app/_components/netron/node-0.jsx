import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
 
const handleStyle = { left: 10 };
 
function NetronNode0({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
 
  return (
    <div className={data.nodeClassName}>
      <Handle className="conn"
        type="target"
        position={Position.BottTop}
        isConnectable={isConnectable}
      />
      <Handle className="conn"
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
      <label className={data.labelClassName}>{data.label}</label>
    </div>
  );
}
 
export default NetronNode0;