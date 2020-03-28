<img src="assets/logo.png" alt=""/>
<RouterView />

<script>
	import './style.css';  //import all global styles here. It will be packet in bandle.
  import createRouter, {ROUTER_MODE} from '@spaceavocado/svelte-router';
	import RouterView from '@spaceavocado/svelte-router/component/view';
	import Home from './components/Home.svelte'
	import Address from './components/Address.svelte'
	import Config from './../../template.config.js';

  createRouter({
  routes: [
    { 
      path: '/',
      component: Home,
    },
    {
      path: '/address',
      component: Address,
    },
  ],
  mode: ROUTER_MODE.HASH,
});
</script>

<style></style>