import React from 'react';
import { useApp } from '../context';

interface EditableProps {
  id: string;
  defaultText: string;
  as?: React.ElementType;
  className?: string;
  placeholder?: string;
}

export const Editable: React.FC<EditableProps> = ({ 
  id, 
  defaultText, 
  as: Tag = 'span', 
  className = '',
  placeholder
}) => {
  const { isEditMode, content, updateContent } = useApp();
  const text = content[id] !== undefined ? content[id] : defaultText;

  if (isEditMode) {
    return (
      <span className="relative group inline-block w-full">
        <span 
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => updateContent(id, e.currentTarget.textContent || '')}
          className={`outline-none border-2 border-dashed border-blue-400 bg-blue-50/50 p-1 rounded transition-colors ${className}`}
          style={{ minWidth: '20px', display: 'inline-block' }}
        >
          {text}
        </span>
        <span className="absolute -top-6 left-0 bg-blue-600 text-white text-[10px] px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
          Edit: {id}
        </span>
      </span>
    );
  }

  return <Tag className={className}>{text}</Tag>;
};