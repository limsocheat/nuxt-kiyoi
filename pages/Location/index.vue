<template>
	<v-container>
		<div class="pb-5">
			<nuxt-link to="/location/create">
				<v-btn color="primary">
					<v-icon left>mdi-plus-circle</v-icon>
					Add Branch
				</v-btn>

			</nuxt-link>
		</div>
		<v-card>
			<v-text-field
				label="Search"
				class="location--search"
				prepend-inner-icon="mdi-magnify"
				v-model="search"
			/>
			<v-data-table
				:headers="headers"
				:items="items"
				:server-items-length="total"
				:items-per-page="itemsPerPage"
				:options.sync="options"
			>
				<template v-slot:item="{ item }">
					<tr>
						<td>{{ item.name }}</td>
						<td>{{ item.address }}</td>
						<td>{{ item.city }}</td>
						<td>{{ item.country }}</td>
						<td>{{ item.description }}</td>
						<td>
							<v-tooltip bottom>
								<template v-slot:activator="{ on }">
									<v-btn
										@click="editItem(item.id)"
										small
										outlined
										color="primary"
										icon
										v-on="on"
									>
										<v-icon small>
											mdi-pencil
										</v-icon>
									</v-btn>
								</template>
								<span>Edit Location</span>
							</v-tooltip>
							<v-tooltip bottom>
								<template v-slot:activator="{ on }">
									<v-btn
										@click="deleteItem(item.id)"
										small
										outlined
										color="red"
										icon
										v-on="on"
									>
										<v-icon small>
											mdi-delete
										</v-icon>
									</v-btn>
								</template>
								<span>Edit Location</span>
							</v-tooltip>
						</td>
					</tr>
				</template>
			</v-data-table>
		</v-card>
	</v-container>
</template>

<script>
	export default {
		created() {
			this.fetchData();
		},

		watch: {
			search: {
				handler() {
					this.fetchData();
				}
			},
			options: {
				handler() {
					this.fetchData();
				}
			}
		},

		data() {
			return {
				items: [],
				headers: [
					{ text: "Name", sortable: false },
					{ text: "Address", sortable: false },
					{ text: "City", sortable: false },
					{ text: "Country", sortable: false },
					{ text: "Note", sortable: false },
					{ text: "Action", sortable: false }
				],
				search: "",
				total: 0,
				itemsPerPage: 5,
				options: {},
				page: 1
			};
		},

		methods: {
			fetchData() {
				this.$axios
					.$get(
						`api/location?search=${this.search}&page=${this.page}&itemsPerPage=${this.options.itemsPerPage}`
					)
					.then(res => {
						this.items = res.locations.data;
						this.total = res.locations.total;
						console.log(res);
						console.log(this.options);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			editItem(id) {
				this.$router.push(`/location/${id}/edit`);
			},

			deleteItem(id) {
				if (confirm("Are u sure to delete it?")) {
					this.$axios
						.$delete(`api/location/` + id)
						.then(res => {
							this.fetchData();
							this.$toast.success("Deleted Successfully");
						})
						.catch(err => {
							console.log(err.response);
						});
				}
			}
		}
	};
</script>

<style lang="scss">
	.location--search {
		width: 50%;
		margin-left: 10px;
	}
</style>