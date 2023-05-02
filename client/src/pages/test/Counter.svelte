<script lang="ts">
import Child from './Child.svelte';
let count: number = 0;
let data = {id:1, name:'name1'};
//
function add() {
	count += 1;
}
//
function subtract() {
	count -= 1;
}
</script>

<div class="">
	<h3>counter</h3><br />
	<hr />
	<button on:click={subtract}>-</button>
	<pre>{count}</pre>
	<button on:click={add}>+</button>
	<hr />
	<Child client:visible name={22} data={data} >
		<p>Hello, Svelte!</p>
	</Child>			
</div>

<style>
</style>