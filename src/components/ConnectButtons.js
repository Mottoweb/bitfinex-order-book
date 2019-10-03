import React, { useCallback } from 'react';
import { connect } from 'react-redux'
import { Button, ButtonGroup } from '@blueprintjs/core';

import { 
  disconnect,
  makeConnection,
} from '../store/socket'

const ConnectButtons = ({ disconnect, connect }) => {
  const handleConnectClick = useCallback(() => {
    connect()
  })
  const handleDisconnectClick = useCallback(() => {
    disconnect()
  })
  return (
    <ButtonGroup>
      <Button text="Connect" onClick={handleConnectClick}/>
      <Button text="Disconnect" onClick={handleDisconnectClick}/>
    </ButtonGroup>
  );
};

export default connect(null,{
  disconnect,
  connect: makeConnection,
})(ConnectButtons);
