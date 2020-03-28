{#if username}
  <h1>Hello there, I'm {username.username}</h1>
{:else}
  <h1>Loading.. please wait!</h1>
{/if}
<RouterLink to='/address'>See More Addresses</RouterLink>

<script>
    import { onMount } from "svelte";
    import {fetchAPI} from '../api/fetchAPI';
    import RouterLink from '@spaceavocado/svelte-router/component/link';

    let username = "KND";
    onMount(async () => {
      const res = await fetchAPI('/getUsername');
      username = await res.json();
	  });
</script>