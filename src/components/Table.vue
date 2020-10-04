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
      </md-table-row>

      <md-table-row v-for="(item, i) in data" :key="`item_${item.id}`">
        <md-table-cell>{{ i++ }}</md-table-cell>
				<md-table-cell v-for="column in columns" :key="`cell_${item.id}_${column.id}`">
					{{ item[column.id] }}
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
			columns: []
		}
	}
}
</script>