import React from 'react';
import DraggableColorBox from './DraggableColorBox';
import { SortableContainer } from 'react-sortable-hoc';

const DraggableColorList = SortableContainer(
  ({ colors, handleRemoveColor }) => {
    const h3 = colorName => {
      handleRemoveColor(colorName);
    };
    return (
      <div style={{ height: '100%' }}>
        {colors.map((color, i) => (
          <DraggableColorBox
            index={i}
            key={color.name}
            color={color}
            handleRemoveColor={h3}
          />
        ))}
      </div>
    );
  }
);

export default DraggableColorList;
