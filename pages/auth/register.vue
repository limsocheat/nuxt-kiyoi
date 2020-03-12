<template>
	<v-app id="inspire">
		<v-content>
			<v-container class="fill-height" fluid>
				<v-row align="center" justify="center">
					<v-col cols="12" md="8">
						<v-card class="elevation-12">
							<v-toolbar color="primary" dark flat>
								<v-toolbar-title>Register form</v-toolbar-title>
								<v-spacer />
							</v-toolbar>
							<v-card-text>
								<ValidationObserver ref="form">
										<validation-provider name="First Name" rules="required" v-slot="{ errors }">
											<v-text-field
												label="First Name"
												v-model="auth.first_name"
												prepend-icon="mdi-account"
												type="text"
											/>										
											<span class="red--text px-6">{{ errors[0] }}</span>
										</validation-provider>

										<validation-provider name="Last Name" rules="required" v-slot="{ errors }">
											<v-text-field
												label="Last Name"
												v-model="auth.last_name"
												prepend-icon="mdi-account"
												type="text"
											/>										
											<span class="red--text px-6">{{ errors[0] }}</span>
										</validation-provider>
										
										<validation-provider name="Email" rules="required|email" v-slot="{ errors }">
											<v-text-field
												label="Email"
												v-model="auth.email"
												prepend-icon="mdi-email"
												type="text"
											/>
											<span class="red--text px-6">{{ errors[0] }}</span>
										</validation-provider>


										<validation-provider name="Password" rules="required|min:6" v-slot="{ errors }">
											<v-text-field
												id="password"
												label="Password"
												v-model="auth.password"
												prepend-icon="mdi-lock"
												type="password"
											/>
											<span class="red--text px-6">{{ errors[0] }}</span>
										</validation-provider>
										
										<v-text-field 
											label="Referral Code"
											prepend-icon="mdi-forum"
											v-model="auth.referred_by"	
										></v-text-field>
								</ValidationObserver>	
							</v-card-text>
							<v-divider></v-divider>
							<v-card-actions>
								<v-spacer />
								<v-btn color="primary" @click="registerUser" :loading="loading">
									<v-icon left>mdi-login</v-icon>Register
								</v-btn>
								<v-spacer></v-spacer>
							</v-card-actions>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
	import { async } from "q";
	export default {
		layout: "register",
		name: 'Register',
		auth: 'guest',
		data() {
			return {
				loading: false,
				auth: {},
				baseURL: process.env.APP_URL
			};
		},

		computed: {
			ref() {
				return this.$route.query.ref;
			}
		},

		watch: {
			ref: {
				handler() {
					this.auth.referred_by = this.ref
				},
				immediate: true,
			}
		},

		methods: {
			async registerUser() {
				await this.$axios.post(this.baseURL + `api/register`, this.auth)
		        .then (res => {
		          this.$toast.success('User was successfully registed.')
		          this.$router.push('/')
		        })
		        .catch(err => {
		        	if(err.response.status === 422) {
		         		this.$refs.form.validate(err.response.data.errors)
		        	}
		        	else {
		          		this.$toast.error('Error: Please check your credentials.')
		        	}
		        });
	        }
		},
	};
</script>