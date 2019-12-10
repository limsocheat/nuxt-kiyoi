<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<div class="py-3 px-5">
				<h3>
					Add Purchase
				</h3>
			</div>
			<v-divider></v-divider>
			<div class="px-5">
				<p class="caption font-italic pt-5">The field labels marked with * are required input fields.</p>
				<v-row>
					<v-col md="6" cols="12">
						<label class="font-weight-bold">Warehouse *</label>
						<v-select
							solo
							outlined
							dense
							label="Please type, product code and select..."
						>
						</v-select>
					</v-col>
					<v-col md="6" cols="12">
						<label class="font-weight-bold">Supplier</label>
						<v-select
							solo
							outlined
							dense
							label="Please type, product code and select..."
						>
						</v-select>
					</v-col>
					<v-col md="6" cols="12">
						<label class="font-weight-bold">Purchase Status</label>
						<v-select
							solo
							outlined
							dense
							label="Received"
							:items="purchase_status"
						>
						</v-select>
					</v-col>
					<v-col md="6" cols="12" class="d-flex flex-column">
						<label for="" class="font-weight-bold pt-1">Attach Document</label>
						<input type="file" @change="uploadFile($event)" class="attach-doc">
					</v-col>
					<v-col cols="12">
						<label class="font-weight-bold">Select Product</label>
						<div class="d-flex">
							<v-autocomplete
						      :items="products"
						      dense
						      solo
						      v-model="model"
						      item-text="name"
						      item-value="name"
						      return-object
						      clearable
	    					></v-autocomplete>
	    					<v-btn color="primary" @click="addTocart(model)"> 
	                 			<v-icon>mdi-circle-plus</v-icon>
	                 			Add
	               			</v-btn>
						</div>
					</v-col>
				</v-row>
				<div>
					<label class="font-weight-bold mb-3">Order Table</label>
					<table class="tablePurchase">
						<thead class="tablePurchase--header">
							<tr>
								<th>Name</th>
								<th>Code</th>
								<th>Quantity</th>
								<th>Discount</th>
								<th>Tax</th>
								<th>Total</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, index) in items">
								<td  class="tablePurchase--td">{{item.name}}</td>
								<td  class="tablePurchase--td">{{item.code}}</td>
								<td  class="tablePurchase--td">
									<input type="number" v-model="item.unit">
								</td>
								<td  class="tablePurchase--td">$ {{item.price}}</td>
								<td  class="tablePurchase--td">
	                              	<v-btn @click="removeItem(index)">
	                              		<v-icon>mdi-delete</v-icon>
	                              	</v-btn>
	                           </td>
							</tr>
						</tbody>
					</table>
				</div>
				<v-row>
					<v-col md="4" cols="12">
						<label for="" class="font-weight-bold">Order Tax</label>
						<v-select
							solo 
							outlined
							dense
						></v-select>
					</v-col>
					<v-col md="4" cols="12">
						<label for="" class="font-weight-bold">Discount</label>
						<v-text-field
							solo 
							outlined
							dense
						></v-text-field>
					</v-col>
					<v-col md="4" cols="12">
						<label for="" class="font-weight-bold">Shipping Cost</label>
						<v-text-field
							solo 
							outlined
							dense
						></v-text-field>
					</v-col>
				</v-row>
				<div class="d-flex flex-column mb-5">
					<label for="">Note</label>
					<textarea cols="30" rows="10" class="textarea"></textarea>
				</div>
			</div>
			<v-btn class="blue mx-5 lighten-2 mb-5 grey--text text--lighten-4">
				<v-icon>mdi-check</v-icon>
				Submit
			</v-btn>
		</v-card>
	</v-app>
</template>

<script>
	export default {
		name: 'Add Purchase',
		created() {
			this.fetchData()
		},

		data() {
			return {
				products: [],
				model: [],
				items: [],
				purchase_status: ['Received', 'Partial', 'Pending', 'Ordered'],
			}
		},

		methods: {
			fetchData() {
				this.$axios.$get(`/api/product`)
				.then(res => {
					this.products = res.data;
					console.log(res)
				})
				.catch(err => {
					console.log(err);
				})
			},

			addTocart (item) {
		        if(this.items.includes(item)) {
		          	alert("already there");
		        }else {
		          	this.items.push(item);
		        }

		        item.unit = 1;
		    },

			removeItem(index) {
		      	this.items.splice(index, 1)
		    },

			uploadFile(event) {
				const url = 'http://127.0.0.1:3000/product/add_adjustment';
				let data = new FormData();
				data.append('file', event.target.files[0]);
				let config = {
					header: {
						'content-Type' : 'image/*, application/pdf'
					}
				}

				this.$axios.$post(url,data,config)
				.then(res => {
					console.log(res);
				})
			}
		}
	}
</script>

<style lang="scss">

	.textarea {
		border: 1px solid rgba(0,0,0,0.125);
		outline: 1px solid #461577;
	}
	
	.attach-doc {
		border: 1px solid rgba(0,0,0,0.125);
		padding: 5px 10px 5px 10px;
	}
	
	.tablePurchase {
		width: 100%;
		margin-top: 10px;
		&--header {
			text-align: left;
		}

		&--td {
			border-bottom: 1px solid rgba(0,0,0,0.125);
		}
	}

</style>