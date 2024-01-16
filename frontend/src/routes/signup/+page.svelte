<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="container">
	<h1>Sign Up Form</h1>
	<form method="post" use:enhance>
		<div>
			<input type="text" name="username" placeholder="Username" value={form?.username ?? ''} />
			{#if form?.errors?.username}
				<span>{form?.errors?.username}</span>
			{/if}
		</div>
		<div>
			<input type="text" name="email" placeholder="Email" value={form?.email ?? ''} />
			{#if form?.errors?.email}
				<span>{form?.errors?.email}</span>
			{/if}
		</div>
		<div>
			<div>
				<input type="password" name="password" placeholder="Password" />
				{#if form?.errors?.password}
					<span>{form?.errors?.password}</span>
				{/if}
			</div>
			<div>
				<input type="password" name="confirmPassword" placeholder="Confirm Password" />
				{#if form?.errors?.confirmPassword}
					<span>{form?.errors?.confirmPassword}</span>
				{/if}
			</div>
			<div>
				<div>
					<button type="submit">Sign Up</button>
				</div>
			</div>
		</div>
	</form>

	{#if form?.errors}
		<span>{JSON.stringify(form?.errors)}</span>
	{/if}
</div>
