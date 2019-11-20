<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<div class="purple lighten-1 py-2 px-5" dark>
				<h3>
					ADD CUSTOMER
				</h3>
			</div>
			<v-divider></v-divider>
			<v-row class="px-5">
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="name">Customer Group</label>
					<v-select 
						outlined solo dense
						label="Product Name"
					></v-select>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">Name</label>
					<v-text-field 
						outlined solo dense
						label="Name"
					></v-text-field>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">Email</label>
					<v-text-field outlined solo dense label="email@email.com"></v-text-field>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">Phone Number</label>
					<v-text-field outlined solo dense label="Phone Number"></v-text-field>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">Tax Number</label>
					<v-text-field outlined solo dense label="Tax Number"></v-text-field>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">Address</label>
					<v-text-field outlined solo dense label="Address"></v-text-field>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">City</label>
					<v-text-field outlined solo dense label="City"></v-text-field>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">State</label>
					<v-text-field outlined solo dense label="State"></v-text-field>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">Post Code</label>
					<v-text-field outlined solo dense label="Post Code"></v-text-field>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">Country</label>
					<v-text-field outlined solo dense label="Country"></v-text-field>
				</v-col>
			</v-row>
			<div class="pb-5 px-5">
				<v-btn color="primary">
					<v-icon left>mdi-check</v-icon>
					Submit
				</v-btn>
			</div>
		</v-card>
	</v-app>
</template>

<script>
	import moment from 'moment';
	export default {
		data() {
			return {
				product_type: 
				[
					'Standard', 'Combo', 'Digital',			
				],
				barcodes: ['Code 128', 'Code 39', 'UPC-A', 'UPC-E', 'EAN-8', 'EAN-13'],
				brands: ['HP', 'Apple', 'Samsung'],
				categories: ['Fruits', 'Electronics', 'Computer', 'Toy', 'Food', 'Accessories'],
				product_unit: ['Piece', 'Meter', 'Kilogram'],
				sale_unit: [],
				purchase_unit: [],
				menu1: false,
				menu2: false,
				date: new Date().toISOString().substr(0, 10),
				tax: ['No Tax', 'vat@10', 'vat@15', 'vat@20'],
				tax_method: ['Exclusive', 'Inclusive'],
				content1: '<p>ddd</p>',
				content2: '<p>ddd</p>',
			}
		},
		computed: {
		   	computedDateFormattedMomentjs () {
		        return this.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
		    },
    	},
	}
</scriptCUSTOMER