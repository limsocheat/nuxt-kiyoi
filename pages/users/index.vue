<template>
	<v-container
		fluid
		grid-list-xl
	>
		<h2 class="mb-4 text-uppercase">User's List</h2>
		<v-expansion-panels>
			<v-expansion-panel>
				<v-expansion-panel-header
					class="green darken-2 py-0"
					dark
				>
					<div class="d-flex">
						<v-icon class="pl-5 yellow--text text--lighten-4">mdi-magnify</v-icon>
						<h3 class="px-2 py-2 yellow--text text--lighten-3">SEARCH USER</h3>
					</div>
				</v-expansion-panel-header>
				<v-expansion-panel-content>
					<v-row>
						<v-col
							md="6"
							cols="12"
						>
							<v-text-field
								outlined
								dense
								solo
								v-model="name"
								label="Search By Username"
							></v-text-field>
						</v-col>
						<v-col
							md="6"
							cols="12"
						>
							<v-text-field
								outlined
								dense
								solo
								v-model="email"
								label="Search By Email"
							></v-text-field>
						</v-col>
					</v-row>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>

		<p>&nbsp;</p>

		<v-card>
			<v-card-title class="pa-0">
				<v-toolbar
					color="green darken-2 py-0"
					dense
				>
					<div class="d-flex">
						<v-icon class="pl-5 yellow--text text--lighten-4">mdi-account</v-icon>
						<h3 class="px-2 py-2 yellow--text text--lighten-3">USER LIST</h3>
					</div>
					<v-spacer></v-spacer>
					<v-dialog
						v-model="dialog"
						max-width="600px"
					>
						<template
							v-permission="'view users'"
							v-slot:activator="{ on }"
						>
							<v-btn v-on="on">New</v-btn>
						</template>
						<v-card>
							<v-card-title>Add User</v-card-title>
							<v-divider></v-divider>
							<v-card-text>
								<ValidationObserver ref="form">
									<div class="AddUserForm">
										<label
											class="font-weight-bold"
											for="name"
										>Name</label>
										<validation-provider
											name="Name"
											rules="required"
											v-slot="{ errors }"
										>
											<input
												type="text"
												class="AddUserForm--input"
												v-model="form.name"
											/>
											<span class="red--text">{{ errors[0] }}</span>
										</validation-provider>
									</div>

									<!-- Email -->
									<div class="AddUserForm">
										<validation-provider
											name="Email"
											rules="required|email"
											v-slot="{ errors }"
										>
											<label
												class="font-weight-bold"
												for="email"
											>Email</label>
											<input
												type="email"
												class="AddUserForm--input"
												v-model="form.email"
											/>
											<span class="red--text">{{ errors[0] }}</span>
										</validation-provider>
									</div>

									<!-- Password -->
									<div class="AddUserForm">
										<label
											class="font-weight-bold"
											for="password"
										>Password</label>
										<validation-provider
											name="Password"
											rules="required|min:6"
											v-slot="{ errors }"
										>
											<input
												type="password"
												class="AddUserForm--input"
												v-model="form.password"
											/>
											<span class="red--text">{{ errors[0] }}</span>
										</validation-provider>
									</div>

									<!-- Role -->
									<div class="AddUserForm">
										<label
											class="font-weight-bold"
											for="name"
										>Role</label>
										<validation-provider
											name="Role"
											rules="required"
											v-slot="{ errors }"
										>
											<v-select
												multiple
												:items="roles"
												item-value="id"
												item-text="name"
												v-model="form.role_ids"
												outlined
												solo
												dense
											></v-select>
											<span class="red--text">{{ errors[0] }}</span>
										</validation-provider>
									</div>
								</ValidationObserver>
							</v-card-text>
							<v-divider></v-divider>

							<v-card-actions class="text-center">
								<v-spacer>
									<v-btn
										color="primary"
										@click="closeDialog"
										text
									>
										<v-icon left>mdi-close</v-icon>Close
									</v-btn>
									<v-btn
										color="green"
										dark
										@click.prevent="addUser"
									>
										<v-icon left>mdi-content-save</v-icon>Save
									</v-btn>
								</v-spacer>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</v-toolbar>
			</v-card-title>
			<v-divider></v-divider>

			<!-- DataTable -->
			<v-data-table
				:headers="headers"
				:items="items"
			>
				<template v-slot:item="{ item }">
					<tr>
						<td>
							<img
								v-if="item.profile"
								:src="baseURL + `/${item.profile.image}`"
								alt=""
								width="70"
								height="50"
							>
						</td>
						<td>{{ item.first_name }}</td>
						<td>{{ item.role_name }}</td>
						<td>{{ item.email }}</td>
						<td>
							<v-tooltip top>
								<template v-slot:activator="{ on }">
									<v-btn
										icon
										@click="editItem(item.id)"
										color="primary"
										outlined
										v-on="on"
									>
										<v-icon small>mdi-pencil</v-icon>
									</v-btn>
								</template>
								<span>Edit</span>
							</v-tooltip>
							<v-tooltip top>
								<template
									v-permission="'add users'"
									v-slot:activator="{ on }"
								>
									<v-btn
										icon
										@click="deleteItem(item)"
										color="red"
										outlined
										v-on="on"
									>
										<v-icon small>mdi-delete</v-icon>
									</v-btn>
								</template>
								<span>Delete</span>
							</v-tooltip>
						</td>
					</tr>
				</template>
			</v-data-table>
		</v-card>
	</v-container>
