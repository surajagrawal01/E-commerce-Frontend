const initialState = []

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_ITEM': {
            return [...state, { ...action.payload, quantity: 1 }]
        }
        case 'CHANGE_ITEM': {
            const arr = state.map((ele) => {
                if (ele.id === action.payload.id) {
                    action.payload.type === 'inc' ? ele.quantity += 1 : ele.quantity -= 1
                    return ele
                } else {
                    return ele
                }
            })
            return arr
        }
        case 'REMOVE_ITEM': {
            return state.filter((ele) => {
                return ele.id !== action.payload
            })
        }
        case 'CLEAR_CART': {
            return []
        }
        default: {
            return state
        }
    }
}


export default cartReducer;