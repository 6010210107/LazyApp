export const ADD_TODO = "ADD_TODO"
export const UPDATE_TODO = "UPDATE_TODO"
export const DELETE_TODO = "DELETE_TODO"
export const HIGHLIGHT_TODO = "HIGHLIGHT_TODO"
export const GEN_PUZZLE = "GEN_PUZZLE"
export const UPDATE_PUZZLE = "UPDATE_PUZZLE"

// Add todo
export const addTodo = (todo) =>{
    return {
        type:ADD_TODO,
        payload:todo
    }
} 
// Add todo
export const updateTodo = (todo) =>{
    return {
        type:UPDATE_TODO,
        payload:todo
    }
} 
// Add todo
export const deleteTodo = (todoId) =>{
    return {
        type:DELETE_TODO,
        payload:todoId
    }
} 

// Highlight todo 
export const highlightTodo = (todoId) =>{
    return {
        type:HIGHLIGHT_TODO,
        payload:todoId
    }
} 

// Generate puzzle
export const generatePuzzle = (puzzle) =>{
        return {
            type:GEN_PUZZLE,
            payload:puzzle
        }
}
// Update puzzle
export const updatePuzzle = (puzzle) =>{
        return {
            type:UPDATE_PUZZLE,
            payload:puzzle
        }
}