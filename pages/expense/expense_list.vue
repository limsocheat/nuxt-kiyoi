<template>
	<v-container>
		<div class="pb-5 pr-3">
			<v-dialog
				v-model="dialog"
				max-width="700px"
				v-permission="'add expense'"
				persistent
			>
				<template v-slot:activator="{ on }">
					<v-btn
						class="teal darken-1"
						dark
						v-on="on"
					>
						<v-icon left>mdi-plus-circle</v-icon>Add Expense
					</v-btn>
				</template>

				<!-- Form Modal -->
				<v-card>
					<v-card-title class="headline font-weight-light">ADD EXPENSE</v-card-title>
					<v-divider></v-divider>
					<ValidationObserver ref="form">
						<v-row class="px-5">
							<v-col
								cols="12"
								sm="6"
							>
								<label for>Category</label>
								<validation-provider
									name="Expense Category"
									rules="required"
									v-slot="{ errors }"
								>
									<v-autocomplete
										solo
										outlined
										dense
										:items="category"
										v-model="form.expense_category"
										item-text="name"
										item-value="name"
										label="Please Select"
										return-object
									></v-autocomplete>
									<span class="red--text">{{ errors[0] }}</span>
								</validation-provider>
							</v-col>

							<v-col
								cols="12"
								sm="6"
							>
								<validation-provider
									name="Amount"
									rules="required"
									v-slot="{ errors }"
								>
									<label for>Amount</label>
									<v-text-field
										outlined
										solo
										dense
										label="Amount"
										type="number"
										v-model.number="form.amount"
									></v-text-field>
									<span class="red--text">{{ errors[0] }}</span>
								</validation-provider>
							</v-col>

							<v-col
								cols="12"
								sm="12"
							>
								<validation-provider
									name="Expense For"
									rules="required"
									v-slot="{ errors }"
								>
									<v-text-field
										label="Expense For"
										solo
										dense
										v-model="form.expense_for"
									></v-text-field>
									<span class="red--text">{{ errors[0] }}</span>
								</validation-provider>
							</v-col>

							<v-col
								cols="12"
								sm="12"
							>
								<label for>Note</label>
								<v-text-field
									solo
									outlined
									dense
									label="Note"
									v-model="form.description"
								></v-text-field>
							</v-col>
						</v-row>
					</ValidationObserver>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							color="red"
							text
							@click="closeDialog"
						>
							<v-icon>mdi-close</v-icon> Close
						</v-btn>
						<v-btn
							color="primary"
							@click="createItem"
						>
							<v-icon>mdi-content-save</v-icon>Save
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</div>
		<div class="d-flex justify-space-between">
			<div>
				<v-text-field
					label="Search"
					v-model="search"
					solo
					outlined
					dense
				></v-text-field>
			</div>
			<div class="print">
				<a
					class="print--link"
					:href="baseURL + `api/expense/export_pdf`"
				>
					<v-btn
						dark
						class="red darken-1"
					>
						<v-icon>mdi-file-pdf</v-icon>PDF
					</v-btn>
				</a>
				<a
					class="print--link"
					:href="baseURL + `api/expense/export`"
				>
					<v-btn
						dark
						class="teal darken-1"
					>
						<v-icon>mdi-file-excel</v-icon>CSV
					</v-btn>
				</a>
				<v-btn
					dark
					class="blue lighten-1"
				>
					<v-icon>mdi-printer</v-icon> Print
				</v-btn>
			</div>
		</div>
		<v-card>
			<v-data-table
				:headers="headers"
				:items="items"
				:items-per-page="itemsPerPage"
				:server-items-length="total"
				:options.sync="options"
			>
				<template v-slot:item="{ item }">
					<tr>
						<td>{{ item.created_at }}</td>
						<td>{{ item.reference_no }}</td>
						<td>{{ item.expense_category.name }}</td>
						<td>USD {{ item.amount | formatNumber }}</td>
						<td>{{ item.expense_for }}</td>
						<td>{{ item.description }}</td>
						<td>{{ item.user.first_name }}</td>
						<td>
							<v-btn
								icon
								@click="editItem(item)"
								color="primary"
								outlined
							>
								<v-icon small>mdi-pencil</v-icon>
							</v-btn>
							<v-btn
								icon
								@click="deleteItem(item)"
								color="red"
								outlined
							>
								<v-icon small>mdi-delete</v-icon>
							</v-btn>
						</td>
					</tr>
				</template>
			</v-data-table>
		</v-card>
	</v-container>
