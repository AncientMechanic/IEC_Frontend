<template>
  <div class="users-container font-Montserrat">
    <h1>Staff members</h1>
    <div class="card-grid">
      <div class="user-card" v-for="user in users" :key="user.id">
        <div class="card-header">
          <div class="photo-section">
            <div>
              <img v-if="user.photo" :src="`data:image/jpeg;base64,${user.photo}`" alt="User Photo" class="user-photo" />
              <img v-else :src="defaultPhotoUrl" alt="Default Photo" class="user-photo" />
            </div>
          </div>
          <div class="user-info">
            <h3>{{ user.name }}</h3>
            <p class="user-id">ID: {{ user.id.slice(0, 8) }}</p>
          </div>
        </div>
        <div class="card-body">
          <p><span class="label">Phone:</span><br>{{ user.phoneNumber }}</p>
          <p><span class="label">Email:</span><br>{{ user.email }}</p>
          <p><span class="label">Registration date:</span><br>{{ formatDate(user.createdOn) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { actions as mainActionTypes, getters as mainGetterTypes } from "../vuex/store/types";
import defaultPhoto from "../assets/default.png";

export default {
  name: "UsersView",
  data() {
    return {
      defaultPhoto: defaultPhoto,
    };
  },
  computed: {
    users() {
      const users = this.$store.getters[mainGetterTypes.GET_USERS];
      return users;
    },
  },
  beforeCreate() {
    this.$store.dispatch(mainActionTypes.FETCH_USERS);
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    },
  },
};
</script>

<style scoped>
.users-container {
  margin: 20px;
}

.users-container h1 {
  color: #354770;
  font-family: 'Montserrat', sans-serif;
  font-size: 31px;
  font-weight: 600;
  margin-top: 15px;
  margin-bottom: 15px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.user-card {
  background-color: #f6f8fa;
  border-radius: 15px;
  box-shadow: 0px 0px 20px rgba(96, 96, 96, 0.16);
  padding: 20px;
  width: 360px;
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.user-photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
}

.user-info h3 {
  margin: 0;
  font-size: 21px;
  color: #354770;
  font-weight: 450;
}

.user-id {
  margin: 5px 0 0;
  font-size: 16px;
  color: #797979;
}

.card-body p {
  margin: 10px 0;
  font-size: 16px;
  color: #354770;
  font-weight: 500;
}

.label {
  color: #797979;
  margin-right: 10px;
  font-weight: 400;
}
</style>