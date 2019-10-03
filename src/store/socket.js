import { 
  createOrderBook,
  updateOrderBook,
  UPDATE_BOOK_DEPTH_START,
  UPDATE_BOOK_DEPTH_FINISH
} from './orderBook'

window.sockets = []
let connecting = false
let connected = false

const makeConnection = (prec = 'P0', pair = 'tBTCUSD') => dispatch => {
  if (connecting) return
  connecting = true
  dispatch({ type: UPDATE_BOOK_DEPTH_START })

  if (connected && window.bookSocket) window.bookSocket.close()

  const ws = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

  let msg = JSON.stringify({
    event: 'subscribe',
    channel: 'book',
    symbol: pair,
    freq: 'F1',
    prec,
  });

  ws.onopen = () => {
    ws.send(msg);
    ws.onmessage = msg => {
      const { data } = msg;
      const parsedData = JSON.parse(data);
      if (Array.isArray(parsedData)) {
        if (Array.isArray(parsedData[1][0])) {
          dispatch(createOrderBook(parsedData))
          dispatch({ type: UPDATE_BOOK_DEPTH_FINISH })
        } else {
          dispatch(updateOrderBook(parsedData))
        }
      }
    };
    connecting = false
    connected = true
    window.bookSocket = ws
  };
};

const disconnect = () => () => {
  connecting = false
  connected = false
  window.bookSocket.close()
}

export { makeConnection, disconnect };
