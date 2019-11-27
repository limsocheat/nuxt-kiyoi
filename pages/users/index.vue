<template>
	<v-app>
		<h2 class="mx-5 mt-5">User's List</h2>
		<v-card class="mx-5 mt-3 mb-5">
			<div class="grey darken-3">
				<div class="d-flex">
					<v-icon class="pl-5 grey--text text--lighten-4">mdi-magnify</v-icon>
					<h3 class="px-2 py-2 grey--text text--lighten-3">SEARCH USER</h3>
				</div>
			</div>
			<v-divider></v-divider>
			<v-row class="px-7">
				<v-col md="6">
					<v-text-field outlined dense solo label="Search By Username"></v-text-field>
				</v-col>
				<v-col md="6">
					<v-text-field outlined dense solo label="Search By Email"></v-text-field>
				</v-col>
			</v-row>
		</v-card>

		<v-card class="mx-5 mt-3 mb-5">
			<v-card-title class="pa-0">
				<v-toolbar color="black" dense>
					<div class="d-flex">
						<v-icon class="pl-5 grey--text text--lighten-4">mdi-account</v-icon>
						<h3 class="px-2 py-2 grey--text text--lighten-3">USER LIST</h3>
					</div>
					<v-spacer></v-spacer>
					<v-dialog v-model="dialog" max-width="600px">
						<template v-slot:activator="{ on }">
							<v-btn v-permission="'add users'" v-on="on" >New</v-btn>
						</template>	
						<v-card>
							<v-card-title>Add User</v-card-title>
							<v-divider></v-divider>
							<v-card-text>
								<div>
									<label class="font-weight-bold" for="name">Name</label>
									<v-text-field	
										solo
										outlined
										dense
										label="Enter Name"
										v-model="form.name"
									></v-text-field>
								</div>
								<div>
									<label class="font-weight-bold" for="email">Email</label>
									<v-text-field	
										solo
										outlined
										dense
										label="Enter Email"
										v-model="form.email"
									></v-text-field>
								</div>
								<div>
									<label class="font-weight-bold" for="password">Password</label>
									<v-text-field	
										solo
										outlined
										dense
										type="password"
										label="Enter Password"
										v-model="form.password"
									></v-text-field>
								</div>
							</v-card-text>
							<v-card-actions class="px-5">
								<v-btn color="primary" @click.prevent="addUser">Save</v-btn>
								<v-btn color="primary" @click="closeDialog" text>Close</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</v-toolbar>
			</v-card-title>
			<v-divider></v-divider>
			<v-data-table  
				:headers="headers" :items="items"
				v-permission="'view users'"
			>
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
	</v-app>
</template>

<script>
	export default {
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

			editItem (item) {
		        this.editedIndex = this.items.indexOf(item);
		        this.form = Object.assign({}, item);
		        this.dialog = true
	      	},

			addUser() {
				if(this.editedIndex > -1) {
					this.$axios.$patch(`/api/user/` + this.form.id, {
						'name': this.form.name,
						'email': this.form.email,
						'password': this.form.password,
					})
					.then(res => {
						this.getItems();
						this.closeDialog();
						this.$toast.info('Succeessfully Updated');
					})
				}
				else {
					this.$axios.$post(`/api/user`, this.form)
					.then(res => {
						this.form = res;
						this.getItems();
						this.$toast.info('Succeessfully Created');
						this.closeDialog();
					})
					.catch(err => {
						console.log(err.response);
					})
				}
			},

			closeDialog() {
				this.dialog = false;
				this.editedIndex = -1;
				this.form = {};
			},

			deleteItem(item) {
				if(confirm('Are u sure to delete it?')) {
					this.$axios.$delete(`/api/user/` + item.id)
					.then(res => {
						this.getItems();
					})
					.catch(err => {
						console.log(err.response);
					})
				}
			}
		},

		created() {
			this.getItems();
		}
	};
</script>