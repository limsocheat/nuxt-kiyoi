<template>
	<v-app class="mx-5 my-5">
		<div class="d-flex">
			<div class="pb-5 d-flex">
				<nuxt-link class="nuxt--link" to="/purchase/add_purchase">
					<v-btn class="teal darken-1" dark v-permission="'add sales'">
						<v-icon left>mdi-plus-circle</v-icon>
						Add Purchase
					</v-btn>
				</nuxt-link>
				<nuxt-link class="nuxt--link px-3" to="/purchase/import_purchase">
					<v-btn class="purple darken-1" dark v-permission="'add sales'">
						<v-icon left>mdi-file</v-icon>
						Import Purchase
					</v-btn>
				</nuxt-link>
			</div>
		</div>
		<div class="pb-5 dialog2">
			<v-dialog v-model="dialog2" max-width="700px" v-permission="'add sales'">
				<!-- Form Modal -->
				<v-card>
					<v-card-title class="headline font-weight-light">
						Edit Purchase 
					</v-card-title>
					<v-divider></v-divider>
					<v-col cols="12">
						<p class="mt-5">The correct column order is (name*, parent_category) and you must follow this.</p>
					</v-col>
					<v-row class="px-4">
						<v-col cols="12" sm="6">
							<label class="font-weight-bold">Date</label>
							<v-menu
					          v-model="menu1"
					          :close-on-content-click="false"
					          max-width="290"
					        >
					          <template v-slot:activator="{ on }">
					            <v-text-field
					              :value="computedDateFormattedMomentjs"
					              clearable
					              readonly
					              dense
					              outlined
					              solo
					              v-model="form.date"
					              v-on="on"
					              @click:clear="date = null"
					            ></v-text-field>
					          </template>
					          <v-date-picker
					            v-model="form.date"
					            @change="menu1 = false"
					          ></v-date-picker>
					        </v-menu>
						</v-col>
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
							<label class="font-weight-bold">Supplier</label>
							<v-text-field
								solo
								outlined
								dense
								label="Supplier"
								v-model="form.supplier"
							></v-text-field>
						</v-col>
						<v-col cols="12" sm="6">
							<label class="font-weight-bold">Total</label>
							<v-text-field
								solo
								outlined
								dense
								label="Total"
								v-model="form.total"
							></v-text-field>
						</v-col>
						<v-col cols="12" sm="6">
							<label class="font-weight-bold">Paid</label>
							<v-text-field
								solo
								outlined
								dense
								v-model="form.paid"
							></v-text-field>
						</v-col>	
						<v-col cols="12" sm="6">
							<label class="font-weight-bold">Purchase Status</label>
							<v-text-field
								solo
								outlined
								dense
								label="Purchase Status"
								v-model="form.purchase_status"
							></v-text-field>
						</v-col>
						<v-col cols="12" sm="6">
							<label class="font-weight-bold">Payment Status</label>
							<v-text-field
								solo
								outlined
								dense
								label="Purchase Status"
								v-model="form.payment_status"
							></v-text-field>
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
				<v-btn class="red darken-1">
					<a href="/purchase/export">PDF</a>
				</v-btn>
				<v-btn class="lime lighten-1">CSV</v-btn>
				<v-btn class="blue lighten-1">Print</v-btn>
			</div>
		</div>
		<v-card>
			<v-data-table 
				:headers="headers" :items="items" 
				:items-per-page="itemsPerPage" 
				:options.sync="options" :server-items-length="total"
			>
				<template v-slot:item="{ item }">
					<tr  class="viewPurchase">
						<td @click="viewPurchase(item.id)">{{ item.created_at }}</td>
						<td @click="viewPurchase(item.id)">{{ item.reference_no }}</td>
						<td v-if="item.products.supplier" @click="viewPurchase(item.id)">{{ item.products.supplier.name }}</td>
						<td v-else>N/A</td>
						<td @click="viewPurchase(item.id)">USD {{ item.paid  | formatNumber }}</td>
						<td>
							<span :class="item.purchase_status === 'Received' ? 'received' : 'ordered'">
								{{ item.purchase_status }}
							</span>
						</td>
						<td>
							<span :class="item.payment_status === 'Paid' ? 'Paid' : 'due'">
								{{ item.payment_status }}
							</span>
						</td>
						<td>
							<v-tooltip top v-permission="'edit sales'">
								<template v-slot:activator="{ on }">
									<v-btn small icon @click="viewPurchase(item.id)" color="teal" outlined v-on="on">
										<v-icon small>mdi-eye</v-icon>
									</v-btn>
								</template>
								<span>View Purchase</span>
							</v-tooltip>
							<v-tooltip top v-permission="'edit sales'">
								<template v-slot:activator="{ on }">
									<v-btn small icon @click="editItem(item)" color="primary" outlined v-on="on">
										<v-icon small>mdi-pencil</v-icon>
									</v-btn>
								</template>
								<span>Edit</span>
							</v-tooltip>
							<v-tooltip top v-permission="'delete sales'">
								<template v-slot:activator="{ on }">
									<v-btn small icon @click="deleteItem(item)" color="red" outlined v-on="on">
										<v-icon small>mdi-delete</v-icon>
									</v-btn>
								</template>
								<span>Delete</span>
							</v-tooltip>
						</td>
					</tr>
				</template>
			</v-data-table>
		</v-card>
	</v-app>
