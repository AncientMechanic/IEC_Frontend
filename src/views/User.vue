<template>
  <div>
    <div><router-link to="/users">Users</router-link></div>
    <div>Почта: {{ user.email }}</div>
    <div>Дата создания: {{ user.createdOn }}</div>
    <div>Дата изменения: {{ user.modifiedOn }}</div>
  </div>
</template>

<script>
import {
  actions as mainActionTypes,
  getters as mainGetterTypes,
} from "../vuex/store/types";

export default {
  name: "UsersView",
  computed: {
    user() {
      const user = this.$store.getters[mainGetterTypes.GET_CURRENT_USER];
      return user;
    },
  },
  watch: {
    "$route.params.id": function () {
      this.$store.dispatch(
        mainActionTypes.FETCH_CURRENT_USER,
        this.$route.params.id
      );
    },
  },
  beforeCreate() {
    this.$store.dispatch(
      mainActionTypes.FETCH_CURRENT_USER,
      this.$route.params.id
    );
  },
};
</script>
