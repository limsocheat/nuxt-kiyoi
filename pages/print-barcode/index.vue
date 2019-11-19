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
				<v-data-table
					:headers="headers"
				></v-data-table>
			</div>
			<div class="d-flex px-5">
				<div class="d-flex align-center pr-5">
					<label for="">Print</label>
					<v-checkbox></v-checkbox>
				</div>
				<div class="d-flex align-center px-5">
					<label for="">Product Name</label>
					<v-checkbox></v-checkbox>
				</div>
				<div class="d-flex align-center px-5">
					<label for="">Price</label>
					<v-checkbox></v-checkbox>
				</div>
				<div class="d-flex align-center px-5">
					<label for="">Promotion Price</label>
					<v-checkbox></v-checkbox>
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
</style>