</template>


<script>
import moment from 'moment'
import Vue from 'vue';

var numeral = require('numeral');

Vue.filter('formatNumber', function(value) {
	return numeral(value).format("0,0.00");
});

export default {

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
			date: new Date().toISOString().substr(0, 10),
			menu1: false,
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
			headers: [
				{
					text: 'Date',
					sortable: false,
					value: 'date',
				},
				{
					text: 'Reference No',
					sortable: false,
					value: 'date',
				}, {
					text: 'Supplier',
					sortable: false,
					value: 'supplier',
				}, {
					text: 'Paid',
					sortable: false,
					value: 'paid',
				}, {
					text: 'Purchase Status',
					sortable: false,
					value: 'purchase_status',
				},{
					text: 'Payment Status',
					sortable: false,
					value: 'payment_status',
				},{
					text: 'Actions',
					sortable: false,
					value: 'action',
				},
			],
		}
	},

	methods: {
		fetchData() {
			this.$axios.$get(`api/purchase?temsPerPage=${this.options.itemsPerPage}&page=${this.options.page}`)
			.then(res => {
				this.items = res.data;
				this.total = res.total;
				console.log(res);
			})
			.catch(err => {
				console.log(err.response);
			})
		},

		editItem (item) {
	        this.editedIndex = this.items.indexOf(item);
	        this.form = Object.assign({}, item);
	        this.dialog2 = true
      	},

      	updateItem() {
  			this.$axios.$patch(`api/purchase/` + this.form.id, {
  				date: this.form.date,
  				name: this.form.name,
  				supplier: this.form.supplier,
  				total: this.form.total,
  				paid: this.form.paid,
  				purchase_status: this.form.purchase_status,
  				payment_status: this.form.payment_status,
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
      		if(confirm('Are u sure to Delete it?')) {
      			this.$axios.$delete(`api/purchase/` + item.id)
      			.then(res => {
      				this.items = res.data;
      				this.fetchData();
      				console.log(res);
      			})
      			.catch(err => {
      				console.log(err.response);
      			})
      		}
      	},

      	viewPurchase(id) {
      		this.$router.push(`/purchase/${id}`);
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

.received {
	background: blue;
	padding: 7px 7px 7px 7px;
	color: #ffffff;
	border-radius: 3px;
}

.due {
	background: #d4e157;
	padding: 7px 7px 7px 7px;
	border-radius: 3px;
}

.Paid {
	background: #3c8dbc;
	padding: 7px 7px 7px 7px;
	color: #fff;
	border-radius: 3px;
}

.ordered {
	background: #00c0ef;
	padding: 10px 10px 10px 10px;
}

.viewPurchase {
	cursor: pointer;
}

</style>
