<template>
	<v-container>
		<div class="d-flex">
			<div class="pr-5 py-5">
				<nuxt-link
					to="/people/add_member"
					class="nuxt--link grey--text text--lighten-4"
				>
					<v-btn
						class="teal darken-1"
						dark
						v-permission="'add users'"
					>
						<v-icon left>mdi-plus-circle</v-icon>
						Add Member
					</v-btn>
				</nuxt-link>
			</div>
			<div
				class="py-5"
				v-permission="'add users'"
			>
				<v-dialog
					v-model="dialog"
					max-width="700px"
				>
					<template v-slot:activator="{ on }">
						<v-btn
							class="purple darken-1"
							dark
							v-on="on"
						>
							<v-icon left>mdi-file</v-icon>
							Import Member
						</v-btn>
					</template>

					<!-- Form Modal -->
					<v-card>
						<v-card-title class="headline font-weight-light">
							IMPORT Member
						</v-card-title>
						<v-divider></v-divider>
						<v-col cols="12">
							<p class="mt-5">The correct column order is (name*, parent_category) and you must follow this.</p>
						</v-col>
						<v-row class="px-4">
							<v-col
								cols="12"
								sm="6"
							>
								<label class="font-weight-bold">Upload CSV File</label>
								<input
									type="file"
									class="form-control"
									@change="uploadCsv($event)"
								>
							</v-col>
							<v-col
								cols="12"
								sm="6"
								class="d-flex flex-column"
							>
								<label class="font-weight-bold">Sample File</label>
								<v-btn class="teal darken-2 grey--text text--lighten-2">
									<v-icon left>mdi-download</v-icon>
									Download
								</v-btn>
							</v-col>
						</v-row>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn
								color="blue darken-1"
								text
							>Close</v-btn>
							<v-btn color="primary">Save</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</div>
		</div>
		<div class="d-flex justify-space-between">
			<div>
				<v-text-field
					label="Search"
					solo
					outlined
					dense
				></v-text-field>
			</div>
			<div>
				<v-btn class="red darken-1">PDF</v-btn>
				<v-btn class="lime lighten-1">CSV</v-btn>
				<v-btn class="blue lighten-1">Print</v-btn>
			</div>
		</div>

		<v-card>
			<v-data-table
				:headers="headers"
				:items="items"
				:items-per-page="itemsPerPage"
				:options.sync="options"
			>
				<template v-slot:item="{ item }">
					<tr
						v-if="item.profile"
						class="member--tr"
					>
						<td>
							<img
								:src="baseURL + `/${item.profile.image}`"
								width="50"
								height="50"
							>
						</td>
						<td>{{ item.first_name }}</td>
						<td>{{ item.last_name }}</td>
						<td>{{ item.email }}</td>
						<td>{{ item.profile.phone }}</td>
						<td>{{ item.profile.address }}</td>
						<td>
							<v-menu>
								<template v-slot:activator="{ on: menu }">
									<v-tooltip bottom>
										<template v-slot:activator="{ on: tooltip }">
											<v-btn
												color="primary"
												dark
												v-on="{ ...tooltip, ...menu }"
												small
											>Action</v-btn>
										</template>
										<span>Action</span>
									</v-tooltip>
								</template>
								<v-list>
									<v-list-item
										v-for="(menu, index) in menus"
										:key="index"
										dense
										@click="menu.action(item.id)"
										class="cyan darken-3"
									>
										<v-list-item-title class="white--text">
											<v-icon
												left
												dark
											>{{menu.icon}}</v-icon>
											{{ menu.title }}
										</v-list-item-title>
									</v-list-item>
								</v-list>
							</v-menu>
						</td>
					</tr>
				</template>
			</v-data-table>
		</v-card>

	</v-container>
</template>


<script>
	import Vue from "vue";

	var numeral = require("numeral");
	Vue.filter("formatNumber", function(value) {
		return numeral(value).format("0,0.00");
	});

	export default {
		name: "Member",

		watch: {
			options: {
				handler() {
					this.fetchData();
				}
			},
			immediate: true
		},

		data() {
			return {
				baseURL: process.env.APP_URL,
				items: [],
				search: "",
				form: {},
				total: 0,
				options: {},
				itemsPerPage: 5,
				dialog: false,
				headers: [
					{
						text: "Image",
						sortable: false
					},
					{
						text: "First Name",
						sortable: false,
						value: "first_name"
					},
					{
						text: "Last Name",
						sortable: false,
						value: "last_name"
					},
					{
						text: "Email",
						sortable: false,
						value: "email"
					},
					{
						text: "Phone Number",
						sortable: false,
						value: "phone"
					},
					{
						text: "Address",
						sortable: false,
						value: "address"
					},
					{
						text: "Actions",
						sortable: false,
						value: "action"
					}
				],
				menus: [
					{ title: "Edit", icon: "mdi-pencil", action: this.edit },
					{
						title: "Delete",
						icon: "mdi-delete",
						action: this.deleteItem
					}
				]
			};
		},

		methods: {
			fetchData() {
				this.$axios
					.$get(`api/member`)
					.then(res => {
						this.items = res.members.data;
						this.total = res.total;
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			edit(id) {
				this.$router.push(`/people/${id}/`);
			},

			gotoMember(id) {
				this.$router.push(`/people/${id}/`);
			},

			deleteItem(id) {
				if (confirm("Are u sure to delete it?")) {
					this.$axios
						.$delete(`/api/member/` + id)
						.then(res => {
							this.fetchData();
							this.$toast.info("Succeessfully Delete");
						})
						.catch(err => {
							console.log(err.response);
						});
				}
			},

			uploadCsv(image) {}
		}
	};
</script>
<style lang="scss">
	.menu-list {
		background-color: #34495e;
		color: #fff;
	}

	.nuxt--link {
		display: block;
		text-decoration: none;
	}

	.form-control {
		width: 100%;
		padding-bottom: 5px;
		padding-top: 5px;
		padding-right: 10px;
		padding-left: 10px;
		outline: none;
		border-radius: 5px;
		border: 1px solid #616161;
	}

	.display {
		display: none;
	}

	.deposit-note {
		border: 1px solid #25babc;
	}

	.member--tr {
		cursor: pointer;
	}
</style>
