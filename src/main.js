import { createApp } from "vue";
import App from "./App.vue";
import { registerPlugins } from "./plugins/index";
import './assets/main.css';

const app = createApp(App);

registerPlugins(app);

app.mount("#app");
