<template>
	<v-container>
		<v-card>
			<v-card-title>Product Detail</v-card-title>

			<v-divider></v-divider>
			<v-row>
				<v-col md="4">
					<div class="text-center">
						<img class="product--image" :src="baseURL + `image/${product.image}`" alt="" >
					</div>
				</v-col>
				<v-col md="8">
					<div class="product">
						<div class="d-flex justify-space-between">
							<pre class="pb-3 font-weight-bold">
								Name: <span class="product--name">{{ product.name }}</span>
							</pre>
							<v-btn class="mx-5 cyan lighten-3" @click="goBack">
								<v-icon>mdi-arrow-left-bold-circle-outline</v-icon>Back
							</v-btn>
						</div>
						<pre>
							<span class="font-weight-bold">Description:</span> <span class="product--description" v-html="product.description "></span>
						</pre>
						<pre>
							Price: <span class="product--price">$ {{ product.price }}</span>
						</pre>
					</div>
				</v-col>				
			</v-row>
		</v-card>
	</v-container>
</template>

<script>
export default {	
	created() {
		this.getProduct()
	},

	data() {
		return {
			product: [],
			baseURL: process.env.APP_URL,
		}
	},

	methods: {
		getProduct() {
			this.$axios.$get(`api/product/` + this.$route.params.id)
			.then(res => {
				this.$set(this.$data, 'product', res.product);
				console.log(res);
			})
			.catch(err => {
				console.log(err.response);
			})
		},

		goBack() {
			this.$router.push(`/member/product`)
		}
	}
}
</script>

<style>

pre {
	white-space: pre-line;
	text-overflow: ellipsis;
}

.product--image {
	border:  1px solid #380652;
	padding: 50px 50px;
}

.product {
	&--name {
		color: #464d69;
	}
	
	&--price {
		color: #3a8db0;
	}
}
</style>