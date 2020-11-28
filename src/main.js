import { createApp, defineAsyncComponent } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
import BaseCard from "./components/ui/BaseCard.vue";
import BaseButton from "./components/ui/BaseButton.vue";
import BaseBadge from "./components/ui/BaseBadge.vue";
import BaseSpinner from "./components/ui/BaseSpinner.vue";
// import BaseDialog from "./components/ui/BaseDialog.vue";
//這裡改用非同步元件Async component，讓瀏覽器需要用到此元件時才import the code
const BaseDialog = defineAsyncComponent(() => import("./components/ui/BaseDialog.vue"));

const app = createApp(App);
app.use(router);
app.use(store);

app.component("base-card", BaseCard);
app.component("base-button", BaseButton);
app.component("base-badge", BaseBadge);
app.component("base-spinner", BaseSpinner);
app.component("base-dialog", BaseDialog);

app.mount("#app");
