<template>
	<v-container>
		<h3 class="mb-3">Sale Report</h3>
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
								label="Customer"
								item-text="name"
								item-value="name"
								:items="member"
								@input="getSale"
							></v-autocomplete>
						</v-col>
						<v-col
							md="6"
							cols="12"
						>
							<v-autocomplete
								label="Branch (Location)"
								item-text="name"
								item-value="name"
								:items="location"
								@input="getSale"
							></v-autocomplete>
						</v-col>

						<v-col
							md="6"
							cols="12"
						>
							<v-autocomplete
								label="Payment Method"
								item-text="name"
								item-value="name"
								:items="payment_method"
								@input="getSale"
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
									@update="getSale"
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
			<v-card-title>Sale Report</v-card-title>
			<v-divider></v-divider>
			<v-container>
				<LineChart
					v-if="loaded"
					:chartData="LineChartData"
					:options="{ maintainAspectRatio: false }"
				></LineChart>
			</v-container>
		</v-card>

		<!-- Datatable -->
		<div class="mt-5">
			<v-data-table :headers="headers">
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
	import numeral from "numeral";
	import Vue from "vue";

	Vue.filter("formatMoney", value => {
		return numeral(value).format("0.00");
	});

	import LineChart from "~/components/linechart";

	export default {
		name: "ExpenseReport",
		components: {
			LineChart
		},

		created() {
			this.getLocation();
			this.getMember();
			this.getSale();
		},

		filters: {
			date(value) {
				let options = { year: "numeric", month: "long", day: "numeric" };
				return Intl.DateTimeFormat("en-US", options).format(value);
			}
		},

		data() {
			return {
				payment_method: ["Cash", "Cheque"],
				location: [],
				expense: [],
				member: [],
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
				BarchartData: {},
				loaded: false,
				headers: [
					{ text: "Expense Category", sortable: false },
					{ text: "Total Expense", sortable: false }
				]
			};
		},

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

			getMember() {
				this.$axios
					.$get(`api/member`)
					.then(res => {
						this.$set(this.$data, "member", res.members.data);
						console.log("Member", res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			getSale() {
				let startDate = moment(this.dateRange.startDate).format(
					"YYYY-MM-DD"
				);

				let endDate = moment(this.dateRange.endDate).format("YYYY-MM-DD");

				this.$axios
					.$get(`api/sale-report`)
					.then(res => {
						this.loaded = true;

						let result = res;

						this.LineChartData = {
							labels: result.map(e => e.date),
							datasets: [
								{
									label: "Paid List",
									backgroundColor: "transparent",
									pointBackgroundColor: "#0988d3",
									borderColor: "#0988d3",
									data: result.map(a => a.paid)
								},
								{
									label: "Due List",
									backgroundColor: "transparent",
									pointBackgroundColor: "#dd3771",
									borderColor: "#dd3771",
									data: result.map(a => a.due_amount)
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