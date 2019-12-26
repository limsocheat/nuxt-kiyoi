<template>
	<v-app class="mx-5 my-5">
		<div class="d-flex">
			<div class="pb-5 pr-3">
				<nuxt-link to="/quotation/add_quotation" class="nuxt--link grey--text text--lighten-4">
					<v-btn class="teal darken-1" dark v-permission="'add quotation'">
						<v-icon left>mdi-plus-circle</v-icon>Add Quotation
					</v-btn>
				</nuxt-link>
			</div>
		</div>
		<div class="d-flex justify-space-between">
			<div>
				<v-text-field label="Search" solo outlined dense></v-text-field>
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
				:server-items-length="total"
			>
				<template v-slot:item="{ item }">
					<tr class="member--tr">
						<!-- <td @click="gotoMember(item.id)">{{ item.date }}</td>
						<td @click="gotoMember(item.id)">{{ item.reference }}</td>
						<td @click="gotoMember(item.id)">{{ item.biller }}</td>
						<td @click="gotoMember(item.id)">{{ item.members }}</td>
						<td @click="gotoMember(item.id)">{{ item.suppliers }}</td>
						<td @click="gotoMember(item.id)">
							<span :class="item.quotation_status === 'Present' ? 'present' : 'absent'">
								{{ item.quotation_status }}
							</span>
						</td>
						<td @click="gotoMember(item.id)">USD  {{ item.total | formatNumber}}</td> -->
						<td >{{ item.date }}</td>
						<td >{{ item.reference }}</td>
						<td >{{ item.biller }}</td>
						<td >{{ item.members }}</td>
						<td >{{ item.suppliers }}</td>
						<td >
							<span :class="item.quotation_status === 'Sent' ? 'sent' : 'pending'">
								{{ item.quotation_status }}
							</span>
						</td>
						<td >USD  {{ item.total | formatNumber}}</td>
						
						<td>
							<v-menu>
								<template v-slot:activator="{ on: menu }">
									<v-tooltip bottom>
										<template v-slot:activator="{ on: tooltip }">
											<v-btn
											color="primary"
											dark
											v-on="{ ...tooltip, ...menu }"
											smallF
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
											<v-icon left dark>{{menu.icon}}</v-icon>
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
	</v-app>
</template>


<script>

	import Vue from 'vue';

	var numeral = require("numeral");
	Vue.filter("formatNumber", function (value) {
		return numeral(value).format("0,0.00");
	});

	export default {
		created() {
			this.getItems();
		},

		data() {
			return {
				items: [],
				search: "",
				form: {},
				total: 0,
				options: {},
				itemsPerPage: 5,
				editedIndex: -1,
				created: true,
				dialog: false,
				headers: [
					{
						text: "Date",
						sortable: false,
						value: "created_at"
					},
					{
						text: "Reference",
						sortable: false,
						value: "reference"
					},
					{
						text: "Biller",
						sortable: false,
						value: "biller"
					},
					{
						text: "Customer",
						sortable: false,
						value: "members"
					},
					{
						text: "Supplier",
						sortable: false,
						value: "suppliers"
					},
					{
						text: "Quotation Status",
						sortable: false,
						value: "quotation_status"
					},
					{
						text: "Grand Total",
						sortable: false,
						value: "total"
					},
					{
						text: "Actions",
						sortable: false,
						value:"action"
					}
				],
				menus: [
					{title: 'View', icon: 'mdi-eye', action: this.view},
					{title: 'Edit', icon: 'mdi-square-edit-outline', action: this.edit},
					{title: 'Create Sale', icon: 'mdi-plus-circle', action: this.createSale},
					{title: 'Create Purchase',icon: 'mdi-cart-outline', action: this.createPurchase},
					{title: 'Delete', icon: 'mdi-trash-can-outline', action: this.deleteItem},
				],
			};
		},

		methods: {
			getItems() {
				this.$axios.$get("/api/quotation").then(response => {
					this.items = response.data;
					this.total = response.total;
					console.log(response);
				});
			},
			edit(id) {
				this.$router.push(`/quotation/${id}/edit_quotation`);
			},
			deleteItem(id) {
				if(confirm('Are u sure to delete it?')) {
					this.$axios.$delete('/api/quotation/' + id)
					.then(res => {
						this.getItems();
						this.$toast.info('Succeessfully Delete');
					})
					.catch(err => {
						console.log(err.response);
					})
				}
			},

			uploadCsv(image) {
				const URL = "http://127.0.0.1:3000/product/category";

				let data = new FormData();
				data.append("name", "my-csv");
				data.append("file", event.target.files[0]);

				let config = {
					header: {
						"Content-Type": "csv"
					}
				};

				this.$axios.$put(URL, data, config).then(response => {
					console.log("Csv upload response > ", response);
				});
			},
		}
	};
</script>
<style lang="scss">
	.nuxt--link {
		display: block;
		text-decoration: none;
	}
	.sent {
		background: #28a745;
		padding: 5px 10px 5px 10px;
		border-radius: 3px;
		color: #fff;
	}

	.pending {
		background: red;
		padding: 5px 10px 5px 10px;
		border-radius: 3px;
		color: #fff;
	}
	.member--tr {
	cursor: pointer;
}
</style>
