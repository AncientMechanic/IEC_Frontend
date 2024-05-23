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
  <div class="current-participant font-Montserrat">
    <h2>Participant page</h2>
    <div class="common-info-container">
      <h2>Common information</h2>
      <div class="common-info-grid">
        <div class="photo-section">
          <div class="photo-container">
            <img v-if="participant.photo" :src="`data:image/jpeg;base64,${participant.photo}`" alt="Participant Photo" class="participant-photo" />
            <img v-else :src="defaultPhotoUrl" alt="Default Photo" class="participant-photo" />
            <input id="file-input" type="file" @change="handleFileUpload" accept="image/*" class="file-input" style="display: none;" />
          </div>
          <label for="file-input" class="file-input-label">Select photo</label>
          <input id="file-input" type="file" @change="handleFileUpload" accept="image/*" class="file-input" style="display: none;" />
        </div>
        <div class="personal-info">
          <div>
            <label for="lastName">Last Name:</label>
            <input v-model="participant.lastName" id="lastName" type="text" />
          </div>
          <div>
            <label for="firstName">First Name:</label>
            <input v-model="participant.firstName" id="firstName" type="text" />
          </div>
          <div>
            <label for="patronymic">Patronymic:</label>
            <input v-model="participant.patronymic" id="patronymic" type="text" />
          </div>
          <div>
            <label for="dateOfBirth">Date of Birth:</label>
            <input v-bind:value="formattedDate(participant.dateOfBirth)" @input="updateDate('dateOfBirth', $event.target.value)" id="dateOfBirth" type="date" />
          </div>
          <div>
            <label for="id">ID:</label>
            <input v-model="participant.id" id="id" type="text" readonly />
          </div>
        </div>
        <div class="additional-info">
          <div>
            <label for="email">Email:</label>
            <input v-model="participant.email" id="email" type="text" />
          </div>
          <div>
            <label for="phoneNumber">Phone Number:</label>
            <input v-model="participant.phoneNumber" id="phoneNumber" type="text" />
          </div>
          <div>
            <label for="season">Season:</label>
            <input v-model="participant.season" id="season" type="number" />
          </div>
          <div>
            <label for="program">Program:</label>
            <select v-model="participant.program" id="program">
              <option value="Work&TravelUSA">Work & Travel USA</option>
              <option value="Work&TravelArgentina">Work & Travel Argentina</option>
              <option value="WorkExperienceInSpain">Work Experienxe in Spain</option>
              <option value="WorkInChina">Work in China</option>
              <option value="WorkInFrance">Work in France</option>
              <option value="TeachInThailand">Teach in Thailand</option>
              <option value="Study&WorkInCanada">Study & Work in Canada</option>
              <option value="Study&WorkInDublin">Study & Work in Dublin</option>
              <option value="StudyInItaly">Study in Italy</option>
              <option value="InternshipInChile">Internship in Chile</option>
              <option value="InternshipInBrazil">Internship in Brazil</option>
              <option value="InternshipInMexico">Internship in Mexico</option>
              <option value="InternshipInGermany">Internship in Germany</option>
              <option value="InternshipInBritain">Internship in Britain</option>
              <option value="InternshipInBrazil">Internship in Brazil</option>
            </select>
          </div>
          <div>
            <label for="servicePlan">Service Plan:</label>
            <select v-model="participant.servicePlan" id="servicePlan">
              <option value="FullService">Full Service</option>
              <option value="SelfArranged">Self Arranged</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="tab-buttons">
      <div class="tab-button" :class="{ active: activeTab === 'personalInfo' }" @click="activeTab = 'personalInfo'">
        Personal information
        <div class="tab-underline"></div>
      </div>
      <div class="tab-button" :class="{ active: activeTab === 'employer' }" @click="activeTab = 'employer'">
        Job offer information
        <div class="tab-underline"></div>
      </div>
      <div class="tab-button" :class="{ active: activeTab === 'visa' }" @click="activeTab = 'visa'">
        Visa information
        <div class="tab-underline"></div>
      </div>
    </div>
    <div class="tab-content">
      <div v-if="activeTab === 'personalInfo'">
        <div class="tab-content-columns">
          <div class="tab-content-column">
            <h3>Documents</h3>
            <div class="column-content-docs">
              <div>
                <label for="contractSigned">Contract signed:</label>
                <input v-model="participant.contractSigned" id="contractSigned" type="checkbox">
              </div>
              <div class="has-employer">
                <label for="hasEmployer">Job offer signed:</label>
                <input v-model="participant.hasEmployer" id="hasEmployer" type="checkbox" class="hasemployer-checkbox">
              </div>
              <div>
                <label for="passport">Passport:</label>
                <input v-model="participant.passport" id="passport" type="text" >
              </div>
              <div>
                <label for="passportExpires">Passport expiry date:</label>
                <input v-bind:value="formattedDate(participant.passportExpires)" @input="updateDate('passportExpires', $event.target.value)" id="passportExpires" type="date" />
              </div>
              <div class="address">
                <label for="address">Address:</label>
                <textarea v-model="participant.address" id="address" rows="4"></textarea>
              </div>
            </div>
          </div>
          <div class="tab-content-column">
            <h3>University</h3>
            <div class="column-content-uni">
              <div class="university">
                <label for="nameOfUniversity">Name of the university:</label>
                <textarea v-model="participant.nameOfUniversity" id="nameOfUniversity" rows="4"></textarea>
              </div>
              <div>
                <label for="yearOfStudy">Year of study:</label>
                <input v-model="participant.yearOfStudy" id="yearOfStudy" type="number" class="year-of-study">
              </div>
              <div>
                <label for="formOfStudy">Study form:</label>
                <select v-model="participant.formOfStudy" id="formOfStudy">
                  <option value="Full-time">Full time</option>
                  <option value="Part-time">Part time</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="activeTab === 'employer'">
        <router-view name="employer"></router-view>
        <current-employer employer="currentEmployer" />
      </div>
      <div v-if="activeTab === 'visa'">
        <div class="tab-content-columns">
          <div class="tab-content-column">
            <h3>Visa information</h3>
            <div class="column-content-visa">
              <div>
                <label for="prePayment">Initial payment:</label>
                <input v-model="participant.prePayment" id="prePayment" type="checkbox">
              </div>
              <div>
                <label for="paymentComplete">Remaining payment:</label>
                <input v-model="participant.paymentComplete" id="paymentComplete" type="checkbox">
              </div>
              <div>
                <label for="visaApproved">Visa approved:</label>
                <input v-model="participant.visaApproved" id="visaApproved" type="checkbox">
              </div>
              <div>
                <label for="visaNumber">Visa number:</label>
                <input v-model="participant.visaNumber" id="visaNumber" type="text">
              </div>
              <div>
                <label for="visaIssued">Visa issued:</label>
                <input v-bind:value="formattedDate(participant.visaIssued)" @input="updateDate('visaIssued', $event.target.value)" id="visaIssued" type="date" />
              </div>
              <div>
                <label for="visaExpires">Visa expires:</label>
                <input v-bind:value="formattedDate(participant.visaExpires)" @input="updateDate('visaExpires', $event.target.value)" id="visaExpires" type="date" />
              </div>
            </div>
          </div>
          <div class="tab-content-column">
            <h3>Flight information</h3>
            <div class="column-content-visa">
              <div>
                <label for="departureDate">Departure date:</label>
                <input v-bind:value="formattedDate(participant.departureDate)" @input="updateDate('departureDate', $event.target.value)" id="departureDate" type="date" />
              </div>
              <div>
                <label for="returnDate">Return date:</label>
                <input v-bind:value="formattedDate(participant.returnDate)" @input="updateDate('returnDate', $event.target.value)" id="returnDate" type="date" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="button-container">
      <button v-if="this.$route.params.id === 'null'" @click="addParticipant" class="add">Add
        <img :src="addIcon" alt="Add Icon" class="add-icon" />
      </button>
      <button v-if="this.$route.params.id !== 'null'" @click="confirmDeleteParticipant(this.$route.params.id)" class="delete">Delete
        <img :src="deleteIcon" alt="Cancel Icon" class="delete-icon" />
      </button>
      <button @click="updateParticipant">Save</button>
    </div>
  </div>
