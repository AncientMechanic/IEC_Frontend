<template>
  <div>
    <li v-for="(list, index) in lists" :key="list.id">
      {{ index + 1 }}. Список: {{ list.name }}

      <button @click="deleteList(list.id)">Удалить</button>
    </li>
  </div>
</template>
<script>
import {
  actions as mainActionTypes,
  getters as mainGetterTypes,
} from "../vuex/store/types";
export default {
  name: "ListsView",
  computed: {
    lists() {
      console.log(1);
      const lists = this.$store.getters[mainGetterTypes.GET_LISTS];
      return lists;
    },
  },
  beforeCreate() {
    this.$store.dispatch(mainActionTypes.FETCH_LISTS);
  },
  methods: {
    deleteList: function (id) {
      this.$store.dispatch(mainActionTypes.DELETE_LIST, id);
    },
  },
};
</script>
