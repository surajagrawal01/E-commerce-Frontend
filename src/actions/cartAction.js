//first time item added
export const addItem = (product)=>{
    return{
        type:'ADD_ITEM',
        payload: product
    }
}

//to change the product quantity
export const changeItem = (id,type)=>{
    return {
        type:'CHANGE_ITEM',
        payload:{id, type}
    }
}

//to remove the product
export const removeItem = (id)=>{
    return {
        type: 'REMOVE_ITEM',
        payload: id
    }
} 

//once booking done
export const clearCart = ()=>{
    return {
        type:'CLEAR_CART'
    }
}