<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<div class="blue ligthen-2">
				<v-card-title class="white--text px-5">
					Add Transfer
				</v-card-title>
			</div>
			<v-divider></v-divider>
			<div class="px-5">
				<p class="caption font-italic pt-5">The field labels marked with * are required input fields.</p>
				<v-row>
					<v-col md="4" cols="12">
						<label class="font-weight-bold">From Warehouse *</label>
						<validation-provider rules="required" v-slot="{ errors }">
							<v-select :options="items" required label="id"></v-select>
							<span class="transfer--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col md="4" cols="12">
						<label class="font-weight-bold">To Warehouse *</label>
						<validation-provider rules="required" v-slot="{ errors }">
							<v-select></v-select>
							<span class="transfer--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col md="4" cols="12">
						<label class="font-weight-bold">Status</label>
						<validation-provider rules="required" v-slot="{ errors }">
							<v-select></v-select>
							<span class="transfer--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col cols="12">
						<label class="font-weight-bold">Select Product</label>
						<validation-provider rules="required" v-slot="{ errors }">
							<input type="text" class="transfer--input" required v-model="form.email">
							<span class="transfer--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
				</v-row>
				<div>
					<label class="font-weight-bold">Order Table</label>
					<v-data-table
						:headers="headers"
					></v-data-table>
				</div>
				<v-row>
					<v-col md="4" cols="12">
						<label for="" class="font-weight-bold">Shipping Cost</label>
						<validation-provider rules="required" v-slot="{ errors }">
							<input type="text" class="transfer--input">
							<span class="transfer--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col md="4" cols="12" class="d-flex flex-column">
						<label for="" class="font-weight-bold pt-1">Attach Document</label>
						<input type="file" @change="uploadFile($event)" class="quotationCsv">
					</v-col>
				</v-row>
				<div class="d-flex flex-column mb-5">
					<label for="">Note</label>
					<textarea cols="30" rows="7" class="textarea"></textarea>
				</div>
			</div>
			<v-btn class="blue mx-5 mb-5 darken-2" dark v-permission="'add transfer'">
				<v-icon>mdi-check</v-icon>
				Submit
			</v-btn>
		</v-card>
	</v-app>
</template>

<script>
	export default {
		name: "AddTransfer",
		created() {
			this.fetchData()
		},

		data() {
			return {
				form: {},
				items: [],
				headers: [
					{
						text: 'Name',
						sortable: false,
					},
					{
						text: 'Code',
						sortable: false,
					},
					{
						text: 'Quantity',
						sortable: false,
					},
					{
						text: 'Net Unit Cost',
						sortable: false,
					},,
					{
						text: 'Tax',
						sortable: false,
					},
					{
						text: 'SubTotal',
						sortable: false,
					},
					{
						text: 'Action',
						sortable: false,
					},
				],
			}
		},
		methods: {
			fetchData() {
				this.$axios.$get(`api/transfer`)
				.then(res => {
					this.items = res.transfer;
					console.log(res);
				}).catch(err => {
					console.log(err.response);
				})
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
		outline: 1px solid #60e688;
	}
	
	.quotationCsv {
		border: 1px solid rgba(0,0,0,0.300);
		padding: 3px 0px 3px 10px;
		border: 1px solid #60e688;
	}

	.transfer--input {
		border: 1px solid #60e688;
		width: 100%;
		padding: 5px 10px 5px 10px;
		outline: none;
		border-radius: 3px;
	}

	.transfer--text {
		color: red;
	}

</style>	