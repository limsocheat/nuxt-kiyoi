<template>
	<v-app>
		<v-app-bar color="blue darken-3" app fixed clipped dense>
			<v-app-bar-nav-icon @click.stop="toggle = !toggle"></v-app-bar-nav-icon>
			<v-toolbar-title>KIYOI</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items>
				<v-btn text dark>{{ user.user ? user.user.name : null }}</v-btn>
				<v-btn text dark @click="logout()">
					<v-icon>mdi-logout</v-icon>
				</v-btn>
			</v-toolbar-items>
		</v-app-bar>

		<v-navigation-drawer app clipped-left class="color" dense v-model="toggle">
			<v-list-item class="text-center font-weight-bold color--item">
				<v-list-item-content>
					<v-list-item-title class="color--text">YIKOI</v-list-item-title>
				</v-list-item-content>
			</v-list-item>

			<v-divider></v-divider>

			<v-list dense rounded>
				<div v-for="(item, i) in menus" :key="i" router exact>
					<v-list-item v-if="!item.children" :key="i" :to="item.to">
						<v-list-item-content>
							<v-list-item-title>
								<v-icon left>{{ item.icon }}</v-icon>
								{{ item.name }}
							</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<v-list-group v-role="'administrator'" v-else :key="i.name" :value="false">
						<template v-slot:activator>
							<v-list-item-content>
								<v-list-item-title>
									<v-icon left>{{ item.icon }}</v-icon>
									{{ item.name }}
								</v-list-item-title>
							</v-list-item-content>
						</template>
						<v-list-item
							v-for="(subMenu, i) in item.children"
							:to="subMenu.to"
							:key="i"
							exact
							class="subMenu"
						>
							<v-list-item-content>
								<v-list-item-title>
									<v-icon left>{{ subMenu.icon }}</v-icon>
									{{ subMenu.name }}
								</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list-group>
				</div>
			</v-list>
		</v-navigation-drawer>

		<v-content>
			<nuxt />
		</v-content>
	</v-app>
</template>

