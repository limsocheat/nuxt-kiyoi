<template>
	<v-app class="mx-5 my-5">
		<div class="d-flex">
			<div class="pb-5 d-flex">
				<nuxt-link
					class="nuxt--link"
					to="/purchase/add_purchase"
				>
					<v-btn
						class="teal darken-1"
						dark
						v-permission="'add sales'"
					>
						<v-icon left>mdi-plus-circle</v-icon>Add Purchase
					</v-btn>
				</nuxt-link>

				<div>
					<v-dialog
						v-model="dialog"
						width="650"
					>
						<template v-slot:activator="{ on }">
							<v-btn
								class="purple darken-1"
								dark
								v-permission="'add sales'"
								v-on="on"
							>
								<v-icon left>mdi-file</v-icon>Import Purchase
							</v-btn>
						</template>

						<v-card>
							<v-card-title>Import Purchase</v-card-title>
							<input
								type="file"
								@change="fileOnChange"
							>
						</v-card>
						<v-divider></v-divider>
						<v-btn
							color="primary"
							@click="uploadFile"
						>
							<v-icon>mdi-file-upload-outline</v-icon>Upload
						</v-btn>
					</v-dialog>
				</div>

			</div>
		</div>

		<!-- Export File -->
		<div class="d-flex justify-space-between">
			<div>
				<v-text-field
					label="Search"
					solo
					outlined
					dense
				></v-text-field>
			</div>
			<div class="print">
				<a
					class="print--link"
					:href="baseURL + '/api/purchase/export-pdf'"
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
					:href="baseURL + '/api/purchase/export'"
				>
					<v-btn
						dark
						class="teal lighten-2"
					>
						<v-icon>mdi-file-excel-outline</v-icon>CSV
					</v-btn>
				</a>
				<v-btn
					dark
					class="blue lighten-1"
				>
					<v-icon>mdi-printer</v-icon>Print
				</v-btn>
			</div>
		</div>
		<v-card>
			<v-data-table
				:headers="headers"
				:items="items"
				:items-per-page="itemsPerPage"
				:options.sync="options"
				:server-items-length="total"
			>
				<template v-slot:item="{ item }">
					<tr class="viewPurchase">
						<td @click="viewPurchase(item.id)">{{ item.created_at }}</td>
						<td @click="viewPurchase(item.id)">{{ item.reference_no }}</td>
						<td
							v-if="item.supplier"
							@click="viewPurchase(item.id)"
						>{{ item.supplier.name }}</td>
						<td v-else>N/A</td>
						<!-- <td @click="viewPurchase(item.id)">USD {{ item }}</td> -->
						<td>
							<span :class="item.purchase_status === 'Received' ? 'received' : 'ordered'">{{ item.purchase_status }}</span>
						</td>
						<td>
							<span :class="item.payment_status === 'Paid' ? 'Paid' : 'due'">{{ item.payment_status }}</span>
						</td>
						<td>
							<v-tooltip
								top
								v-permission="'edit sales'"
							>
								<template v-slot:activator="{ on }">
									<v-btn
										small
										icon
										@click="viewPurchase(item.id)"
										color="teal"
										outlined
										v-on="on"
									>
										<v-icon small>mdi-eye</v-icon>
									</v-btn>
								</template>
								<span>View Purchase</span>
							</v-tooltip>
							<v-tooltip
								top
								v-permission="'edit sales'"
							>
								<template v-slot:activator="{ on }">
									<v-btn
										small
										icon
										@click="editItem(item.id)"
										color="primary"
										outlined
										v-on="on"
									>
										<v-icon small>mdi-pencil</v-icon>
									</v-btn>
								</template>
								<span>Edit</span>
							</v-tooltip>
							<v-tooltip
								top
								v-permission="'delete sales'"
							>
								<template v-slot:activator="{ on }">
									<v-btn
										small
										icon
										@click="deleteItem(item)"
										color="red"
										outlined
										v-on="on"
									>
										<v-icon small>mdi-delete</v-icon>
									</v-btn>
								</template>
								<span>Delete</span>
							</v-tooltip>
						</td>
					</tr>
				</template>
			</v-data-table>
		</v-card>
	</v-app>
</template>


<script>
	import moment from "moment";
	import Vue from "vue";

	var numeral = require("numeral");

	Vue.filter("formatNumber", function(value) {
		return numeral(value).format("0,0.00");
	});

	export default {
		created() {
			this.fetchData();
		},

		watch: {
			options: {
				handler() {
					this.fetchData();
				}
			}
		},

		data() {
			return {
				dialog: false,
				baseURL: process.env.APP_URL,
				items: [],
				search: "",
				form: {},
				total: 0,
				options: {},
				itemsPerPage: 5,
				editedIndex: -1,
				created: true,
				headers: [
					{
						text: "Date",
						sortable: false,
						value: "date"
					},
					{
						text: "Reference No",
						sortable: false,
						value: "date"
					},
					{
						text: "Supplier",
						sortable: false,
						value: "supplier"
					},
					// {
					// 	text: "Paid",
					// 	sortable: false,
					// 	value: "paid"
					// },
					{
						text: "Purchase Status",
						sortable: false,
						value: "purchase_status"
					},
					{
						text: "Payment Status",
						sortable: false,
						value: "payment_status"
					},
					{
						text: "Actions",
						sortable: false,
						value: "action"
					}
				]
			};
		},

		methods: {
			fetchData() {
				this.$axios
					.$get(
						`api/purchase?temsPerPage=${this.options.itemsPerPage}&page=${this.options.page}`
					)
					.then(res => {
						// this.items = res.data;
						this.$set(this.$data, "items", res.data);
						this.total = res.total;
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			editItem(id) {
				this.$router.push(`/purchase/${id}/edit`);
			},

			deleteItem(item) {
				if (confirm("Are u sure to Delete it?")) {
					this.$axios
						.$delete(`api/purchase/` + item.id)
						.then(res => {
							this.items = res.data;
							this.fetchData();
							console.log(res);
							this.$toast.success("Deleted Purchase Sucessfully");
						})
						.catch(err => {
							console.log(err.response);
							this.$toast.error("Please Try Again!!");
						});
				}
			},

			fileOnChange(e) {
				this.file = e.target.files[0];
				console.log(this.file);
			},

			uploadFile() {
				let formData = new FormData();

				let file = formData.append("file", this.file);

				console.log(this.file);

				this.$axios
					.$post(`api/purchase-upload`, formData)
					.then(res => {
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			viewPurchase(id) {
				this.$router.push(`/purchase/${id}`);
			}
		}
	};
</script>

<style lang="scss">
	.nuxt--link {
		text-decoration: none;
	}

	.form-control {
		width: 100%;
		padding-bottom: 5px;
		padding-top: 5px;
		padding-right: 10px;
		padding-left: 10px;
		outline: none;
		border-radius: 5px;
		border: 1px solid #616161;
	}

	.received {
		background: blue;
		padding: 7px 7px 7px 7px;
		color: #ffffff;
		border-radius: 3px;
	}

	.due {
		background: #d4e157;
		padding: 7px 7px 7px 7px;
		border-radius: 3px;
	}

	.Paid {
		background: #3c8dbc;
		padding: 7px 7px 7px 7px;
		color: #fff;
		border-radius: 3px;
	}

	.ordered {
		background: #00c0ef;
		padding: 10px 10px 10px 10px;
	}

	.viewPurchase {
		cursor: pointer;
	}

	.print {
		&--link {
			text-decoration: none;
		}
	}
</style>
