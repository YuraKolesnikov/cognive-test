<template>
	<div class="container">
		<md-card class="md-layout-item filter">
			<h1 class="md-title">Filter vehicles</h1>
			<div class="filter__main">
				<div>
					<md-radio v-model="filter" value="name" @change="$emit('change', $event)">Name</md-radio>
					<md-radio v-model="filter" value="model" @change="$emit('change', $event)">Model</md-radio>
					<md-radio v-model="filter" value="manufacturer" @change="$emit('change', $event)">Manufacturer</md-radio>
				</div>
				<md-field>
					<md-input :value="value" placeholder="Enter value" v-debounce="handleInput"></md-input>
				</md-field>
			</div>
		</md-card>
	</div>
</template>

<script>
export default {
	props: {
		value: String
	},
	data() {
		return {
			filter: 'name'
		}
	},
	methods: {
		handleInput(e) {
			this.$emit('input', e)
		}
	}
}
</script>

<style lang="scss">
.filter {
	padding: 24px;
	background-color: #FFF;
	margin: 15px 0;

	&__main {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.md-field {
			flex: 0 0 50%;
		}
	}
}
</style>