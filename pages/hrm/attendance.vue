<template>
	<v-app class="mx-5 my-5">
		<div class="d-flex">
			<div class="pb-5 pr-3">
				<v-dialog v-model="dialog1" max-width="700px">
					<template v-slot:activator="{ on }">
						<v-btn class="blue darken-1" dark v-on="on">
							<v-icon left>mdi-plus-circle</v-icon>
							Add Attendance
						</v-btn>
					</template>

					<!-- Form Modal -->
					<v-card>
						<v-card-title class="headline font-weight-light">
							ADD ATTENDANCE
						</v-card-title>
						<v-divider></v-divider>
						<v-row class="px-5">
							<v-col sm="6" cols="12">
								<label class="font-weight-bold" for="name">Employee</label>
								<v-select
									solo
									outlined
									dense
								></v-select>
							</v-col>
							<v-col sm="6" cols="12">
								<label class="font-weight-bold" for="">Date</label>
								<v-menu
						          v-model="menu1"
						          :close-on-content-click="false"
						          max-width="290"
						        >
						          <template v-slot:activator="{ on }">
						            <v-text-field
						              :value="computedDateFormattedMomentjs"
						              clearable
						              readonly
						              dense
						              solo 
						              outlined
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
							<v-col sm="6" cols="12">
								<label class="font-weight-bold" for="">Check In</label>
								<v-menu
							        ref="menu"
							        v-model="menu2"
							        :close-on-content-click="false"
							        :nudge-right="40"
							        :return-value.sync="time"
							        transition="scale-transition"
							        offset-y
							        max-width="290px"
							        min-width="290px"
							      >
							        <template v-slot:activator="{ on }">
							          <v-text-field
							            v-model="time"
							        	label="Pick up Time"
							            solo
							            dense
							            outlined
							            readonly
							            v-on="on"
							          ></v-text-field>
							        </template>
							        <v-time-picker
							          v-if="menu2"
							          v-model="time"
							          full-width
							          @click:minute="$refs.menu.save(time)"
							        ></v-time-picker>
							      </v-menu>
							</v-col>
							<v-col sm="6" cols="12">
								<label class="font-weight-bold" for="">Check Out</label>
								<v-menu
							        ref="menu"
							        v-model="menu3"
							        :close-on-content-click="false"
							        :nudge-right="40"
							        :return-value.sync="time"
							        transition="scale-transition"
							        offset-y
							        max-width="290px"
							        min-width="290px"
							      >
							        <template v-slot:activator="{ on }">
							          <v-text-field
							            v-model="time1"
							        	label="Pick up Time"
							            solo
							            dense
							            outlined
							            readonly
							            v-on="on"
							          ></v-text-field>
							        </template>
							        <v-time-picker
							          v-if="menu3"
							          v-model="time1"
							          full-width
							          @click:minute="$refs.menu.save(time)"
							        ></v-time-picker>
							      </v-menu>
							</v-col>
							<v-col cols="12" class="d-flex flex-column">
								<label class="font-weight-bold" for="Note">Note</label>
								<textarea cols="30" rows="7" class="attendance_note"></textarea>
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
import moment from 'moment'
export default {
	name: 'Menu',
	created() {
		// this.fetchData()
	},

	data() {
		return {
			date: new Date().toISOString().substr(0, 10),
	      	menu1: false,	
	      	time: null,
        	menu2: false,
        	menu3: false,
        	time1: null,
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
					text: 'Employee',
					sortable: false,
				}, {
					text: 'Check In',
					sortable: false,
				}, {
					text: 'Check Out',
					sortable: false,
				}, {
					text: 'Status',
					sortable: false,
				},{
					text: 'Created By',
					sortable: false,
				},{
					text: 'Actions',
					sortable: false,
				},
			],
		}
	},

	methods: {
	},

	computed: {
	    computedDateFormattedMomentjs () {
	        return this.date ? moment(this.date).format('DD-MM-YYYY') : ''
	    },
    },
}

</script>
<style lang="scss">
.menu-list {
	background-color: #34495e;
	color: #fff;
}

.attendance_note {
	border: 1px solid rgba(0,0,0,0.125);
}
</style>
