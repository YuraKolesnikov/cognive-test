<template>
<div class="container">
  <div class="md-layout-item">
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">{{ tableTitle }}</h1>
      </md-table-toolbar>
      <md-table-row>
        <md-table-head v-for="column in columns" :key="`column_${column.id}`">
					<div class="inner" @click="$emit('updateSorting', column.id)">
						{{ column.title }}
						<template v-if="sortingOptions.id && sortingOptions.id == column.id">
							<md-icon :class="{'active': sortingOptions.ascending}">arrow_downward</md-icon>
						</template>
					</div>
				</md-table-head>
				<md-table-head>Read more</md-table-head>
      </md-table-row>

      <md-table-row v-for="(item, i) in data" :key="`item_${i}`">
				<md-table-cell v-for="column in columns" :key="`cell_${column.id}`">
					{{ item[column.id] }}
				</md-table-cell>
				<md-table-cell>
					<a :href="item.url">Open link</a>
				</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</div>
</template>

<script>
export default {
	props: {
		sortingOptions: Object,
		tableTitle: String,
		data: Array
	},
	data() {
		return {
			columns: [
				{ id: 'name', title: 'Name', type: 'string' },
				{ id: 'model', title: 'Model', type: 'string' },
				{ id: 'manufacturer', title: 'Manufacturer', type: 'string' },
				{ id: 'length', title: 'Length', type: 'number' },
				{ id: 'max_atmosphering_speed', title: 'Max.speed', type: 'number' },
				{ id: 'crew', title: 'Crew', type: 'number' }
			]
		}
	}
}
</script>
<style lang="scss">
.md-table-head {
	cursor: pointer;

	.inner {
		width: 100%;
	}
}
.md-table-head-label {
	padding-right: 0 !important;
	width: 100%;
	.md-icon {
		font-size: 16px !important;
		transition: transform .35s ease-in-out;
		&.active {
			transform: rotate(180deg)
		}
	}
}
</style>