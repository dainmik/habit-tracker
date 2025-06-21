import "@/app/main.css";

import { createApp } from "vue";

import App from "@/app/app.vue";
import { router } from "@/app/router";

const app = createApp(App);

app.use(router);

app.config.errorHandler = (error) => {
	console.error(error);
};

app.mount("#app");
