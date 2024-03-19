/**
* CurrentParticipant component displays and edits details of a participant.
*
* Fetches participant data from store on route change and saves changes back to store.
* Handles formatting of date values.
* Shows/hides employer component on button click.
* Clears employer data on route leave to avoid stale data.
* Dispatches store actions on add, update and delete.
*/
<template>
  <div>
    <div><router-link to="/participants">Participants</router-link></div>
    <div>
      <label for="firstName">Имя:</label>
      <input v-model="participant.firstName" id="firstName" type="text">
    </div>
    <div>
      <label for="lastName">Фамилия:</label>
      <input v-model="participant.lastName" id="lastName" type="text">
    </div>
    <div>
      <label for="patronymic">Отчество:</label>
      <input v-model="participant.patronymic" id="patronymic" type="text">
    </div>
    <div>
      <label for="email">Почта:</label>
      <input v-model="participant.email" id="email" type="text">
    </div>
    <div>
      <label for="phoneNumber">Телефон:</label>
      <input v-model="participant.phoneNumber" id="phoneNumber" type="text">
    </div>
    <div>
      <label for="dateOfBirth">Дата рождения:</label>
      <input v-bind:value="formattedDateOfBirth" @input="updateDate('dateOfBirth', $event.target.value)"
        id="dateOfBirth" type="date">
    </div>
    <div>
      <label for="season">Сезон:</label>
      <input v-model="participant.season" id="season" type="number">
    </div>
    <div>
      <label for="program">Программа:</label>
      <select v-model="participant.program" id="program">
        <option value="Work&TravelUSA">Work & Travel USA</option>
        <option value="Australia">Australia</option>
        <option value="Vietnam">Vietnam</option>
      </select>
    </div>
    <div>
      <label for="servicePlan">План обслуживания:</label>
      <select v-model="participant.servicePlan" id="program">
        <option value="FullService">Full Service</option>
        <option value="SelfArranged">Self Arranged</option>
      </select>
    </div>
    <hr>
    <div>
      <button @click="activeTab = 'personalInfo'">Personal Info</button>
      <button @click="activeTab = 'employer'">Employer</button>
      <button @click="activeTab = 'visa'">Visa</button>
    </div>
    <div v-if="activeTab === 'personalInfo'">
      <div>
        <label for="nameOfUniversity">Университет:</label>
        <input v-model="participant.nameOfUniversity" id="nameOfUniversity" type="text">
      </div>
      <div>
        <label for="address">Адрес:</label>
        <input v-model="participant.address" id="address" type="text">
      </div>
      <div>
        <label for="passport">Паспорт:</label>
        <input v-model="participant.passport" id="passport" type="text">
      </div>
      <div>
        <label for="yearOfStudy">Год обучения:</label>
        <input v-model="participant.yearOfStudy" id="yearOfStudy" type="number">
      </div>
      <div>
        <label for="hasEmployer">Есть работодатель:</label>
        <input v-model="participant.hasEmployer" id="hasEmployer" type="checkbox">
      </div>
    </div>
    <div v-if="activeTab === 'employer'">
      <router-view name="employer"></router-view>
      <current-employer employer="currentEmployer" />
    </div>
    <div v-if="activeTab === 'visa'">
      <div>
        <label for="prePayment">Предоплата:</label>
        <input v-model="participant.prePayment" id="prePayment" type="checkbox">
      </div>
      <div>
        <label for="paymentComplete">Платеж завершен:</label>
        <input v-model="participant.paymentComplete" id="paymentComplete" type="checkbox">
      </div>
      <div>
        <label for="visaApproved">Виза одобрена:</label>
        <input v-model="participant.visaApproved" id="visaApproved" type="checkbox">
      </div>
      <div>
        <label for="departureDate">Дата отправления:</label>
        <input v-bind:value="formattedDepartureDate" @input="updateDate('departureDate', $event.target.value)"
          id="departureDate" type="date">
      </div>
      <div>
        <label for="returnDate">Дата возвращения:</label>
        <input v-bind:value="formattedReturnDate" @input="updateDate('returnDate', $event.target.value)" id="returnDate"
          type="date">
      </div>
    </div>
    <div v-if="this.$route.params.id === 'null'">
      <button @click="addParticipant">Добавить</button>
    </div>
    <button @click="updateParticipant">Сохранить</button>
    <div>
  </div>
  </div>
</template>

<script>
import {
  actions as mainActionTypes,
  getters as mainGetterTypes,
} from "../vuex/store/types";
import Cookies from 'js-cookie';
import CurrentEmployer from "../views/CurrentEmployer.vue";

