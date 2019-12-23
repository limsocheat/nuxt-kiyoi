<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<div class="cyan darken-2 px-5">
				<v-card-title class="white--text">
					 EDIT SUPPLIER
				</v-card-title>
			</div>
			<v-divider></v-divider>
			<v-row class="px-5">
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="name">Name*</label>
					<validation-provider rules="required|min:3" v-slot="{ errors }">
						<input type="text" v-model="form.name" required class="supplier--form">
						<span class="text--error">{{ errors[0] }}</span>
					</validation-provider>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">Company Name*</label>
					<validation-provider rules="required" v-slot="{ errors }">
						<input type="text" v-model="form.company_name" required class="supplier--form">
						<span class="text--error">{{ errors[0] }}</span>
					</validation-provider>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">
						Image <span class="font-weight-light">(Optional)</span>
					</label>
					<input type="file" accept="image/*" required class="supplier--form">
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">
						VAT Number <span class="font-weight-light">(Optional)</span>
					</label>
					<input type="text" v-model="form.vat_number" required class="supplier--form">
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">Email</label>
					<validation-provider rules="required|email" v-slot="{ errors }">
						<input type="text" v-model="form.email" required class="supplier--form">
						<span class="text--error">{{ errors[0] }}</span>
					</validation-provider>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold">Phone Number</label>
					<validation-provider rules="required" v-slot="{ errors }">
						<input type="text" v-model="form.phone" required class="supplier--form">
						<span class="text--error">{{ errors[0] }}</span>
					</validation-provider>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">Address</label>
					<validation-provider rules="required" v-slot="{ errors }">
						<input type="text" v-model="form.address" required class="supplier--form">
						<span class="text--error">{{ errors[0] }}</span>
					</validation-provider>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">
						City <span class="font-weight-light">(Optional)</span>
					</label>
					<validation-provider rules="required" v-slot="{ errors }">
						<input type="text" v-model="form.city" required class="supplier--form">
						<span class="text--error">{{ errors[0] }}</span>
					</validation-provider>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">
						Post Code <span class="font-weight-light">(Optional)</span>
					</label>
					<validation-provider rules="required" v-slot="{ errors }">
						<input type="text" v-model="form.post_code" required class="supplier--form">
						<span class="text--error">{{ errors[0] }}</span>
					</validation-provider>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">
						Country <span class="font-weight-light">(Optional)</span>
					</label>
					<validation-provider rules="required" v-slot="{ errors }">
						<input type="text" v-model="form.country" required class="supplier--form">
						<span class="text--error">{{ errors[0] }}</span>
					</validation-provider>
				</v-col>
			</v-row>
			<v-btn class="mx-5 mb-5 mt-2" @click="editSupplier" color="primary" v-permission="'add users'">
				<v-icon left>mdi-check</v-icon>
				Submit
			</v-btn>
		</v-card>
	</v-app>
</template>

<script>
	export default {
		name: "editSupplier",
		data() {
			return {
				form: {}
			}
		},

		created() {
			this.$axios.$get('api/supplier/' + this.$route.params.id)
			.then(res => {
				this.form = res.supplier;
				console.log(res);
			})
			.catch(err => {
				console.log(err.response);
			})
		},

		methods: {
			editSupplier() {
				this.$axios.$post(`api/supplier/` + this.form.id, {
					'name': this.form.name,
					'company_name': this.form.company_name,
					'email': this.form.email,
					'phone': this.form.phone,
					'address': this.form.address,
					'city': this.form.city,
					'country': this.form.country,
					'vat_number': this.form.vat_number,
					'post_code': this.form.post_code,
					_method: 'patch',
				})
				.then(res => {
					this.$router.push(`/people/supplier`)
					console.log(res);
				})
				.catch(err => {
					console.log(err.response)
				})
			},
		}
	}
</script>

<style>
	.supplier--form {
		padding: 7px 5px 7px 5px;
		border: 1px solid #3a99c2;
		width: 100%;
		outline:  none;
	}

	.text--error {
		color:  red;
	}
</style>