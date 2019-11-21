<template>
	<v-app class="mx-5 my-5">
		<div class="d-flex">
			<div class="pb-5 pr-3">
				<nuxt-link class="nuxt--link" to="/hrm/employee/create">
					<v-btn class="teal darken-1" dark>
						<v-icon left>mdi-plus-circle</v-icon>
						Add Employee
					</v-btn>
				</nuxt-link>
			</div>
		</div>
		<div class="d-flex justify-space-between">
			<div>
				<v-text-field
					label="Search"
					solo 
					outlined
					dense
				></v-text-field>
			</div>
			<div>
				<v-btn class="red darken-1">PDF</v-btn>
				<v-btn class="lime lighten-1">CSV</v-btn>
				<v-btn class="blue lighten-1">Print</v-btn>
			</div>
		</div>
		<v-card>
			<v-data-table :headers="headers" :items="items" :items-per-page="itemsPerPage" :options.sync="options" :server-items-length="total">
				<template v-slot:item.action="{ item }">
					<v-tooltip bottom>
						<template v-slot:activator="{ on }">
							<!-- Edit Item -->
							<v-icon left fab color="primary" v-on="on">
								mdi-pencil
							</v-icon>
						</template>
						<span>Edit Supplier</span>
					</v-tooltip>
					<v-tooltip bottom>
						<template v-slot:activator="{ on }">

							<!-- Delete Item -->
							<v-icon left fab color="primary" v-on="on">
								mdi-delete
							</v-icon>
						</template>
						<span>Delete Supplier</span>
					</v-tooltip>
				</template>
			</v-data-table>
		</v-card>
	</v-app>
</template>


<script>
export default {

	created() {
		// this.fetchData()
	},

	data() {
		return {
			items: [],
			search: '',
			form: {},
			total: 0,
			options: {},
			itemsPerPage: 5,
			editedIndex: -1,
			created: true,
			dialog1: false,
			dialog2: false,
			headers: [{
					text: 'Name',
					sortable: false,
				}, {
					text: 'Email',
					sortable: false,
				}, {
					text: 'Phone Number',
					sortable: false,
				}, {
					text: 'Department',
					sortable: false,
				}, {
					text: 'Address',
					sortable: false,
				},{
					text: 'Action',
					sortable: false,
				},{
					text: 'Actions',
					sortable: false,
				},
			],
		}
	},
}

</script>

<style lang="scss">

.nuxt--link {
	text-decoration: none; 
}


</style>
