<template>
  <div class="container">
    <div class="welcome-box">
      <h1>Welcome</h1>
      <div class="button-container">
        <div>
          <router-link to="/login" class="btn">LOGIN</router-link>
        </div>
        <div>
          <router-link to="/register" class="btn">REGISTER</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StartView',
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.welcome-box {
  width: 409px;
  height: 412px;
  background-color: #F6F8FA;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 40px;
  text-align: center;
  max-width: 400px; /* Устанавливаем максимальную ширину для формы */
  width: 100%; /* Делаем форму адаптивной */
}

h1 {
  margin-bottom: 20px;
  color: #6196F5;
  font-family: 'Montserrat', sans-serif;
  font-size: 48px;
  font-weight: bold;
  margin: 0;
}

.button-container {
  display: flex;
  flex-direction: column; /* Изменяем направление flex-контейнера на column */
  align-items: center; /* Выравниваем кнопки по центру */
  gap: 30px; /* Добавляем отступ между кнопками */
  margin-top: 50px; /* Добавляем отступ сверху для контейнера с кнопками */
}

.btn {
  background-color: #6196F5;
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  font-weight: 500;
  padding: 12px 24px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  width: 201px; /* Устанавливаем одинаковую ширину для обеих кнопок */
  height: 59px; /* Устанавливаем одинаковую высоту для обеих кнопок */
  display: flex; /* Добавляем flex-контейнер для выравнивания текста внутри кнопки */
  justify-content: center; /* Выравниваем текст по горизонтали */
  align-items: center; /* Выравниваем текст по вертикали */
}


.btn:hover {
  background-color: #376acf;
}
</style>