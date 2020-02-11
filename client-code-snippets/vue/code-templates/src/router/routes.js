import Hello from "../components/Hello";
import Location from "../components/Location";

export default [
  {
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
  }
];
