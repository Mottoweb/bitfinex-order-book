import React, { useState, useCallback } from 'react';
import { Divider, Button, ButtonGroup } from '@blueprintjs/core';
import { connect } from 'react-redux'

import { updateBookDepth, updateBookScale } from '../store/orderBook'

const DepthControl = ({ updateBookDepth, updateBookScale }) => {
  const depthValues = ['P0', 'P1', 'P2', 'P3', 'P4']
  const [depthIndex, setDepthIndex] = useState(0)

  const scaleValues = [0.1, 0.25, 0.5, 1, 1.5, 1.75, 2, 3]
  const [scaleIndex, setScaleIndex] = useState(3)

  const increaseDepth = useCallback(() => {
    if (depthIndex + 1 === depthValues.length) return
    const newdepthIndex = depthIndex + 1
    setDepthIndex(newdepthIndex)
    updateBookDepth(depthValues[newdepthIndex])
  })

  const decreaseDepth = useCallback(() => {
    if (depthIndex === 0) return
    const newdepthIndex = depthIndex - 1
    setDepthIndex(newdepthIndex)
    updateBookDepth(depthValues[newdepthIndex])
  })

  const increaseScale = useCallback(() => {
    if (scaleIndex + 1 === scaleValues.length) return
    const newScaleIndex = scaleIndex + 1
    setScaleIndex(newScaleIndex)
    updateBookScale(scaleValues[newScaleIndex] / (depthIndex+1))
  })

  const decreaseScale = useCallback(() => {
    if (scaleIndex === 0) return
    const newScaleIndex = scaleIndex - 1
    setScaleIndex(newScaleIndex)
    updateBookScale(scaleValues[newScaleIndex] / (depthIndex+1))
  })
  return (
    <ButtonGroup minimal={true}>
      <Divider />
      <strong>Scale </strong>
      <Button icon="add" onClick={increaseScale}/>
      <Button icon="remove" onClick={decreaseScale}/>
      <Divider />
      <strong>Depth </strong>
      <Button icon="add" onClick={increaseDepth}/>
      <Button icon="remove" onClick={decreaseDepth}/>
      <Divider />
    </ButtonGroup>
  );
};

export default connect(null, {
  updateBookDepth,
  updateBookScale,
})(DepthControl);
