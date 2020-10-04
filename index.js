const redux = require('redux');

// Initial State 
const initState = {
    todo:[]
}
// Define Action Type
const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const UPDATE_TODO = "UPDATE_TODO";

let id = 0;
// Add Todo Action Creator
function addTodo(text){
    return {
        type:ADD_TODO,
        payload:{
            text,
            id:++id
        }
    }
}
// Remove Todo Action Creator
function deleteTodo(id){
    return{
        type:REMOVE_TODO,
        payload:{
            text:'Deleted Successfully',
            id:id
        }
    }
}

// Update Todo Action Creator
function updateTodo(id,text){
    return{
        type:UPDATE_TODO,
        payload:{
            text,
            id,
        }
    }
}

// Todo Reducer
const todoReducer = (state = initState, action) => {
    switch(action.type){
        case ADD_TODO: return{
            ...state,
            todo:[...state.todo,action.payload]
        }
        case REMOVE_TODO: return{
            ...state,
            todo:state.todo.filter((todos) => todos.id !== action.payload.id)
        }
        case UPDATE_TODO: return{
            ...state,
            // todo:state.todo.filter((todos) => todos.id !== action.payload.id),
            todo:[...state.todo.filter((todos) => todos.id !== action.payload.id),action.payload],
                
        }
        default: return state;
    }
}

// Creating Store
const store = redux.createStore(todoReducer);

const unsubscribe = store.subscribe(() => console.log("Updated State: ",store.getState()))

// Add Todo
store.dispatch(addTodo("Learn React"))
store.dispatch(addTodo("Learn Redux"))
store.dispatch(addTodo("Learn Node"))
store.dispatch(addTodo("Learn Express"))
store.dispatch(addTodo("Learn MongoDB"))

// Delete Todo
store.dispatch(deleteTodo(2))
store.dispatch(deleteTodo(3))

// Update Todo
store.dispatch(updateTodo(5,"Learn HTML5"))
store.dispatch(updateTodo(4,"Learn CSS3"))

unsubscribe()