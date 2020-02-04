<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<div class="teal lighten-2" dark>
				<v-card-title class="white--text">
					Edit Quotation
				</v-card-title >
			</div>
			<v-divider></v-divider>
			<v-row class="px-5">
				<v-col sm="4" cols="12">
					<label class="font-weight-bold" for="name">Customer*</label>
					<ValidationProvider v-slot="{ errors }">
						<input type="text" class="member--form" required v-model="form.members">
				      	<span class="red--text">{{ errors[0] }}</span>
				    </ValidationProvider>
				</v-col>
				<v-col sm="4" cols="12">
					<label class="font-weight-bold" for="">Suppliers *</label>
					<ValidationProvider v-slot="{ errors }">
						<input type="text" class="member--form" required v-model="form.suppliers">
						<span class="red--text">{{ errors[0] }}</span>
					</ValidationProvider>
				</v-col>
				<v-col sm="4" cols="12">
					<label class="font-weight-bold" for="">
						Date
					</label>
					<input type="text" class="member--form" required v-model="form.date">
				</v-col>
				<v-col sm="4" cols="12">
					<label class="font-weight-bold" for="">
						Reference
					</label>
					<input type="text" class="member--form" required v-model="form.reference">
				</v-col>
				<v-col sm="4" cols="12">
					<label class="font-weight-bold" for="">
						Warehouse 
					</label>
					<input type="text" class="member--form" required v-model="form.warehouse">
				</v-col>
				<v-col sm="4" cols="12">
					<label class="font-weight-bold" for="">
						Biller *
					</label>
					<input type="text" class="member--form" required v-model="form.biller">
				</v-col>
			</v-row>
			<div class="pb-5 pt-3 px-5">
				<v-btn color="primary" v-permission="'add users'" @click="createBiller">
					<v-icon left>mdi-check</v-icon>
					Submit
				</v-btn>
			</div>
		</v-card>
	</v-app>
</template>

<script>
	export default {
			
		data() {
			return {
				form: {},
			}
		},

		created() {
			this.$axios.$get('api/quotation/' + this.$route.params.id)
			.then(res => {
				this.form = res.quotations;
				console.log(res)
			})
		},

		methods: {
			createBiller() {
				this.$axios.$post(`api/quotation/` + this.form.id, {
					'members': this.form.members,
					'suppliers': this.form.suppliers,
					_method: 'patch',
				})
				.then(res => {
					this.items = res.data;
					this.$router.push('/quotation/quotations');
				})
				.catch(err => {
					console.log(err.response.data)
				})
			},
		},	
	}
</script>

<style lang="scss">
	.member--form {
		border: 1px solid #22cde0;
		padding: 5px 10px 5px 10px;
		width: 100%;
		outline: none;
	}
</style>