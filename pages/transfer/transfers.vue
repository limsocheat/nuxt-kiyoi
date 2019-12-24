<template>
	<v-app class="mx-5 my-5">
		<div class="d-flex" v-permission="'add transfer'">
			<div class="pb-5 pr-3">
				<nuxt-link 
					to="/transfer/add_transfer" 
					class="nuxt--link grey--text text--lighten-4"
				>
					<v-btn class="teal darken-1" dark>
						<v-icon left>mdi-plus-circle</v-icon>
							Add Transfer
					</v-btn>
				</nuxt-link>
			</div>
			<div class="pb-5 pr-3">
				<nuxt-link 
					to="/transfer/import_transfer" 
					class="nuxt--link grey--text text--lighten-4"
				>
					<v-btn class="purple darken-1" dark>
						<v-icon left>mdi-file</v-icon>
							Import Transfer
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
			<v-data-table :headers="headers" :items="items" :items-per-page="itemsPerPage">
				<template v-slot:item="{ item }">
					<tr>
						<td>{{ item.created_at }}</td>
						<td>{{ item.reference_no }}</td>
						<td>{{ item.from_location }}</td>
						<td>{{ item.to_location }}</td>
						<td></td>
						<td>{{ item.shipping_charge }}</td>
						<td>
							<span :class="item.status === 'Completed' ? 'completed' : 'Sent' ? 'sent' : 'pending' ">
								{{ item.status }}
							</span>
						</td>
						<td>
							<v-tooltip bottom>
								<template v-slot:activator="{ on }">
									<!-- Edit Item -->
									<v-btn left small outlined icon color="primary" v-on="on">
										<v-icon  small>
											mdi-pencil
										</v-icon>
									</v-btn>
								</template>
								<span>Edit Transfer</span>
							</v-tooltip>
							<v-tooltip bottom>
								<template v-slot:activator="{ on }">
									<!-- Delete Item -->
									<v-btn left small outlined icon color="red" v-on="on">
										<v-icon  small>
											mdi-delete
										</v-icon>
									</v-btn>
								</template>
								<span>Delete Transfer</span>
							</v-tooltip>
						</td>
					</tr>
				</template>
			</v-data-table>
		</v-card>
	</v-app>
</template>


<script>
export default {
	created() {
		this.fetchData()
	},

	data() {
		return {
			items: [],
			search: '',
			form: {},
			total: 0,
			options: {},
			itemsPerPage: 5,
			editedIndex: -1,
			created: true,
			dialog: false,
			headers: [
				{
					text: 'Date',
					sortable: false,
				}, 
				{
					text: 'Reference No',
					sortable: false,
				},
				{
					text: 'Location(From)',
					sortable: false,
				}, {
					text: 'Location(To)',
					sortable: false,
				}, {
					text: 'Shipping Charge',
					sortable: false,
				},
				{
					text: 'Grand Total',
					sortable: false,
				},
				{
					text: 'Status',
					sortable: false,
				},
				{
					text: 'Actions',
					sortable: false,
				},
			],
		}
	},

	methods: {
		fetchData() {
			this.$axios.$get(`api/transfer`)
			.then(res => {
				this.items = res.transfer;
			})
			.catch(err => {
				console.log(err.response);
			})
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
	display: block;
	text-decoration: none;
}

.completed {
	background: blue;
	padding: 5px 10px 5px 10px;
	color: #fff;
	border-radius: 3px;
}

.pending {
	background: red;
	padding: 5px 10px 5px 10px;
	color: #fff;
	border-radius: 3px;
}

.sent {
	background: #f0dd11;
	padding: 5px 10px 5px 10px;
	border-radius: 3px;
}

</style>
