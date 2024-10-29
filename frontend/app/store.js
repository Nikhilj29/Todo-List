
import { create } from "zustand";




const useStore = create((set) => ({
    todos: [],

    addTodo: (fdate, tdate, text) => {

        set((state) => ({
            todos: [
                ...state.todos,
                { fdate: fdate, tdate: tdate, todo: text, completed: false }
            ]
        }));
    },

    clearTodo: () => (
        set(() => ({
            todos: [

            ]
        }))
    )
}));

export default useStore;