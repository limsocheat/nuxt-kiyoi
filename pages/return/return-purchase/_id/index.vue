<template>
	<v-app class="mx-5 my-5">
		<v-card>
			<div id="printProduct">
				<v-card-title class="green darken-2 white--text">Return Purchase (Reference No: {{ returnpurchase.reference_no }})</v-card-title>
				<v-divider></v-divider>
				<div class="px-5 pt-5">
					<div>
						<label for="" class="font-weight-medium">Return Date: </label>
						<span class="productDetail--item">{{ returnpurchase.created_at }}</span>
					</div>
					
					<div>
						<label for="" class="font-weight-medium">Supplier: </label>
						<span class="productDetail--item" v-if="returnpurchase.supplier">{{ returnpurchase.supplier.name}}</span>
					</div>
					<div>
						<label for="" class="font-weight-medium">Business Location: </label>
						<span class="productDetail--item" v-if=" returnpurchase.branch">{{ returnpurchase.branch.address }}</span>
					</div>
					<div class="px-5 pt-5">
						<table class="tableReturnPurchase">
							<tr>
								<th  class="tableReturnPurchase--tr">#</th>
								<th  class="tableReturnPurchase--tr">Product</th>
								<th  class="tableReturnPurchase--tr">Qty</th>
								<th  class="tableReturnPurchase--tr">Cost</th>
								<th  class="tableReturnPurchase--tr">SubTotal</th>
							</tr>
							<tr  v-if="returnpurchase.products" v-for="product in returnpurchase.products">
								<td class="tableReturnPurchase--td">{{returnpurchase.id}}</td>
								<td class="tableReturnPurchase--td">{{ product.name }}</td>
								<td class="tableReturnPurchase--td">{{ product.pivot.quantity }}</td>
								<td class="tableReturnPurchase--td">USD {{ product.pivot.unit_price | formatMoney }}</td>
								<td class="tableReturnPurchase--td">USD {{ product.pivot.unit_price * product.pivot.quantity | formatMoney }}</td>
							</tr>
							<tr>
								<th class="tableReturnPurchase--td" colspan="4">Total</th>
								<td class="tableReturnPurchase--td">USD {{ returnpurchase.paid | formatMoney }}</td>
							</tr>
							<tr class="tableReturnPurchase--td">
								<th class="tableReturnPurchase--td" colspan="4">Grand Total</th>
								<td class="tableReturnPurchase--td">10</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
			<v-btn @click="printProduct" class="mx-5 my-5 blue accent-3 white--text">
					<v-icon left>mdi-printer</v-icon>
					Print
				</v-btn>
		</v-card>
	</v-app>
</template>

<script>
	import Vue from 'vue';
	var numeral = require('numeral');

	Vue.filter('formatMoney', function(value) {
		return numeral(value).format("0,0.00");
	});

	export default {
		name: 'ViewReturnPurchase',
		created() {
			this.fetchData()
		},

		data() {
			return {
				returnpurchase: []
			}
		},

		methods: {
			fetchData() {
				this.$axios.$get(`api/return-purchase/` + this.$route.params.id)
				.then(res => {
					this.returnpurchase = res.returnpurchase;
					console.log(res);
				})
				.catch(err => {
					console.log(err.response);
				})
			},

			printProduct() {
				this.$htmlToPaper('printProduct')
			},
		}
	}
</script>

<style lang="scss">
	.tableReturnPurchase {
		width: 100%;
		text-align: left;
		border-collapse: collapse;
		margin-top: 10px;
		&--tr {
			border: 1px solid #7c5cc4;
			padding: 10px 10px 10px 10px;
			color: white;
			background-color: rgb(5, 151, 61);
		}

		&--td {
			border: 1px solid #dee2e6;
			padding-right: 10px;
			padding: 10px 10px 10px 10px;
		}
	}
</style>