<img src="assets/logo.png" alt=""/>
<RouterView />

<script>
	import './style.css';  //import all global styles here. It will be packet in bandle.
  import createRouter, {ROUTER_MODE} from '@spaceavocado/svelte-router';
	import RouterView from '@spaceavocado/svelte-router/component/view';
	import Config from './../../template.config.js';
  import routes from './routes.js';

  createRouter({
    routes,
    mode: ROUTER_MODE.HASH,
  });
</script>

<style></style>