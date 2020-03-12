<template>
	<v-container>
		<v-card>
			<v-card-title>
			 	<v-icon>mdi-cart</v-icon>Product Page
			</v-card-title>
		</v-card>
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
							<v-btn class="light-blue accent-3" dark>
								<v-icon>mdi-cart-plus</v-icon>Buy
							</v-btn>
						</div>
					</v-card>
				</v-col>
			</template>
		</v-row>
	</v-container>
</template>

<script>
	
export default {

	created() {
		this.getProduct()
	},

	data() {
		return {
			products: [],
			baseURL: process.env.APP_URL,
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