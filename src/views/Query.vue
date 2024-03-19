<template>
  <div>
    <div v-for="(condition, key) in conditions" :key="key">
      <input type="checkbox" :id="key" v-model="selectedConditions[key]">
      <label :for="key">{{ condition }}</label>
    </div>
    <div>
      <label for="servicePlan">Service Plan:</label>
      <select v-model="selectedServicePlan" id="servicePlan">
        <option value="FullService">Full Service</option>
        <option value="SelfArranged">Self Arranged</option>
        <option value=null> </option>
      </select>
    </div>
    <div>
      <label for="program">Program:</label>
      <select v-model="selectedProgram" id="servicePlan">
        <option value="Work&TravelUSA">Work&Travel USA</option>
        <option value="Australia">Australia</option>
        <option value="Vietnam">Vietnam</option>
        <option value=null> </option>
      </select>
    </div>
    <div>
      <label for="filterType">Фильтр:</label>
      <select v-model="filterType" id="filterType">
        <option value="isOn">is on</option>
        <option value="isNotOn">is not on</option>
      </select>
    </div>
    <div>
      <label for="query">Запрос:</label>
      <textarea id="query" :value="getQuery" readonly class="input-wide"></textarea>
    </div>
    <button @click="applyFilters">Применить</button>
    <div>
      <router-link to="/participants">Отменить</router-link>
    </div>
  </div>
</template>

<script>
import {
  actions as mainActionTypes,
  getters as mainGetterTypes,
} from "../vuex/store/types";

export default {
  name: "Query",
  data() {
    return {
      conditions: {
        hasEmployer: 'Has Employer',
        paymentComplete: 'Payment Complete',
        visaApproved: 'visaApproved',
        prePaymentComplete: 'prePaymentComplete',
        // Добавьте другие условия по мере необходимости
      },
      selectedConditions: {
      },
      selectedServicePlan: null,
      selectedProgram: null,
      filterType: "isOn" // Устанавливаем значение по умолчанию для фильтрации
    };
  },
  computed: {
    getQuery() {
      let query = '';
      for (let key in this.selectedConditions) {
        if (this.selectedConditions[key]) {
          query += `${this.conditions[key]} & \n`;
        }
      }
      if (this.selectedServicePlan) {
        query += `Service Plan: ${this.selectedServicePlan} & \n`;
      }
      if (this.selectedProgram) {
        query += `Program: ${this.selectedProgram} & \n`;
      }
      return query.slice(0, -3);
    }
  },
  methods: {
    applyFilters() {
      let filteredParticipants = [];
      if (this.filterType === "isOn") {
        filteredParticipants = this.filterParticipants();
      } else if (this.filterType === "isNotOn") {
        filteredParticipants = this.getAllParticipants().filter(participant => !this.filterParticipants().includes(participant));
      }
      this.$router.push({ name: 'Participants', query: { filteredParticipants: JSON.stringify(filteredParticipants) } });
    },
    filterParticipants() {
      const allParticipants = this.$store.getters[mainGetterTypes.GET_PARTICIPANTS];
      // Применяем фильтрацию на основе выбранных условий
      return allParticipants.filter(participant => {
        // Проверяем каждое выбранное условие
        for (let condition in this.selectedConditions) {
          // Если условие выбрано и не соответствует участнику, прерываем цикл и возвращаем false
          if (this.selectedConditions[condition] && !participant[condition]) {
            return false;
          }
        }
        if (this.selectedServicePlan && participant.servicePlan !== this.selectedServicePlan) {
          return false;
        }
        if (this.selectedProgram && participant.program !== this.selectedProgram) {
          return false;
        }
        // Если все условия соответствуют, возвращаем true для текущего участника
        return true;
      });
    },
    getAllParticipants() {
      return this.$store.getters[mainGetterTypes.GET_PARTICIPANTS];
    }
  }
};
</script>

<style>
/* Стилизация для широкого текстового поля */
.input-wide {
  width: 300px;
  /* Установите нужную ширину */
  height: 200px;
}
</style>