</template>

<script>
	import moment from "moment";
	import Vue from "vue";

	var numeral = require("numeral");

	Vue.filter("formatNumber", function(value) {
		return numeral(value).format("0,0.00");
	});

	export default {
		name: "ExpenseList",
		created() {
			this.fetchData();
			this.fetchCategory();
		},

		data() {
			return {
				// date: new Date().toISOString().substr(0, 10),
				baseURL: process.env.APP_URL,
				category: [],
				users: [],
				menu1: false,
				items: [],
				search: "",
				form: {},
				total: 0,
				options: {},
				itemsPerPage: 5,
				page: 1,
				editedIndex: -1,
				created: true,
				dialog: false,
				headers: [
					{
						text: "Date",
						sortable: false
					},
					{
						text: "Reference No",
						sortable: false
					},
					{
						text: "Category",
						sortable: false
					},
					{
						text: "Amount",
						sortable: false
					},
					{
						text: "Expense For",
						sortable: false
					},
					{
						text: "Note",
						sortable: false
					},
					{
						text: "Created By",
						sortable: false
					},
					{
						text: "Actions",
						sortable: false
					}
				]
			};
		},

		watch: {
			search: {
				handler() {
					this.fetchData();
				}
			},

			options: {
				handler() {
					this.fetchData();
				}
			}
		},

		methods: {
			randomNumber() {
				return (this.form.code = Math.floor(
					1000000 + Math.random() * 90000000
				));
			},

			fetchCategory() {
				this.$axios
					.$get(`api/expense-category`)
					.then(res => {
						this.category = res;
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			fetchData() {
				this.$axios
					.$get(
						`api/expense?search=${this.search}&itemsPerPage=${this.options.itemsPerPage}&page=${this.options.page}`
					)
					.then(res => {
						this.items = res.data;
						this.total = res.meta.total;
						console.log(this.options);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			editItem(item) {
				this.editedIndex = this.items.indexOf(item);
				this.form = Object.assign({}, item);
				this.dialog = true;
			},

			closeDialog() {
				this.dialog = false;
				this.editedIndex = -1;
				this.form = {};
			},

			deleteItem(item) {
				if (confirm("Are u sure to delete it?")) {
					this.$axios
						.$delete(`/api/expense/` + item.id)
						.then(res => {
							this.fetchData();
							this.$toast.info("Succeessfully Delete");
						})
						.catch(err => {
							console.log(err.response);
						});
				}
			},

			createItem() {
				if (this.editedIndex > -1) {
					this.$axios
						.$patch(`/api/expense/` + this.form.id, {
							amount: this.form.amount,
							expense_category: this.form.expense_category,
							expense_for: this.form.expense_for,
							description: this.form.description
						})
						.then(res => {
							this.fetchData();
							this.closeDialog();
							this.$toast.info("Succeessfully Updated");
						})
						.catch(err => {
							console.log(err);
							this.$refs.form.validate(err.response.data.errors);
						});
				} else {
					this.$axios
						.$post(`/api/expense`, this.form)
						.then(res => {
							this.form = res.data;
							this.fetchData();
							this.$toast.info("Succeessfully Created");
							this.closeDialog();
						})
						.catch(err => {
							console.log(err.response);
							this.$refs.form.validate(err.response.data.errors);
						});
				}
			},

			uploadCsv(image) {
				const URL = "http://127.0.0.1:3000/product/category";

				let data = new FormData();
				data.append("name", "my-csv");
				data.append("file", event.target.files[0]);

				let config = {
					header: {
						"Content-Type": "csv"
					}
				};

				this.$axios.$put(URL, data, config).then(response => {
					console.log("Csv upload response > ", response);
				});
			}
		},

		computed: {
			computedDateFormattedMomentjs() {
				return this.date ? moment(this.date).format("DD-MM-YYYY") : "";
			}
		}
	};
</script>

<style lang="scss">
	.uploadCsv {
		border: 1px solid #161616;
		padding: 3px 0px 3px 10px;
	}

	.print {
		&--link {
			text-decoration: none;
		}
	}
</style>