</template>

<script>
import {
  actions as mainActionTypes,
  getters as mainGetterTypes,
} from "../vuex/store/types";
import { getters as authGetterTypes } from '../vuex/modules/auth/types';
import CurrentEmployer from "../views/CurrentEmployer.vue";
import deleteIcon from '../assets/Delete.png';
import addIcon from '../assets/Plus_dark.png';

export default {
  name: "CurrentParticipantView",
  components: {
    CurrentEmployer
  },
  data() {
    return {
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
      passportExpires: "",
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
      photo: "",
      formOfStudy: "",
      visaNumber: "",
      visaIssued: "",
      visaExpires: "",
      contractSigned: false,
      participantPhoto: null,
      selectedFile: null,
      defaultPhotoUrl: '../src/assets/default.png',
      deleteIcon,
      addIcon,
    };
  },
  computed: {
    participant() {
      return this.$store.state.currentParticipant;
    },
    formattedDate() {
      return (date) => date ? new Date(date).toISOString().split("T")[0] : '';
    },
    userId() {
      return this.$store.getters[authGetterTypes.GET_USER_ID];
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
    confirmDeleteParticipant(id) {
      if (confirm("Вы уверены, что хотите удалить этого участника?")) {
        this.deleteParticipant(id);
      } else {
        console.log("Удаление отменено");
      }
    },
    deleteParticipant(id) {
      this.$store.dispatch(mainActionTypes.DELETE_PARTICIPANT, id)
      .then(() => {
          // Переход на страницу Participants после успешного создания участника
          this.$router.push({ name: 'Participants' });
        })
        .catch(error => {
          console.error("Error deleting participant:", error);
          // Handle error as needed
        });
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
        passportExpires: this.participant.passportExpires,
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
        formOfStudy: this.participant.formOfStudy || '',
        visaNumber: this.participant.visaNumber || '',
        visaIssued: this.participant.visaIssued,
        visaExpires: this.participant.visaExpires,
        contractSigned: this.participant.contractSigned || false,
        photo: this.participant.photo || '',
        departureDate: this.participant.departureDate,
        returnDate: this.participant.returnDate,
      };
      this.$store.dispatch(mainActionTypes.CREATE_PARTICIPANT, data)
      .then(() => {
          // Переход на страницу Participants после успешного создания участника
          this.$router.push({ name: 'Participants' });
        })
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
        passportExpires: this.participant.passportExpires,
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
        photo: this.participant.photo,
        formOfStudy: this.participant.formOfStudy,
        visaNumber: this.participant.visaNumber,
        visaIssued: this.participant.visaIssued,
        visaExpires: this.participant.visaExpires,
        contractSigned: this.participant.contractSigned,
      };
      this.$store.dispatch(mainActionTypes.UPDATE_PARTICIPANT, { id, data })
        .then(() => {
          // Переход на страницу Participants после успешного создания участника
          this.$router.push({ name: 'Participants' });
        })
        .catch(error => {
          console.error("Error updating participant:", error);
          // Handle error as needed
        });
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        this.participantPhoto = URL.createObjectURL(file);

        // Преобразование файла в Base64
        const reader = new FileReader();
        reader.onload = () => {
          this.participant.photo = reader.result.split(',')[1];
        };
        reader.readAsDataURL(file);
      } else {
        this.selectedFile = null;
        this.participantPhoto = null;
        this.participant.photo = null;
      }
    },
  }
};
</script>

