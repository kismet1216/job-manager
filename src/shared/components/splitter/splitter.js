import React, { useLayoutEffect, useState } from 'react';
import './splitter.scss';

/**
 * props: {
 *  isVertical?: boolean,
 *  panesConfig: {size: string, min: string, resizable: boolean, collapsible: boolean}[]
 * }
 */
export default ({ isVertical, panesConfig, children }) => {
  const [panes, setPanes] = useState(panesConfig);

  function drag(e) {
    e.dataTransfer.setData('text', e.target.id);
  }

  function drop(e) {
    e.preventDefault();
    const barId = e.dataTransfer.getData('text');
    recalculateSize(barId, e.clientX, e.clientY);
  }

  function allowDrop(e) {
    e.preventDefault();
  }

  function recalculateSize(barId, x, y) {
    if (isVertical) {
      // use y
    } else {
      // use x
      const draggedIndex = parseInt(barId.substring(3));
      panes[draggedIndex].size = x + 'px';
      panes[draggedIndex + 1].size = window.innerWidth - x + 'px';

      setPanes([...panes]);
    }
  }

  return (
    <div className="splitter" style={{ 'flexDirection': isVertical ? 'column' : 'row' }} onDragOver={allowDrop} onDrop={drop}>
      {children && children.map((child, index, arr) => {
        return (
          <>
            <div key={index} className="pane" style={{ width: panes[index].size }}>
              {child}
            </div>

            {
              index === arr.length - 1 ? null :
                <div className="bar" draggable="true" onDragStart={drag} id={'bar' + index} key={'bar' + index}></div>
            }
          </>
        )
      })}
    </div>
  )
};
