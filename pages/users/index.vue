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
					<v-text-field
						outlined
						dense
						solo
						label="Search By Username"
					></v-text-field>
				</v-col>
				<v-col md="6">
					<v-text-field
						outlined
						dense
						solo
						label="Search By Email"
					></v-text-field>
				</v-col>
			</v-row>
		</v-card>

		<v-card class="mx-5 mt-3 mb-5">
			<div class="grey darken-3">
				<div class="d-flex">
					<v-icon class="pl-5 grey--text text--lighten-4">mdi-account</v-icon>
					<h3 class="px-2 py-2 grey--text text--lighten-3">USER LIST</h3>
				</div>
			</div>
			<v-data-table :headers="headers"></v-data-table>
		</v-card>
	</v-app>
</template>

<script>
	export default {
		data() {
			return {
				headers: [
					{
						text: 'ID',
						sortable: false,
					},
					{
						text: 'Name',
						sortable: false,
					},
					{
						text: 'Email',
						sortable: false,
					},
					{
						text: 'Mobile',
						sortable: false,
					},
					{
						text: 'Balance',
						sortable: false,
					},
					{
						text: 'Action',
						sortable: false,
					},
				]
			}
		}
	}
</script>