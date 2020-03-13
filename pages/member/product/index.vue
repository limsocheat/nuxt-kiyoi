<template>
	<v-container>
		<v-card>
			<v-card-title class="d-flex justify-space-between">
				<div>
			 		Product Page
				</div>
				<div>
				 	<v-btn
				      color="primary"
				      dark
				      @click.stop="dialog = true"
				    >
				      <v-icon>mdi-cart</v-icon>Cart({{ qty }})
				    </v-btn>
				</div>

			</v-card-title>
		</v-card>
		
	    <v-dialog
	      v-model="dialog"
	      max-width="800"
	    >
	     	<v-card>
	     		<v-card-title>Product Cart</v-card-title>
	     		<v-divider></v-divider>
	     		<v-card-text>
	     			<table style="width: 100%">
	     				<tr v-for="(product, index) in this.form.items" :key="index">
	     					<td>
	     						<img :src="baseURL + `image/${product.image}`" alt="" width="50">
	     					</td>
	     					<td>{{ product.name }}</td>
	     					<td> 
								<span>
									<v-btn @click="minusItem(product)" small color="red" outlined icon>
										<v-icon small>mdi-minus</v-icon>
									</v-btn>
								</span>
								<span class="px-1">{{ form.items[index].quantity }}</span>
								<span>
									<v-btn @click="plusItem(product)" small color="primary" outlined icon>
										<v-icon small>mdi-plus</v-icon>
									</v-btn>
								</span>
	     					</td>
	     					<td>
	     						$ {{ totalPrice(product) }}
	     					</td>
	     					<td>
	     						<v-btn outlined color="red" @click="removeItem(index)"> 
	     							<v-icon>mdi-close</v-icon>
	     						</v-btn>
	     					</td>
	     				</tr>
	     			</table>
	     		</v-card-text>
	     		<v-divider></v-divider>
		        <v-card-actions>
		          	<v-spacer></v-spacer>
			        <v-btn
			            color="green darken-1"
			            text
			            @click="dialog = false"
			        >
			            Cancel
			        </v-btn>

			        <v-btn
			            color="green darken-1"
			            text
			            @click="dialog = false"
			        >
	            		Agree
	          		</v-btn>
	        	</v-card-actions>
	     	</v-card>
	    </v-dialog>
		<v-row>
			<template v-for="product in products">
				<v-col cols="12" md="4">
					<v-card :key="product.id">
						<div class="text-center">
							<img class="product_image" :src="baseURL + `image/${product.image}`" alt="">
						</div>
						<div class="px-10 product">
							<div class="py-3">
								<pre>
									Category: <span class="product--category">{{ product.category.name }}</span>
								</pre>
							</div>
							<pre>
								Name: <span class="product--name">{{ product.name }}</span>
							</pre>
							<div class="py-3">
								<pre>
									Price: <span class="product--price">$ {{ product.price }}</span>
								</pre> 
							</div>
						</div>
						<div class="text-center pt-3 pb-5">
							<v-btn class="mx-2 pink lighten-2" dark @click="ViewProduct(product.id)">
								<v-icon>mdi-eye</v-icon>View
							</v-btn>
							<v-btn class="light-blue accent-3"  @click="addTocart(product)" dark>
								<v-icon>mdi-cart-plus</v-icon>Cart
							</v-btn>
						</div>
					</v-card>
				</v-col>
			</template>
		</v-row>
	</v-container>
</template>

<script>

import Vue from 'vue';
export default {
	name: 'Cart',
	created() {
		this.getProduct()
	},

	data() {
		return {
			products: [],
			baseURL: process.env.APP_URL,
			form: {
				items: []
			},
			dialog: false,
		}
	},

	computed: {
		qty() {
			return this.form.items.reduce((total, item) => {
				return total + item.quantity;
			}, 0);
		}
	},

	methods: {
		getProduct() {
			this.$axios.$get(`api/product`)
			.then(res => {
				this.$set(this.$data, 'products', res.products.data)
				console.log(res);
			})
			.catch(err => {
				console.log(err.response);
			})
		},

		ViewProduct(id) {
			this.$router.push(`/member/product/${id}`)
		},

		addTocart(item) {
			if(this.form.items.includes(item)) {
				Vue.set(item, "quantity", (item.quantity += 1));
			}
			else {
				this.form.items.push(item)
				this.$set(item, 'quantity', 1)
			}
		},

		totalPrice(product) {
			return product.price * product.quantity;
		},

		// Add More Quantity
		plusItem(item) {
			if (this.form.items.includes(item)) {
				Vue.set(item, "quantity", (item.quantity += 1));
			}
			console.log(item);
		},

		// Minus Quantity of item
		minusItem(item) {
			Vue.set(item, "quantity", (item.quantity -= 1));
		},

		removeItem(index) {
			this.form.items.splice(index, 1)
		}
	}
}

</script>

<style lang="scss">

pre {
	white-space: pre-line;
}

.product_image {
	border: 1px solid #F5F5F5;
	padding: 10px 20px 10px 20px;
}

.product {
	&--name {
		color: #464d69;
	}

	&--price {
		color: #3a8db0;
	}

	&--category {
		color: #6415bf;
	}

	&--btn {
		border: 1px solid #61a819;
		padding: 5px 10px 5px 10px;
		border-radius: 3px;
		outline: none;
	}
}

</style>