<script>
	export default {
		data() {
			return {
				toggle: true,
				menus: [
					{
						name: "Dashboard",
						icon: "mdi-view-dashboard",
						to: "/",
						role: "administrator",
					},
					{
						name: "Website Control",
						icon: "mdi-desktop-mac",
						children: [
							{
								name: "General Settings",
								icon: "mdi-settings",
								to: "/webcontrol/generalsettings"
							},
							{
								name: "Policy/Term",
								icon: "mdi-note",
								to: "/webcontrol/terms"
							},
							{
								name: "Email Template",
								icon: "mdi-email-open",
								to: "/webcontrol/template"
							},
							{
								name: "SMS Api",
								icon: "mdi-message-text",
								to: "/webcontrol/sms-api"
							}
						]
					},
					{
						name: "Charge/Commision",
						icon: "mdi-cash",
						to: "/charge"
					},
					{
						name: "Website Interface",
						icon: "mdi-internet-explorer",
						children: [
							{
								name: "menu",
								icon: "mdi-menu",
								to: "/webinterface/menu"
							},
							{
								name: "Slide Image",
								icon: "mdi-folder-multiple-image",
								to: "/webinterface/slide"
							},
							{
								name: "Logo",
								icon: "mdi-file-image",
								to: "/webinterface/logo"
							},
							{
								name: "Service",
								icon: "mdi-chart-line-stacked"
							},
							{
								name: "Team",
								icon: "mdi-sitemap",
								to: "/webinterface/team"
							},
							{
								name: "Contact",
								icon: "mdi-account-badge-horizontal-outline",
								to: "/webinterface/contact"
							},
							{
								name: "About",
								icon: "mdi-information",
								to: "/webinterface/about"
							},
							{
								name: "Social",
								icon: "mdi-facebook-box",
								to: "/webinterface/social"
							},
							{
								name: "Footer",
								icon: "mdi-content-save-all-outline",
								to: "/webinterface/footer"
							},
							{
								name: "Testimonial",
								icon: "mdi-message-reply-text",
								to: "/webinterface/testimonial"
							},
							{
								name: "User Tree Image",
								icon: "mdi-account-circle",
								to: "/webinterface/tree-image"
							},
							{
								name: "Background Image",
								icon: "mdi-image"
							}
						]
					},
					{
						name: "Withdraw System",
						icon: "mdi-account-cash",
						children: [
							{
								name: "Withdraw Methods",
								icon: "mdi-paypal",
								to: "/withdraw/method/"
							},
							{
								name: "Withdraw Requests",
								icon: "mdi-loading",
								to: "/withdraw/requests/"
							},
							{
								name: "View Log",
								icon: "mdi-eye-outline",
								to: "/withdraw/log/"
							}
						]
					},
					{
						name: "Payment Log",
						icon: "mdi-google-cardboard",
						to: "/payment-log/"
					},
					{
						name: "Users Management",
						icon: "mdi-account-group",
						to: "/users"
					},
					{
						name: "Product",
						icon: "mdi-cube",
						children: [
							{
								name: "Category",
								to: "/product/category",
								icon: "mdi-tag-multiple"
							},
							{
								name: "Product List",
								to: "/product/product-list",
								icon: "mdi-view-list"
							},
							{
								name: "Add Product",
								to: "/product/add-product",
								icon: "mdi-plus-circle",
							},
							{
								name: "Print Barcode",
								to: "/product/print-barcode",
								icon: "mdi-barcode",
							},
							{
								name: "Adjustment List",
								to: "/product/qty_adjustment",
								icon: "mdi-format-list-bulleted-square",
							},
							{
								name: "Add Adjustment",
								to: "/product/add_adjustment",
								icon: "mdi-playlist-edit",
							},
							{
								name: "Stock Count",
								to: "/product/stock-count",
								icon: "mdi-shield-check",
							}
						]
					},
					{
						name: "Purchase",
						icon: "mdi-arrow-down-circle",
						children: [
							{
								name: "Purchase List",
								to: "/purchase/purchase-list",
								icon: "mdi-view-list"
							},
							{
								name: "Add Purchase",
								to: "/purchase/add_purchase",
								icon: "mdi-plus-circle"
							},
							{
								name: "Import Purchase By CSV",
								to: "/purchase/import_purchase",
								icon: "mdi-file-import"
							}
						]
					},
					{
						name: "POS",
						icon: "mdi-wallet-giftcard",
						to: "/pos/"
					},
					{
						name: "Sale",
						icon: "mdi-cart",
						children: [
							{
								name: "Sale List",
								to: "/sale/sale-list",
								icon: "mdi-view-list"
							},
							{
								name: "Add Sale",
								to: "/sale/add_sale",
								icon: "mdi-plus-circle"
							},
							{
								name: "Import Sale By CSV",
								to: "/sale/import_sale",
								icon: "mdi-file-import"
							},
							{
								name: "Gift Card List",
								to: "/sale/gift_card",
								icon: "mdi-id-card"
							},
							{
								name: "Coupon List",
								to: "/sale/coupons",
								icon: "mdi-ticket-percent"
							},
							{
								name: "Delivery List",
								to: "/sale/delivery",
								icon: "mdi-truck-delivery"
							}
						]
					},
					{
						name: "Expense",
						icon: "mdi-calculator",
						children: [
							{
								name: "Expense Category",
								icon: "mdi-tag-multiple",
								to: "/expense/expense_categories"
							},
							{
								name: "Add Expense",
								icon: "mdi-view-list",
								to: "/expense/add_expense"
							}
						]
					},
					{
						name: "Quotation",
						icon: "mdi-book-open-page-variant",
						children: [
							{
								name: "Quotation List",
								icon: "mdi-view-list",
								to: "/quotation/quotations"
							},
							{
								name: "Add Quotation",
								icon: "mdi-plus-circle",
								to: "/quotation/add_quotation"
							}
						]
					},
					{
						name: "Transfer",
						icon: "mdi-transfer-right",
						children: [
							{
								name: "Transfer List",
								icon: "mdi-view-list",
								to: "/transfer/transfers"
							},
							{
								name: "Add Transfer",
								icon: "mdi-plus-circle",
								to: "/transfer/add_transfer"
							},
							{
								name: "Import Transfer By CSV",
								icon: "mdi-file-import",
								to: "/transfer/import_transfer"
							}
						]
					},
					{
						name: "Return",
						icon: "mdi-package-down",
						children: [
							{
								name: "Sale",
								icon: "mdi-view-list",
								to: "/return/return-sale"
							},
							{
								name: "Purchase",
								icon: "mdi-plus-circle",
								to: "/return/return-purchase"
							}
						]
					},
					{
						name: "HRM",
						icon: "mdi-account-group",
						children: [
							{
								name: "Department",
								icon: "mdi-bank-plus",
								to: "/hrm/department"
							},
							{
								name: "Employee",
								icon: "mdi-account-tie",
								to: "/hrm/employee"
							},
							{
								name: "Attendance",
								icon: "mdi-map-clock",
								to: "/hrm/attendance"
							},
							{
								name: "PayRoll",
								icon: "mdi-credit-card-outline",
								to: "/hrm/payroll"
							},
							{
								name: "Holiday",
								icon: "mdi-beach",
								to: "/hrm/holiday"
							}
						]
					},
					{
						name: "Accounting",
						icon: "mdi-bank",
						children: [
							{
								name: "Account List",
								icon: "mdi-view-list",
								to: "/accounting/account"
							},
							{
								name: "Balance Sheet",
								icon: "mdi-google-spreadsheet",
								to: "/accounting/balancesheet"
							}
						]
					},
					{
						name: "People",
						icon: "mdi-account-circle",
						children: [
							{
								name: "User List",
								icon: "mdi-account",
								to: "/people/users"
							},
							{
								name: "Add User",
								icon: "mdi-plus-circle",
								to: "/people/add_user"
							},
							{
								name: "Customer List",
								icon: "mdi-account-tie",
								to: "/people/customer"
							},
							{
								name: "Add Customer",
								icon: "mdi-plus-circle",
								to: "/people/add_customer"
							},
							{
								name: "Biller List",
								icon: "mdi-credit-card-outline",
								to: "/people/biller"
							},
							{
								name: "Add Biller",
								icon: "mdi-plus-circle",
								to: "/people/add_biller"
							},
							{
								name: "Supplier List",
								icon: "mdi-shield-star",
								to: "/people/supplier"
							},
							{
								name: "Add Supplier",
								icon: "mdi-plus-circle",
								to: "/people/add_supplier"
							}
						]
					},
					{
						name: "Report",
						icon: "mdi-newspaper-variant",
						children: [
							{
								name: "Summary Report",
								icon: "mdi-book-open",
								to: "/report/summary_report"
							},
							{
								name: "Best Seller",
								icon: "mdi-account-tie"
							},
							{
								name: "Product Report",
								icon: "mdi-newspaper-variant",
								to: "/report/product_report"
							},
							{
								name: "Daily Sale",
								icon: "mdi-alpha-s-circle-outline"
							},
							{
								name: "Monthly Sale",
								icon: "mdi-alpha-s-circle"
							},
							{
								name: "Daily Purchase",
								icon: "mdi-alpha-p-circle-outline"
							},
							{
								name: "Monthly Purchase",
								icon: "mdi-alpha-p-circle"
							},
							{
								name: "Sale Report",
								icon: "mdi-card-text",
								to: "/report/sale_report"
							},
							{
								name: "Payment Report",
								icon: "mdi-card-text-outline",
								to: "/report/payment_report"
							},
							{
								name: "Purchase Report",
								icon: "mdi-credit-card-multiple",
								to: "/report/purchase_report"
							},
							{
								name: "Warehouse Report",
								icon: "mdi-bank-outline",
								to: "/report/warehouse_report"
							},
							{
								name: "Warehouse Stock Chart",
								icon: "mdi-chart-bar"
							},
							{
								name: "Product Quantity Alert",
								icon: "mdi-bell-alert",
								to: "/report/product_quantity_alert"
							},
							{
								name: "User Report",
								icon: "mdi-account-badge-horizontal-outline",
								to: "/report/user_report"
							},
							{
								name: "Customer Report",
								icon: "mdi-account-card-details",
								to: "/report/customer_report"
							},
							{
								name: "Supplier Report",
								icon: "mdi-shield-star",
								to: "/report/supplier_report"
							},
							{
								name: "Due Report",
								icon: "mdi-map-clock-outline",
								to: "/report/due_report"
							}
						]
					},
					{
						name: "Support",
						icon: "mdi-face-agent",
						to: "/supports/"
					}
				]
			};
		},

		methods: {
			logout() {
				this.$auth.logout();
			}
		},

		computed: {
			user() {
				return this.$store.state.auth ? this.$store.state.auth.user : {};
			}
		}
	};
</script>


<style lang="scss">
	.color {
		background: #34495e;
		&--item {
			background: #257db9;
		}
	}

	.subMenu {
		padding-left: 2em;
	}
</style>