<style scoped>
.current-participant {
  margin: 20px;
}

.current-participant h2 {
  margin-top: -20px;
  margin-bottom: 20px;
  font-size: 27px;
  font-weight: 550;
  color: #354770;
  text-decoration: none;
}

.common-info-container {
  background-color: #F6F8FA;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 20px;
  box-shadow: 0px 0px 20px rgba(96, 96, 96, 0.16);
}

.common-info-container h2 {
  font-size: 24px;
  color: #6196F5;
  font-weight: 500;
}

.common-info-grid {
  display: grid;
  grid-template-columns: 2fr 6fr 12fr;
  gap: 20px;
}

.photo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.photo-container {
  margin-bottom: 10px;
}

.participant-photo {
  width: 160px;
  height: 170px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.file-input-label {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
  width: 150px;
  border: 2px solid #354770;
  background-color: #F6F8FA;
  color: #354770;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: -10px;
}

.file-input-label:hover {
  background-color: #6196F5;
  border: #6196F5 solid 2px;
  color: #F6F8FA;
}

.file-input {
  display: none;
}

.personal-info,
.additional-info {
  display: flex;
  flex-direction: column;
  color: #354770;
  font-weight: 450;
  margin-left: 20px;
}

.personal-info div,
.additional-info div {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 10px;
}

.personal-info label,
.additional-info label {
  flex: 0 0 150px;
  margin-right: 10px;
  white-space: nowrap;
  color: #797979;
}

.personal-info input,
.additional-info input,
.additional-info select {
  flex: 1;
  max-width: 315px;
  height: 30px;
  border: 1px solid #797979;
  background-color: #F6F8FA;
  border-radius: 5px;
  padding-left: 10px;
  box-sizing: border-box;
  font-weight: 500;
}

.personal-info input:hover,
.additional-info input:hover,
.additional-info select:hover{
  border: 1px solid #6196F5;
}

.personal-info input:focus,
.additional-info input:focus,
.additional-info select:focus{
  outline: none;
  border: 2px solid #6196F5;
}

.tab-container {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
}

.tab-buttons {
  display: flex;
  margin-bottom: 20px;
  position: relative;
}

.tab-button {
  color: #354770;
  font-size: 18px;
  font-weight: 500;
  padding: 10px 20px;
  cursor: pointer;
  position: relative;
}

.tab-underline {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background-color: #6196f5;
  width: 0;
  transition: width 0.3s ease;
}

.tab-button.active {
  color: #6196f5;
}

.tab-button.active .tab-underline {
  width: 100%;
}

.tab-content {
  background-color: #F6F8FA;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 20px;
  box-shadow: 0px 0px 20px rgba(96, 96, 96, 0.16);
}

.tab-content-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px; /* Расстояние между колонками */
}

