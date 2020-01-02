<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<v-card-title class="headline teal darken-2 white--text">
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
						v-model="form.name"
					></v-text-field>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">Product Code*</label>
					<div class="d-flex">
						<v-text-field 
							outlined solo dense
							label="Product Code"
							v-model="form.code"
						></v-text-field>
						<v-btn 
							class="mx-1 mt-1" color="primary" 
							dark 
							@click="randomNumber"
						>
							Generate
						</v-btn>
					</div>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">Product Type*</label>
					<v-select 
						outlined solo dense 
						:items="product_type" 
						label="Please Select"
						v-model="form.type"
					>
					</v-select>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">Brand*</label>
					<v-autocomplete 
						outlined 
						solo dense 
						:items="items"
						item-text="brand.name"
						item-value="brand.name"
						label="Select Brand"
						v-model="form.brand"
					>
					</v-autocomplete>
				</v-col>
				<v-col sm="12" cols="12">
					<label class="font-weight-bold" for="">Barcode Symbology*</label>
					<v-select 
						outlined solo dense :items="barcodes" 
						label="Please Select"
						v-model="form.barcode"
					></v-select>
				</v-col>
			</v-row>
			<v-row class="px-5">
				<v-col sm="6" cols="12">
					<label class="font-weight-bold">Product Unit*</label>
					<v-text-field 
						outlined solo dense
						label="Purchases Unit"
						v-model="form.unit"
						type="number"
					></v-text-field>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold">Purchases Price*</label>
					<v-text-field 
						outlined solo dense
						label="Purchases Price"
						v-model="form.price"
						type="number"
					></v-text-field>
				</v-col>
				<v-col sm="12" cols="12">
					<label class="font-weight-bold"  for="image">Product Image</label>
					<div v-if="url" class="preview--image">
						<img :src="form.image" class="img-responsive" height="300">
					</div>
					<input type="file" @change="uploadImage($event)" class="product--image">
				</v-col>
				<v-col md="12" sm="12" cols="12">
					<label class="font-weight-bold" for="">Product Details</label>
					<vue-editor v-model="form.description"></vue-editor>
				</v-col>
			</v-row>
			<v-card-actions class="px-5">
				<v-btn color="primary" @click.prevent="createItem">
					<v-icon>mdi-check</v-icon>
					Create
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-app>
</template>

<script>
	import moment from 'moment';
	export default {
		name: "AddProduct",
		created() {
			this.fetchData()
		},

		data() {
			return {
				form: {
					code: '',
				},
				items: [],
				url: null,
				itemsPerPage: 5,
				product_type: 
				[
					'Standard', 'Combo', 'Digital',			
				],
				barcodes: ['Code 128', 'Code 39', 'UPC-A', 'UPC-E', 'EAN-8', 'EAN-13'],
				tax: ['No Tax', 'vat@10', 'vat@15', 'vat@20'],
				tax_method: ['Exclusive', 'Inclusive'],
			}
		},
		computed: {
		   	computedDateFormattedMomentjs () {
		        return this.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
		    },
    	},

    	methods: {
		    randomNumber() {
		     	return this.form.code = Math.floor(1000000 + Math.random() * 90000000)
		    },

		    fetchData() {
		    	this.$axios.$get(`api/product`)
		    	.then(res => {
		    		this.items = res.data;
		    		console.log(res);
		    	})
		    },

		    createItem() {
		    	this.$axios.$post(`api/product`, this.form)
		    	.then(res => {
		    		this.items = res.data;
		    		this.$toast.info('Succeessfully created');
		    		this.$router.push('/product/product-list');
		    	})
		    	.catch(err => {
		    		console.log(err.response);
		    	})
		    },

		    uploadImage(e) {
                const images = e.target.files[0];
                const reader = new FileReader();

                reader.readAsDataURL(images);
                reader.onload = e =>  {
                    this.form.image = e.target.result;
                    console.log(this.form);
                }

                this.url = URL.createObjectURL(images)
            },
    	}
	}
</script>

<style lang="scss">
	.product--image {
		border: 1px solid rgba(0,0,0,0.125);
		padding: 5px 5px 5px 5px;
		width: 100%;
	}

	.preview--image {
		text-align: center;
	}
</style> 