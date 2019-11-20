<template>
	<v-app class="mx-5 my-5">
		<div class="d-flex">
			<div class="pb-5 pr-3">
				<v-dialog v-model="dialog1" max-width="600px">
					<template v-slot:activator="{ on }">
						<v-btn class="teal darken-1" dark v-on="on">
							<v-icon left>mdi-plus-circle</v-icon>
							Add Account
						</v-btn>
					</template>

					<!-- Form Modal -->
					<v-card>
						<v-card-title class="headline font-weight-light">
							ADD Account
						</v-card-title>
						<v-divider></v-divider>
						<v-col cols="12">
							<label class="font-weight-bold" for="no">Account No</label>
							<v-text-field
								solo
								dense
								outlined
								label="Account No"
							></v-text-field>
						</v-col>
						<v-col cols="12">
							<label class="font-weight-bold" for="name">Name</label>
							<v-text-field
								outlined
								solo
								dense
								label="Name"
								:items="selects"
							></v-text-field>
						</v-col>
						<v-col cols="12">
							<label class="font-weight-bold" for="balance">Initial Balance</label>
							<v-text-field
								outlined
								solo
								dense
								label="Balance"
							></v-text-field>
						</v-col>
						<v-col cols="12">
							<div class="d-flex flex-column">
								<label class="font-weight-bold" for="balance">Note</label>
								<textarea cols="30" rows="10" class="account_note"></textarea>
							</div>
						</v-col>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" text>Close</v-btn>
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
			<v-data-table :headers="headers" :items="items" :items-per-page="itemsPerPage" :options.sync="options" :server-items-length="total">
				<template v-slot:item.action="{ item }">
					<v-tooltip bottom>
						<template v-slot:activator="{ on }">
							<!-- Edit Item -->
							<v-icon left fab color="primary" v-on="on">
								mdi-pencil
							</v-icon>
						</template>
						<span>Edit Supplier</span>
					</v-tooltip>
					<v-tooltip bottom>
						<template v-slot:activator="{ on }">

							<!-- Delete Item -->
							<v-icon left fab color="primary" v-on="on">
								mdi-delete
							</v-icon>
						</template>
						<span>Delete Supplier</span>
					</v-tooltip>
				</template>
			</v-data-table>
		</v-card>
	</v-app>
</template>


<script>
export default {
	name: 'Menu',
	created() {
		// this.fetchData()
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
			dialog1: false,
			dialog2: false,
			headers: [{
					text: 'Account No',
					sortable: false,
				}, {
					text: 'Name',
					sortable: false,
				}, {
					text: 'Initial Balance',
					sortable: false,
				}, {
					text: 'Default',
					sortable: false,
				}, {
					text: 'Note', 
					sortable: false,
				},{
					text: 'Actions',
					sortable: false,
				},
			],
			selects: 
			[
				'Fruits', 'Electronics', 'Computer', 'Toy', 'Food', 'Accessories'			
			],
		}
	},

	methods: {
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

.account_note {
	border: 1px solid #333333;
}

</style>
