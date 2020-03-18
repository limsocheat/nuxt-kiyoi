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
	</v-container>
</template>

<script>
	export default {
		middleware: "check_user_role",
		data() {
			return {
				users: []
			};
		},

		methods: {
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
		},

		created() {
			this.countUser();
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
