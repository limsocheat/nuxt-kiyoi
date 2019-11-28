<template>
	<v-app class="mx-5 my-5">
		<div class="d-flex">
			<div class="pb-5 pr-3">
				<v-dialog v-model="dialog" max-width="800px" persistent v-permission="'add expense'">
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
									v-model="form.category"
									:items="categories"
								></v-select>
							</v-col>
							<v-col sm="6" cols="12">
								<label class="font-weight-bold" for="">Warehouse</label>
								<v-select
									outlined
									solo
									dense
									label="Please Select warehouse"
									v-model="form.warehouse"
									:items="warehouse"
								></v-select>
							</v-col>
							<v-col sm="6" cols="12">
								<label class="font-weight-bold" for="code">Amount</label>
								<v-text-field
									solo
									outlined
									dense
									label="Amount"
									v-model="form.amount"
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
							<v-btn color="blue darken-1" text @click="close">Close</v-btn>
							<v-btn color="primary" @click.prevent="addUser">Save</v-btn>
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
	name: 'Expense',
	created() {
		this.fetchItem()
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
				}, {
					text: 'Reference No',
					sortable: false,
				},{
					text: 'Warehouse',
					sortable: false,
					value: 'warehouse',
				},{
					text: 'Category',
					sortable: false,
					value: 'category',
				},{
					text: 'Amount',
					sortable: false,
					value: 'amount',
				},{
					text: 'Note',
					sortable: false,
				},{
					text: 'Actions',
					sortable: false,
					value: 'action'
				},
			],
			categories: [
				'Snack', 'Electric Bill', 'Washing'
			],
			warehouse: [
				'warehouse1', 'warehouse2'
			],
		}
	},

	methods: {
		fetchItem() {
			this.$axios.$get(`api/expense`)
			.then(res => {
				this.items = res;
				console.log(res);
			})
			.catch(err => {
				console.log(err.response);
			})
		},

		editItem(item) {
	        this.editedIndex = this.items.indexOf(item)
	        this.form = Object.assign({}, item)
	        this.dialog = true
		},

		close() {
			this.dialog = false;
			this.form = {};
		},

		addUser() {
			if(this.editedIndex > -1) {
				this.$axios.$patch(`/api/expense/` + this.form.id, { 
					category: this.form.category,
					warehouse: this.form.warehouse,
					amount: this.form.amount,
				})
				.then(res => {
					this.fetchItem();
					this.close();
				});
			} else {
				this.$axios.$post(`/api/expense`, this.form)
				.then(res => {
					this.form = res;
					this.fetchItem();
					this.close();
				})
				.catch(err => {
					console.log(err.response)
				})
			}
		}


	}
}

</script>

<style>
	.expense_note {
		border: 1px solid rgba(0,0,0,0.125);
	}
</style>