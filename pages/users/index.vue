<template>
	<v-container fluid grid-list-xl>
		<h2 class="mb-4 text-uppercase">User's List</h2>
		<v-expansion-panels>
			<v-expansion-panel>
				<v-expansion-panel-header class="green darken-2 py-0" dark>
					<div class="d-flex">
						<v-icon class="pl-5 yellow--text text--lighten-4">mdi-magnify</v-icon>
						<h3 class="px-2 py-2 yellow--text text--lighten-3">SEARCH USER</h3>
					</div>
				</v-expansion-panel-header>
				<v-expansion-panel-content>
					<v-row>
						<v-col md="6" cols="12">
							<v-text-field outlined dense solo label="Search By Username"></v-text-field>
						</v-col>
						<v-col md="6" cols="12">
							<v-text-field outlined dense solo label="Search By Email"></v-text-field>
						</v-col>
					</v-row>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>

		<p>&nbsp;</p>

		<v-card>
			<v-card-title class="pa-0">
				<v-toolbar color="green darken-2 py-0" dense>
					<div class="d-flex">
						<v-icon class="pl-5 yellow--text text--lighten-4">mdi-account</v-icon>
						<h3 class="px-2 py-2 yellow--text text--lighten-3">USER LIST</h3>
					</div>
					<v-spacer></v-spacer>
					<v-dialog v-model="dialog" max-width="600px">
						<template v-slot:activator="{ on }">
							<v-btn v-permission="'add users'" v-on="on">New</v-btn>
						</template>
						<v-card>
							<v-card-title>Add User</v-card-title>
							<v-divider></v-divider>
							<v-card-text>
								<ValidationObserver ref="nameOfObserver">
									<div class="AddUserForm">
										<label class="font-weight-bold" for="name">Name</label>
										<validation-provider name="Name" rules="required" v-slot="{ errors }">
											<!-- <v-text-field solo outlined dense label="Enter Name" v-model="form.name"></v-text-field> -->
											<input type="text" class="AddUserForm--input" v-model="form.name" />
											<span class="red--text">{{ errors[0] }}</span>
										</validation-provider>
									</div>
									<div class="AddUserForm">
										<validation-provider name="Email" rules="required|email" v-slot="{ errors }">
											<label class="font-weight-bold" for="email">Email</label>
											<!-- <v-text-field solo outlined dense label="Enter Email" v-model="form.email"></v-text-field> -->
											<input type="text" class="AddUserForm--input" v-model="form.email" />
											<span class="red--text">{{ errors[0] }}</span>
										</validation-provider>
									</div>
									<div class="AddUserForm">
										<label class="font-weight-bold" for="password">Password</label>
										<validation-provider name="Password" rules="required" v-slot="{ errors }">
											<!-- <v-text-field
												solo
												outlined
												dense
												type="password"
												label="Enter Password"
												v-model="form.password"
											></v-text-field>-->
											<input type="text" class="AddUserForm--input" v-model="form.password" />
											<span class="red--text">{{ errors[0] }}</span>
										</validation-provider>
									</div>
								</ValidationObserver>
							</v-card-text>
							<v-divider></v-divider>

							<!-- <div v-show="errors.has('form')" class="help-block">{{ errors.first('form') }}</div> -->

							<v-card-actions class="text-center">
								<v-spacer>
									<v-btn color="primary" @click="closeDialog" text>
										<v-icon left>mdi-close</v-icon>Close
									</v-btn>
									<v-btn color="green" dark @click.prevent="addUser">
										<v-icon left>mdi-content-save</v-icon>Save
									</v-btn>
								</v-spacer>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</v-toolbar>
			</v-card-title>
			<v-divider></v-divider>
			<v-data-table :headers="headers" :items="items" v-permission="'view users'">
				<template v-slot:item.action="{item}">
					<v-tooltip top v-permission="'edit users'">
						<template v-slot:activator="{ on }">
							<v-btn icon @click="editItem(item)" color="primary" outlined v-on="on">
								<v-icon small>mdi-pencil</v-icon>
							</v-btn>
						</template>
						<span>Edit</span>
					</v-tooltip>
					<v-tooltip top v-permission="'delete users'">
						<template v-slot:activator="{ on }">
							<v-btn icon @click="deleteItem(item)" color="red" outlined v-on="on">
								<v-icon small>mdi-delete</v-icon>
							</v-btn>
						</template>
						<span>Delete</span>
					</v-tooltip>
				</template>
			</v-data-table>
		</v-card>
	</v-container>
</template>

<script>
	import { ValidationProvider, ValidationObserver } from "vee-validate";
	export default {
		components: {
			ValidationProvider, ValidationObserver
		},

		data() {
			return {
				dialog: false,
				items: [],
				form: {},
				headers: [
					{
						text: "ID",
						value: "id",
						sortable: false
					},
					{
						text: "Name",
						value: "name",
						sortable: false
					},
					{
						text: "Email",
						value: "email",
						sortable: false
					},
					{
						text: "Mobile",
						sortable: false
					},
					{
						text: "Balance",
						sortable: false
					},
					{
						text: "Action",
						value: "action",
						sortable: false
					}
				]
			};
		},

		methods: {
			getItems() {
				this.$axios.$get("/api/user").then(response => {
					this.items = response;
				});
			},

			editItem(item) {
				this.editedIndex = this.items.indexOf(item);
				this.form = Object.assign({}, item);
				this.dialog = true;
			},

			addUser() {
				if (this.editedIndex > -1) {
					this.$axios
						.$patch(`/api/user/` + this.form.id, {
							name: this.form.name,
							email: this.form.email,
							password: this.form.password
						})
						.then(res => {
							this.getItems();
							this.closeDialog();
							this.$toast.info("Succeessfully Updated");
						})
						.catch(err => {
							this.$refs.nameOfObserver.validate(
								err.response.data.errors
							);
						});
				} else {
					this.$axios
						.$post(`/api/user`, this.form)
						.then(res => {
							this.form = res;
							this.getItems();
							this.$toast.info("Succeessfully Created");
							this.closeDialog();
						})
						.catch(err => {
							this.$refs.nameOfObserver.validate(
								err.response.data.errors
							);
							console.log(err.response.data.errors);
						});
				}
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