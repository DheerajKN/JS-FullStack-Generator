import Vue from "vue";
import Router from "vue-router";
import Hello from "../components/Hello";
import Location from "../components/Location";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Hello",
      component: Hello
    },
    {
      path: "/locations",
      name: "Location",
      component: Location
    }
  ]
});
