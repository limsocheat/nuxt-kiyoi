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
				<v-dialog v-model="dialog" max-width="700px" v-permission="'add sales'">
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
							<v-btn color="blue darken-1" text @click="dialog=false">Close</v-btn>
							<v-btn color="primary">Save</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</div>

			<!-- Dialog2 -->
			<div class="pb-5 dialog2">
				<v-dialog v-model="dialog2" max-width="700px" v-permission="'add sales'">
					<template v-slot:activator="{ on }">
						<v-btn class="purple darken-1" dark v-on="on">
							<v-icon left>mdi-file</v-icon>
							Import Product
						</v-btn>
					</template>

					<!-- Form Modal -->
					<v-card>
						<v-card-title class="headline font-weight-light">
							Edit Product 
						</v-card-title>
						<v-divider></v-divider>
						<v-col cols="12">
							<p class="mt-5">The correct column order is (name*, parent_category) and you must follow this.</p>
						</v-col>
						<v-row class="px-4">
							<v-col cols="12" sm="6">
								<label class="font-weight-bold">Name</label>
								<v-text-field
									solo
									outlined
									dense
									label="Product Name"
									v-model="form.name"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6">
								<label class="font-weight-bold">Code</label>
								<v-text-field
									solo
									outlined
									dense
									label="Product Code"
									v-model="form.code"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6">
								<label class="font-weight-bold">Type</label>
								<v-text-field
									solo
									outlined
									dense
									label="Product Code"
									v-model="form.type"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6">
								<label class="font-weight-bold">Barcode</label>
								<v-select
									solo
									outlined
									dense
									:items="barcode"
									v-model="form.barcode"
								></v-select>
							</v-col>	
							<v-col cols="12" sm="6">
								<label class="font-weight-bold">Product Price</label>
								<v-text-field
									solo
									outlined
									dense
									label="Product Price"
									v-model="form.price"
								></v-text-field>
							</v-col>
							</v-col>
						</v-row>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" text @click="close">Close</v-btn>
							<v-btn color="primary" @click="updateItem">Save</v-btn>
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
		<v-data-table 
			:headers="headers" 
			:items="items" 
			:items-per-page="itemsPerPage"
			:options.sync="options"
			:server-items-length="total"
		>
			<template v-slot:item="{ item }">
				<tr>
					<td v-if="item.image">
						<img :src="'http://127.0.0.1:8000/image/' + item.image" class="product-img"/>
					</td>
					<td v-else>
						<span>No Image</span>
					</td>
					<td>{{ item.name }}</td>
					<td>{{ item.code }}</td>
					<td>{{ item.unit }}</td>
					<td>USD {{ item.price |formatNumber }}</td>
					<td>
						<v-tooltip top v-permission="'edit sales'">
							<template v-slot:activator="{ on }">
								<v-btn icon small @click="viewItem(item.id)" color="cyan" outlined v-on="on">
									<v-icon small>mdi-eye</v-icon>
								</v-btn>
							</template>
							<span>View</span>
						</v-tooltip>
						<v-tooltip top v-permission="'edit sales'">
							<template v-slot:activator="{ on }">
								<v-btn icon small @click="editItem(item)" color="primary" outlined v-on="on">
									<v-icon small>mdi-pencil</v-icon>
								</v-btn>
							</template>
							<span>Edit</span>
						</v-tooltip>
						<v-tooltip top v-permission="'delete sales'">
							<template v-slot:activator="{ on }">
								<v-btn icon small @click="deleteItem(item)" color="red" outlined v-on="on">
									<v-icon small>mdi-delete</v-icon>
								</v-btn>
							</template>
							<span>Delete</span>
						</v-tooltip>
					</td>
				</tr>
			</template>
		</v-data-table>
	</v-app>
</template>


<script>
import Vue from 'vue';
var numeral = require("numeral");

Vue.filter("formatNumber", function(value) {
	return numeral(value).format("0,0.00");
})

export default {
	name: 'Product',

	created() {
		this.fetchData()
	},

	watch: {
		options: {
			handler() {
				this.fetchData();
			}
		}
	},

	data() {
		return {
			barcode: [
				'Code 128', 'Code 39', 'UPC-A', 'UPC-E', 'EAN-8', 'EAN-13'
			],
			items: [],
			search: '',
			form: {},
			page: 1,
			total: 0,
			options: {},
			itemsPerPage: 5,
			editedIndex: -1,
			created: true,
			dialog: false,
			dialog2: false,
			headers: [
				{
					text: "Image",
					sortable: false,
				}, {
					text: "Name",
					value: "name",
				}, {
					text: "Code",
					sortable: false,
					value: "code",
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
			this.$axios.$get(`/api/product?temsPerPage=${this.options.itemsPerPage}&page=${this.options.page}`)
			.then(res => {
				vm.items = res.products.data;
				vm.total = res.total;
				console.log(res)
			})
			.catch(err => {
				console.log(err);
			})
		},

		viewItem(id) {
			this.$router.push(`/product/product-list/${id}`)
		},

		editItem (item) {
	        this.editedIndex = this.items.indexOf(item);
	        this.form = Object.assign({}, item);
	        this.dialog2 = true
      	},

      	updateItem() {
  			this.$axios.$patch(`api/product/` + this.form.id, {
  				name: this.form.name,
  				code: this.form.code,
  				type: this.form.type,
  				barcode: this.form.barcode,
  				unit: this.form.unit,
  				price: this.form.price,
  			})
  			.then(res => {
  				this.fetchData();
  				this.close();
  				this.$toast.info('Succeessfully Updated');
  			})
  			.catch(err => {
  				console.log(err.response);
  			})
      	},

      	close() {
      		this.dialog2 = false;
      		this.form = {};
      	},

      	deleteItem(item) {
      		this.$axios.$delete(`api/product/` + item.id)
      		.then(res => {
      			this.fetchData()
      		})
      		.catch(err => {
      			console.log(err.response);
      		})
      	},
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


.dialog2 {
	display: none;
}


.product-img {
	background-repeat: no-repeat;
	background-position: center;
	background-size: contain;
	border: 1px solid rgba(0,0,0,0.125);
	width: 50px;
	height: 50px;
	margin-top: 5px;
}

</style>
