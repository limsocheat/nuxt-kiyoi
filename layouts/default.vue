<template>
	<v-app>
		<v-app-bar
			color="green darken-3"
			app
			fixed
			clipped
			dense
			dark
		>
			<v-app-bar-nav-icon @click.stop="toggle = !toggle"></v-app-bar-nav-icon>
			<v-toolbar-title>KIYOI</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items>
				<nuxt-link
					v-permission="'pos'"
					style="color: #fff"
					class="posLink"
					to="/sale/pos/create"
				>
					<v-btn
						text
						dark
						class="posLink--title"
					>
						<v-icon left>mdi-cart</v-icon>POS
					</v-btn>
				</nuxt-link>

				<!-- User Dropdown -->
				<v-menu
					offset-y
					transition="slide-x-transition"
				>
					<template v-slot:activator="{ on }">
						<v-btn
							text
							dark
							v-on="on"
						>{{ user.user ? user.user.first_name : null }}</v-btn>
					</template>

					<v-list>
						<v-list-item
							v-for="(item, index) in items"
							:key="index"
							@click="handle(item.action)"
						>
							<v-list-item-title>
								<v-icon>{{ item.icon }}</v-icon>
								{{ item.title }}
							</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
			</v-toolbar-items>
		</v-app-bar>

		<v-navigation-drawer
			app
			clipped-left
			color="blue-grey darken-1"
			dense
			v-model="toggle"
		>
			<v-list-item class="text-center font-weight-bold color--item">
				<v-list-item-content>
					<!-- <v-img 
						:src="require('@/assets/img/final.png')" 
						height="65"
					/>-->
				</v-list-item-content>
			</v-list-item>

			<v-divider></v-divider>

			<v-list
				dense
				rounded
				dark
			>
				<div
					v-for="(item, i) in menus"
					:key="i"
					router
					exact
				>
					<div v-if="$laravel.hasPermission(item.permission)">
						<template v-if="!item.children">
							<v-list-item
								:key="i"
								:to="item.to"
							>
								<v-list-item-content>
									<v-list-item-title>
										<v-icon left>{{ item.icon }}</v-icon>
										{{ item.name }}
									</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</template>
						<template v-else>
							<v-list-group
								:key="i.name"
								:value="false"
							>
								<template v-slot:activator>
									<v-list-item-content>
										<v-list-item-title>
											<v-icon left>{{ item.icon }}</v-icon>
											{{ item.name }}
										</v-list-item-title>
									</v-list-item-content>
								</template>
								<template v-for="(subMenu, i) in item.children">
									<v-list-item
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
								</template>
							</v-list-group>
						</template>
					</div>
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
				items: [
					{ title: "Logout", action: "logout", icon: "mdi-export" },
					{
						title: "Profile",
						action: "viewProfile",
						icon: "mdi-account-tie"
					}
				],

				toggle: true,
				menus: [
					{
						name: "Dashboard",
						icon: "mdi-view-dashboard",
						to: "/",
						permission: "view users"
					},
					// {
					// 	name: "Website Control",
					// 	icon: "mdi-desktop-mac",
					// 	permission: "view users|add users",
					// 	children: [
					// 		{
					// 			name: "General Settings",
					// 			icon: "mdi-settings",
					// 			to: "/webcontrol/generalsettings",
					// 			permission: "delete users"
					// 		},
					// 		{
					// 			name: "Policy/Term",
					// 			icon: "mdi-note",
					// 			to: "/webcontrol/terms",
					// 			permission: "delete users"
					// 		},
					// 		{
					// 			name: "Email Template",
					// 			icon: "mdi-email-open",
					// 			to: "/webcontrol/template",
					// 			permission: "delete users"
					// 		},
					// 		{
					// 			name: "SMS Api",
					// 			icon: "mdi-message-text",
					// 			to: "/webcontrol/sms-api",
					// 			permission: "delete users"
					// 		}
					// 	]
					// },
					// {
					// 	name: "Charge/Commision",
					// 	icon: "mdi-cash",
					// 	to: "/charge",
					// 	permission: "charge commission",
					// },
					// {
					// 	name: "Website Interface",
					// 	icon: "mdi-internet-explorer",
					// 	permission: "view website",
					// 	children: [
					// 		{
					// 			name: "menu",
					// 			icon: "mdi-menu",
					// 			to: "/webinterface/menu",
					// 			permission: "view website"
					// 		},
					// 		{
					// 			name: "Slide Image",
					// 			icon: "mdi-folder-multiple-image",
					// 			to: "/webinterface/slide",
					// 			permission: "view website"
					// 		},
					// 		{
					// 			name: "Logo",
					// 			icon: "mdi-file-image",
					// 			to: "/webinterface/logo",
					// 			permission: "view website"
					// 		},
					// 		{
					// 			name: "Team",
					// 			icon: "mdi-sitemap",
					// 			to: "/webinterface/team",
					// 			permission: "view website"
					// 		},
					// 		{
					// 			name: "Contact",
					// 			icon: "mdi-account-badge-horizontal-outline",
					// 			to: "/webinterface/contact",
					// 			permission: "view website"
					// 		},
					// 		{
					// 			name: "About",
					// 			icon: "mdi-information",
					// 			to: "/webinterface/about",
					// 			permission: "view website"
					// 		},
					// 		{
					// 			name: "Social",
					// 			icon: "mdi-facebook-box",
					// 			to: "/webinterface/social",
					// 			permission: "view website"
					// 		},
					// 		{
					// 			name: "Footer",
					// 			icon: "mdi-content-save-all-outline",
					// 			to: "/webinterface/footer",
					// 			permission: "view website"
					// 		},
					// 		{
					// 			name: "Testimonial",
					// 			icon: "mdi-message-reply-text",
					// 			to: "/webinterface/testimonial",
					// 			permission: "view website"
					// 		},
					// 		{
					// 			name: "User Tree Image",
					// 			icon: "mdi-account-circle",
					// 			to: "/webinterface/tree-image",
					// 			permission: "view website"
					// 		}
					// 	]
					// },
					// {
					// 	name: "Withdraw System",
					// 	icon: "mdi-account-cash",
					// 	permission: "view withdraw method",
					// 	children: [
					// 		{
					// 			name: "Withdraw Methods",
					// 			icon: "mdi-paypal",
					// 			to: "/withdraw/method/",
					// 			permission: "view withdraw method"
					// 		},
					// 		{
					// 			name: "Withdraw Requests",
					// 			icon: "mdi-loading",
					// 			to: "/withdraw/requests/",
					// 			permission: "view withdraw method"
					// 		},
					// 		{
					// 			name: "View Log",
					// 			icon: "mdi-eye-outline",
					// 			to: "/withdraw/log/",
					// 			permission: "view withdraw method"
					// 		}
					// 	]
					// },
					// {
					// 	name: "Payment Log",
					// 	icon: "mdi-google-cardboard",
					// 	to: "/payment-log/",
					// 	permission: "payment log"
					// },
					{
						name: "Users Management",
						icon: "mdi-account-group",
						to: "/users",
						permission: "view users"
					},

					{
						name: "Calendar",
						icon: "mdi-calendar-month",
						to: "/calendar",
						permission: "calendar"
					},
					{
						name: "Product",
						icon: "mdi-cube",
						permission: "view product",
						children: [
							{
								name: "Product List",
								to: "/product/product-list",
								icon: "mdi-view-list",
								permission: "view product"
							},
							{
								name: "Add Product",
								to: "/product/add-product",
								icon: "mdi-plus-circle",
								permission: "view product"
							},
							// {
							// 	name: "Product Brand",
							// 	to: "/product/brand",
							// 	icon: "mdi-diamond-stone",
							// 	permission: "view product"
							// },
							{
								name: "Product Category",
								to: "/product/category",
								icon: "mdi-align-horizontal-left"
							}
							// {
							// 	name: "Print Barcode",
							// 	to: "/product/print-barcode",
							// 	icon: "mdi-barcode",
							// 	permission: "view product"
							// },
							// {
							// 	name: "Adjustment List",
							// 	to: "/product/qty_adjustment",
							// 	icon: "mdi-format-list-bulleted-square",
							// 	permission: "view product"
							// },
							// {
							// 	name: "Add Adjustment",
							// 	to: "/product/add_adjustment",
							// 	icon: "mdi-playlist-edit",
							// 	permission: "view product"
							// },
							// {
							// 	name: "Stock Count",
							// 	to: "/product/stock-count",
							// 	icon: "mdi-shield-check",
							// 	permission: "view product"
							// }
						]
					},
					{
						name: "Purchase",
						icon: "mdi-arrow-down-circle",
						permission: "view purchase",
						children: [
							{
								name: "Purchase List",
								to: "/purchase/purchase-list",
								icon: "mdi-view-list",
								permission: "view purchase"
							},
							{
								name: "Add Purchase",
								to: "/purchase/add_purchase",
								icon: "mdi-plus-circle",
								permission: "view purchase"
							},
							{
								name: "Import Purchase By CSV",
								to: "/purchase/import_purchase",
								icon: "mdi-file-import",
								permission: "view purchase"
							}
						]
					},
					{
						name: "Sale",
						icon: "mdi-cart",
						permission: "view sales",
						children: [
							{
								name: "Sale List",
								to: "/sale/sale-list",
								icon: "mdi-view-list",
								permission: "view sales"
							},
							{
								name: "Add Sale",
								to: "/sale/add_sale",
								icon: "mdi-plus-circle",
								permission: "view sales"
							},

							// {
							// 	name: "Import Sale By CSV",
							// 	to: "/sale/import_sale",
							// 	icon: "mdi-file-import",
							// 	permission: "view sales"
							// },
							// {
							// 	name: "Gift Card List",
							// 	to: "/sale/gift_card",
							// 	icon: "mdi-id-card",
							// 	permission: "view sales"
							// },
							{
								name: "POS List",
								to: "/sale/pos/",
								icon: "mdi-view-list",
								permission: "view sales"
							},
							{
								name: "POS",
								to: "/sale/pos/create",
								icon: "mdi-plus-circle",
								permission: "view sales"
							},
							{
								name: "Import Sale By CSV",
								to: "/sale/import_sale",
								icon: "mdi-file-import",
								permission: "view sales"
							}
							// {
							// 	name: "Gift Card List",
							// 	to: "/sale/gift_card",
							// 	icon: "mdi-id-card",
							// 	permission: "view sales"
							// },
							// {
							// 	name: "Coupon List",
							// 	to: "/sale/coupons",
							// 	icon: "mdi-ticket-percent",
							// 	permission: "view sales"
							// },
							// {
							// 	name: "Delivery List",
							// 	to: "/sale/delivery",
							// 	icon: "mdi-truck-delivery",
							// 	permission: "view sales"
							// }
						]
					},
					{
						name: "Expense",
						icon: "mdi-calculator",
						permission: "view expense",
						children: [
							{
								name: "Expense Category",
								icon: "mdi-tag-multiple",
								to: "/expense/expense_categories",
								permission: "view expense"
							},
							{
								name: "Expense List",
								icon: "mdi-view-list",
								to: "/expense/expense_list",
								permission: "view expense"
							}
						]
					},
					{
						name: "Quotation",
						icon: "mdi-book-open-page-variant",
						permission: "view quotation",
						children: [
							{
								name: "Quotation List",
								icon: "mdi-view-list",
								to: "/quotation/quotations",
								permission: "view quotation"
							},
							{
								name: "Add Quotation",
								icon: "mdi-plus-circle",
								to: "/quotation/add",
								permission: "view quotation"
							}
						]
					},
					{
						name: "Transfer",
						icon: "mdi-transfer-right",
						permission: "view transfer",
						children: [
							{
								name: "Transfer List",
								icon: "mdi-view-list",
								to: "/transfer/transfers",
								permission: "view transfer"
							},
							{
								name: "Add Transfer",
								icon: "mdi-plus-circle",
								to: "/transfer/add_transfer",
								permission: "view transfer"
							},
							{
								name: "Import Transfer By CSV",
								icon: "mdi-file-import",
								to: "/transfer/import_transfer",
								permission: "view transfer"
							}
						]
					},
					{
						name: "Location",
						icon: "mdi-map-marker",
						permission: "view transfer",
						children: [
							{
								name: "Location List",
								icon: "mdi-location-enter",
								to: "/location/"
							},
							{
								name: "Add Location",
								icon: "mdi-plus-circle",
								to: "/location/create"
							}
						]
					},
					{
						name: "Return",
						icon: "mdi-package-down",
						permission: "return sales",
						children: [
							{
								name: "Sale",
								icon: "mdi-view-list",
								permission: "return sales",
								to: "/return/return-sale/view",
								permission: "return purchases"
							},
							{
								name: "Purchase",
								icon: "mdi-plus-circle",
								to: "/return/return-purchase/view",
								permission: "return purchases"
							}
						]
					},
					{
						name: "HRM",
						icon: "mdi-account-group",
						permission: "view employee",
						children: [
							{
								name: "Department",
								icon: "mdi-bank-plus",
								to: "/hrm/department",
								permission: "view employee"
							},
							{
								name: "Employee",
								icon: "mdi-account-tie",
								to: "/hrm/employee",
								permission: "view employee"
							},
							{
								name: "Attendance",
								icon: "mdi-map-clock",
								to: "/hrm/attendance",
								permission: "view employee"
							},
							{
								name: "PayRoll",
								icon: "mdi-credit-card-outline",
								to: "/hrm/payroll",
								permission: "view employee"
							},
							{
								name: "Holiday",
								icon: "mdi-beach",
								to: "/hrm/holiday",
								permission: "view employee"
							}
						]
					},
					// {
					// 	name: "Accounting",
					// 	icon: "mdi-bank",
					// 	permission: "view account",
					// 	children: [
					// 		{
					// 			name: "Account List",
					// 			icon: "mdi-view-list",
					// 			to: "/accounting/account",
					// 			permission: "view account"
					// 		},
					// 		{
					// 			name: "Balance Sheet",
					// 			icon: "mdi-google-spreadsheet",
					// 			to: "/accounting/balancesheet",
					// 			permission: "view account"
					// 		}
					// 	]
					// },
					{
						name: "People",
						icon: "mdi-account-circle",
						permission: "view users",
						children: [
							{
								name: "Member List",
								icon: "mdi-account-tie",
								to: "/people/member",
								permission: "view users"
							},
							{
								name: "Add Member",
								icon: "mdi-plus-circle",
								to: "/people/add_member",
								permission: "view users"
							},
							{
								name: "Biller List",
								icon: "mdi-credit-card-outline",
								to: "/people/biller",
								permission: "view biller"
							},
							{
								name: "Add Biller",
								icon: "mdi-plus-circle",
								to: "/people/add_biller",
								permission: "add biller"
							},
							{
								name: "Supplier List",
								icon: "mdi-shield-star",
								to: "/people/supplier",
								permission: "view supplier"
							},
							{
								name: "Add Supplier",
								icon: "mdi-plus-circle",
								to: "/people/add_supplier",
								permission: "view supplier"
							}
						]
					},
					{
						name: "Product",
						icon: "mdi-sitemap",
						permission: "member",
						to: "/member/product"
					},
					{
						name: "Report",
						icon: "mdi-newspaper-variant",
						permission: "summary report",
						children: [
							{
								name: "Summary Report",
								icon: "mdi-book-open",
								to: "/report/summary_report",
								permission: "summary report"
							},
							{
								name: "Best Seller",
								icon: "mdi-account-tie",
								permission: "summary report",
								to: "/report/best_seller"
							},
							{
								name: "Product Report",
								icon: "mdi-newspaper-variant",
								to: "/report/product_report",
								permission: "summary report"
							},
							{
								name: "Daily Sale",
								icon: "mdi-alpha-s-circle-outline",
								permission: "summary report"
							},
							{
								name: "Monthly Sale",
								icon: "mdi-alpha-s-circle",
								permission: "summary report"
							},
							{
								name: "Daily Purchase",
								icon: "mdi-alpha-p-circle-outline",
								permission: "summary report"
							},
							{
								name: "Monthly Purchase",
								icon: "mdi-alpha-p-circle",
								permission: "summary report"
							},
							{
								name: "Sale Report",
								icon: "mdi-card-text",
								to: "/report/sale_report",
								permission: "summary report"
							},
							{
								name: "Payment Report",
								icon: "mdi-card-text-outline",
								to: "/report/payment_report",
								permission: "summary report"
							},
							{
								name: "Purchase Report",
								icon: "mdi-credit-card-multiple",
								to: "/report/purchase_report",
								permission: "summary report"
							},
							{
								name: "Warehouse Report",
								icon: "mdi-bank-outline",
								to: "/report/warehouse_report",
								permission: "summary report"
							},
							{
								name: "Warehouse Stock Chart",
								icon: "mdi-chart-bar",
								permission: "summary report"
							},
							{
								name: "Product Quantity Alert",
								icon: "mdi-bell-alert",
								to: "/report/product_quantity_alert",
								permission: "summary report"
							},
							{
								name: "User Report",
								icon: "mdi-account-badge-horizontal-outline",
								to: "/report/user_report",
								permission: "summary report"
							},
							{
								name: "Customer Report",
								icon: "mdi-account-card-details",
								to: "/report/customer_report",
								permission: "summary report"
							},
							{
								name: "Supplier Report",
								icon: "mdi-shield-star",
								to: "/report/supplier_report",
								permission: "summary report"
							},
							{
								name: "Due Report",
								icon: "mdi-map-clock-outline",
								to: "/report/due_report",
								permission: "summary report"
							}
						]
					},
					{
						name: "History Log",
						icon: "mdi-map-search-outline",
						to: "/history/",
						permission: "support"
					}
					// {
					// 	name: "Support",
					// 	icon: "mdi-face-agent",
					// 	to: "/supports/",
					// 	permission: "support"
					// }
				]
			};
		},

		methods: {
			logout() {
				this.$auth.logout();
			},

			viewProfile() {
				this.$router.push(`/users/profile`);
			},

			handle(f) {
				this[f]();
			}
		},

		computed: {
			user() {
				return this.$store.state.auth ? this.$store.state.auth.user : {};
			}
		},

		// async created() {
		// 	const { data: permissions } = await this.$axios.get(
		// 		"/api/auth/permissions"
		// 	);
		// 	const { data: roles } = await this.$axios.get("/api/auth/roles");

		// 	this.$laravel.setPermissions(permissions);
		// 	this.$laravel.setRoles(roles);
		// 	console.log(roles, permissions);
		// }

		created() {
			if (this.user.role[0] === "administrator") {
				this.$laravel.setPermissions([
					"view payroll",
					"add payroll",
					"edit payroll",
					"delete payroll",
					"calendar",
					"view users",
					"add users",
					"edit users",
					"delete users",
					"view sales",
					"add sales",
					"import sales",
					"edit sales",
					"delete sales",
					"view website",
					"add website",
					"edit website",
					"delete website",
					"view product",
					"add product",
					"edit product",
					"delete product",
					"import product",
					"view purchase",
					"add purchase",
					"edit purchase",
					"delete purchase",
					"import purchase",
					"view expense",
					"add expense",
					"edit expense",
					"delete expense",
					"import expense",
					"view quotation",
					"add quotation",
					"edit quotation",
					"view transfer",
					"add transfer",
					"edit transfer",
					"view employee",
					"add employee",
					"edit employee",
					"delete employee",
					"view account",
					"add account",
					"edit account",
					"delete account",
					"import account",
					"view customer",
					"add customer",
					"edit customer",
					"delete customer",
					"import customer",
					"view biller",
					"add biller",
					"edit biller",
					"delete biller",
					"import biller",
					"view supplier",
					"add supplier",
					"edit supplier",
					"delete supplier",
					"import supplier",
					"summary report",
					"product report",
					"daily sale report",
					"monthly sale report",
					"daily purchase report",
					"monthly purchase report",
					"sale report",
					"payment report",
					"purchase report",
					"warehouse report",
					"product qty alert",
					"user report",
					"customer report",
					"supplier report",
					"due report",
					"support",
					"payment log",
					"add withdraw method",
					"view withdraw method",
					"edit withdraw method",
					"delete withdraw method",
					"charge commission",
					"pos",
					"return sales",
					"return purchases"
				]);
			}

			if (this.user.role[0] === "technician") {
				this.$laravel.setPermissions([
					"view website",
					"add website",
					"edit website",
					"delete website",
					"calendar"
				]);
			}

			if (
				this.user.role[0] === "saleman" ||
				this.user.role[0] === "Supervisor"
			) {
				this.$laravel.setPermissions([
					"calendar",
					"view sales",
					"add sales",
					"edit sales",
					"delete sales",
					"import sales",
					"summary report",
					"product report",
					"daily sale report",
					"monthly sale report",
					"daily purchase report",
					"sale report",
					"purchase report",
					"warehouse report",
					"product qty alert",
					"customer report",
					"supplier report",
					"due report",
					"pos",
					"return sales"
				]);
			}

			if (this.user.role[0] === "accountant") {
				this.$laravel.setPermissions([
					"view payroll",
					"add payroll",
					"edit payroll",
					"delete payroll",
					"view purchase",
					"view sales",
					"view product",
					"view account",
					"add account",
					"edit account",
					"delete account",
					"import account",
					"return sales",
					"view employee",
					"view biller",
					"return purchases",
					"view transfer",
					"view expense",
					"add expense",
					"edit expense",
					"delete expense",
					"import expense",
					"calendar"
				]);
			}

			if (this.user.role[0] === "saleManager") {
				this.$laravel.setPermissions([
					"calendar",
					"view sales",
					"import sales",
					"view product",
					"payment log",
					"add withdraw method",
					"return sales",
					"return purchases",
					"summary report",
					"product report",
					"daily sale report",
					"monthly sale report",
					"daily purchase report",
					"monthly purchase report",
					"sale report",
					"payment report",
					"purchase report",
					"warehouse report",
					"product qty alert",
					"user report",
					"customer report",
					"supplier report",
					"due report"
				]);
			}

			if (this.user.role[0] === "member") {
				this.$laravel.setPermissions(["member"]);
			}
		}
	};
</script>


<style lang="scss">
	.color {
		background: #34495e;
		&--item {
			background: #455a64;
		}
	}

	.subMenu {
		padding-left: 2em;
	}

	.posLink {
		display: block;
		text-decoration: none;
		padding-top: 7px;
	}

	.v-list-group__items {
		color: #92e6b2;
	}

	.primary--text {
		color: #43d9ec;
	}
</style>