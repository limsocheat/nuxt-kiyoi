<template>
	<v-container>
		<div>
			<v-dialog
				v-model="dialog"
				persistent
				max-width="500"
			>
				<template v-slot:activator="{ on }">
					<v-btn
						color="primary"
						class="mb-3"
						v-on="on"
					>
						<v-icon>mdi-plus</v-icon> New Sale Group
					</v-btn>
				</template>
				<v-card>
					<v-card-title>New SaleGroup</v-card-title>
					<v-card-text>
						<v-text-field
							prepend-inner-icon="mdi-account-group"
							label="Group Name"
							v-model="form.name"
						></v-text-field>
						<v-text-field
							prepend-inner-icon="mdi-card-text"
							label="Description"
							v-model="form.description"
						></v-text-field>
					</v-card-text>
					<v-divider></v-divider>
					<v-card-actions>
						<v-btn
							color="red"
							text
							@click.prevent="closeDialog"
						>
							<v-icon>mdi-close</v-icon>Cancel
						</v-btn>
						<v-btn
							@click="save"
							color="primary"
							v-if="create"
							:loading=loading
						>
							<v-icon>mdi-content-save</v-icon>
							Save
						</v-btn>

						<!-- For Update -->
						<v-btn
							@click="updateItem"
							color="primary"
							v-if="!create"
							:loading=loading
						>
							<v-icon>mdi-content-save</v-icon>
							Update
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>

		</div>
		<v-card>
			<div class="d-flex justify-space-between">
				<v-card-title>Sale Group</v-card-title>
				<div class="search-box">
					<v-text-field
						prepend-inner-icon="mdi-magnify"
						label="Search"
					></v-text-field>
				</div>
			</div>
			<v-divider></v-divider>
			<v-card-text>
				<v-data-table
					:headers="headers"
					:items="items"
				>
					<template v-slot:item="{ item }">
						<tr>
							<td>{{ item.id }}</td>
							<td>{{ item.name }}</td>
							<td>{{ item.description }}</td>
							<td>
								<v-btn
									color="primary"
									@click.prevent="editItem(item)"
								>
									<v-icon>mdi-pencil</v-icon>
								</v-btn>
								<v-btn
									color="red"
									dark
									@click.prevent="deleteItem(item.id)"
								>
									<v-icon>mdi-close</v-icon>
								</v-btn>
							</td>
						</tr>
					</template>
				</v-data-table>
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script>
	export default {
		data() {
			return {
				headers: [
					{ text: "No", sortable: false },
					{ text: "Group Name", sortable: false, value: "name" },
					{ text: "Description", sortable: false, value: "description" },
					{ text: "Action", sortable: false }
				],
				items: [],
				dialog: false,
				form: {},
				create: true,
				loading: false
			};
		},

		created() {
			this.getSaleGroup();
		},

		methods: {
			getSaleGroup() {
				this.$axios
					.$get(`api/sale-group`)
					.then(res => {
						this.$set(this.$data, "items", res.sale_group);
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			closeDialog() {
				this.dialog = false;
				this.form = {};
				this.create = true;
			},

			save() {
				this.loading = true;
				this.$axios
					.$post(`api/sale-group`, this.form)
					.then(res => {
						this.create = true;
						this.getSaleGroup();
						this.closeDialog();
						console.log(res);
						this.loading = false;
					})
					.catch(err => {
						console.log(err.response);
						this.loading = false;
					});
			},

			editItem(item) {
				this.form = Object.assign({}, item);
				this.dialog = true;
				this.create = false;
			},

			deleteItem(id) {
				if (confirm("Are u sure to delete it??")) {
					this.$axios
						.$delete(`api/sale-group/` + id)
						.then(res => {
							console.log(res);
							this.getSaleGroup();
							this.$toast.success("Sale Group Delete Sucessfully!!");
						})
						.catch(err => {
							console.log(err.response);
						});
				}
			},

			updateItem() {
				this.loading = true;
				this.$axios
					.$post(`api/sale-group/` + this.form.id, {
						name: this.form.name,
						description: this.form.description,
						_method: "PATCH"
					})
					.then(res => {
						this.getSaleGroup();
						this.closeDialog();
						this.create = true;
						this.$toast.success("Sale Group Updated Sucessfully!!");
						this.loading = false;
					})
					.catch(err => {
						console.log(err.response);
						this.loading = false;
					});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.search-box {
		width: 50%;
	}
</style>