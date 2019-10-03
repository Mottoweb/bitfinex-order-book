import { makeConnection } from './socket'

export const CREATE_ORDER_BOOK = 'CREATE_ORDER_BOOK';
export const UPDATE_ORDER_BOOK = 'UPDATE_ORDER_BOOK';
export const UPDATE_BOOK_DEPTH_START = 'UPDATE_BOOK_DEPTH_START';
export const UPDATE_BOOK_DEPTH_FINISH = 'UPDATE_BOOK_DEPTH_FINISH';
export const UPDATE_BOOK_SCALE = 'UPDATE_BOOK_SCALE';

export const createOrderBook = data => ({
  type: CREATE_ORDER_BOOK,
  payload: data
});

export const updateOrderBook = data => ({
  type: UPDATE_ORDER_BOOK,
  payload: data
});

export const updateBookDepth = data => dispatch => {
  dispatch(makeConnection(data))
}

export const updateBookScale = data => ({
  type: UPDATE_BOOK_SCALE,
  payload: data,
})

// order book reducer
const initialState = {
  data: [
    [],
  ],
  isLoading: true,
  scale: 1,
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case CREATE_ORDER_BOOK: {
      return {
        ...state,
        data: payload[1]
      };
    }
    case UPDATE_ORDER_BOOK: {
      const data = payload[1];
      const [price, count, amount] = data;
      let newBook;
      if (count > 0) {
        newBook = state.data.map((el, i) => {
          const [elPrice] = el;
          if (price === elPrice) {
            if ((amount > 0 && i < 25) || (amount < 0 && i > 24)) {
              return data;
            }
          }
          return el;
        });
        return {
          ...state,
          data: newBook
        };
      } else {
        return state;
      }
    }
    case UPDATE_BOOK_DEPTH_START: {
      return ({ 
        ...state,
        isLoading: true,
      })
    }
    case UPDATE_BOOK_DEPTH_FINISH: {
      return ({ 
        ...state,
        isLoading: false,
      })
    }
    case UPDATE_BOOK_SCALE: {
      return ({ 
        ...state,
        scale: payload,
      })
    }
    default:
      return state;
  }
}

export const selectOrderBook = state => state.orderBook.data
export const selectIsLoading = state => state.orderBook.isLoading
export const selectOrderBookScale = state => state.orderBook.scale
