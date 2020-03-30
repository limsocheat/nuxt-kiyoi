<template>
	<v-container>
		<v-card>
			<div
				class="blue lighten-1"
				dark
			>
				<v-card-title class="white--text">
					Add Member
				</v-card-title>
			</div>
			<v-divider></v-divider>
			<ValidationObserver
				ref="form"
				tag="v-row"
			>
				<v-row class="px-5">
					<v-col
						sm="6"
						cols="12"
					>
						<label class="font-weight-bold">First Name</label>
						<validation-provider
							name="First Name"
							rules="required"
							v-slot="{errors}"
						>
							<v-text-field
								outlined
								solo
								dense
								label="Name"
								v-model="form.first_name"
							></v-text-field>
							<span class="red--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col
						sm="6"
						cols="12"
					>
						<label class="font-weight-bold">Last Name</label>
						<validation-provider
							name="Last Name"
							rules="required"
							v-slot="{errors}"
						>
							<v-text-field
								outlined
								solo
								dense
								label="Last Name"
								v-model="form.last_name"
							></v-text-field>
							<span class="red--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col
						sm="6"
						cols="12"
					>
						<label class="font-weight-bold">Email</label>
						<validation-provider
							name="Email"
							rules="required|email"
							v-slot="{errors}"
						>
							<v-text-field
								outlined
								solo
								dense
								label="email@email.com"
								v-model="form.email"
							></v-text-field>
							<span class="red--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col
						sm="6"
						cols="12"
					>
						<label class="font-weight-bold">Phone Number</label>
						<validation-provider
							name="Phone Number"
							rules="required"
							v-slot="{errors}"
						>
							<v-text-field
								outlined
								solo
								dense
								label="Phone Number"
								v-model="form.phone"
							></v-text-field>
							<span class="red--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col
						sm="6"
						cols="12"
					>
						<label class="font-weight-bold">
							Password
						</label>
						<validation-provider
							name="Password"
							rules="required|min:6"
							v-slot="{errors}"
						>
							<v-text-field
								outlined
								solo
								dense
								label="Password"
								type="password"
								v-model="form.password"
							></v-text-field>
							<span class="red--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col
						sm="6"
						cols="12"
					>
						<label class="font-weight-bold">
							Address
						</label>
						<validation-provider
							name="Address"
							rules="required"
							v-slot="{ errors }"
						>
							<v-text-field
								outlined
								solo
								dense
								label="Address"
								v-model="form.address"
							></v-text-field>
							<span class="red--text">{{ errors[0] }}</span>
						</validation-provider>
					</v-col>
					<v-col
						sm="6"
						cols="12"
					>
						<label class="font-weight-bold">
							City
						</label>
						<v-text-field
							outlined
							solo
							dense
							label="City"
							v-model="form.city"
						></v-text-field>
					</v-col>
					<v-col
						sm="6"
						cols="12"
					>
						<label class="font-weight-bold">
							Country
						</label>
						<v-text-field
							outlined
							solo
							dense
							label="Country"
							v-model="form.country"
						></v-text-field>
					</v-col>
				</v-row>
			</ValidationObserver>

			<!-- Image Upload -->
			<div class="px-2">
				<v-file-input
					solo
					outlined
					dense
					label="Upload Image"
					@change="ImageOnChange"
				></v-file-input>
			</div>
			<div class="py-3 px-2">
				<v-btn
					@click="createMember"
					color="primary"
				>
					<v-icon left>mdi-check</v-icon>
					Submit
				</v-btn>
			</div>
		</v-card>
	</v-container>
</template>

<script>
	export default {
		name: "AddMember",
		data() {
			return {
				form: {},
				items: [],
				file: null
			};
		},

		methods: {
			createMember() {
				let data = {
					first_name: this.form.first_name,
					last_name: this.form.last_name,
					email: this.form.email,
					phone: this.form.phone,
					city: this.form.city,
					country: this.form.country,
					address: this.form.address,
					password: this.form.password
				};

				let fd = new FormData();

				Object.keys(data).map(a => {
					fd.append(a, data[a]);
				});

				fd.append("image", this.file);

				this.$axios
					.$post(`api/member`, fd, {
						"Content-Type": "multipart/form-data"
					})
					.then(res => {
						this.items = res.data;
						console.log(res);
						this.$router.push("/people/member");
						this.$toast.info("Succeessfully Created");
					})
					.catch(err => {
						this.$refs.form.validate(err.response.data.errors);
					});
			},

			ImageOnChange(e) {
				this.file = e;
				console.log(this.file);
			}
		}
	};
</script>

<style lang="scss">
	.image-upload {
		border: 1px solid royalblue;
		width: 100%;
		padding: 5px 10px 5px 10px;
	}
</style>