</template>

<script>
	export default {
		name: "UserField",
		watch: {
			name: {
				handler() {
					this.getItems();
				}
			},

			email: {
				handler() {
					this.getItems();
				}
			},

			immediate: true
		},

		data() {
			return {
				baseURL: process.env.APP_URL,
				dialog: false,
				items: [],
				form: {},
				name: "",
				email: "",
				headers: [
					{
						text: "Image",
						sortable: false
					},
					{
						text: "Name",
						value: "name",
						sortable: false
					},
					{
						text: "Role",
						sortable: false
					},
					{
						text: "Email",
						value: "email",
						sortable: false
					},
					{
						text: "Action",
						value: "action",
						sortable: false
					}
				],
				roles: []
			};
		},

		methods: {
			getItems() {
				this.$axios
					.$get(`/api/user?name=${this.name}&email=${this.email}`)
					.then(res => {
						this.items = res.users.data;
						1;
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			getRoles() {
				this.$axios
					.$get(this.baseURL + `/api/data/roles`)
					.then(response => {
						this.roles = response;
					});
			},

			editItem(id) {
				console.log(this.$store.state.auth.user.role);
				if (this.$store.state.auth.user.role[0] === "administrator") {
					this.$router.push(`/users/${id}/edit`);
				} else {
					this.$router.push(`/users/profile`);
				}
				// this.$router.push(`/users/${id}/edit`)
			},

			addUser() {
				this.getRoles();
				this.$axios
					.$post(`/api/user`, this.form)
					.then(res => {
						this.form = res;
						this.getItems();
						this.$toast.info("Succeessfully Created");
						this.closeDialog();
					})
					.catch(err => {
						this.$refs.form.validate(err.response.data.errors);
						console.log(err.response.data.errors);
					});
			},

			closeDialog() {
				this.dialog = false;
				this.editedIndex = -1;
				this.form = {};
			},

			deleteItem(item) {
				if (confirm("Are u sure to delete it?")) {
					this.$axios
						.$delete(`/api/user/` + item.id)
						.then(res => {
							this.getItems();
						})
						.catch(err => {
							console.log(err.response);
						});
				}
			}
		},

		created() {
			this.getItems();
			this.getRoles();
		}
	};
</script>

<style lang="scss">
	.AddUserForm {
		padding-top: 10px;
		&--input {
			border: 1px solid #1232dd;
			padding: 5px 10px 5px 10px;
			width: 100%;
			outline: none;
			border-radius: 3px;
		}
	}
</style>