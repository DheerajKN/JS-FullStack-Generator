import Home from './components/Home.svelte';
import Address from './components/Address.svelte';
export default [
  { 
    path: '/',
    component: Home,
  },
  {
    path: '/address',
    component: Address,
  }
]