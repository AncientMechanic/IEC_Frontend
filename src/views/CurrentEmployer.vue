<template>
    <div>
        <div>
            <label for="companyName">Название компании:</label>
            <input v-model="employer.companyName" id="companyName" type="text">
        </div>
        <div>
            <label for="contactFirstName">Имя:</label>
            <input v-model="employer.contactFirstName" id="contactFirstName" type="text">
        </div>
        <div> 
            <label for="contactLastName">Фамилия:</label>
            <input v-model="employer.contactLastName" id="contactLastName" type="text">
        </div>
        <div>
            <label for="contactEmail">Почта:</label>
            <input v-model="employer.contactEmail" required type="email" id="contactEmail">
        </div>
        <div>
            <label for="contactPhone">Телефон:</label>
            <input v-model="employer.contactPhone" id="contactPhone" type="text">
        </div>
        <div>
            <label for="country">Страна:</label>
            <input v-model="employer.country" id="country" type="text">
        </div>
        <div>
            <label for="city">Город:</label>
            <input v-model="employer.city" id="city" type="text">
        </div>
        <div>
            <label for="companyAddress">Адрес компании:</label>
            <input v-model="employer.companyAddress" id="companyAddress" type="text">
        </div>
        <div>
            <label for="position">Позиция:</label>
            <input v-model="employer.position" id="position" type="text">
        </div>
        <div>
            <label for="wage">Зарплата:</label>
            <input v-model="employer.wage" id="wage" type="text">
        </div>
        <div>
          <label for="jobOfferStatus">Статус:</label>
          <select v-model="jobOfferStatus" id="jobOfferStatus">
            <option value="Accepted">Accepted</option>
            <option value="Declined">Declined</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <button @click="updateEmployer">Сохранить</button>
        <button @click="addEmployer">Добавить</button>
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>Название компании</th>
              <th>Статус предложения работы</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(employer, index) in filteredEmployers" :key="employer.id">
              <td>{{ index + 1 }}</td>
              <td>{{ employer.companyName }}</td>
              <td>{{ employer.jobOfferStatus }}</td>
            </tr>
          </tbody>
        </table>
    </div>
</template>

  
  <script>
  import {
  actions as mainActionTypes,
  getters as mainGetterTypes,
} from "../vuex/store/types";
  
  export default {
    name: "CurrentEmployerView",
    data() {
    return {
    shownEmployer: null,
    companyName: "",
    contactFirstName: "",
    contactLastName: "",
    contactEmail: "",
    contactPhone: "",
    country: "",
    city: "",
    companyAddress: "",
    wage: "",
    position: "",
    jobOfferStatus: "",
    componentLoaded: false
    };
  },
    computed: {
      employer() {
    const employers = this.filteredEmployers.filter(employer => employer.jobOfferStatus !== 'Declined');
    if (employers.length > 0) {
        return employers[0];
    } else {
        return {}; // Возвращаем пустой объект, если нет работодателей с другим статусом
    }
},
      employers() {
        const employers = this.$store.getters[mainGetterTypes.GET_EMPLOYERS];
        return employers;
      },
      filteredEmployers() {
        return this.employers.filter(employer => employer.participantId === this.$route.params.id);
      },
    },
    watch: {
      "$route.params.id": function () {
        this.$store.dispatch(
          mainActionTypes.FETCH_CURRENT_EMPLOYER,
          this.$route.params.id
        );
      },
      employer: {
      handler: function (newVal) {
        this.jobOfferStatus = newVal.jobOfferStatus;
      },
      immediate: true // Обработка при инициализации
    }
    },
    beforeCreate() {
      this.$store.dispatch(
        mainActionTypes.FETCH_CURRENT_EMPLOYER,
        this.$route.params.id
      );
      this.$store.dispatch(mainActionTypes.FETCH_EMPLOYERS); // Получение списка всех работодателей
    },
    beforeRouteLeave(to, from, next) {
      this.$store.state.currentEmployer = {};
      next();
    },
    methods: {
    deleteParticipant(id) {
      this.$store.dispatch(mainActionTypes.DELETE_PARTICIPANT, id);
    },
    addEmployer() {
      let data = {
        participantId: this.$route.params.id,
        companyName: this.employer.companyName,
        contactFirstName: this.employer.contactFirstName,
        contactLastName: this.employer.contactLastName,
        contactEmail: this.employer.contactEmail,
        contactPhone: this.employer.contactPhone,
        country: this.employer.country,
        city: this.employer.city,
        companyAddress: this.employer.companyAddress,
        wage: this.employer.wage,
        position: this.employer.position,
        jobOfferStatus: this.jobOfferStatus
      };
      if(this.employer.id === undefined)
      {
      this.$store.dispatch(mainActionTypes.CREATE_EMPLOYER, data)
        .catch(error => {
          console.error("Error adding participant:", error);
          // Handle error as needed
        });
      }
      else{
        console.log("bububabab");
      }
    },
    updateEmployer(id) {
      id = this.employer.id;
      let data = {
        participantId: this.$route.params.id,
        companyName: this.employer.companyName,
        contactFirstName: this.employer.contactFirstName,
        contactLastName: this.employer.contactLastName,
        contactEmail: this.employer.contactEmail,
        contactPhone: this.employer.contactPhone,
        country: this.employer.country,
        city: this.employer.city,
        companyAddress: this.employer.companyAddress,
        wage: this.employer.wage,
        position: this.employer.position,
        jobOfferStatus: this.jobOfferStatus,

      };
      this.$store.dispatch(mainActionTypes.UPDATE_EMPLOYER, {id, data})
      .catch(error => {
          console.error("Error updating participant:", error);
          // Handle error as needed
        });
    }
  }
  };
  </script>
  