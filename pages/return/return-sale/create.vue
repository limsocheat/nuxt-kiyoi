<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<div class="py-3 px-5">
				<h3>Add Return</h3>
			</div>
			<v-divider></v-divider>
			<div class="px-5">
				<p class="caption font-italic pt-5">The field labels marked with * are required input fields.</p>
				<v-row>
					<v-col md="4" cols="12">
						<label class="font-weight-bold" for="name">Warehouse *</label>
						<v-autocomplete 
							item-value="name" 
							item-text="name"  
							dense solo outlined 
							:items="location"
							label="Please type, product code and select..."
						></v-autocomplete >
					</v-col>
					<v-col md="4" cols="12">
						<label class="font-weight-bold" for="name">Supplier</label>
						<v-autocomplete 
							item-value="name" 
							item-text="name"  
							dense solo outlined 
							:items="suppliers"
							label="Please type, product code and select..."

						></v-autocomplete >
					</v-col>
					<v-col md="4" cols="12">
						<label class="font-weight-bold">Account</label>
						<v-select 
							solo outlined dense 
							label="Received" 
							:items="purchase_status"
						></v-select>
						
					</v-col>
					<v-col md="12" col="12">
						<label for>Select Product</label>
						<v-text-field
							solo
							outlined
							dense
							label="Please type code and Select"
							append-icon="mdi-barcode"
						></v-text-field>
					</v-col>
				</v-row>
				<div>
					<label class="font-weight-bold">Order Table</label>
					<v-data-table :headers="headers"></v-data-table>
				</div>
				<v-row>
					<v-col md="6" cols="12" class="d-flex flex-column mb-5">
						<label for class="font-weight-bold pt-1">Attach Document</label>
						<input type="file" @change="uploadFile($event)" class="attachDoc" />
					</v-col>
					<v-col md="6" cols="12">
						<label for class="font-weight-bold">Order Tax</label>
						<v-select solo outlined dense></v-select>
					</v-col>
					<v-col md="6" cols="12">
						<div class="d-flex flex-column mb-5">
							<label for class="font-weight-bold">Return Note</label>
							<textarea cols="30" rows="10" class="textarea"></textarea>
						</div>
					</v-col>
					<v-col md="6" cols="12">
						<div class="d-flex flex-column mb-5">
							<label for class="font-weight-bold">Staff Note</label>
							<textarea cols="30" rows="10" class="textarea"></textarea>
						</div>
					</v-col>
				</v-row>
			</div>
			<v-btn class="blue mx-5 darken-2 mb-5" v-permission="'return sales'" dark>
				<v-icon>mdi-check</v-icon>Submit
			</v-btn>
		</v-card>
	</v-app>
</template>

<script>
	export default {

		create(){
			this.fetchReturnSale()
			
		},

		data() {
			return {
				location:[],
				suppliers:[],

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
				purchase_status: ["Received", "Partial", "Pending", "Ordered"]
			};
		},
		methods: {

			fetchReturnSale(){
				this.$axios.$get(`api/return-sale`)
				.then(res =>{
					this.location = res.location.data;
					this.suppliers= res.suppliers.data;
					console.log(res)
				})
			},
			

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

	.attachDoc {
		padding: 3px 10px 3px 10px;
		border: 1px solid rgba(0, 0, 0, 0.2);
	}
</style>