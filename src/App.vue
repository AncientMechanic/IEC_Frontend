<template>
  <header class="auth-header">
    <h1 class="auth-title" @click="goToHome">International Exchange Center</h1>
    <nav class="auth-nav">
      <slot name="nav">
      </slot>
    </nav>
  </header>
  <main>
    <!-- Здесь будет отображаться содержимое страницы -->
    <router-view />
  </main>
</template>

<script>
export default {
  name: "App",
  methods: {
    goToHome() {
      // Используем $router для перехода на компонент /Home.vue
      this.$router.push('./home');
    }
  }
  
};

</script>

<style scoped>
.auth-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0774e9; /* Синий цвет хэдера */
  padding: 20px;
}

.auth-title {
  color: #fff; /* Цвет текста в хэдере */
  font-family: 'Roboto', sans-serif; /* Используемый шрифт */
  font-size: 24px;
  margin: 0;
}

.auth-nav {
  display: flex;
}

.auth-link {
  margin-left: 10px;
  padding: 10px 20px;
  background-color: #0252a8;
  color: #fff;
  font-family: 'Roboto', sans-serif; /* Используемый шрифт */
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.auth-link:hover {
  background-color: #0056b3;
}
</style>
