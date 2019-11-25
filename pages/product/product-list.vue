<template>
	<v-app class="mx-5 my-5">
		<div class="d-flex">
			<div class="pb-5 pr-3">
				<nuxt-link 
					to="/product/add-product" 
					class="nuxt--link grey--text text--lighten-4"
				>
					<v-btn class="teal darken-1" dark v-permission="'add sales'">
						<v-icon left>mdi-plus-circle</v-icon>
							Add Product
					</v-btn>
				</nuxt-link>
			</div>
			<div class="pb-5">
				<v-dialog v-model="dialog" max-width="700px">
					<template v-slot:activator="{ on }">
						<v-btn class="purple darken-1" dark v-on="on">
							<v-icon left>mdi-file</v-icon>
							Import Product
						</v-btn>
					</template>

					<!-- Form Modal -->
					<v-card>
						<v-card-title class="headline font-weight-light">
							IMPORT PRODUCT
						</v-card-title>
						<v-divider></v-divider>
						<v-col cols="12">
							<p class="mt-5">The correct column order is (name*, parent_category) and you must follow this.</p>
						</v-col>
						<v-row class="px-4">
							<v-col cols="12" sm="6">
								<label class="font-weight-bold">Upload CSV File</label>
								<input type="file" class="form-control" @change="uploadCsv($event)">
							</v-col>
							<v-col cols="12" sm="6" class="d-flex flex-column">
								<label class="font-weight-bold">Sample File</label>
								<v-btn class="teal darken-2 grey--text text--lighten-2">
									<v-icon left>mdi-download</v-icon>
									Download
								</v-btn>
							</v-col>
						</v-row>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" text>Close</v-btn>
							<v-btn color="primary">Save</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
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
		<v-data-table :headers="headers" :items="items" >
			<template v-slot:item.action="{ item }">
				<v-tooltip top v-permission="'edit sales'">
					<template v-slot:activator="{ on }">
						<v-btn icon @click="editItem(item)" color="primary" outlined v-on="on">
							<v-icon small>mdi-pencil</v-icon>
						</v-btn>
					</template>
					<span>Edit</span>
				</v-tooltip>
				<v-tooltip top v-permission="'delete sales'">
					<template v-slot:activator="{ on }">
						<v-btn icon @click="deleteItem(item)" color="red" outlined v-on="on">
							<v-icon small>mdi-delete</v-icon>
						</v-btn>
					</template>
					<span>Delete</span>
				</v-tooltip>
			</template>
		</v-data-table>
	</v-app>
</template>


<script>
export default {
	name: 'Product',

	created() {
		this.fetchData()
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
			dialog: false,
			headers: [{
					text: "ID",
					sortable: false,
					value: "id",
				},{
					text: "Image",
					sortable: false,
				}, {
					text: "Name",
					sortable: false,
					value: "name",
				}, {
					text: "Code",
					sortable: false,
					value: "code",
				}, {
					text: "Brand",
					sortable: false,
				}, {
					text: "Category",
					sortable: false,
					value: "category",
				},{
					text: "Quantity",
					sortable: false,
				},{
					text: "Unit",
					sortable: false,
					value: "unit",
				},{
					text: "Price",
					sortable: false,
					value: "price",
				},{
					text: "Actions",
					sortable: false,
					value: "action",
				},
			],
		}
	},

	methods: {
		fetchData() {
			let vm = this;
			this.$axios.$get(`/api/product`)
			.then(res => {
				vm.items = res;
				console.log(res)
			})
			.catch(err => {
				console.log(err);
			})
		},

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
.menu-list {
	background-color: #34495e;
	color: #fff;
}

.nuxt--link {
	display: block;
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
