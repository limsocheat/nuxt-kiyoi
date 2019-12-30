<template>
	<v-app class="px-5 py-5">
		<v-card>
			<v-card-title class="px-5 teal dark-2 white--text">Sale Detail  
				<span class="font-weight-regular px-2">(Invoice No: {{ items.reference_no }})</span>
			</v-card-title>
			<v-divider></v-divider>
			<v-row>
				<v-col md="6" cols="12">
					<div class="d-flex flex-column px-10 py-5">
						<span class="font-weight-medium">Date: 
							<span class="font-weight-regular">{{ items.created_at }}</span>
						</span>
						<span class="font-weight-medium">
							References: <span class="font-weight-regular">{{ items.reference_no }} </span>
						</span>
						<span class="font-weight-medium">
							Warehouse: <span></span>
						</span>
						<span class="font-weight-medium">
							Payment Status: <span class="font-weight-regular">{{items.payment_status }} </span>
						</span>
					</div>
				</v-col>
				<v-col md="6" cols="12">
					<div class="py-5 d-flex flex-column">
						<!-- <span>Customer: {{ items.member.name }}</span>
						<span>Address: {{ items.member.address }}</span> -->
					</div>
				</v-col>
				<v-col cols="12" class="px-10">
					<table class="tableSale">
						<thead>
							<tr>
								<th class="tableSale--header">#</th>
								<th class="tableSale--header">Product</th>
								<th class="tableSale--header">Qty</th>
								<th class="tableSale--header">Unit Price</th>
								<th class="tableSale--header">Tax</th>
								<th class="tableSale--header">Discount</th>
								<th class="tableSale--header">Sub Total</th>
							</tr>
						</thead>
						<tbody class="tableSale--body">
							<template v-if="items.products && items.products.length > 0">
								<tr v-for="i in items.products">
									<td class="tableSale--tr">{{ i.id }}</td>
									<td class="tableSale--tr">{{ i.name }}</td>
									<td class="tableSale--tr">{{ i.unit  }}</td>
									<td class="tableSale--tr">USD {{ i.order.unit_price  | formatMoney }}</td>
									<td class="tableSale--tr">USD {{ i.order.tax | formatMoney }}</td>
									<td class="tableSale--tr">USD {{ i.order.discount | formatMoney }}</td>
									<td class="tableSale--tr">USD {{ i.price - (i.order.unit_price * i.price * i.order.discount / 100) | formatMoney }} </td>
								</tr>
							</template>
							<div v-else>
								<td>
									<span class="tableSale--noData">No Product Found</span>
								</td>
							</div>
						</tbody>
						<thead>
							<tr class="d-flex flex-column">
								<th class="tableSale--tr">Total</th>
								<th class="tableSale--tr">Order Tax:</th>
								<th class="tableSale--tr">order Discount:</th>
								<th class="tableSale--tr">Shipping Cost:</th>
								<th class="tableSale--tr">Grand Total:</th>
								<th class="tableSale--tr">Paid Amount:</th>
								<th class="tableSale--tr">Due:</th>
							</tr>
						</thead>
					</table>
				</v-col>
			</v-row>
		</v-card>
	</v-app>
</template>

<script>
	import Vue from 'vue';

	let numeral = require("numeral");

	Vue.filter('formatMoney', function(value) {
		return numeral(value).format("0,0.00");
	});

	export default {
		name: 'idSale',
		created() {
			this.fetchSale();
		},

		data() {
			return {
				items: []
			}
		},

		computed: {
			total() {

			}
		},

		methods: {
			fetchSale() {
				this.$axios.$get(`api/sale/` + this.$route.params.id)
				.then(res => {
					this.items = res.sales;
					console.log(res);
				})
				.catch(err => {
					console.log(err.response);
				})
			}
		}
	}
</script>

<style lang="scss">
	.tableSale {
		width: 100%;
		text-align: left;
		border-collapse:  collapse;
		&--header {
			border: 1px solid rgba(0,0,0,0.125);
			padding: 5px 10px 5px 10px;
		}

		&--body {
			border: 1px solid rgba(0,0,0,0.125);
			text-align: left;
			border-collapse: collapse;
		}

		&--tr {
			padding: 10px 10px 10px 10px;
			border: 1px solid rgba(0,0,0,0.125);
		}
	}
</style>