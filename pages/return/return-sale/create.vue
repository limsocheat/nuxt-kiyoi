<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<div class="py-3 px-5"> 
				<h3>Add Return Sale</h3>
			</div>
			<v-divider></v-divider>
			<div class="px-5">
				<p class="caption font-italic pt-5">The field labels marked with * are required input fields.</p>
				<v-row>
					<v-col md="4" cols="12">
						<label class="font-weight-bold" for="address">location *</label>
						<v-autocomplete 
							item-value="address" 
							item-text="address"  
							dense 
							solo 
							outlined 
							:items="locations"
							return-object
							v-model="form.location"
							label="Please type, product code and select..."
						></v-autocomplete >
					</v-col>
					<v-col md="4" cols="12">
						<label class="font-weight-bold" for="name">Supplier </label>
						<v-autocomplete 
							item-value="name" 
							item-text="name"  
							dense 
							solo 
							outlined 
							return-object
							:items="suppliers"
							label="Please type, product code and select..."
							v-model="form.supplier"
						></v-autocomplete >
					</v-col>
					<v-col md="4" cols="12">
						<label class="font-weight-bold" for="name">Account</label>
						<v-autocomplete 
							item-value="name" 
							item-text="name"
							solo 
							outlined 
							dense 
							return-object
							label="Select Account ..." 
							:items="accounts"
							v-model="form.account"
						></v-autocomplete>
						
					</v-col>
					<v-col cols="12">
						<label class="font-weight-bold">Select Product</label>
						<div>
							<v-autocomplete
								:items="products"
								label="Please type, select product..."
								dense
								solo
								return-object
								item-text="name"
								item-value="name"
								@input="addTocart"
							></v-autocomplete>
						</div>
					</v-col>
				</v-row>
				<div>
					<label class="font-weight-bold mb-3">Order Table</label>
					<table class="tableReturn">
						<thead>
							<tr class="tableReturn--header">
								<td>Name</td>
								<td>Code</td>
								<td>Quantity</td>
								<td>Unit Price</td>
								<td>Discount</td>
								<td>SubTotal</td>
								<td>Actions</td>
							</tr>
						</thead>
						<tbody>
							<tr class="tableReturn--td" v-for="(item, index) in form.items" :key="index">
								<td>{{item.name}}</td>
								<td>{{item.code}}</td>
								<td>
									<validation-provider rules="required" v-slot="{ errors }">
										<input
											type="number"
											class="table-order"
											name="form.items[index].quantity"
											v-model="form.items[index].quantity"
										/>
										<span>{{ errors[0] }}</span>
									</validation-provider>
								</td>
								<td>
									<input
										type="number"
										class="table-order"
										name="form.items[index].unit_price"
										v-model="form.items[index].unit_price"
										placeholder="0.00"
									/>
								</td>
								<td>
									<input
										type="number"
										class="table-order"
										name="form.items[index].discount"
										v-model="form.items[index].discount"
										placeholder="0.00"
									/>
								</td>
								<td>USD {{ discountedPrice(item) | formatMoney }}</td>
								<td>
									<v-btn small color="red" outlined @click="removeItem(index)">
										<v-icon>mdi-delete</v-icon>
									</v-btn>
								</td>
							</tr>
							<tr>
								<td class="py-5" colspan="3" >Total</td>
								<td colspan="3">{{ calculateQty }}</td>
								<td>USD {{ calculateTotal | formatMoney }}</td>
								<td></td>
							</tr>
						</tbody>
					</table>
				</div>
				<v-row>
					<v-col md="12" cols="12" class="d-flex flex-column mb-5">
						<label for="" class="font-weight-bold pt-1">Attach Document</label>
						<input type="file" @change="uploadFile($event)" class="attachDoc">
					</v-col>
					<v-col md="6" cols="12">
						<div class="d-flex flex-column mb-5">
							<label for class="font-weight-bold">Return Note</label>
							<textarea cols="30" rows="7" class="textarea"></textarea>
						</div>
					</v-col>
					<v-col md="6" cols="12">
						<div class="d-flex flex-column mb-5">
							<label for class="font-weight-bold">Staff Note</label>
							<textarea cols="30" rows="7" class="textarea"></textarea>
						</div>
					</v-col>
				</v-row>
			</div>
			<v-btn 
				@click.prevent="createReturnSale"
				class="blue mx-5 darken-2 mb-5 grey--text text--lighten-4"
				>
				<v-icon>mdi-check</v-icon>Submit
			</v-btn>
		</v-card>
	</v-app>