.tab-content-column {
  background-color: #F6F8FA;
  border-radius: 8px;
  margin-top: -10px;
}

.tab-content-column h3 {
  font-size: 20px;
  color: #6196F5;
  font-weight: 500;
  margin-bottom: 20px;
}

.column-content-docs,
.column-content-uni,
.column-content-visa {
  display: flex;
  flex-direction: column;
  color: #354770;
  font-weight: 450;
  margin-left: 20px;
}

.column-content-docs div,
.column-content-uni div, 
.column-content-visa div{
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 13px;
}

.column-content-docs label,
.column-content-uni label,
.column-content-visa label {
  flex: 0 0 200px;
  align-items: center;
  margin-right: 10px;
  white-space: nowrap;
  color: #797979;
}

.column-content-docs input[type="text"],
.column-content-docs input[type="date"],
.column-content-uni input[type="text"],
.column-content-uni input[type="number"],
.column-content-visa input[type="date"],
.column-content-visa input[type="text"],
.column-content-uni select {
  flex: 1;
  max-width: 315px;
  height: 30px;
  border: 1px solid #797979;
  background-color: #F6F8FA;
  border-radius: 5px;
  padding-left: 10px;
  box-sizing: border-box;
  font-weight: 500;
  align-items: center;
}


.tab-content-column input[type="text"]:hover,
.tab-content-column input[type="number"]:hover,
.tab-content-column select:hover,
.address textarea:hover,
.university textarea:hover {
  border: 1px solid #6196F5;
}

