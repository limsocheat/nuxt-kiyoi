<template>
	<v-app class="mx-5 my-5">
		<div class="d-flex">
			<div class="pb-5 pr-3">
				<v-dialog v-model="dialog1" max-width="800px" v-permission="'add sales'">
					<template v-slot:activator="{ on }">
						<v-btn class="teal darken-1" dark v-on="on">
							<v-icon left>mdi-plus-circle</v-icon>
							Add Expense
						</v-btn>
					</template>

					<!-- Form Modal -->
					<v-card>
						<v-card-title class="headline font-weight-light">
							ADD EXPENSE
						</v-card-title>
						<v-divider></v-divider>
						<v-row class="px-5">
							<v-col sm="6" cols="12">
								<label class="font-weight-bold" for="code">Expense Category</label>
								<v-select
									solo
									outlined
									dense
									label="Select Expense Category"
								></v-select>
							</v-col>
							<v-col sm="6" cols="12">
								<label class="font-weight-bold" for="">Warehouse</label>
								<v-select
									outlined
									solo
									dense
									label="Please Select warehouse"
								></v-select>
							</v-col>
							<v-col sm="6" cols="12">
								<label class="font-weight-bold" for="code">Amount</label>
								<v-text-field
									solo
									outlined
									dense
									label="Amount"
								></v-text-field>
							</v-col>
							<v-col sm="6" cols="12">
								<label class="font-weight-bold" for="">Account</label>
								<v-select
									outlined
									solo
									dense
									label="Type expense category name"
								></v-select>
							</v-col>
							<v-col sm="12" cols="12">
								<div class="d-flex flex-column">
									<label class="font-weight-bold" for="">Note</label>
									<textarea cols="30" rows="10" class="expense_note"></textarea>
								</div>
							</v-col>
						</v-row>
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
					text: 'Date',
					sortable: false,
				}, {
					text: 'Reference No',
					sortable: false,
				},{
					text: 'Warehouse',
					sortable: false,
				},{
					text: 'Category',
					sortable: false,
				},{
					text: 'Amount',
					sortable: false,
				},{
					text: 'Note',
					sortable: false,
				},{
					text: 'Actions',
					sortable: false,
				},
			],
		}
	},

	methods: {
	}
}

</script>

<style>
	.expense_note {
		border: 1px solid rgba(0,0,0,0.125);
	}
</style>