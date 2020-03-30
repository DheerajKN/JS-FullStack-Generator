{#if addresses}
  {#each addresses as address }
    <h1>{address.address}</h1>
  {/each}
{:else}
  <p class="loading">loading...</p>
{/if}

<script>
    import { onMount } from "svelte";
    import {fetchAPI} from '../api/fetchAPI';

    let addresses;
    onMount(async () => {
      await fetchAPI('/addresses')
          .then(r => r.json())
          .then(data => {
              addresses = data;
          });
      })
</script>