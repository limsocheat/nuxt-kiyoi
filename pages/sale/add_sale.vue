<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<div class="indigo lighten-1 white--text">
				<v-card-title>Add Sale</v-card-title>
			</div>
			<v-divider></v-divider>
			<div class="px-5">
				<p class="caption font-italic pt-5">The field labels marked with * are required input fields.</p>
				<ValidationObserver ref="form">
					<v-row>
						<v-col md="4" cols="12">
							<label class="font-weight-bold">Customer*</label>
							<validation-provider rules="required" name="Customer" v-slot="{ errors }">
								<v-autocomplete
									solo
									outlined
									dense
									label="Select Customer"
									:items="members"
									item-value="name"
									item-text="name"
									return-object
									v-model="form.member"
								></v-autocomplete>
								<span class="red--text">{{ errors[0] }}</span>
							</validation-provider>
						</v-col>
						<v-col md="4" cols="12">
							<label class="font-weight-bold">Warehouse*</label>
							<validation-provider rules="required" name="Location" v-slot="{ errors }">
								<v-autocomplete
									solo
									outlined
									dense
									label="Select Warehouse"
									:items="locations"
									item-value="name"
									item-text="name"
									return-object
									v-model="form.location"
								></v-autocomplete>
								<span class="red--text">{{errors[0]}}</span>
							</validation-provider>
						</v-col>
						<!-- <v-col md="4" cols="12">
							<label class="font-weight-bold">Payment Status*</label>
							<validation-provider rules="required" name="Payment Status" v-slot="{ errors }">
								<v-select
									solo
									outlined
									dense
									:items="payment_status"
									label="Please Select"
									v-model="form.payment_status"
								></v-select>
								<span class="red--text">{{ errors[0] }}</span>
							</validation-provider>
						</v-col>-->
						<v-col md="4" cols="12">
							<label class="font-weight-bold">Payment Method*</label>
							<validation-provider rules="required" name="Payment Method" v-slot="{errors}">
								<v-select
									solo
									outlined
									dense
									:items="payment_method"
									label="Please Select"
									v-model="form.payment_method"
								></v-select>
								<span class="red--text">{{ errors[0] }}</span>
							</validation-provider>
						</v-col>
						<v-col md="4" sm="6" cols="12">
							<label for class="font-weight-bold">Shipping Cost</label>
							<v-text-field
								solo
								outlined
								dense
								type="number"
								placeholder="0.0"
								v-model="form.shipping_cost"
							></v-text-field>
						</v-col>
						<v-col md="4" sm="6" cols="12">
							<label for class="font-weight-bold">Paid</label>
							<validation-provider name="Paid" rules="required" v-slot="{ errors }">
								<v-text-field
									solo
									outlined
									dense
									type="number"
									placeholder="0.0"
									v-model="form.paid"
									class="ma-0 pa-0"
								></v-text-field>
								<span class="red--text">{{ errors[0] }}</span>
							</validation-provider>
						</v-col>
						<v-col md="12" cols="12">
							<label class="font-weight-bold">Select Product</label>
							<v-autocomplete
								solo
								outlined
								dense
								append-icon="mdi-barcode"
								:items="products"
								item-value="name"
								item-text="name"
								return-object
								@input="addTocart"
							></v-autocomplete>
						</v-col>
					</v-row>
				</ValidationObserver>
				<div>
					<table class="saleTable">
						<thead>
							<tr>
								<th class="saleTable--th">Name</th>
								<th class="saleTable--th">Code</th>
								<th class="saleTable--th">Quantity</th>
								<th class="saleTable--th">Product Price</th>
								<th class="saleTable--th">Discount</th>
								<th class="saleTable--th">Total</th>
								<th class="saleTable--th">Action</th>
							</tr>
						</thead>
						<tbody>
							<tr class="saleTable--td" v-for="(item, index) in form.items" :key="index">
								<td>{{item.name}}</td>
								<td>{{item.code}}</td>
								<td>
									<input type="number" class="saleTable--input" v-model.number="form.items[index].quantity" />
								</td>
								<td>
									<input
										type="number"
										class="saleTable--input"
										v-model.number="form.items[index].unit_price"
										placeholder="0.00"
									/>
								</td>
								<td>
									<input
										type="number"
										class="saleTable--input"
										name="form.items[index].discount"
										v-model.number="form.items[index].discount"
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
							<tr class="saleTable--total">
								<th colspan="2">Total</th>
								<td colspan="3">{{ calculateTotal }}</td>
								<td>USD {{ GrandTotal | formatMoney }}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="d-flex flex-column pt-5">
					<label for="note">Note</label>
					<textarea cols="30" rows="6" class="sale--textarea" v-model="form.description"></textarea>
				</div>
			</div>
			<v-btn class="blue mx-5 lighten-2 my-5" v-permission="'add sales'" @click="createSale">
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
		name: "AddSale",
		created() {
			this.fetchProduct();
			this.fetchSale();
			this.fetchMember();
			this.fetchLocation();
		},

		data() {
			return {
				form: {
					items: []
				},
				payment_status: ["Paid", "Due"],
				payment_method: ["Cash", "Cheque"],
				sale_status: ["Completed", "Pending"],

				members: [],
				locations: [],
				products: [],
				sales: []
			};
		},

		computed: {
			calculateTotal() {
				return this.form.items.reduce((total, item) => {
					return total + item.quantity;
				}, 0);
			},

			GrandTotal() {
				return this.form.items.reduce((total, item) => {
					let s =
						(item.unit_price -
							(item.unit_price * item.discount) / 100) *
						item.quantity;
					return total + s;
				}, 0);
			}
		},

		methods: {
			fetchSale() {
				this.$axios
					.$get(`api/sale`)
					.then(res => {
						// this.sales = res.sales.data;
						this.$set(this.$data, "sales", res.sales.data);
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			fetchLocation() {
				this.$axios
					.$get(`api/location`)
					.then(res => {
						this.locations = res.locations.data;
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			fetchMember() {
				this.$axios
					.$get(`api/member`)
					.then(res => {
						this.members = res.members.data;
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			fetchProduct() {
				this.$axios
					.$get(`api/product`)
					.then(res => {
						this.$set(this.$data, "products", res.products.data);
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			createSale() {
				this.$axios
					.$post(`api/sale`, this.form)
					.then(res => {
						this.sales = res.data;
						console.log(res);
						this.$router.push(`/sale/sale-list`);
					})
					.catch(err => {
						console.log(err.response);
						this.$refs.form.validate(err.response.data.errors);
					});
			},

			addTocart(item) {
				if (this.form.items.includes(item)) {
					alert("Item already there");
				} else {
					this.form.items.push(item);
				}
				Vue.set(item, "quantity", 1);
				Vue.set(item, "discount", 0);
			},

			removeItem(index) {
				this.form.items.splice(index);
			},

			discountedPrice(product) {
				return (
					(product.unit_price -
						(product.unit_price * product.discount) / 100) *
					product.quantity
				);
			}
		}
	};
</script>

<style lang="scss">
	.sale--textarea {
		border: 1px solid #349feb;
		outline: none;
	}

	.saleTable {
		border-collapse: collapse;
		width: 100%;

		&--th {
			border-bottom: 1px solid rgba(0, 0, 0, 0.125);
			text-align: left;
			padding-bottom: 2px;
		}

		&--input {
			border: 1px solid rgba(0, 0, 0, 0.125);
			padding: 5px 5px 5px 5px;
			margin: 10px auto;
			outline: none;
		}

		&--total {
			font-weight: 400;
			text-align: left;
			padding-top: 10px;
		}

		&--td {
			border-bottom: 1px solid rgba(0, 0, 0, 0.125);
		}
	}
</style>