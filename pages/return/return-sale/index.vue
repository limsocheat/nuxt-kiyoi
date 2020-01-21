<template>
	<v-app class="mx-5 my-5">
		<div class="d-flex">
			<div class="pb-5 pr-3" v-permission="'return sales'">
				<nuxt-link class="nuxt--link" to="/return/return-sale/create">
					<v-btn class="teal darken-1" dark>
						<v-icon left>mdi-plus-circle</v-icon>
						Add Return Sale
					</v-btn>
				</nuxt-link>
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
				:server-items-length="total"
			>
				<template v-slot:item="{ item }">
					<tr class="member--tr">
						<!-- <td @click="gotoMember(item.id)">{{ item.date }}</td>
						<td @click="gotoMember(item.id)">{{ item.reference }}</td>
						<td @click="gotoMember(item.id)">{{ item.biller.name }}</td>
						<td @click="gotoMember(item.id)">{{ item.member.name }}</td>
						<td @click="gotoMember(item.id)">{{ item.branch.address }}</td>
						<td @click="gotoMember(item.id)">USD  {{ item.total | formatNumber}}</td> -->
						<td >{{ item.created_at }}</td>
						<td >{{ item.reference_no }}</td>
						<td >{{ item.biller.name }}</td>
						<td >{{ item.member.name }}</td>
						<td >{{ item.branch.address }}</td>
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
		this.fetchData();
	},

	watch: {
		options: {
			handler() {
				this.fetchData();
			}
		}
	},

	data() {
		return {
			date: new Date().toISOString().substr(0, 10),
			items: [],
			search: "",
			form: {},
			total: 0,
			options: {},
			itemsPerPage: 5,
			editedIndex: -1,
			created: true,
			dialog: false,
			headers: [{
					text: 'Date',
					sortable: false,
					value:"date"
				}, {
					text: 'Reference',
					sortable: false,
					value: "reference"
				}, {
					text: 'Biller',
					sortable: false,
					value: "biller_address"
				}, {
					text: 'Customer',
					sortable: false,
					value: "member_name"
				}, {
					text: 'Warehouse',
					sortable: false,
					value: "branch_name"
				},{
					text: 'Grand Total',
					sortable: false,
					value: "total"
				},{
					text: 'Action',
					sortable: false,
					value: "active"
				},
			],
			menus: [
				// {title: 'View', icon: 'mdi-eye', action: this.view},
				{title: 'Edit', icon: 'mdi-square-edit-outline', action: this.edit},
				{title: 'Delete', icon: 'mdi-trash-can-outline', action: this.deleteItem},
			],
		}
	},

	methods: {

		fetchData() {
			this.$axios.$get(`/api/return-sale?temsPerPage=${this.options.itemsPerPage}&page=${this.options.page}`)
			.then(res => {
				this.items = res.returnsale.data;
				this.total = res.total;
				console.log(res)
			})
			.catch(err => {
				console.log(err);
			})
		},

		edit(id) {
			this.$router.push(`/return/return-sale/${id}/edit_returnsale`);
		},

		deleteItem(id) {
			if(confirm('Are u sure to delete it?')) {
				this.$axios.$delete(`api/return-sale/` +id)
				.then(res => {
					this.fetchData();
					this.$toast.info('Succeessfully Delete');
				})
				.catch(err => {
					console.log(err.response);
				})
			}
      	},

		uploadCsv(image) {
			const URL = 'http://127.0.0.1:3000/product/category'

			let data = new FormData();
		    data.append('name', 'my-csv');
		    data.append('file', event.target.files[0]); 

		    let config = {
		      header : {
		        'Content-Type' : 'csv'
		      }
		    }

		    this.$axios.$put(
		      URL, 
		      data,
		      config
		    ).then(
		      response => {
		        console.log('Csv upload response > ', response)
		      }
		    )
		}
	}
}

</script>

<style lang="scss">

.nuxt--link {
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

</style>
