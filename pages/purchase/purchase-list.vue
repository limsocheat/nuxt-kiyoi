<template>
	<v-app class="mx-5 my-5">
		<div class="d-flex">
			<div class="pb-5 pr-3">
				<nuxt-link class="nuxt--link" to="/purchase/add_purchase">
					<v-btn class="teal darken-1" dark>
						<v-icon left>mdi-plus-circle</v-icon>
						Add Category
					</v-btn>
				</nuxt-link>
				<nuxt-link class="nuxt--link" to="/purchase/import_purchase">
					<v-btn class="purple darken-1" dark>
						<v-icon left>mdi-file</v-icon>
						Import Category
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
					text: 'Team Member Image',
					sortable: false,
				}, {
					text: '	Full Name',
					sortable: false,
				}, {
					text: 'Designation',
					sortable: false,
				}, {
					text: 'FaceBook Profile Link',
					sortable: false,
				}, {
					text: 'Twiter Profile Link',
					sortable: false,
				},{
					text: 'Actions',
					sortable: false,
				},
			],
			selects: 
			[
				'Fruits', 'Electronics', 'Computer', 'Toy', 'Food', 'Accessories'			
			],
		}
	},

	methods: {
		uploadCsv(image) {
			const URL = 'http://127.0.0.1:3000/product/category'

			let data = new FormData();
		    data.append('name', 'my-csv');
		    data.append('file', event.target.files[0]); 

		    let config = {
		      header : {
		        'Content-Type' : 'csv'
		      }
		    }

		    this.$axios.$put(
		      URL, 
		      data,
		      config
		    ).then(
		      response => {
		        console.log('Csv upload response > ', response)
		      }
		    )
		}
	}
}

</script>

<style lang="scss">

.nuxt--link {
	text-decoration: none; 
}

.form-control {
	width: 100%;
	padding-bottom: 5px; 
	padding-top: 5px; 
	padding-right: 10px; 
	padding-left: 10px; 
	outline: none;
	border-radius: 5px;
	border: 1px solid #616161;
}

</style>