export default {
  name: "CurrentParticipantView",
  components: {
    CurrentEmployer
  },
  data() {
    return {
      userId: Cookies.get('userId') || "", // Получаем userId из cookies
      lastName: "",
      firstName: "",
      patronymic: "",
      nameOfUniversity: "",
      phoneNumber: "",
      email: "",
      dateOfBirth: "",
      season: "",
      address: "",
      passport: "",
      yearOfStudy: "",
      program: "",
      servicePlan: "",
      hasEmployer: false,
      prePayment: false,
      paymentComplete: false,
      visaApproved: false,
      departureDate: "",
      returnDate: "",
      activeTab: 'personalInfo',
    };
  },
  computed: {
    participant() {
      return this.$store.state.currentParticipant;
    },
    formattedDateOfBirth() {
      return this.participant.dateOfBirth ? new Date(this.participant.dateOfBirth).toISOString().split("T")[0] : null;
    },
    formattedDepartureDate() {
      return this.participant.departureDate ? new Date(this.participant.departureDate).toISOString().split("T")[0] : null;
    },
    formattedReturnDate() {
      return this.participant.returnDate ? new Date(this.participant.returnDate).toISOString().split("T")[0] : null;
    },
  },
  watch: {
    "$route.params.id": function () {
      this.$store.dispatch(
        mainActionTypes.FETCH_CURRENT_PARTICIPANT,
        this.$route.params.id
      );
    },
  },
  beforeCreate() {
    this.$store.dispatch(
      mainActionTypes.FETCH_CURRENT_PARTICIPANT,
      this.$route.params.id
    );
    this.$store.state.currentEmployer = {};
  },
  beforeRouteLeave(to, from, next) {
    // Присваиваем пустой объект currentEmployer перед выходом из страницы
    this.$store.state.currentParticipant = {};
    next();
  },
  created() {
    if (this.activeTab === 'employer') {
      this.toggleEmployer();
    }
  },
  methods: {
    toggleEmployer() {
      this.isEmployerVisible = !this.isEmployerVisible;
      this.$store.state.currentEmployer = {};
    },
    updateDate(fieldName, value) {
      const formattedValue = new Date(value).toISOString();
      this.participant[fieldName] = formattedValue;
    },
    deleteParticipant(id) {
      this.$store.dispatch(mainActionTypes.DELETE_PARTICIPANT, id);
    },
    addParticipant() {
      let data = {
        userId: this.userId,
        lastName: this.participant.lastName || '',
        firstName: this.participant.firstName || '',
        patronymic: this.participant.patronymic || '',
        dateOfBirth: this.participant.dateOfBirth,
        season: this.participant.season,
        address: this.participant.address || '',
        passport: this.participant.passport || '',
        nameOfUniversity: this.participant.nameOfUniversity || '',
        yearOfStudy: this.participant.yearOfStudy,
        program: this.participant.program || '',
        servicePlan: this.participant.servicePlan || '',
        hasEmployer: this.participant.hasEmployer || false,
        prePayment: this.participant.prePayment || false,
        paymentComplete: this.participant.paymentComplete || false,
        visaApproved: this.participant.visaApproved || false,
        phoneNumber: this.participant.phoneNumber || '',
        email: this.participant.email || '',
      };
      this.$store.dispatch(mainActionTypes.CREATE_PARTICIPANT, data)
        .catch(error => {
          console.error("Error adding participant:", error);
          // Handle error as needed
        });
    },
    updateParticipant(id) {
      id = this.$route.params.id;
      let data = {
        lastName: this.participant.lastName,
        firstName: this.participant.firstName,
        patronymic: this.participant.patronymic,
        dateOfBirth: this.participant.dateOfBirth,
        season: this.participant.season,
        address: this.participant.address,
        passport: this.participant.passport,
        nameOfUniversity: this.participant.nameOfUniversity,
        yearOfStudy: this.participant.yearOfStudy,
        phoneNumber: this.participant.phoneNumber,
        email: this.participant.email,
        program: this.participant.program,
        servicePlan: this.participant.servicePlan,
        hasEmployer: this.participant.hasEmployer,
        prePayment: this.participant.prePayment,
        paymentComplete: this.participant.paymentComplete,
        visaApproved: this.participant.visaApproved,
        departureDate: this.participant.departureDate,
        returnDate: this.participant.returnDate,

      };
      this.$store.dispatch(mainActionTypes.UPDATE_PARTICIPANT, { id, data })
        .catch(error => {
          console.error("Error updating participant:", error);
          // Handle error as needed
        });
    }
  }
};
</script>