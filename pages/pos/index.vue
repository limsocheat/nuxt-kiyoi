<template>
	<v-app>
		<v-row>
			<v-col cols="12" md="8">
				<v-card class="px-5 pb-5">
					<v-row>
						<v-col cols="12" md="6">
							<v-select solo dense outlined :items="items1" label="Please Select"></v-select>
						</v-col>
						<v-col cols="12" md="6">
							<v-select solo dense outlined :items="items2" label="Please Select"></v-select>
						</v-col>
						<v-col cols="12" md="6">
							<v-select solo dense outlined :items="walkInCustomer" label="Please Select"></v-select>
							<v-dialog v-model="dialogAddCustomer" max-width="600px">
								<template v-slot:activator="{ on }">
									<v-btn color="primary" v-on="on">
										<v-icon left>mdi-plus-circle</v-icon>
										Add Customer
									</v-btn>
								</template>
								<v-card>
									<v-card-title>Add Customer</v-card-title>
									<v-divider></v-divider>
									<div class="px-4 pt-5">
										<div>
											<label class="font-weight-bold" for="customer_group">
												Customer Group
											</label>
											<v-select
												:items="customer_group"
												solo
												outlined
												dense
											></v-select>
										</div>
										<div>
											<label class="font-weight-bold" for="name">Name</label>
											<v-text-field
												solo
												outlined
												dense
												label="Name"
											></v-text-field>
										</div>
										<div>
											<label class="font-weight-bold" for="email">Email</label>
											<v-text-field
												solo
												outlined
												dense
												label="email@email.com"
											></v-text-field>
										</div>
										<div>
											<label class="font-weight-bold" for="phone_number">
												Phone Number
											</label>
											<v-text-field
												solo
												outlined
												dense
												label="Phone Number"
											></v-text-field>
										</div>
										<div>
											<label class="font-weight-bold" for="phone_number">Address</label>
											<v-text-field
												solo
												outlined
												dense
												label="address"
											></v-text-field>
										</div>
										<div>
											<label class="font-weight-bold" for="city">City</label>
											<v-text-field
												solo
												outlined
												dense
												label="City"
											></v-text-field>
										</div>
										<v-card-actions>
											<v-btn color="primary">Submit</v-btn>
											<v-btn color="primary" text>Cancel</v-btn>
										</v-card-actions>
									</div>
								</v-card>
							</v-dialog>
						</v-col>
						<v-col cols="12" md="6">
							<v-text-field solo dense outlined label="scan/search product by name/code"></v-text-field>
						</v-col>
						<v-col cols=12 md="12">
							<v-data-table :headers="headers"></v-data-table>
						</v-col>
					</v-row>
					<v-row class="pt-10" no-gutters>
						<v-col md="1" cols="12">
							<v-card outlined tile class="pl-2">
								Items
							</v-card>
						</v-col>
						<v-col md="1" cols="12">
							<v-card outlined tile class="pl-2">
								Total
							</v-card>
						</v-col>
						<v-col md="2" cols="12">
							<v-card outlined tile class="pl-2">
								Discount
								<v-dialog v-model="dialog" max-width="600px">
									<template v-slot:activator="{ on }">
										<v-btn icon right v-on="on">
											<v-icon color="blue">mdi-pencil</v-icon>
										</v-btn>
									</template>
									<v-card>
										<v-card-title>Order Discount</v-card-title>
										<v-divider></v-divider>
										<v-text-field
											solo
											outlined
											dense
											class="px-5 pt-3"
										></v-text-field>
										<v-card-actions class="px-5">
											<v-btn color="primary">Submit</v-btn>
											<v-btn color="primary" text>Close</v-btn>
										</v-card-actions>
									</v-card>
								</v-dialog>
							</v-card>
						</v-col>
						<v-col md="2" cols="12">
							<v-card outlined tile class="pl-2">
								Coupon
								<v-dialog v-model="dialog" max-width="600px">
									<template v-slot:activator="{ on }">
										<v-btn icon right v-on="on">
											<v-icon color="blue">mdi-pencil</v-icon>
										</v-btn>
									</template>
									<v-card>
										<v-card-title>Coupon Code</v-card-title>
										<v-divider></v-divider>
										<v-text-field
											solo
											outlined
											dense
											class="px-5 pt-3"
											label="Type Coupon Code"
										></v-text-field>
										<v-card-actions class="px-5">
											<v-btn color="primary">Submit</v-btn>
											<v-btn color="primary" text>Close</v-btn>
										</v-card-actions>
									</v-card>
								</v-dialog>
							</v-card>
						</v-col>
						<v-col md="2" cols="12">
							<v-card outlined tile class="pl-2">
								Tax
								<v-dialog v-model="dialog2" max-width="600px">
									<template v-slot:activator="{ on }">
										<v-btn icon right v-on="on">
											<v-icon color="blue">mdi-pencil</v-icon>
										</v-btn>
									</template>
									<v-card>
										<v-card-title>Order Discount</v-card-title>
										<v-divider></v-divider>
										<v-select
											solo
											outlined
											dense
											class="px-5 pt-3"
											label="Please Select"
											:items="tax"
										></v-select>
										<v-card-actions class="px-5">
											<v-btn color="primary">Submit</v-btn>
											<v-btn color="primary" text>Close</v-btn>
										</v-card-actions>
									</v-card>
								</v-dialog>
							</v-card>
						</v-col>
						<v-col md="2" cols="12">
							<v-card outlined tile class="pl-2">
								Shipping
								<v-dialog v-model="dialog3" max-width="600px">
									<template v-slot:activator="{ on }">
										<v-btn icon right v-on="on">
											<v-icon color="blue">mdi-pencil</v-icon>
										</v-btn>
									</template>
									<v-card>
										<v-card-title>Shipping Cost</v-card-title>
										<v-divider></v-divider>
										<v-text-field
											solo
											outlined
											dense
											class="px-5 pt-3"
										></v-text-field>
										<v-card-actions class="px-5">
											<v-btn color="primary">Submit</v-btn>
											<v-btn color="primary" text>Close</v-btn>
										</v-card-actions>
									</v-card>
								</v-dialog>
							</v-card>
						</v-col>
						<v-col md="2" cols="12">
							<v-card outlined tile class="pl-2">
								Grand Total
							</v-card>
						</v-col>
					</v-row>

					<v-row class="pt-5">
						<v-col md="3" cols="6">
							<v-btn class="px-6 blue darken-1" dark>
								<v-icon left>mdi-credit-card</v-icon>
								Card
							</v-btn>
						</v-col>
						<v-col md="3" cols="6">
							<v-btn dark class="px-8 green lighten-1">
								<v-icon left>mdi-cash</v-icon>
								Cash
							</v-btn>
						</v-col>
						<v-col md="3" cols="6">
							<v-btn dark class="px-5 indigo lighten-2">
								<v-icon left>mdi-paypal</v-icon>
								PayPal
							</v-btn>
						</v-col>
						<v-col md="3" cols="6">
							<v-btn dark class="px-5 lime darken-1">
								<v-icon left>mdi-email-open</v-icon>
								Draft
							</v-btn>
						</v-col>
					</v-row>

					<v-row>
						<v-col md="3" cols="6">
							<v-btn dark class="grey darken-3" dark>
								<v-icon left>mdi-cash-usd</v-icon>
								Cheque
							</v-btn>
						</v-col>
						<v-col md="3" cols="6">
							<v-btn dark class="purple lighten-1">
								<v-icon left>mdi-id-card</v-icon>
								GiftCard
							</v-btn>
						</v-col>
						<v-col md="3" cols="6">
							<v-btn dark class="brown darken-2">
								<v-icon left>mdi-bank</v-icon>
								Deposit
							</v-btn>
						</v-col>
						<v-col md="3" cols="6">
							<v-btn dark class="red darken-1">
								<v-icon left>mdi-close-circle-outline</v-icon>
								Cancel
							</v-btn>
						</v-col>
					</v-row>
				</v-card>
			</v-col>

			<v-col cols="12" md="4">
				<v-card>
					<div class="px-5 d-flex justify-space-around py-2">
						<v-btn class="purple darken-1" dark>Category</v-btn>
						<v-btn class="teal darken-1" dark>Brand</v-btn>
						<v-btn class="red darken-1" dark>Featured</v-btn>
					</div>
				</v-card>
			</v-col>
		</v-row>
	</v-app>
</template>
<script>
export default {
	layout: "pos",
	data() {
		return {
			customer_group: [
				'general', 'distributor', 'reseller'
			],
			dialogAddCustomer: false,
			dialog: false,
			dialog2: false,
			dialog3: false,
			items1: [
				'warehouse1',
				'warehouse2',
			],

			items2: [
				'nana',
				'daadadd'
			],

			walkInCustomer: [
				'Boa',
				'KomKOm'
			],

			headers: [{
					text: 'Product',
					sortable: false,
				},
				{
					text: 'Price',
					sortable: false,
				},
				{
					text: 'Quantity',
					sortable: false,
				},
				{
					text: 'Sub total',
					sortable: false,
				},
				{
					text: 'Actions',
					sortable: false,
				},
			],

			tax: [
				'No Tax', 'va@10', 'vat@15', 'vat20',
			]
		}
	}
}

</script>
