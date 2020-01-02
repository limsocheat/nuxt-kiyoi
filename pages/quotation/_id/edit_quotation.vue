<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<div class="py-3 px-5">
				<h3>Edit Quotation</h3>
			</div>
			<v-divider></v-divider>
			<div class="px-5">
				<p class="caption font-italic pt-5">The field labels marked with * are required input fields.</p>
				<v-row>
					<v-col md="4" cols="12">
						<label class="font-weight-bold" for="">Reference</label>
						<v-text-field solo dense outline>
							<input type="text" v-model="form.reference">
						</v-text-field>
					</v-col>
					<v-col md="4" cols="12">
						<label class="font-weight-bold" for="">Biller *</label>
						<v-select solo outlined dense v-model="form.biller"></v-select>
					</v-col>
					<v-col md="4" cols="12">
						<label class="font-weight-bold" for="">Supplier</label>
						<v-select solo outlined dense v-model="form.supplier"></v-select>
					</v-col>
					<v-col md="4" cols="12">
						<label class="font-weight-bold" for="">Customer *</label>
						<v-select solo outlined dense v-model="form.customer"></v-select>
					</v-col>
					<v-col md="4" cols="12">
						<label class="font-weight-bold" for="">Warehouse *</label>
						<v-select solo outlined dense v-model="form.warehouse"></v-select>
					</v-col>
					<v-col cols="12">
						<label class="font-weight-bold" for="">Select Product</label>
						<v-text-field
							solo
							outlined
							dense
							label="Please type product code and select"
							append-icon="mdi-barcode"
						></v-text-field>
					</v-col>
				</v-row>
				<div>
					<label class="font-weight-bold">Order Table</label>
					<v-data-table :headers="headers"></v-data-table>
				</div>
				<v-row>
					<v-col md="4" cols="12">
						<label for class="font-weight-bold">Order Tax</label>
						<v-select solo outlined dense></v-select>
					</v-col>
					<v-col md="4" cols="12">
						<label for class="font-weight-bold">Discount</label>
						<v-text-field solo outlined dense></v-text-field>
					</v-col>
					<v-col md="4" cols="12">
						<label for class="font-weight-bold">Shipping Cost</label>
						<v-text-field solo outlined dense></v-text-field>
					</v-col>
					<v-col md="4" cols="12">
						<label for class="font-weight-bold">Status</label>
						<v-select solo outlined dense></v-select>
					</v-col>

					<v-col md="4" cols="12" class="d-flex flex-column">
						<label for class="font-weight-bold pt-1">Attach Document</label>
						<input type="file" @change="uploadFile($event)" class="quotationCsv" />
					</v-col>
				</v-row>
				<div class="d-flex flex-column mb-5">
					<label for>Note</label>
					<textarea cols="30" rows="10" class="textarea"></textarea>
				</div>
				<v-btn class="blue darken-2 mb-5" dark v-permission="'add quotation'">
					<v-icon>mdi-check</v-icon>Submit
				</v-btn>
			</div>
		</v-card>
	</v-app>
</template>

<script>
	export default {
		data() {
			return {
				headers: [
					{
						text: "Name",
						sortable: false
					},
					{
						text: "Code",
						sortable: false
					},
					{
						text: "Quantity",
						sortable: false
					},
					{
						text: "Net Unit Cost",
						sortable: false
					},
					{
						text: "Discount",
						sortable: false
					},
					{
						text: "Tax",
						sortable: false
					},
					{
						text: "SubTotal",
						sortable: false
					},
					{
						text: "Action",
						sortable: false
					}
				],
				form: {},
				purchase_status: ["Received", "Partial", "Pending", "Ordered"]
			};
		},
		methods: {
			uploadFile(event) {
				const url = "http://127.0.0.1:3000/product/add_adjustment";
				let data = new FormData();
				data.append("file", event.target.files[0]);
				let config = {
					header: {
						"content-Type": "image/*, application/pdf"
					}
				};

				this.$axios.$post(url, data, config).then(res => {
					console.log(res);
				});
			}
		}
	};
</script>

<style lang="scss">
	.textarea {
		border: 1px solid rgba(0, 0, 0, 0.125);
		outline: 1px solid #461577;
	}

	.quotationCsv {
		border: 1px solid rgba(0, 0, 0, 0.3);
		padding: 3px 0px 3px 10px;
	}

	.member--form {
		// border: 1px solid #22cde0;
		padding: 5px 10px 5px 10px;
		width: 100%;
		outline: none;
	}
	
</style>