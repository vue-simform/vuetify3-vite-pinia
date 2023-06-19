<template>
  <div class="todo px-6">
    <!-- Text field to input a new task -->
    <v-text-field
      v-model="newTaskTitle"
      outlined
      label="Add task"
      clearable
      hide-details
      append-icon="mdi-plus-circle"
      class="mb-6"
      @click:append="addTask"
      @keyup.enter="addTask"
    />

    <v-list
      flat
      class="pt-0"
    >
      <transition-group
        type="transition"
        name="flip-list"
      >
        <!-- Looping for the tasks -->
        <div
          v-for="(task, i) in tasks"
          :key="task.id"
          class="sortable"
        >
          <v-list-item :class="{ 'blue lighten-5': task.done }">
            <div style="display: flex; align-items: center">
              <v-list-item-action
                hide-details="auto"
                style="position: relative;top: 10px;"
              >
                <v-checkbox
                  v-if="handle != true"
                  :input-value="task.done"
                />
                <v-icon
                  v-else
                  color="primary"
                  class="handle"
                >
                  mdi-drag
                </v-icon>
              </v-list-item-action>

              <v-list-item style="width: 90%">
                <v-list-item-title :class="{ 'text-decoration-line-through': task.done }">
                  {{ task.title }}
                </v-list-item-title>
              </v-list-item>

              <v-list-item
                v-if="task.dueDate"
                class="text-right text-uppercase"
              >
                <v-list-item-title class="caption">
                  <v-icon
                    v-if="!task.expired || task.done"
                    dense
                    class="mr-1"
                  >
                    mdi-calendar-outline
                  </v-icon>
                  <v-icon
                    v-else-if="!task.done && task.expired"
                    dense
                    class="mr-1 error--text"
                  >
                    mdi-calendar-alert
                  </v-icon>
                  <span :class="{ 'error--text font-weight-bold': task.expired && !task.done }"> {{ computedDue(task.dueDate) }}</span>
                </v-list-item-title>
              </v-list-item>
              <v-btn
                text
                color="primary"
                style="position: absolute;right: 0;"
                @click="deleteTask(task.id)"
              >
                Delete
              </v-btn>
            </div>
          </v-list-item>
          <v-divider />
          <v-dialog
            v-if="dialog === 0"
            ref="dialog"
            v-model="task.modal"
            persistent
            width="290px"
          >
            <v-card>
              <v-card-title>Edit task</v-card-title>
              <v-text-field
                v-model="task.title"
                class="pa-5"
                @keyup.enter="saveTask($refs, i, task.title, 'Task updated!')"
              />
              <v-btn
                text
                color="primary"
                @click.stop="task.modal = false"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click.stop="saveTask($refs, i, task.title, 'Task updated!')"
              >
                Save
              </v-btn>
            </v-card>
          </v-dialog>
        </div>
      </transition-group>
    </v-list>

    <div
      v-if="tasks.length === 0"
      class="my-auto text-center green--text"
    >
      <v-icon
        x-large
        class="green--text"
      >
        mdi-check-all
      </v-icon>
      <h1>No tasks</h1>
    </div>

    <v-snackbar v-model="snackbar.active">
      {{ snackbar.text }}

      <template #action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar.active = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <div
      v-if="handle"
      class="handle-div text-center"
    >
      <v-btn
        fixed
        bottom
        close
        color="primary"
        @click="handle = false"
      >
        Done sorting
      </v-btn>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useTodoStore } from "@/store/TodoStore";
  const toDoStore = useTodoStore();

  const handle = ref(false);
  const newTaskTitle = ref('');
  const tasks = ref([]);
  const snackbar = ref({
    active: false,
    text: String,
  });
  const dialog = ref(Number);
  const sideMenu = ref([{ title: "Delete", button: "delete", function: deleteTask }])

  onMounted(() => {
    if (localStorage.tasks) {
      tasks.value = JSON.parse(localStorage.tasks);

      const today = new Date(`${this.today()} GMT-0300`);

      tasks.value.forEach((e) => {
        const taskDueDate = new Date(`${e.dueDate} GMT-0300`);

        return today > taskDueDate ? (e.expired = true) : (e.expired = false);
      });
    }
  })

  function today() {
    // Gets the current date and returns "XXXX-XX-XX"
    const rawToday = new Date();
    const rawMonth = () => {
      const month = rawToday.getMonth() + 1;

      return month < 10 ? `0${month}` : month;
    };

    return `${rawToday.getFullYear()}-${rawMonth()}-${rawToday.getDate()}`;
  }
  function computedDue(due) {
    // Gets the task due date and returns "month, XX"
    return new Date(`${due} GMT-0300`).toLocaleString("en-US", { month: "short", day: "2-digit" });
  }
  function handleFnCall(fnName, taskId) {
    return this[fnName](taskId);
  }
  function snackBar(message) {
    snackbar.value.text = message;
    snackbar.value.active = true;
  }
  function addTask() {
    if (newTaskTitle.value === "") {
      // Checks wether task title was typed and actives the warining snackbar if it isn't
      snackBar("Please type a task");
    } else {
      // Creates the new task object...
      const idDate = Date.parse(new Date()) + (Math.floor(Math.random() * 10000000000000) + 1);
      const newTask = {
        id: idDate,
        title: newTaskTitle.value,
        dueDate: null,
        expired: false,
        done: false,
        modal: false,
      };
      // ... then pushes it into 'tasks' array | Shows the snackbar "ADDED"
      toDoStore.addTodo(newTask);

      tasks.value = toDoStore.todoList;
      snackBar("Task added!");
    }
  }
  function saveTask(refs, index, obj, message) {
    // Gets refs, object to save (title or due date), message and saves the task
    refs.dialog[index].save(obj);
    snackBar(message);
  }
  function doneTask(taskID) {
    // Marks the task as completed and shows the snackbar "DONE"
    const task = this.tasks.filter((task) => task.id === taskID)[0];

    task.done = !task.done;
    return task.done && task.done === true ? this.snackBar("Task is done!") : this.snackBar("Task is incomplete!");
  }
  function deleteTask(taskID) {
    toDoStore.deleteTodo(taskID)
    tasks.value = toDoStore.todoList;

    snackBar("Task removed!");
  }
</script>
<style scoped>
.v-input .v-input__details {
  display: none;
}
</style>

