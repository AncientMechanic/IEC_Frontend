<template>
  <div class="register-container font-Montserrat">
    <div class="register-form">
      <router-link to="/" class="back-link">
        <img src="src\assets\Arrow.png" alt="Back" class="back-arrow" />
      </router-link>
      <div class="logo-container">
        <img src="src\assets\User2.png" alt="Logo" class="logo" />
      </div>
      <h2 class="form-title">Register</h2>
      <form @submit.prevent="register">
        <div class="form-group">
          <div class="input-label">Name</div>
          <div class="input-group">
            <input
              id="name"
              v-model="name"
              type="text"
              required
              autofocus
            />
          </div>
        </div>
        <div class="form-group">
          <div class="input-label">Phone Number</div>
          <div class="input-group">
            <input id="phone" v-model="phonenumber" type="tel" required />
          </div>
        </div>
        <div class="form-group">
          <div class="input-label">Email</div>
          <div class="input-group">
            <input
              id="email"
              v-model="email"
              type="email"
              required
            />
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
            />
            <span class="toggle-visibility" @click="togglePasswordVisibility">
              <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'" aria-hidden="true"></i>
            </span>
          </div>
          <div class="error-message" v-if="passwordLengthError">{{ passwordLengthError }}</div>
        </div>
        <div class="form-group">
          <div class="input-label">Confirm Password</div>
          <div class="input-group">
            <input
              id="password-confirm"
              v-model="password_confirmation"
              :type="showPasswordConfirm ? 'text' : 'password'"
              required
            />
            <span class="toggle-visibility" @click="togglePasswordConfirmVisibility">
              <i :class="showPasswordConfirm ? 'fa fa-eye-slash' : 'fa fa-eye'" aria-hidden="true"></i>
            </span>
          </div>
          <div class="error-message" v-if="passwordMatchError">{{ passwordMatchError }}</div>
        </div>
        <div class="form-group">
          <div class="input-label">Profile Photo</div>
          <div class="input-group file-input">
            <input type="file" @change="handleFileUpload" accept="image/*" id="file-input" />
            <label for="file-input" class="btn-file">Select file</label>
            <span class="file-name" v-if="!selectedFile">File not selected</span>
            <span class="file-name" v-else>{{ selectedFile.name }}</span>
          </div>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn-register">REGISTER</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { actions as authActionTypes } from "../vuex/modules/auth/types";

export default {
  name: "RegisterView",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      showPassword: false,
      showPasswordConfirm: false,
      passwordMatchError: "", // Новое свойство
      passwordLengthError: "", // Новое свойство
      phonenumber: "", // Новое свойство
      photo: null, // Новое свойство
      selectedFile: null, // Новое свойство
      photoBase64: null,
    };
  },
  methods: {
    register() {
      const name = this.name;
      const email = this.email;
      const password = this.password;
      const password_confirmation = this.password_confirmation;
      const phonenumber = this.phonenumber;
      const photo = this.photoBase64; // Используйте photoBase64

      if (password.length < 8) {
        this.passwordLengthError = "Password must be at least 8 characters long";
        return; // Выходим из метода, если пароль слишком короткий
      }

      // Если длина пароля достаточная, сбрасываем ошибку
      this.passwordLengthError = "";

      if (password !== password_confirmation) {
        this.passwordMatchError = "Passwords do not match";
        return; // Выходим из метода, если пароли не совпадают
      }

      // Если пароли совпадают, сбрасываем ошибку
      this.passwordMatchError = "";

      // Здесь вы можете добавить логику для проверки данных
      // и отправки их на сервер

      this.$store.dispatch(authActionTypes.REGISTER, {
        name,
        email,
        password,
        password_confirmation,
        phonenumber, // Новый параметр
        photo, // Новый параметр
      });
    },
    onFileChange(event) {
      this.profilePhoto = event.target.files[0];
      this.selectedFile = event.target.files[0]; // Установка выбранного файла
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    togglePasswordConfirmVisibility() {
      this.showPasswordConfirm = !this.showPasswordConfirm;
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        this.photo = URL.createObjectURL(file);

        // Преобразование файла в Base64
        const reader = new FileReader();
        reader.onload = () => {
          this.photoBase64 = reader.result.split(',')[1];
        };
        reader.readAsDataURL(file);
      } else {
        this.selectedFile = null;
        this.photo = null;
        this.photoBase64 = null;
      }
    },
  },
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120vh;
}

.register-form {
  background-color: #f6f8fa;
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
  color: #6196f5;
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
  border: 0px solid #ccc;
  border-radius: 7px;
  box-shadow: 0 0px 10px rgba(1, 1, 1, 0.167);
  outline: none;
}

input:focus {
  outline: 2px solid #6196f5;
}

.toggle-visibility {
  position: absolute;
  right: 10px;
  cursor: pointer;
  color: #888;
}

.btn-register {
  background-color: #6196f5;
  color: #fbfbfb;
  font-weight: 450;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  width: 133px;
  height: 40px;
}

.btn-register:hover {
  background-color: #376acf;
}

.form-actions {
  display: flex;
  justify-content: right;
  margin-top: 30px;
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

.error-message {
  color: #ff6347;
  font-size: 14px;
  margin-top: 5px;
}

.file-input {
  display: flex;
  align-items: center;
}

.file-input input[type="file"] {
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0;
  font-size: 0;
}

.file-input .btn-file {
  display: inline-block;
  border: 2px solid #354770;
  background-color: #F6F8FA;
  color: #354770;
  padding: 4px 20px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  margin-right: 10px;
  position: relative; /* Добавлено */
  z-index: 1;
}

.file-input .btn-file:hover,
.file-input label:hover {
  background-color: #6196F5;
  border: #6196F5 solid 2px;
  color: #F6F8FA;
  cursor: pointer;
}

.file-name {
  color: #888;
  font-size: 16px;
  margin-left: 20px;
}
</style>