<template>
	<v-container>
		<v-card>
			<div class="my-5 d-flex align-center py-5">
				<h1 class="font-weight-light headline px-5">Dashboard</h1>
			</div>
		</v-card>

		<!-- User Card -->
		<v-row>
			<v-col
				md="3"
				sm="6"
				cols="12"
			>
				<v-card>
					<v-card-text class="d-flex justify-space-around">
						<v-icon
							class="card--icon"
							style="font-size: 55px;"
						>mdi-account-group-outline</v-icon>
						<div class="d-flex flex-column align-start">
							<div class="card--text">Total User</div>
							<div
								class="card--amount"
								v-if="users.countUsers"
							>
								{{ users.countUsers.original.cards }}
							</div>
						</div>
					</v-card-text>
				</v-card>
			</v-col>

			<!-- Sale Card -->
			<v-col
				md="3"
				sm="6"
				cols="12"
			>
				<v-card>
					<v-card-text class="d-flex justify-space-around">
						<v-icon
							class="card--icon"
							style="font-size: 55px;"
						>
							mdi-finance
						</v-icon>
						<div class="d-flex flex-column align-start">
							<div class="card--text">Total Sale</div>
							<div
								class="card--amount"
								v-if="users.totalSales"
							>
								${{ users.totalSales.original.totalSale }}
							</div>
						</div>
					</v-card-text>
				</v-card>
			</v-col>

			<!-- Expense Card -->
			<v-col
				md="3"
				sm="6"
				cols="12"
			>
				<v-card>
					<v-card-text class="d-flex justify-space-around">
						<v-icon
							class="card--icon"
							style="font-size: 55px;"
						>
							mdi-cash-multiple
						</v-icon>
						<div class="d-flex flex-column align-start">
							<div class="card--text">Total Expense</div>
							<div
								class="card--amount"
								v-if="users.totalExpense"
							>
								${{ users.totalExpense.original.totalExpense }}
							</div>
						</div>
					</v-card-text>
				</v-card>
			</v-col>

			<!-- Purchase Card -->
			<v-col
				md="3"
				sm="6"
				cols="12"
			>
				<v-card>
					<v-card-text class="d-flex justify-space-around">
						<v-icon
							class="card--icon"
							style="font-size: 55px;"
						>
							mdi-cash-multiple
						</v-icon>
						<div class="d-flex flex-column align-start">
							<div class="card--text">Total Purchase</div>
							<div
								class="card--amount"
								v-if="users.totalPurchase"
							>
								${{ users.totalPurchase.original.totalPurchase }}
							</div>
						</div>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>

		<v-row>
			<v-col
				cols="12"
				md="8"
			>
				<v-card>
					<v-container>
						<BarChart
							v-if="loaded"
							:data="barChartData"
							:options="{ maintainAspectRatio: false }"
						/>
					</v-container>
				</v-card>
			</v-col>
			<v-col
				md="4"
				cols="12"
			>
				<v-card>
					<v-container>
						<LineChart
							v-if="loaded"
							:data="LineChartData"
							:options="{ maintainAspectRatio: false }"
						/>
					</v-container>
				</v-card>
			</v-col>
		</v-row>
		<!-- Sale Chart -->

	</v-container>
</template>

<script>
	import axios from "axios";
	import BarChart from "~/components/barchart";
	import LineChart from "~/components/linechart";
	export default {
		name: "HomePage",
		middleware: "check_user_role",

		created() {
			this.getSaleProfit();
			this.getExpenseReport();
			this.countUser();
		},

		components: {
			BarChart,
			LineChart
		},

		data() {
			return {
				loaded: false,
				users: [],
				barChartData: {},
				LineChartData: {}
			};
		},

		methods: {
			getExpenseReport() {
				this.$axios
					.$get(`api/expense`)
					.then(res => {
						this.loaded = true;
						let result = res.data;

						this.barChartData = {
							labels: result.map(a => a.created_at),
							datasets: [
								{
									label: "Expense Report",
									backgroundColor: "#93dd93",
									data: result.map(expense => expense.amount)
								}
							]
						};
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			getSaleProfit() {
				this.$axios
					.$get(`api/sale`)
					.then(res => {
						console.log(res);
						let result = res.sales.data;

						this.LineChartData = {
							labels: result.map(a => a.created_sale),
							datasets: [
								{
									label: "Sale Report",
									backgroundColor: ["#9412cc", "#E46651"],
									data: result.map(sale => sale.grand_total)
								}
							]
						};
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			countUser() {
				this.$axios
					.$get(`api/dashboard`)
					.then(res => {
						this.$set(this.$data, "users", res);
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
	.card {
		// border: 1px solid rgba(0,0,0,0.125);
		&--title {
			background: #2f353b;
		}
		&--header {
			color: #ffffff;
		}

		&--amount {
			font-size: 25px;
			font-weight: 300;
			color: #639;
		}

		&--text {
			font-size: 16px;
			font-weight: 500;
			margin-bottom: 5px;
		}

		&--item {
			width: 100%;
		}
	}
</style>
