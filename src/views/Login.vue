<template>
  <div>
    <form class="login" @submit.prevent="login">
      <h1>Sign in</h1>
      <label>Email</label>
      <input v-model="email" required type="email" placeholder="Name" />
      <label>Password</label>
      <input
        v-model="password"
        required
        type="password"
        placeholder="Password"
      />
      <hr />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { actions as authActionTypes } from "../vuex/modules/auth/types";

export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      const email = this.email;
      const password = this.password;
      this.$store.dispatch(authActionTypes.AUTH_REQUEST, { email, password });
    },
  },
};
</script>
