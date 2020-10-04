<template>
	<div class="paginator">
		<md-button
			:md-ripple="false"
			:disabled="currentPage == 1"
			@click="prevPage">
			«
		</md-button>
		<template v-for="button in pageCount">
			<md-button 
				:key="button"
				:md-ripple="false"
				:disabled="currentPage == button"
				@click="selectPage(button)">
				{{ button }}
			</md-button>
		</template>
		<md-button 
			:md-ripple="false"
			:disabled="currentPage == 4"
			@click="nextPage">
			»
		</md-button>
	</div>
</template>
<script>
export default {
	props: {
		count: Number
	},
	data() {
		return {
			currentPage: 1
		}
	},
	computed: {
		pageCount() {
			return Math.ceil(this.count / 10)
		}
	},
	methods: {
		selectPage(page) {
			this.currentPage = page
			this.$emit('selectPage', page)
		},
		prevPage() {
			if (this.currentPage > 1) {
				this.currentPage--
				this.$emit('prevPage')
			}
		},
		nextPage() {
			if (this.currentPage < this.pageCount) {
				this.currentPage++
				this.$emit('nextPage')
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.paginator {
	margin-top: 20px;
	max-width: 200px;
	margin: auto;
	user-select: none;
	display: flex;
	justify-content: center;

	.md-button {
		min-width: auto;
	}
}
</style>