</template>

<script>
	import Vue from "vue";

	var numeral = require("numeral");

	Vue.filter("formatMoney", function(value) {
		return numeral(value).format("0,0.00");
	});

	export default {
		name: "CreateReturnSale",
		
		created(){
			this.fetchLocation(),
			this.fetchSupplier(),
			this.fetchAccount(),
			this.fetchProduct()
			// this.fetchReturnSale()
		},

		data() {
			return {

				form: {
					items: []
				},
				return_sale: [],
				locations:[],
				suppliers:[],
				accounts:[],
				products:[],
				itemsPerPage: 5,
			};
		},

		computed: {
			calculateQty() {
				return this.form.items.reduce((total, item) => {
					return total + item.quantity;
				}, 0);
			},

			calculateTotal() {
				return this.form.items.reduce((total, item) => {
					let subtotal =
						(item.unit_price -
							(item.unit_price * item.discount) / 100) *
						item.quantity;
					return total + subtotal;
				}, 0);
			}
		},

		methods: {
			discountedPrice(product) {
				return (
					(product.unit_price -
						(product.unit_price * product.discount) / 100) *
					product.quantity
				);
			},

			fetchLocation(){
				this.$axios.$get(`api/location`)
				.then(res =>{
					this.locations = res.locations.data;
					console.log(res)
				})
				.catch(err => {
					consle.log(err.response);
				});
			},

			fetchSupplier(){
				this.$axios.$get(`api/supplier`)
				.then(res =>{
					this.suppliers = res.suppliers.data;
					console.log(res)
				})
				.catch(err => {
					console.log(err.response);
				});
			},

			fetchAccount(){
				this.$axios.$get(`api/account`)
				.then(res =>{
					this.accounts = res.account;
					console.log(res)
				})
				.catch(err => {
					console.log(err.response);
				});
			},

			fetchProduct(){
				this.$axios.$get(`api/product`)
				.then(res =>{
					this.products = res.products.data;
					console.log(res)
				})
				.catch(err =>{
					console.log(err.response);
				})
			},
			
			createReturnSale() {
		    	this.$axios.$post(`api/return-sale`, this.form)
				.then(res => {
					// this.return_sale = res.data;
					this.$set(this.$data, "return_sales" , res.data);
					this.$router.push(`/return/return-sale`)
					console.log(res);
				})
				.catch(err => {
					console.log(err.response);
					this.$toast.error("Pleases fill required field");
				});
			},
			
			addTocart(item) {
				if (this.form.items.includes(item)) {
					alert("already there");
				} else {
					this.form.items.push(item);
					console.log(item);
				}

				item.quantity = 1;
				item.discount = 0;
			},

			removeItem(index) {
				this.form.items.splice(index, 1);
			},

			// uploadFile(event) {
			// 	const url = "http://127.0.0.1:3000/product/add_adjustment";
			// 	let data = new FormData();
			// 	data.append("file", event.target.files[0]);
			// 	let config = {
			// 		header: {
			// 			"content-Type": "image/*, application/pdf"
			// 		}
			// 	};

			// 	this.$axios.$post(url, data, config).then(res => {
			// 		console.log(res);
			// 	});
			// }
		}
	};
</script>

<style lang="scss">
	.textarea {
		border: 1px solid rgba(0, 0, 0, 0.125);
		outline: 1px solid #461577;
	}

	.attachDoc {
		padding: 3px 10px 3px 10px;
		border: 1px solid rgba(0, 0, 0, 0.2);
	}

	.tableReturn {
		width: 100%;
		margin-top: 10px;
		border-collapse: collapse;
		&--header {
			font-weight: 500;
			text-align: left;
			border-bottom: 1px solid rgba(0, 0, 0, 0.125);
		}

		&--td {
			border-bottom: 1px solid rgba(0, 0, 0, 0.125);
		}
	}
	.table-order {
		border: 1px solid rgba(0, 0, 0, 0.125);
		padding: 5px 10px 5px 10px;
		margin-top: 5px;
		margin-bottom: 5px;
	}
</style>