<template>
	<v-container>
		<v-card>
			<div
				class="blue lighten-1"
				dark
			>
				<v-card-title class="white--text">
					Edit Member
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
								v-model="form.profile.phone"
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
								v-model="form.password"
								type="password"
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
								v-model="form.profile.address"
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
							v-model="form.profile.city"
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
							v-model="form.profile.country"
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

			<div class="pb-5 px-5">
				<v-btn
					@click="updateMember"
					color="primary"
				>
					<v-icon>mdi-check</v-icon>
					Update
				</v-btn>
			</div>
		</v-card>
	</v-container>
</template>

<script>
	import Vue from "vue";
	export default {
		name: "EditMember",
		data() {
			return {
				form: {
					profile: {}
				},
				file: null
			};
		},

		created() {
			this.getMember();
		},

		methods: {
			getMember() {
				this.$axios
					.$get(`api/member/` + this.$route.params.id)
					.then(res => {
						this.$set(this.$data, "form", res.members);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			updateMember() {
				let data = {
					first_name: this.form.first_name,
					last_name: this.form.last_name,
					email: this.form.email,
					phone: this.form.profile.phone,
					city: this.form.profile.city,
					country: this.form.profile.country,
					address: this.form.profile.address,
					password: this.form.profile.password,
					_method: "PATCH"
				};

				let fd = new FormData();

				Object.keys(data).map(a => {
					fd.append(a, data[a]);
				});

				fd.append("image", this.file);

				this.$axios
					.$post(`api/member/` + this.form.id, fd, {
						"Content-Type": "multipart/form-data"
					})
					.then(res => {
						this.$router.push("/people/member");
						this.$toast.success("Updated Member Successfully.");
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			ImageOnChange(e) {
				this.file = e;
				console.log(e);
			}
		}
	};
</script>