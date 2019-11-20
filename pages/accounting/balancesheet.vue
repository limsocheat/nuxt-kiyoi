<template>
	<v-app class="mx-5 my-5">
		<v-card class="px-5 py-5">
			<div class="text-center mb-5">
				<h3>Balance Sheet</h3>
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
			<v-data-table :headers="headers">
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
		data() {
			return {
				headers: [
					{
						text: 'Name',
						sortable: false,
					},
					{
						text: 'Account No',
						sortable: false,
					},
					{
						text: 'Credit',
						sortable: false,
					},
					{
						text: 'Debit',
						sortable: false,
					},
					{
						text: 'Balance',
						sortable: false,
					},
				]
			}
		}
	}
</script>