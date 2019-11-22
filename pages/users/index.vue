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
					<v-btn v-permission="'add users'">New</v-btn>
				</v-toolbar>
			</v-card-title>
			<v-divider></v-divider>
			<v-data-table :headers="headers" :items="items">
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
				items: [],
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
			}
		},

		created() {
			this.getItems();
		}
	};
</script>