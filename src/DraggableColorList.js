import React from 'react';
import DraggableColorBox from './DraggableColorBox';
import { SortableContainer } from 'react-sortable-hoc';

const DraggableColorList = SortableContainer(
  ({ colors, handleRemoveColor }) => {
    return (
      <div style={{ height: '100%' }}>
        {colors.map((color, i) => (
          <DraggableColorBox
            index={i}
            key={color.name}
            color={color}
            handleRemoveColor={handleRemoveColor}
          />
        ))}
      </div>
    );
  }
);

export default DraggableColorList;
