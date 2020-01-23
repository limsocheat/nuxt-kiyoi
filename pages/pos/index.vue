<template>
	<v-app>
		<v-row>
			<v-col cols="12" md="5">
				<v-card class="px-5 pb-5">
					<v-row>
						<v-col cols="12" md="6">
							<v-autocomplete
								:items="customers"
								dense
								solo
								outlined
								item-text="name"
								item-value="name"
								label="Select Customer"
								return-object
							></v-autocomplete>
						</v-col>
						<v-col md="6" cols="12">
							<v-autocomplete
								:items="products"
								dense
								solo
								outlined
								item-text="name"
								item-value="name"
								label="Search Product"
								@input="addToCart"
								return-object
							></v-autocomplete>
						</v-col>
					</v-row>
					<div>
						<table class="tablePOS">
							<thead>
								<tr class="tablePOS--tr">
									<v-row>
										<v-col cols="2">
											<th>Product</th>
										</v-col>
										<v-col cols="3">
											<th>Quantity</th>
										</v-col>
										<v-col cols="3">
											<th>Price</th>
										</v-col>
										<v-col cols="2">
											<th>SubTotal</th>
										</v-col>
										<v-col cols="2">
											<th>Action</th>
										</v-col>
									</v-row>
								</tr>
							</thead>
							<tbody>
								<tr class="tablePOS--td" v-for="(item, index) in form.items" :key="index">
									<v-row>
										<v-col cols="2">
											<td>{{ item.name }}</td>
										</v-col>
										<v-col cols="3">
											<td>
												<input class="tablePOS--input" type="number" v-model="form.items[index].quantity" />
											</td>
										</v-col>
										<v-col cols="3">
											<td>
												<input class="tablePOS--input" type="number" v-model="form.items[index].price" />
											</td>
										</v-col>
										<v-col cols="2">
											<td>$ {{ subTotal(item) | formatMoney }}</td>
										</v-col>
										<v-col cols="2">
											<v-btn outlined color="red" small @click="removeProduct(index)">
												<v-icon small>mdi-delete</v-icon>
											</v-btn>
										</v-col>
									</v-row>
								</tr>
							</tbody>
						</table>
					</div>
				</v-card>
			</v-col>

			<v-col cols="12" md="7">
				<v-card>
					<div class="px-5 d-flex justify-space-around py-2">
						<v-btn class="purple darken-1" dark>Category</v-btn>
						<v-btn class="teal darken-1" dark>Brand</v-btn>
						<v-btn class="red darken-1" dark>Featured</v-btn>
					</div>

					<v-row>
						<v-col v-for="(item, index) in products" :key="index" cols="3">
							<v-card flat tile class="d-flex px-5">
								<img class="pos-img" v-if="item.image" :src="'http://127.0.0.1:8000/image/' + item.image" width="50" height="50">
									<template v-slot:placeholder>
										<v-row class="fill-height ma-0" align="center" justify="center">
											<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
										</v-row>
									</template>
								</img>
							</v-card>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
		</v-row>
	</v-app>
</template>
<script>
import Vue from 'vue';

let numeral = require('numeral');

Vue.filter('formatMoney', function(value) {
	return numeral(value).format('00,00');
})

export default {
	layout: "pos",
	name: 'POS',
	created() {
		this.fetchProduct()
		this.fetchCustomer()
	},
	data() {
		return {
			customers: [],
			dialog: false,
			dialog2: false,
			dialog3: false,
			form: {
				items: []
			},
			products: [],
		}
	},

	methods: {
		fetchProduct() {
			this.$axios.$get(`api/product`)
			.then(res => {
				this.$set(this.$data, 'products', res.products.data);
				console.log(res);
			})
			.catch(err => {
				console.log(err.response)
			})
		},

		fetchCustomer() {
			this.$axios.$get(`api/member`)
			.then(res => {
				this.$set(this.$data, 'customers', res.members.data);
				console.log(res);
			})
			.catch(err => {
				console.log(err.response);
			})
		},

		addToCart(item) {
			if(this.form.items.includes(item)) {
				Vue.set(item, 'quantity', item.quantity += 1);
			}
			else {
				this.form.items.push(item);
				Vue.set(item, 'quantity', 1);
			}
		},

		removeProduct(index) {
			this.form.items.splice(index, 1);
		},

		subTotal(product) {
			return (
					product.price * product.quantity
				);
		},
	}
}

</script>

<style lang="scss">
	.tablePOS {
		border-collapse: collapse;
		width: 100%;
		text-align: left;

		&--tr {
			font-weight: 400;
			border-bottom: 1px solid rgba(0, 0, 0, 0.125);
		}

		&--td {
			// padding: 10px 5px 10px 5px;
		}

		&--input {
			border: 1px solid rgba(0, 0, 0, 0.125);
			width: 100%;
			padding-left: 10px;
		}
	}

	.pos-img  {
		
	}
</style>