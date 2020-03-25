<template>
	<v-container>
		<h3 class="mb-3">Expense Report</h3>
		<v-expansion-panels>
			<v-expansion-panel>
				<v-expansion-panel-header>
					Filter
				</v-expansion-panel-header>
				<v-divider></v-divider>
				<v-expansion-panel-content>
					<v-row>
						<v-col
							md="6"
							cols="12"
						>
							<v-autocomplete
								label="All category"
								item-text="name"
								item-value="name"
								v-model="query.category"
								:items="category"
								@input="getExpense"
							></v-autocomplete>
						</v-col>
						<v-col
							md="6"
							cols="12"
							class="mt-5"
						>
							<label for="date-range">Date Range</label>
							<client-only>
								<date-range-picker
									ref="picker"
									:locale-data="{ firstDay: 1, format: 'DD-MM-YYYY HH:mm:ss' }"
									:opens="opens"
									v-model="dateRange"
									@update="getExpense"
								>
									<div
										slot="input"
										slot-scope="picker"
										style="min-width: 350px;"
									>
										{{ picker.startDate | date }} - {{ picker.endDate | date }}
									</div>
								</date-range-picker>
							</client-only>
						</v-col>
					</v-row>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>

		<v-card class="mt-5">
			<v-card-title>Expense Report</v-card-title>
			<v-divider></v-divider>
			<v-card-text>
				<v-container>
					<LineChart
						v-if="loaded"
						:chartData="LineChartData"
						:options="{ maintainAspectRatio: false }"
					/>
				</v-container>
			</v-card-text>
		</v-card>

		<!-- Datatable -->
		<div class="mt-5">
			<v-data-table
				:headers="headers"
				:items="category"
			>
				<template v-slot:item="{ item }">
					<tr>
						<td>{{ item.name }}</td>
						<td>$ {{ item.total_expense | formatMoney}}</td>
					</tr>
				</template>
			</v-data-table>
		</div>
	</v-container>
</template>

<script>
	import moment from "moment";
	import LineChart from "~/components/linechart";
	import numeral from "numeral";
	import Vue from "vue";

	Vue.filter("formatMoney", value => {
		return numeral(value).format("0.00");
	});

	export default {
		name: "ExpenseReport",
		components: {
			LineChart
		},

		created() {
			this.getLocation();
			this.getCategory();
			this.getExpense();

			console.log(this.dateRange.startDate);
		},

		filters: {
			date(value) {
				let options = { year: "numeric", month: "long", day: "numeric" };
				return Intl.DateTimeFormat("en-US", options).format(value);
			}
		},

		watch: {
			query() {
				this.getExpense();
			}
		},

		data() {
			return {
				expense: [],
				category: [],
				query: {
					category: ""
				},
				dateFormat: new Date().toISOString().substr(0, 10),
				dateRange: {
					startDate: new Date(
						new Date().getFullYear(),
						new Date().getMonth(),
						1
					),
					endDate: new Date(
						new Date().getFullYear(),
						new Date().getMonth() + 1,
						0
					)
				},
				locale: {
					direction: "ltr", //direction of text
					format: "DD-MM-YYYY", //fomart of the dates displayed
					separator: " - ", //separator between the two ranges
					applyLabel: "Apply",
					cancelLabel: "Cancel",
					weekLabel: "W",
					customRangeLabel: "Custom Range",
					daysOfWeek: moment.weekdaysMin(), //array of days - see moment documenations for details
					monthNames: moment.monthsShort(), //array of month names - see moment documenations for details
					firstDay: 1 //ISO first day of week - see moment documenations for details
				},

				opens: "left",
				LineChartData: {},
				loaded: false,
				headers: [
					{ text: "Expense Category", sortable: false },
					{ text: "Total Expense", sortable: false }
				]
			};
		},

		computed: {},

		methods: {
			getLocation() {
				this.$axios
					.$get(`api/location`)
					.then(res => {
						this.$set(this.$data, "location", res.locations.data);
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			getCategory() {
				this.$axios
					.$get(`api/expense-category`)
					.then(res => {
						this.$set(this.$data, "category", res);
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			getExpense() {
				let startDate = moment(this.dateRange.startDate).format(
					"YYYY-MM-DD"
				);

				let endDate = moment(this.dateRange.endDate).format("YYYY-MM-DD");

				this.$axios
					.$get(
						`api/expense-report?category=${this.query.category}&startDate=${startDate}&endDate=${endDate}`
					)
					.then(res => {
						this.loaded = true;
						let result = res.expense;

						console.log("result", result);

						this.LineChartData = {
							labels: result.map(a => a.date),
							datasets: [
								{
									label: "Expense List",
									backgroundColor: "transparent",
									pointBackgroundColor: "#0c4094",
									borderColor: "#0988d3",
									data: result.map(a => a.amount)
								}
							]
						};
					})
					.catch(err => {
						console.log(err.response);
					});
			}
		}
	};
</script>