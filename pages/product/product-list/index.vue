<template>
	<v-container>
		<div
			class="d-flex"
			id="div_id"
		>
			<div class="pb-5 pr-3">
				<nuxt-link
					to="/product/add-product"
					class="nuxt--link grey--text text--lighten-4"
				>
					<v-btn
						class="teal darken-1"
						dark
						v-permission="'add sales'"
					>
						<v-icon left>mdi-plus-circle</v-icon>Add Product
					</v-btn>
				</nuxt-link>
			</div>
			<div class="pb-5">
				<v-dialog
					v-model="dialog"
					max-width="700px"
					v-permission="'add sales'"
				>
					<template v-slot:activator="{ on }">
						<v-btn
							class="purple darken-1"
							dark
							v-on="on"
						>
							<v-icon left>mdi-file</v-icon>Import Product
						</v-btn>
					</template>

					<!-- Form Modal -->
					<v-card>
						<v-card-title class="headline font-weight-light">IMPORT PRODUCT</v-card-title>
						<v-divider></v-divider>
						<v-col cols="12">
							<p class="mt-5">The correct column order is (name*, parent_category) and you must follow this.</p>
						</v-col>
						<v-row class="px-4">
							<v-col cols="12">
								<label class="font-weight-bold">Upload CSV File</label>
								<input
									type="file"
									class="form-control"
									@change="fileOnChange($event)"
								/>
							</v-col>
						</v-row>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn
								color="red"
								text
								@click="dialog=false"
							>
								<v-icon>mdi-close</v-icon>Close
							</v-btn>
							<v-btn
								color="primary"
								@click="uploadCsv"
							>
								<v-icon>mdi-file-upload-outline</v-icon>Upload File
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</div>
		</div>
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
					:href="baseURL + `api/product/export_pdf`"
				>
					<v-btn
						class="red"
						dark
					>
						<v-icon>mdi-file-pdf</v-icon>PDF
					</v-btn>
				</a>

				<a
					class="print--link"
					:href="baseURL + `api/product/export`"
				>
					<v-btn
						dark
						class="green accent-4"
					>
						<v-icon>mdi-file-excel-outline</v-icon>CSV
					</v-btn>
				</a>
				<v-btn
					dark
					class="blue lighten-2"
					@click="printPage"
				>
					<v-icon>mdi-printer</v-icon>Print
				</v-btn>
			</div>
		</div>

		<div id="print-table">
			<v-data-table
				:headers="headers"
				:items="items"
				:items-per-page="itemsPerPage"
				:options.sync="options"
				:server-items-length="total"
			>
				<template v-slot:item="{ item }">
					<tr>
						<td v-if="item.image">
							<img
								:src="item.image_url"
								class="product-img"
							/>
						</td>
						<td v-else>
							<span>No Image</span>
						</td>
						<td>{{ item.name }}</td>
						<td>{{ item.code }}</td>
						<td>{{ item.unit }}</td>
						<td>USD {{ item.price |formatNumber }}</td>
						<td id="action">
							<v-tooltip
								top
								v-permission="'edit sales'"
							>
								<template v-slot:activator="{ on }">
									<v-btn
										icon
										small
										@click="viewItem(item.id)"
										color="cyan"
										outlined
										v-on="on"
									>
										<v-icon small>mdi-eye</v-icon>
									</v-btn>
								</template>
								<span>View</span>
							</v-tooltip>
							<v-tooltip
								top
								v-permission="'edit sales'"
							>
								<template v-slot:activator="{ on }">
									<v-btn
										icon
										small
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
										icon
										small
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

		</div>
	</v-container>
</template>


<script>
	import Vue from "vue";
	var numeral = require("numeral");

	Vue.filter("formatNumber", function(value) {
		return numeral(value).format("0,0.00");
	});

	export default {
		name: "Product",

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
				file: "",
				baseURL: process.env.APP_URL,
				barcode: [
					"Code 128",
					"Code 39",
					"UPC-A",
					"UPC-E",
					"EAN-8",
					"EAN-13"
				],
				items: [],
				search: "",
				form: {},
				page: 1,
				total: 0,
				options: {},
				itemsPerPage: 5,
				editedIndex: -1,
				created: true,
				dialog: false,
				dialog2: false,
				headers: [
					{
						text: "Image",
						sortable: false
					},
					{
						text: "Name",
						value: "name"
					},
					{
						text: "Code",
						sortable: false,
						value: "code"
					},
					{
						text: "Unit",
						sortable: false,
						value: "unit"
					},
					{
						text: "Price",
						sortable: false,
						value: "price"
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
				let vm = this;
				this.$axios
					.$get(
						`/api/product?temsPerPage=${this.options.itemsPerPage}&page=${this.options.page}`
					)
					.then(res => {
						vm.items = res.products.data;
						vm.total = res.products.total;
						console.log(res);
					})
					.catch(err => {
						console.log(err);
					});
			},

			editItem(id) {
				this.$router.push(`/product/product-list/${id}/edit`);
			},

			viewItem(id) {
				this.$router.push(`/product/product-list/${id}`);
			},

			deleteItem(item) {
				this.$axios
					.$delete(`api/product/` + item.id)
					.then(res => {
						this.fetchData();
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			fileOnChange(e) {
				this.file = e.target.files[0];
				console.log(this.file);
			},

			uploadCsv() {
				let formData = new FormData();
				formData.append("file", this.file);
				this.$axios
					.$post(`api/product/`, formData, {
						"Content-Type": "multipart/form-data"
					})
					.then(res => {
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			printPage() {
				window.print();
			}
		}
	};
</script>
<style lang="scss">
	.menu-list {
		background-color: #34495e;
		color: #fff;
	}

	.nuxt--link {
		display: block;
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

	.dialog2 {
		display: none;
	}

	.product-img {
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		border: 1px solid rgba(0, 0, 0, 0.125);
		width: 50px;
		height: 50px;
		margin-top: 5px;
	}

	.print {
		&--link {
			text-decoration: none;
		}
	}

	@media print {
		body * {
			visibility: hidden;
		}

		#print-table * {
			visibility: visible;
			font-size: 20px !important;
		}

		#print-table {
			position: absolute;
			top: 0;
			right: 0;
		}

		@page {
			size: 6in 9in;
			// margin-top: 0.75in;
		}

		#action * {
			visibility: hidden;
		}
	}
</style>
