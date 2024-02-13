<template>
  <div>
    <li v-for="(task, index) in tasks" :key="task.id">
      {{ index + 1 }}. Задание: {{ task.title }}, Дата создания
      {{ task.createdOn }}
      <button @click="deleteTask(task.id)">Удалить</button>
    </li>
  </div>
</template>
<script>
import {
  actions as mainActionTypes,
  getters as mainGetterTypes,
} from "../vuex/store/types";
export default {
  name: "TasksView",
  computed: {
    tasks() {
      console.log(1);
      const tasks = this.$store.getters[mainGetterTypes.GET_TASKS];
      return tasks;
    },
  },
  beforeCreate() {
    this.$store.dispatch(mainActionTypes.FETCH_TASKS);
  },
  methods: {
    deleteTask: function (id) {
      this.$store.dispatch(mainActionTypes.DELETE_TASK, id);
    },
  },
};
</script>
