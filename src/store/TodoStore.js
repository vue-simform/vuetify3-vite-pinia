// Utilities

import { defineStore } from "pinia";

export const useTodoStore = defineStore("TodoStore", {
    state: () => {
        return {
          todoData: [],
        };
    },
    actions: {
      addTodo(item) {
        this.todoData.push(item)
      },
      deleteTodo(itemID) {
        this.todoData = this.todoData.filter((object) => {
          return object.id !== itemID;
        });
      },
    },
    getters: {
      todoList() {
        return this.todoData;
      }
    }

    //getters
});
