<!-- Chilt Sample -->
<script lang="ts">
export let name, data;
console.log("name=", name);
console.log(data);

</script>
	
<!-- MarkUp -->
<h3>Child.svelte</h3>
<hr />
<p>name= {name}</p>
<p>id= {data.id}</p>
<p>name= {data.name}</p>
<div class="message">
	<slot />
</div>
<hr />
	