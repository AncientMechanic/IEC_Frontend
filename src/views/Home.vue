<template>
  <div>
    <h1>Home</h1>
    <div>
      <router-link to="/users">Users</router-link>
    </div>
    <div>
      <router-link to="/participants">Participants</router-link>
    </div>
    <div>
      <router-link to="/employers">Employers</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>
