<template>
	<v-container class="kiyoiContainer" id="printPOS">
		<div class="kiyoiPOS">
			<span class="kiyoiPOS--title1">Kiyoi POS</span>
			<span class="kiyoiPOS--title2">Sale Reciept</span>
			<span class="kiyoiPOS--title3">INVOICE</span>
		</div>

		<div class="kiyoiInfo">
			<div class="kiyoiInfo--item">
				<span class="kiyoiInfo--title">Invoice ID: {{pos.reference_no}}</span>
				<span class="kiyoiInfo--title" v-if="pos.member">Sold To: {{ pos.member.name }}</span>
				<span class="kiyoiInfo--title" v-if="pos.member">Phone: {{pos.member.phone }}</span>
				<span class="kiyoiInfo--title" v-if="pos.member">Address: {{ pos.member.address }}</span>
			</div>
			<div class="kiyoiInfo--item">
				<span>Date: {{ pos.created_at }}</span>
			</div>
		</div>
		<div>
			<table class="tablePOS">
				<thead>
					<tr class="tablePOS--item">
						<th>Items</th>
						<th>Quantity</th>
						<th>Price</th>
						<th>Discount</th>
						<th>Total</th>
					</tr>
				</thead>
				<tbody>
					<template v-if="pos.products && pos.products.length > 0">
						<tr v-for="(item, index) in pos.products" :key="index">
							<td>{{ item.name }}</td>
							<td>{{ item.pivot.quantity }}</td>
							<td>$ {{ item.price | formatMoney }}</td>
						</tr>
					</template>
					<template v-else>
						<tr class="tablePOS--nodata">
							<td colspan="5">No Available in table</td>
						</tr>
					</template>
				</tbody>
			</table>
			<button @click="print">Print</button>
		</div>
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

		updated() {
			import("print-js").then(() => {
				this.printReady = true;
				const style =
					"@page { margin-top: 40px } @media print { h1 { color: blue } }";
				printJS({
					printable: "printPOS",
					type: "html",
					scanStyle: false,
					style: "../../assets/css/print-pos.scss",
					style,
					targetStyles: ["*"]
				});
			});
		},

		data() {
			return {
				pos: [],
				printReady: false
			};
		},

		methods: {
			print() {
				const style =
					"@page { margin-top: 40px } @media print { h1 { color: blue } }";
				printJS({
					printable: "printPOS",
					type: "html",
					scanStyle: false,
					style: "../../assets/css/print-pos.scss",
					style,
					targetStyles: ["*"]
				});
			},

			fetchSale() {
				this.$axios
					.$get(`api/sale/` + this.$route.params.id)
					.then(res => {
						this.$set(this.$data, "pos", res.sales);
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			}
		}
	};
</script>

<style lang="scss">
	.kiyoiContainer {
		// text-align: center;
		padding: 50px;
	}

	.kiyoiPOS {
		text-align: center;
		display: flex;
		flex-direction: column;
		padding-top: 20px;
		&--title1 {
			font-size: 30px;
			font-weight: 370;
			padding-bottom: 15px;
		}

		&--title2 {
			padding-bottom: 15px;
		}

		&--title3 {
			padding-bottom: 15px;
			font-size: 25px;
			font-weight: 350;
		}
	}

	.kiyoiInfo {
		display: flex;
		justify-content: space-between;
		&--item {
			display: flex;
			flex-direction: column;
		}
		&--title {
			font-weight: 400;
		}
	}

	.tablePOS {
		width: 100%;
		text-align: left;
		border-collapse: collapse;
		&--item {
			border-top: 1px solid rgba($color: #000000, $alpha: 1);
			border-bottom: 1px solid rgba($color: #000000, $alpha: 1);
		}

		&--nodata {
			text-align: center;
			border: 2px solid seagreen;
		}
	}
</style>