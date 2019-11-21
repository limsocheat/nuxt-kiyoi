<template>
	<v-app class="mx-5 my-5">
		<div>
			<div class="py-5">
				<v-dialog v-model="dialog" max-width="700px">
					<template v-slot:activator="{ on }">
						<v-btn class="blue darken-1" dark v-on="on">
							<v-icon left>mdi-plus-circle</v-icon>
							Add Holiday
						</v-btn>
					</template>

					<!-- Form Modal -->
					<v-card>
						<v-card-title class="headline font-weight-light">
							Add Holiday
						</v-card-title>
						<v-divider></v-divider>
						<v-row class="px-5">
							<v-col cols="12" sm="6">
								<label for="name" class="font-weight-bold">From</label>
								<v-menu
						          v-model="menu1"
						          :close-on-content-click="false"
						          max-width="290"
						        >
						          <template v-slot:activator="{ on }">
						            <v-text-field
						              :value="computedDateFormattedMomentjs"
						              clearable
						              solo
						              outlined
						              dense
						              readonly
						              v-on="on"
						              @click:clear="date = null"
						            ></v-text-field>
						          </template>
						          <v-date-picker
						            v-model="date"
						            @change="menu1 = false"
						          ></v-date-picker>
						        </v-menu>
							</v-col>
							<v-col cols="12" sm="6">
								<label for="name" class="font-weight-bold">To</label>
								<v-menu
						          v-model="menu2"
						          :close-on-content-click="false"
						          max-width="290"
						        >
						          <template v-slot:activator="{ on }">
						            <v-text-field
						              :value="computedDateFormattedMomentjs"
						              clearable
						              solo
						              outlined
						              dense
						              readonly
						              v-on="on"
						              @click:clear="date = null"
						            ></v-text-field>
						          </template>
						          <v-date-picker
						            v-model="date"
						            @change="menu1 = false"
						          ></v-date-picker>
						        </v-menu>
							</v-col>
							<v-col sm="12" cols="12" class="d-flex flex-column">
								<label for="note" class="font-weight-bold">Note</label>	
								<textarea name="" id="" cols="30" rows="7" class="payroll_note"></textarea>
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

import moment from 'moment';
export default {
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
			dialog: false,
			headers: [{
					text: 'Date',
					sortable: false,
				}, {
					text: 'Employee',
					sortable: false,
				}, {
					text: 'From',
					sortable: false,
				}, {
					text: 'To',
					sortable: false,
				}, {
					text: 'Note',
					sortable: false,
				}, {
					text: 'Action',
					sortable: false,
				}, 
			],

			date: new Date().toISOString().substr(0, 10),
      		menu1: false,
      		menu2: false,
		}
	},

	computed: {
	  computedDateFormattedMomentjs () {
	    return this.date ? moment(this.date).format('DD-MM-YYYY') : ''
	  },
	},
}

</script>
<style lang="scss">

.nuxt--link {
	display: block;
	text-decoration: none;
}

.payroll_note {
	border: 1px solid rgba(0,0,0,0.125);
}

</style>
