<template>
  <div>
    <nav class="navigation font-Montserrat">
      <div class="nav-buttons">
        <router-link to="/participants" class="nav-link">
          <div class="nav-link-content">
            <img src="src\assets\Participants.png" alt="Participant Icon" class="nav-icon-participants" />
            <span class="nav-link-text">Participants</span>
          </div>
        </router-link>
        <router-link to="/employers" class="nav-link">
          <div class="nav-link-content">
            <img src="src\assets\Employers.png" alt="Employer Icon" class="nav-icon-employers" />
            <span class="nav-link-text">Job Offers</span>
          </div>
        </router-link>
        <router-link to="/users" class="nav-link">
          <div class="nav-link-content">
            <img src="src\assets\Users.png" alt="User Icon" class="nav-icon-users" />
            <span class="nav-link-text">Staff members</span>
          </div>
        </router-link>
        <img src="src\assets\Logout.png" alt="Logout Icon" class="logout-icon" @click="logout" />
      </div>
    </nav>
    <div class="content-wrapper">
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mutations as authActionTypes, getters as authGetterTypes } from "../vuex/modules/auth/types";
import routeInfo from "../router/routeInfo";

export default {
  name: "HomeView",
  methods: {
    logout() {
      this.$store.commit(authActionTypes.SET_AUTH_TOKEN, null);
      this.$router.push({ name: routeInfo.Start.name });
    },
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters[authGetterTypes.GET_TOKEN] !== null;
    },
  },
};
</script>

<style scoped>
.navigation {
  display: flex;
  justify-content: flex-end;
  background-color: #f6f8fa;
  box-shadow: 0 -4px 15px rgba(75, 75, 75, 0.26);
  position: fixed; /* Фиксируем навигационную панель */
  top: 100px; /* Отступ сверху, равный высоте хэдера */
  height: 50px;
  left: 0;
  right: 0;
  z-index: 1; /* Устанавливаем z-index ниже, чем у хэдера */
}

.nav-buttons {
  display: flex;
  align-items: center;
  height: 100%;
}

.nav-link {
  position: relative;
  color: #354770;
  font-size: 21;
  overflow: hidden; /* Скрываем выходящие за границы элементы */
  padding: 10px 20px;
  transition: background-color 0.3s ease;
  width: 274px;
  text-align: center;
  height: 100%;
}

.nav-link-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.nav-link::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px; /* Задаем высоту полосы */
  background-color: transparent; /* Начальный цвет фона */
  transition: background-color 0.3s ease; /* Плавный переход цвета фона */
}


.nav-link.router-link-exact-active::before {
  background-color: #6196f5; /* Цвет полосы для активного пункта */
}

.nav-link:hover {
  background-color: #d8e2f7;
  height: 100%;
}

.nav-link.router-link-exact-active {
  background-color: #BCCFF5;
}

.nav-icon-participants {
  margin-right: 10px; /* Отступ между иконкой и текстом */
  width: 56px; /* Ширина иконки */
  height: 31px; /* Высота иконки */
}

.nav-icon-employers {
  margin-right: 10px; /* Отступ между иконкой и текстом */
  width: 50px; /* Ширина иконки */
  height: 31px; /* Высота иконки */
}

.nav-icon-users {
  margin-right: 10px; /* Отступ между иконкой и текстом */
  width: 30px; /* Ширина иконки */
  height: 31px; /* Высота иконки */
}

.logout-btn {
  background-color: #ff6347;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  width: 274px;
  text-align: center;
}

.logout-icon {
  margin-right: 30px;
  margin-left: 30px;
  width: 37px; /* Ширина иконки */
  height: 32px;
}

.content-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
}

.content {
  width: 100%;
  max-width: none;
  padding: 20px
}

.logout-icon:hover {
  opacity: 0.8;
}
</style>