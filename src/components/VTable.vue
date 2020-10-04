<template>
<div class="container">
  <div class="md-layout-item">
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">{{ tableTitle }}</h1>
      </md-table-toolbar>
      <md-table-row>
        <md-table-head>#</md-table-head>
        <md-table-head v-for="column in columns" :key="`column_${column.id}`">
					{{ column.title }}
				</md-table-head>
				<md-table-head>Read more</md-table-head>
      </md-table-row>

      <md-table-row v-for="(item, i) in data" :key="`item_${i}`">
        <md-table-cell>{{ i + 1 }}</md-table-cell>
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
		tableTitle: String,
		data: Array
	},
	data() {
		return {
			columns: [
				{ id: 'name', title: 'Name' },
				{ id: 'model', title: 'Model' },
				{ id: 'manufacturer', title: 'Manufacturer' },
				{ id: 'cost_in_credits', title: 'Cost' },
				{ id: 'length', title: 'Length' },
				{ id: 'max_atmosphering_speed', title: 'Max.speed' },
				{ id: 'crew', title: 'Crew' }
			]
		}
	}
}
</script>