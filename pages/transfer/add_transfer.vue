<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<div class="blue ligthen-2">
				<v-card-title class="white--text px-5">
					Add Transfer
				</v-card-title>
			</div>
			<v-divider></v-divider>
			<div class="px-5">
				<p class="caption font-italic pt-5">The field labels marked with * are required input fields.</p>
				<v-row>
					<v-col md="4" cols="12">
						<label >Location(From)*</label>
						<validation-provider rules="required" v-slot="{ errors }">
							<v-autocomplete 
								:items="locations"
								solo
								outlined
								dense
								item-text="name"
								item-value="name"
								v-model="form.from_location"
							>
							</v-autocomplete>
							<span class="transfer--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col md="4" cols="12">
						<label >Location(To)*</label>
						<validation-provider rules="required" v-slot="{ errors }">
							<v-autocomplete 
								:items="locations"
								solo
								outlined
								dense
								item-text="name"
								item-value="name"
								v-model="form.to_location"
							>
							</v-autocomplete>
							<span class="transfer--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col md="4" cols="12">
						<label >Status</label>
						<validation-provider rules="required" v-slot="{ errors }">
							<v-select 
								dense
								outlined
								solo
								:items="status"
								v-model="form.status"
							>
							</v-select>
							<span class="transfer--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col cols="12">
						<label >Select Product</label>
						<validation-provider rules="required" v-slot="{ errors }">
							<v-autocomplete 
								:items="products"
							    dense
							    solo
							    v-model="form.name"
							    item-text="name"
							    item-value="name"
							    return-object
							    @input="addTocart"
							></v-autocomplete>
							<span class="transfer--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
				</v-row>
				<div>
					<table class="tablePurchase">
						<thead>
							<tr  class="tablePurchase--header">
								<td>Name</td>
								<td>Code</td>
								<td>Quantity</td>
								<td>Unit Price</td>
								<td>Total</td>
								<td>Actions</td>
							</tr>
						</thead>
						<tbody>
							<tr class="transfer--add" v-for="(item, index) in orders">
								<td>{{item.name}}</td>
								<td>{{item.code}}</td>
								<td>
									<input type="number" class="table-qty" v-model="item.unit">
								</td>
								<td>USD {{ item.price | formatNumber }}</td>
								<td>USD {{ item.unit * item.price | formatNumber }}</td>
								<td>
	                              	<v-btn icon color="red" outlined @click="removeItem(index)">
	                              		<v-icon small>mdi-delete</v-icon>
	                              	</v-btn>
	                           </td>
							</tr>
							<tr>
								<td class="py-3">Total</td>
							</tr>
						</tbody>
					</table>
				</div>
				</div>
				<v-row class="px-5">
					<v-col md="4" cols="12">
						<label for="" >Shipping Cost</label>
						<validation-provider rules="required" v-slot="{ errors }">
							<input type="text" class="transfer--input" v-model="form.shipping_charge">
							<span class="transfer--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col md="4" cols="12" class="d-flex flex-column">
						<label for="" class="pt-1">Attach Document</label>
						<input type="file" @change="uploadFile($event)" class="quotationCsv">
					</v-col>
				</v-row>
				<div class="d-flex px-5 flex-column mb-5">
					<label for="">Note</label>
					<textarea cols="30" rows="7" class="textarea" v-model="form.description"></textarea>
				</div>
			</div>
			<v-btn  @click="createTransfer" class="blue mx-5 mb-5 darken-2" dark v-permission="'add transfer'">
				<v-icon>mdi-check</v-icon>
				Submit
			</v-btn>
		</v-card>
	</v-app>
</template>

<script>
	import Vue from 'vue';
	var numeral = require("numeral");
	Vue.filter("formatNumber", function(value) {
		return numeral(value).format("0,0.00");
	});

	export default {
		name: "AddTransfer",
		created() {
			this.fetchData()
			this.fetchProduct()
			this.fetchLocation()
		},

		data() {
			return {
				orders: [],
				locations: [],
				form: {},
				items: [],
				products: [],
				headers: [
					{
						text: 'Name',
						sortable: false,
					},
					{
						text: 'Code',
						sortable: false,
					},
					{
						text: 'Quantity',
						sortable: false,
					},
					{
						text: 'Net Unit Cost',
						sortable: false,
					},,
					{
						text: 'Tax',
						sortable: false,
					},
					{
						text: 'SubTotal',
						sortable: false,
					},
					{
						text: 'Action',
						sortable: false,
					},
				],
				status: ['Completed', 'Pending', 'Sent'],
			}
		},

		methods: {
			fetchLocation() {
				this.$axios.$get(`api/location`)
				.then(res => {
					this.locations = res.locations.data;
					console.log(res);
				})
				.catch(err => {
					console.log(err)
				})
			},

			fetchProduct() {
				this.$axios.$get(`api/product`)
				.then(res => {
					this.products = res.products.data;
					console.log(res);
				})
				.catch(err =>  {
					console.log(err.response);
				})
			},

			fetchData() {
				this.$axios.$get(`api/transfer`)
				.then(res => {
					this.items = res.transfer.data;
					console.log(res.transfer);
				}).catch(err => {
					console.log(err.response);
				})
			},

			createTransfer() {
				this.$axios.post(`api/transfer`, this.form)
				.then(res => {
					this.items = res.data;
					this.$router.push(`/transfer/transfers`)
					console.log(res);
				})
				.catch(err => {
					console.log(err.response)
				})
			},

			addTocart(item) {
				if(this.orders.includes(item)) {
		          	alert("already there");
		        }else {
		          	this.orders.push(item);
		        }

		        item.unit = 1;
			},

			removeItem(index) {
				this.orders.splice(index, 1)
			},

			uploadFile(event) {
				const url = 'http://127.0.0.1:3000/product/add_adjustment';
				let data = new FormData();
				data.append('file', event.target.files[0]);
				let config = {
					header: {
						'content-Type' : 'image/*, application/pdf'
					}
				}

				this.$axios.$post(url,data,config)
				.then(res => {
					console.log(res);
				})
			}
		}
	}
</script>

<style lang="scss">

	.textarea {
		border: 1px solid rgba(0,0,0,0.125);
		outline: 1px solid #60e688;
	}
	
	.quotationCsv {
		border: 1px solid rgba(0,0,0,0.300);
		padding: 3px 0px 3px 10px;
		border: 1px solid #60e688;
	}

	.transfer--input {
		border: 1px solid #60e688;
		width: 100%;
		padding: 5px 10px 5px 10px;
		outline: none;
		border-radius: 3px;
	}

	.transfer--text {
		color: red;
	}

	.tablePurchase {
		width: 100%;
		margin-top: 10px;
		border-collapse: collapse;
		&--header {
			font-weight: 500;
			text-align: left;
			border-bottom: 1px solid rgba(0,0,0,0.125);
		}
		
		&--td {
			border-bottom: 1px solid rgba(0,0,0,0.125);
		}
	}

	.table-qty {
		border: 1px solid rgba(0,0,0,0.125);
		padding: 0 0 0 10px;
	}

	.transfer--add {
		width: 100%;
	}
	
	>>> .v-select .dropdown-toggle .clear {
	    display: none;
	}

</style>	