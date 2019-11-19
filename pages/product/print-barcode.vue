<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<div class="py-3 px-5">
				<h3>
					Print Barcode
				</h3>
			</div>
			<v-divider></v-divider>
			<div class="px-5">
				<p class="caption font-italic pt-5">The field labels marked with * are required input fields.</p>
				<div class="d-flex flex-column">
					<label class="font-weight-bold">Add Product *</label>
					<v-text-field
						solo
						outlined
						dense
						append-icon="mdi-barcode"
						label="Please type, product code and select..."
						class="input"
					>
					</v-text-field>
				</div>
				<v-data-table
					:headers="headers"
				></v-data-table>
			</div>
			<v-row class="pl-5">
				<v-col sm="3" cols="6" class="d-flex align-center">
					<label for="">Print</label>
					<v-checkbox></v-checkbox>
				</v-col>
				<v-col sm="3" cols="6" class="d-flex align-center">
					<label for="">Product Name</label>
					<v-checkbox></v-checkbox>
				</v-col>
				<v-col sm="3" cols="6" class="d-flex align-center">
					<label for="">Price</label>
					<v-checkbox></v-checkbox>
				</v-col>
				<v-col sm="3" cols="6" class="d-flex align-center">
					<label for="">Promotion Price</label>
					<v-checkbox></v-checkbox>
				</v-col>
			</v-row>
			<v-btn class="blue mx-5 lighten-2 mb-5 grey--text text--lighten-4">
				<v-icon>mdi-check</v-icon>
				Submit
			</v-btn>
		</v-card>
	</v-app>
</template>

<script>
	export default {
		data() {
			return {
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
						text: 'Action',
						sortable: false,
					},
				],
			}
		}
	}
</script>

<style lang="scss">
	.input {
		width: 50%;
	}

	@media only screen and (max-width: 600px) {
		.input {
			width: 100%;
		}
	}
</style>