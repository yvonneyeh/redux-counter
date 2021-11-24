import { createStore } from "redux";

/*
Features:
- a counter that increments every second
- a button to manually increase the count
- a button to manually decrease the count
- a button to toggle whether the count is increasing or not

To Do:
- Decide what you state your application needs, and set up the initial state
- Update the reducer to handle actions for each feature
- Dispatch actions to update state
- Use the state in the render function to determine what is displayed

*/

const initialState = {
    count: 0,
    running: true
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case "increment":
            return {
                ...state,
                count: state.count + 1
            }
        case "decrement":
            return {
                ...state,
                count: state.count - 1
            }
        case "toggleRunning":
            return {
                ...state,
                running: !state.running
            }
        default:
            return state
    }
}

const store = createStore(reducer)

store.subscribe(render)

function render() {
    const state = store.getState()
    const count = document.querySelector("#count")

    // get the current count and display it
    count.textContent = `Count: ${state.count}`

    // show a play button or pause button based on state
    document.querySelector("#play").textContent = state.running ? "⏸" : "▶️"
}

setInterval(() => {
    const state = store.getState()
    // check if the app is paused or not
    if (state.running) {
        // dispatch an action to increase the count by 1
        store.dispatch({ type: "increment" })
    }
}, 1000)

document.querySelector("#plus").addEventListener("click", () => {
    // dispatch an action to increase the count by 1
    store.dispatch({ type: "increment" })
})

document.querySelector("#minus").addEventListener("click", () => {
    // dispatch an action to decrease the count by 1
    store.dispatch({ type: "decrement" })
})

document.querySelector("#play").addEventListener("click", () => {
    // check if the app is paused or not
    // dispatch an action to either play or pause the counter
    store.dispatch({ type: "toggleRunning" })
})
