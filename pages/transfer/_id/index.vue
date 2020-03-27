<template>
	<v-container id="printPage">
		<v-card>
			<v-card-title class="px-5 teal dark-2 white--text d-flex justify-space-between">
				<span>Transfer Detail</span>
				<span>
					<v-btn
						small
						@click="printPreview"
					>
						<v-icon>mdi-printer</v-icon>Print
					</v-btn>
				</span>
			</v-card-title>
			<v-divider></v-divider>
			<v-row>
				<v-col
					md="6"
					cols="12"
				>
					<div class="d-flex flex-column px-10 pt-5">
						<span class="font-weight-medium">Date:
							<span class="font-weight-regular"></span>
						</span>
						<span class="font-weight-medium">
							References: <span class="font-weight-regular"></span>
						</span>
						<span class="font-weight-medium">
							Warehouse: <span class="font-weight-regular"></span>
						</span>
						<span class="font-weight-medium">
							Payment Status: <span class="font-weight-regular"> </span>
						</span>
					</div>
				</v-col>
				<v-col
					md="6"
					cols="12"
				>
					<div class="py-5 d-flex flex-column">
						<!-- <span>Customer: {{ sale.member.name }}</span>
						<span>Address: {{ sale.member.address }}</span> -->
					</div>
				</v-col>
				<v-col
					cols="12"
					class="px-10"
				>
					<table class="tableSale">
						<tr>
							<th class="tableSale--header">#</th>
							<th class="tableSale--header">Product</th>
							<th class="tableSale--header">Qty</th>
							<th class="tableSale--header">Unit Price</th>
							<!-- <th class="tableSale--header">Tax</th> -->
							<th class="tableSale--header">Discount</th>
							<th class="tableSale--header">Sub Total</th>
						</tr>

						<template v-if="item.products && item.products.length > 0">
							<tr
								v-for="i in item.products"
								:key="i.id"
							>
								<td class="tableSale--tr">{{ i.id }}</td>
								<td class="tableSale--tr">{{ i.name }}</td>
								<td class="tableSale--tr">{{ i.pivot.quantity  }}</td>
								<td class="tableSale--tr">USD {{ i.pivot.unit_price  | formatMoney }}</td>
								<!-- <td class="tableSale--tr">USD {{ i.tax | formatMoney }}</td> -->
								<td class="tableSale--tr">USD {{ i.discount | formatMoney }}</td>
								<td class="tableSale--tr">USD {{ i.pivot.quantity * i.pivot.unit_price | formatMoney }} </td>
							</tr>
						</template>
						<template v-else>
							<tr>
								<td
									colspan="7"
									class="tableSale--noData"
								>No Available in table</td>
							</tr>
						</template>

						<tr>
							<th
								class="tableSale--tr"
								colspan="2"
							>
								Total
							</th>
							<td class="tableSale--tr">{{ item.total_quantity }}</td>
							<td class="tableSale--tr">USD {{ item.total_price | formatMoney }}</td>
							<td class="tableSale--tr">{{ item.total_discount }}</td>
							<td class="tableSale--tr">USD {{ item.sub_total | formatMoney }}</td>
						</tr>
						<tr>
							<th
								class="tableSale--tr"
								colspan="5"
							>Shipping Cost:</th>
							<td class="tableSale--tr">USD {{ item.shipping_charge | formatMoney }}</td>
						</tr>
						<tr>
							<th
								class="tableSale--tr"
								colspan="5"
							>Grand Total:</th>
							<td class="tableSale--tr">USD {{ item.sub_total | formatMoney }}</td>
						</tr>
						<tr>
							<th
								class="tableSale--tr"
								colspan="5"
							>Paid Amount:</th>
							<td class="tableSale--tr">USD {{ item.paid | formatMoney }}</td>
						</tr>
					</table>
				</v-col>
			</v-row>
		</v-card>
	</v-container>
</template>

<script>
	import Vue from "vue";

	let numeral = require("numeral");

	Vue.filter("formatMoney", function(value) {
		return numeral(value).format("0,0.00");
	});

	export default {
		name: "idSale",
		created() {
			this.fetchSale();
		},

		data() {
			return {
				item: []
			};
		},

		computed: {
			totalQty() {
				this.item.reduce((total, item) => {
					console.log(item);
				});
			}
		},

		methods: {
			fetchSale() {
				this.$axios
					.$get(`api/transfer/` + this.$route.params.id)
					.then(res => {
						this.$set(this.$data, "item", res.transfer);
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			printPreview() {
				window.print();
			}
		}
	};
</script>

<style lang="scss">
	.tableSale {
		width: 100%;
		text-align: left;
		border-collapse: collapse;
		&--header {
			border: 1px solid rgba(0, 0, 0, 0.125);
			padding: 5px 10px 5px 10px;
		}

		&--body {
			border: 1px solid rgba(0, 0, 0, 0.125);
			text-align: left;
			border-collapse: collapse;
		}

		&--tr {
			padding: 10px 10px 10px 10px;
			border: 1px solid rgba(0, 0, 0, 0.125);
		}

		&--noData {
			text-align: center;
			padding: 10px;
			border: 2px solid #34ef95;
		}
	}

	@media print {
		body * {
			visibility: hidden;
		}

		#printPage * {
			visibility: visible;
		}

		#printPage {
			top: 0;
		}

		@page {
			size: 5in 9in;
			// margin-top: 0.75in;
		}
	}
</style>