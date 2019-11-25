<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<v-card-title class="headline font-weight-light">
				ADD PRODUCT
			</v-card-title>
			<v-divider></v-divider>
			<p class="px-5 pt-3">The field labels marked with * are required input fields.</p>
			<v-row class="px-5">
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="name">Product Name*</label>
					<v-text-field 
						outlined solo dense
						label="Product Name"
					></v-text-field>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">Product Code*</label>
					<div class="d-flex">
						<v-text-field 
							outlined solo dense
							label="Product Code"
						></v-text-field>
						<v-btn class="mx-1 mt-1">Generate</v-btn>
					</div>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">Product Type*</label>
					<v-select outlined solo dense :items="product_type" label="Please Select"></v-select>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">Barcode Symbology*</label>
					<v-select outlined solo dense :items="barcodes" label="Please Select"></v-select>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">Brand</label>
					<v-select outlined solo dense :items="brands" label="Please Select"></v-select>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">Category*</label>
					<v-select outlined solo dense :items="categories" label="Please Select"></v-select>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">Product Unit*</label>
					<v-select outlined solo dense :items="product_unit" label="Please Select"></v-select>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">Sale Unit</label>
					<v-select outlined solo dense :items="sale_unit" label="Please Select"></v-select>
				</v-col>
			</v-row>
			<v-row class="px-5">
				<v-col sm="6" cols="12">
					<label class="font-weight-bold">Purchaes Unit</label>
					<v-select outlined solo dense :items="purchase_unit" label="Please Select"></v-select>
				</v-col>
			</v-row>
			<v-row class="px-5">
				<v-col sm="6" cols="12">
					<label class="font-weight-bold">Purchases Cost*</label>
					<v-text-field 
						outlined solo dense
						label="Purchases Cost"
					></v-text-field>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold">Purchases Price*</label>
					<v-text-field 
						outlined solo dense
						label="Purchases Price"
					></v-text-field>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold">Alert Quantity</label>
					<v-text-field outlined solo dense></v-text-field>
				</v-col>
				<v-col sm="6" cols="12">
					<div class="d-flex align-center">
						<label class="font-weight-bold">Add Promotional Price</label>
						<v-checkbox
							outlined solo dense
							v-model="checkbox"
						></v-checkbox>
					</div>
				</v-col>
				<v-col sm="6" cols="12" v-if="checkbox">
					<label class="font-weight-bold">Promotional Price</label>
					<v-text-field
						outlined solo dense
						label="Promotion Price"
					></v-text-field>
				</v-col>
				<v-col cols="12" lg="6" v-if="checkbox">
					<label class="font-weight-bold" for="">Promotion Starts</label>
			        <v-menu
			          v-model="menu1"
			          :close-on-content-click="false"
			          max-width="290"
			        >
			          <template v-slot:activator="{ on }">
			            <v-text-field
			              :value="computedDateFormattedMomentjs"
			              clearable
			              label="Start of Promotion"
			              readonly
			              v-on="on"
			              solo 
			              outlined
			              dense
			            ></v-text-field>
			          </template>
			          <v-date-picker
			            v-model="date"
			            @change="menu1 = false"
			          ></v-date-picker>
			        </v-menu>
			    </v-col>
				<v-col cols="12" lg="6" v-if="checkbox">
					<label class="font-weight-bold" for="">Promotion Ends</label>
			        <v-menu
			          v-model="menu2"
			          :close-on-content-click="false"
			          max-width="290"
			        >
			          <template v-slot:activator="{ on }">
			            <v-text-field
			              :value="computedDateFormattedMomentjs"
			              clearable
			              label="End of Promotion"
			              readonly
			              v-on="on"
			              solo 
			              outlined
			              dense
			            ></v-text-field>
			          </template>
			          <v-date-picker
			            v-model="date"
			            @change="menu2 = false"
			          ></v-date-picker>
			        </v-menu>
			    </v-col>

				<v-col sm="6" cols="12">
					<label class="font-weight-bold">Product Tax</label>
					<v-select
						outlined solo dense
						label="No Tax"
						:items="tax"
					></v-select>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold">Tax Methods</label>
					<v-select
						outlined solo dense
						label="Exclusive"
						:items="tax_method"
					></v-select>
				</v-col>
				<v-col sm="12" cols="12">
					<label class="font-weight-bold" for="image">Product Image</label>
					<client-only>
						<picture-input 
					      ref="pictureInput"
					      width="1200" 
					      height="200" 
					      margin="16" 
					      accept="image/jpeg,image/png" 
					      size="10" 
					      button-class="btn"
					      :custom-strings="{
					        upload: '<p>Bummer!</p>',
					        drag: 'Uplode Image Here'
					      }"
					     >
					    </picture-input>
					</client-only>
				</v-col>
				<v-col md="12" sm="12" cols="12">
					<label class="font-weight-bold" for="">Product Details</label>
					<vue-editor v-model="content1"></vue-editor>
				</v-col>
				<v-col md="12" sm="12" cols="12">
					<label class="font-weight-bold" for="">Product Invoice Details</label>
					<vue-editor v-model="content2"></vue-editor>
				</v-col>
			</v-row>
			<v-card-actions>
				<v-btn color="primary">Create</v-btn>
			</v-card-actions>
		</v-card>
	</v-app>
</template>

<script>
	import moment from 'moment';
	export default {
		data() {
			return {
				checkbox: false,
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
</script>