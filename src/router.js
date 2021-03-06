import { defineAsyncComponent } from "vue";
import { createRouter, createWebHistory } from "vue-router";
// import CoachDetail from "./pages/coaches/CoachDetail.vue";
import CoachesList from "./pages/coaches/CoachesList.vue";
// import CoachRegistration from "./pages/coaches/CoachRegistration.vue";
// import ContactCoach from "./pages/requests/ContactCoach.vue";
// import RequestsReceived from "./pages/requests/RequestsReceived.vue";
// import UserAuth from "./pages/auth/UserAuth.vue";
import NotFound from "./pages/NotFound.vue";
import store from "./store/index.js";

const CoachDetail = defineAsyncComponent(() => import("./pages/coaches/CoachDetail.vue"));
const CoachRegistration = defineAsyncComponent(() =>
  import("./pages/coaches/CoachRegistration.vue")
);
const ContactCoach = defineAsyncComponent(() => import("./pages/requests/ContactCoach.vue"));
const RequestsReceived = defineAsyncComponent(() =>
  import("./pages/requests/RequestsReceived.vue")
);
const UserAuth = defineAsyncComponent(() => import("./pages/auth/UserAuth.vue"));

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/coaches" },
    { path: "/coaches", component: CoachesList },
    {
      path: "/coaches/:id",
      component: CoachDetail,
      props: true, //重要!!讓dynamic route variable可以被作為props導入    順序一定要在component下方
      children: [
        { path: "contact", component: ContactCoach }, //  '/coaches/:id/contact'
      ],
    },
    { path: "/register", component: CoachRegistration, meta: { requiresAuth: true } },
    { path: "/requests", component: RequestsReceived, meta: { requiresAuth: true } },
    { path: "/auth", component: UserAuth, meta: { requiresUnauth: true } },
    { path: "/:pathMatch(.*)*", component: NotFound },
  ],
});
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/auth");
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next("/coaches");
  } else {
    next();
  }
});

export default router;
