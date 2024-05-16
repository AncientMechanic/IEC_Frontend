<template>
  <div id="app">
    <header class="auth-header">
      <!-- Контейнер для логотипа и заголовка -->
      <div class="logo-title-container">
        <div class="logo">
          <img src="\src\assets\IEC_Logo2.png" alt="Логотип">
        </div>
        <div class="headers">
        <h1 class="auth-title" @click="goToHome">International Exchange Center</h1>
        <h2 class="second-header">International Exchange Center</h2>
        </div>
      </div>
    </header>

    <main>
      <home-view v-if="showHomeView">
        <router-view />
      </home-view>
      <router-view v-else />
    </main>

    <footer class="site-footer">
      <div class="copyright">
        &copy; {{ currentYear }} ООО Центр Международного Обмена. Все права защищены.
      </div>
    </footer>
  </div>
</template>

<script>
import HomeView from './views/Home.vue';

export default {
  name: "App",
  components: {
    HomeView
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
      showHomeView: false
    }
  },
  methods: {
    goToHome() {
      // Используем $router для перехода на компонент /Home.vue
      this.$router.push('../Participants');
    }
  },
  created() {
    // Подписываемся на событие изменения маршрута
    this.$router.afterEach((to, from) => {
      // Проверяем, является ли новый маршрут маршрутом к Participants
      if (to.name === 'Participants') {
        this.showHomeView = true; // Если да, скрываем HomeView
      }
    });
  }
};
</script>

<style scoped>
/* Общий контейнер для приложения */
#app {
  background-color: #DBE0EB; /* Замените #f0f0f0 на нужный вам цвет */
  min-height: 100vh; /* Это гарантирует, что контейнер займет всю высоту экрана */
  position: relative; /* Фиксируем позиционирование */
}

.auth-header {
  position: fixed; /* Фиксируем хэдер */
  top: 0; /* Позиционируем хэдер вверху */
  left: 0;
  right: 0;
  z-index: 2; /* Устанавливаем z-index выше, чем у основного контента */
  width: 100%;
  display: flex;
  height: 100px;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #F6F8FA;
  box-shadow: 0 -4px 15px rgba(74, 74, 74, 0.252); /* Тень для хедера */
}

/* Контейнер для логотипа и заголовка */
.logo-title-container {
  background: #F6F8FA;
  display: flex;
  align-items: center;
}

.logo img {
  max-height: 80px;
  margin-right: 20px;
}

.auth-title {
  color: #6196F5;
  font-family: 'Montserrat', sans-serif;
  font-size: 44px;
  font-weight: bold;
  margin: 0;
}

.headers {
  position: relative;
  display: flex;
  white-space: nowrap;
}

h1 {
  position: relative;
  z-index: 1;
}

.second-header {
  color: #354770;
  font-family: 'Montserrat', sans-serif;
  font-size: 44px;
  font-weight: bold;
  margin: 0;
  position: absolute;
  left: 2px;
  top: 0;
  z-index: 0;
}

.site-footer {
  position: absolute; /* Относительно родительского контейнера */
  bottom: 0; /* Располагаем его внизу страницы */
  left: 0;
  width: 100%;
  padding: 10px;
  text-align: left;
}

.copyright {
  font-size: 14px;
  color: #666;
}
</style>