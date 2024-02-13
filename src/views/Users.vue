<template>
  <div>
    <li v-for="(user, index) in users" :key="user.id">
      <div>
        <router-link :to="{ name: 'User', params: { id: user.id } }"
          >Перейти</router-link
        >
        {{ index + 1 }}. Пользователь: {{ user.email }}
      </div>
    </li>
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
    users() {
      const users = this.$store.getters[mainGetterTypes.GET_USERS];
      return users;
    },
  },
  beforeCreate() {
    this.$store.dispatch(mainActionTypes.FETCH_USERS);
  },
};
</script>
