<template>
  <div class="login-container font-Montserrat">
    <div class="login-form">
      <router-link to="/" class="back-link">
        <img src="src/assets/Arrow.png" alt="Back" class="back-arrow" />
      </router-link>
      <div class="logo-container">
        <img src="src/assets/User2.png" alt="Logo" class="logo" />
      </div>
      <h2 class="form-title">Sign in</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <div class="input-label">Email</div>
          <div class="input-group">
            <input
              id="email"
              v-model="email"
              :type="showEmail ? 'text' : 'password'"
              required
              :class="{ 'input-error': authError }"
            />
            <span class="toggle-visibility" @click="toggleEmailVisibility">
              <i :class="showEmail ? 'fa fa-eye-slash' : 'fa fa-eye'" aria-hidden="true"></i>
            </span>
          </div>
        </div>
        <div class="form-group">
          <div class="input-label">Password</div>
          <div class="input-group">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              :class="{ 'input-error': authError }"
            />
            <span class="toggle-visibility" @click="togglePasswordVisibility">
              <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'" aria-hidden="true"></i>
            </span>
          </div>
          <div class="error-message" v-if="authError">Wrong email or password</div>
        </div>
        <div class="form-actions">
          <span class="forgot-password" @click="showMessage">Forgot password?</span>
          <button type="submit" class="btn-login">LOGIN</button>
        </div>
      </form>
      <div class="message" v-if="showMessageFlag">Please reach out to Your supervisor to retrieve Your access data</div>
    </div>
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
      showMessageFlag: false,
      showEmail: false,
      showPassword: false,
      messageTimeout: null,
      authError: false,
      userId: "",
    };
  },
  methods: {
    login() {
      this.clearErrors(); // Сброс ошибки перед запросом
      const email = this.email;
      const password = this.password;

      this.$store.dispatch(authActionTypes.AUTH_REQUEST, { email, password })
        .then(response => {
          // Проверяем ответ от сервера
          if (response.data.success) {
            // Успешная авторизация
            console.log('Авторизация прошла успешно.');
            this.authError = false;
            this.emailError = false;
            this.passwordError = false;
          } else {
            // Неверные данные для авторизации
            console.error('Неверные данные для авторизации');
            setTimeout(() => {
              this.setAuthErrors();
            }, 700); // Задержка 500 мс перед установкой ошибок
          }
        })
        .catch(error => {
          // Другие ошибки
          console.error('Ошибка авторизации:', error);
          setTimeout(() => {
            this.setAuthErrors();
          }, 700); // Задержка 500 мс перед установкой ошибок
        });
    },

    clearErrors() {
      this.authError = false;
    },

    showMessage() {
      if (this.showMessageFlag) {
        this.hideMessage();
      } else {
        this.showMessageFlag = true;
        setTimeout(() => {
          this.$nextTick(() => {
            const messageElement = this.$el.querySelector(".message");
            messageElement.classList.add("show");
          });
        }, 0);
        this.messageTimeout = setTimeout(() => {
          this.hideMessage();
        }, 10000);
      }
    },

    hideMessage() {
      this.showMessageFlag = false;
      this.$nextTick(() => {
        const messageElement = this.$el.querySelector(".message");
        messageElement.classList.remove("show");
      });
      clearTimeout(this.messageTimeout);
    },

    toggleEmailVisibility() {
      this.showEmail = !this.showEmail;
    },

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },

    setAuthErrors() {
    this.authError = true;
    this.emailError = true;
    this.passwordError = true;
  },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-form {
  background-color: #F6F8FA;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 30px;
  text-align: center;
  align-items: center;
  max-width: 400px;
  width: 100%;
  z-index: 1;
  position: relative;
}

.logo-container {
  display: flex;
  justify-content: center;
}

.logo {
  max-width: 57px;
}

.form-title {
  color: #6196F5;
  font-family: 'Montserrat', sans-serif;
  font-size: 44px;
  font-weight: bold;
  margin: 0;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.input-label {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: normal;
  margin: 2px 0 5px 0;
  color: #888;
}

.input-group {
  display: flex;
  align-items: center;
  position: relative;
}

input {
  width: 100%;
  padding: 10px 30px 10px 10px;
  border: 1px solid #ccc;
  border-radius: 7px;
  box-shadow: 0 0px 10px rgba(1, 1, 1, 0.167);
  outline: none;
}

input:focus {
  outline: 2px solid #6196F5;
}

input.input-error {
  border-color: #ff6347;
}

input.input-error:focus {
  outline: none;
}

.toggle-visibility {
  position: absolute;
  right: 10px;
  cursor: pointer;
  color: #888;
}

.back-link {
  margin-left: -170px;
  position: absolute;
  text-decoration: none;
}

.back-arrow {
  width: 24px;
  height: 24px;
}

.btn-login {
  background-color: #6196F5;
  color: #FBFBFB;
  font-weight: 450;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  width: 133px;
  height: 40px;
}

.btn-login:hover {
  background-color: #376acf;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.forgot-password {
  color: #888;
  cursor: pointer;
}

.message {
  background-color: #F6F8FA;
  color: #888;
  padding: 10px;
  border-radius: 0px 0px 15px 15px;
  text-align: center;
  max-width: 400px;
  width: 100%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(-0%);
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
  z-index: -2;
}

.message.show {
  opacity: 1;
  transform: translateX(-50%) translateY(5px);
}

.error-message {
  color: #ff6347;
  font-size: 14px;
  margin-top: 5px;
}
</style>
