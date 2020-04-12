<template>
	<v-container>
		<v-row>
			<v-col cols="12">
				<v-card>
					<div class="d-flex justify-space-between align-center">
						<v-card-text class="title">User Profile</v-card-text>
						<div class="d-flex">
							<v-btn
								color="primary"
								@click="save"
							>
								<v-icon>mdi-content-save</v-icon>
								Save
							</v-btn>
							<v-btn
								class="mx-3"
								color="red"
								dark
								@click="cancel"
							>
								<v-icon>mdi-cancel</v-icon>
								Cancel
							</v-btn>
						</div>

					</div>
					<v-divider></v-divider>

					<v-row>
						<v-col>
							<div class="px-5 d-flex flex-column align-center">
								<img
									class="image--upload"
									:src="url"
									alt=""
									width="120"
									height="100"
								>
								<div>
									<input
										type="file"
										@change="onImageChange"
										ref="file"
										style="display: none"
									>
									<v-btn
										@click="$refs.file.click()"
										color="cyan dark-3"
										dark
									>Upload Image</v-btn>
								</div>
							</div>
						</v-col>
						<v-col>
							<div>
								<label class="font-weight-medium">Count Referrals: </label>
								<span v-if="user.count_referrer">{{user.count_referrer}}</span>
								<span v-else>0</span>
							</div>
							<div class="mt-5">
								<label class="font-weight-medium">Referrer By: </label>
								<span v-if="user.referred_by">{{user.referred_by}}</span>
								<span v-else>Not Specific</span>
							</div>
						</v-col>
					</v-row>
				</v-card>
			</v-col>

			<v-col
				cols="12"
				md="6"
			>
				<v-card>
					<v-card-text class="title">Contact</v-card-text>
					<v-divider></v-divider>
					<ValidationObserver ref="nameOfObserver">
						<v-form class="px-5">
							<!-- First Name -->
							<validation-provider
								name="Name"
								rules="required"
								v-slot="{ errors }"
							>
								<v-text-field
									v-model="user.first_name"
									label="First Name"
								></v-text-field>
								<span class="red--text">{{ errors[0] }}</span>
							</validation-provider>

							<!-- Last Name -->
							<validation-provider
								name="Name"
								rules="required"
								v-slot="{ errors }"
							>
								<v-text-field
									v-model="user.last_name"
									label="Last Name"
								></v-text-field>
								<span class="red--text">{{ errors[0] }}</span>
							</validation-provider>

							<!-- Email -->
							<validation-provider
								name="Name"
								rules="required|email"
								v-slot="{ errors }"
							>
								<v-text-field
									v-model="user.email"
									label="Email"
								></v-text-field>
								<span class="red--text">{{ errors[0] }}</span>
							</validation-provider>

							<!--  Phone -->
							<v-text-field
								v-model="user.phone"
								label="Phone"
							></v-text-field>

							<!-- Password -->
							<validation-provider
								name="Password"
								rules="required|min:6"
								v-slot="{ errors }"
							>
								<v-text-field
									v-model="user.password"
									type="password"
									label="Password"
								></v-text-field>
								<span class="red--text">{{ errors[0] }}</span>
							</validation-provider>
						</v-form>
					</ValidationObserver>
				</v-card>
			</v-col>

			<v-col
				cols="12"
				md="6"
			>
				<v-card>
					<v-card-text class="title">Address</v-card-text>
					<v-divider></v-divider>
					<v-form class="px-5">
						<!-- Address -->
						<v-text-field
							v-model="user.address"
							label="Address"
						></v-text-field>
						<!-- City -->
						<v-text-field
							v-model="user.city"
							label="City"
						></v-text-field>
						<!-- Country -->
						<v-text-field
							v-model="user.country"
							label="Country"
						></v-text-field>
					</v-form>
				</v-card>
			</v-col>

			<v-col
				cols="12"
				md="6"
			>
				<v-card>
					<v-card-text class="title">Role Management</v-card-text>
					<v-divider></v-divider>
					<div class="px-5">
						<validation-provider
							name="Name"
							rules="required"
							v-slot="{ errors }"
						>
							<v-select
								multiple
								:items="roles"
								v-model="user.role_ids"
								item-value="id"
								item-text="name"
								label="Select Roles"
							></v-select>
							<span class="red--text">{{ errors[0] }}</span>
						</validation-provider>
					</div>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	export default {
		name: "EditUser",
		created() {
			this.getUser();
			this.getRoles();
		},

		data() {
			return {
				user: {},
				file: "",
				roles: [],
				baseURL: process.env.APP_URL,
				url: ""
			};
		},

		methods: {
			getRoles() {
				this.$axios
					.$get(this.baseURL + `/api/data/roles/`)
					.then(res => {
						this.roles = res;
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			onImageChange(e) {
				this.file = e.target.files[0];
				this.url = URL.createObjectURL(this.file);

				console.log(this.file);
			},

			getUser() {
				this.$axios
					.$get(`api/user/` + this.$route.params.id)
					.then(res => {
						this.user = res.user;

						let result = res.user.profile;
						this.user.phone = result.phone;
						this.user.address = result.address;
						this.user.city = result.city;
						this.user.country = result.country;
						console.log(this.user.phone);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			save() {
				this.getRoles();

				let data = {
					image: this.user.image,
					first_name: this.user.first_name,
					last_name: this.user.last_name,
					email: this.user.email,
					phone: this.user.phone,
					password: this.user.password,
					address: this.user.address,
					city: this.user.city,
					country: this.user.country,
					role_ids: this.user.role_ids,
					_method: "PATCH"
				};

				let fd = new FormData();

				Object.keys(data).map(a => {
					fd.append(a, data[a]);
				});

				fd.append("image", this.file);

				this.$axios
					.$post(`api/user/` + this.user.id, fd, {
						"Content-Type": "multipart/form-data"
					})
					.then(res => {
						console.log(res);
						// this.$router.push(`/users`);
						this.$toast.success("User is created successfully");
					})
					.catch(err => {
						console.log(err.response);
						this.$refs.nameOfObserver.validate(
							err.response.data.errors
						);
					});
			},

			cancel() {
				this.$router.push(`/users`);
			}
		}
	};
</script>


<style lang="scss">
	.image--upload {
		border: 1px solid #37646e;
		padding: 5px;
		margin-bottom: 5px;
	}
</style>