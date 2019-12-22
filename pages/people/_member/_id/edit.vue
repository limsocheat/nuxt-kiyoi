<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<div class="blue lighten-1" dark>
				<v-card-title class="white--text">
					Edit Member
				</v-card-title>
			</div>
			<v-divider></v-divider>
			<v-row class="px-5">
				<v-col sm="6" cols="12">
					<label class="font-weight-bold">Name</label>
					<v-text-field 
						outlined solo dense
						label="Name"
						v-model="form.name"
					></v-text-field>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold">Email</label>
					<v-text-field outlined solo dense label="email@email.com" v-model="form.email"></v-text-field>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold">Company Name</label>
					<v-text-field outlined solo dense label="Company Name" v-model="form.company_name"></v-text-field>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold">Phone Number</label>
					<v-text-field outlined solo dense label="Phone Number" v-model="form.phone"></v-text-field>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold">
					Tax Number<span class="font-weight-light">(Optional)</span>
				</label>
					<v-text-field outlined solo dense label="Tax Number" v-model="form.tax"></v-text-field>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold">Address</label>
					<v-text-field outlined solo dense label="Address" v-model="form.address"></v-text-field>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold">
						City<span class="font-weight-light">(Optional)</span>
					</label>
					<v-text-field outlined solo dense label="City" v-model="form.city"></v-text-field>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold">
						Post Code<span class="font-weight-light">(Optional)</span>
					</label>
					<v-text-field outlined solo dense label="Post Code" v-model="form.post_code"></v-text-field>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold">
						Country<span class="font-weight-light">(Optional)</span>
					</label>
					<v-text-field outlined solo dense label="Country" v-model="form.country"></v-text-field>
				</v-col>
			</v-row>
			<div class="pb-5 px-5">
				<v-btn @click="editMember" color="primary">
					<v-icon left>mdi-check</v-icon>
					Update
				</v-btn>
			</div>
		</v-card>
	</v-app>
</template>

<script>
	import Vue from 'vue'
	export default {
		data() {
			return {
				form: {
					name: '',
				},
				items: []
			}
		},

		created() {
			this.fetchData()
		},

		methods: {
			 // async asyncData({ $axios, params }) {
			 //    try {
			 //      let form = await $axios.$get(`api/member/${this.$route.params.id}`);
			 //      return { form };
			 //    } catch (e) {
			 //      return { form: [] };
			 //    }
			 //  },
			fetchData() {
				try {
					this.$axios.$get(`api/member/${this.$route.params.id}`)
					.then(res => {
						this.items = res.members.data;
						console.log(res)
					})
					.catch(err => {
						console.log(err.response)
					})
				}
				catch(e) {
					console.log(e)
				}
			},

			editMember() {
				// this.$axios.$put(`api/member`, this.form.id, {
				// 	'name': this.form.name,
				// 	'company_name': this.form.company_name,
				// 	'phone': this.form.phone,
				// 	'tax': this.form.tax,
				// 	'address': this.form.address,
				// 	'city': this.form.city,
				// 	'post_code': this.form.post_code,
				// 	'country': this.form.country,
				// })
				// .then(res => {
				// 	console.log(res)
				// 	this.$toast.info('Successfully Updated');
				// 	this.$router.push('/people/member');
				// })
				// .catch(err => {
				// 	console.log(err.response);
				// })

				try {
			        this.$axios.$patch(`api/member/${this.form.id}/`, {
			          	'name': this.form.name,
			          	'email': this.form.email,
			          	'company_name': this.form.company_name,
						'phone': this.form.phone,
						'tax': this.form.tax,
						'address': this.form.address,
						'city': this.form.city,
						'post_code': this.form.post_code,
						'country': this.form.country,
			          }
			        );
			        	this.$router.push("/people/member");
			    } catch (e) {
			        console.log(e);
			    }
			}
		},
	}
</script>