.tab-content-column input[type="text"]:focus,
.tab-content-column input[type="number"]:focus,
.tab-content-column select:focus,
.address textarea:focus,
.university textarea:focus {
  outline: none;
  border: 2px solid #6196F5;
}

.column-content-docs input[type="checkbox"],
.column-content-uni input[type="checkbox"],
.column-content-visa input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #354770;
  background-color: #ffffff;
  border-radius: 4px;
  position: relative;
  margin-right: 100px;
  cursor: pointer;
}

.column-content-docs input[type="checkbox"]::before,
.column-content-uni input[type="checkbox"]::before,
.column-content-visa input[type="checkbox"]::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 13px;
  height: 13px;
  background-color: #354770;
  border-radius: 2px;
  opacity: 0;
  transition: opacity 0.1s ease;
}

.column-content-docs input[type="checkbox"]:checked::before,
.column-content-uni input[type="checkbox"]:checked::before,
.column-content-visa input[type="checkbox"]:checked::before {
  opacity: 1;
}

.column-content-docs textarea,
.column-content-uni textarea {
  flex: 1;
  max-width: 315px;
  border: 1px solid #797979;
  background-color: #F6F8FA;
  border-radius: 5px;
  padding-left: 10px;
  box-sizing: border-box;
  resize: vertical;
  font-family: inherit;
  color: #354770;
  font-weight: 450;
}

.visa-info div{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 10px;
}

.column-content-docs input[type="date"] {
  border: 1px solid #797979;
  background-color: #F6F8FA;
  border-radius: 5px;
  padding: 2px 10px;
  font-size: 16px;
  color: #354770;
  width: 200px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.tab-content-column input[type="date"]::-webkit-calendar-picker-indicator {
  color: #354770;
  background-color: transparent;
  cursor: pointer;
}

.tab-content-column input[type="date"]:hover{
  border: 1px solid #6196F5;
}

.tab-content-column input[type="date"]:focus{
  outline: none;
  border: 2px solid #6196F5;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.button-container button {
  margin-left: 10px;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.button-container .delete {
  width: 130px;
  height: 47px;
  display: flex;
  align-items: center;
  background-color: #DBE0EB;
  color: #FF4343;
  border: 2px solid #FF4343;
  padding: 8px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.2s ease;
  margin-right: 10px;
}

.button-container .add {
  width: 130px;
  height: 47px;
  padding: 8px 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #dbe0eb;
  color: #354770;
  border: 2px solid #354770;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.2s ease;
  margin-right: 10px;
}

.add-icon {
  width: 20px;
  height: 20px;
  margin-left: 15px;
}

.add:hover .add-icon{
  content: url('../assets/Plus.png');
}

.button-container button:last-child {
  width: 130px;
  height: 47px;
  padding: 8px 20px;
  align-items: center;
  background-color: #dbe0eb;
  color: #354770;
  border: 2px solid #354770;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.2s ease;
}

.button-container button:last-child:hover {
  background-color: #6196F5;
  color: #F6F8FA;
  border: 2px solid #6196F5;
  font-size: 18px;
}

.button-container .add:hover {
  background-color: #6196F5;
  color: #F6F8FA;
  border: 2px solid #6196F5;
  font-size: 18px;
}

.button-container .delete:hover {
  background-color: #FF4343;
  color: #F6F8FA;
  border: 2px solid #FF4343;
}

.delete-icon {
  width: 22px;
  height: 22px;
  margin-right: 10px;
  margin-left: 10px;
}
.button-container button:first-child:hover .delete-icon {
  content: url('../assets/Delete_white.png');
}
</style>