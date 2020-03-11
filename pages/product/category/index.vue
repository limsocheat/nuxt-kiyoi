<template>
	<v-container>
		<v-card>
			<div class="d-flex align-items-center justify-space-between px-5 py-5">
				<input class="category-search" v-model="search" type="text" placeholder="Search...">
				<v-btn @click="openDialog" color="primary">
					<v-icon>mdi-plus-circle</v-icon>New Category
				</v-btn>		
			</div>
			<v-dialog
			    v-model="dialog"
			    width="650"
			    persistent
		    >
		      	<v-card>
			        <v-card-title
			          class="headline grey lighten-2"
			          primary-title
			        >
			          Add New Category
			        </v-card-title>
					
					<ValidationObserver ref="form">
				        <v-card-text>
				        	<!-- Category Name -->
				        	<validation-provider name="Category Name" rules="required" v-slot="{ errors }">
				        		<v-text-field v-model="form.name" label="Category Name"></v-text-field>
				        		<span class="red--text">{{ errors[0] }}</span>
				        	</validation-provider>
							
							<!-- Code -->
			        		<v-text-field v-model="form.code" label="Category Code"></v-text-field>
				        	
							<!-- Description -->
			        		<v-text-field v-model="form.description" label="Description"></v-text-field>
				        		
				        </v-card-text>
					</ValidationObserver>					

			        <v-divider></v-divider>

			        <v-card-actions>
				        <v-spacer></v-spacer>
				        <v-btn
				            color="primary"
				            text
				            @click="saveCategory"
				            v-if="create"
				        >
				            <v-icon>mdi-telegram</v-icon>Create
				        </v-btn>
				        <v-btn
				            color="primary"
				            text
				            @click="updateCategory"
				            v-if="!create"
				        >
				            <v-icon>mdi-telegram</v-icon>Update
				        </v-btn>
				        <v-btn @click="closeDialog">
				          	<v-icon>mdi-cancel</v-icon>
				          	Close
				        </v-btn>
			        </v-card-actions>
			    </v-card>
		    </v-dialog>
			<v-data-table
				:headers="headers"
				:items="categories"
			>
				<template v-slot:item.action="{ item }">
					<v-btn @click="editItem(item)" color="primary" outlined small> 
						<v-icon
					        small
					    >
					        mdi-pencil
					    </v-icon>
					</v-btn>

					<v-btn @click="deleteItem(item)" color="red" outlined small> 
					    <v-icon
					        small
					    >
					        mdi-delete
					    </v-icon>
					</v-btn>
				</template>
			</v-data-table>
		</v-card>
	</v-container>
</template>

<script>
	export default {
		name: "ProductCategory",

		created() {
			this.getCategory();
		},

		data() {
			return {
				form: {},
				create: true,
				categories: [],
				dialog: false,
				search: '',
				headers: [
					{
						text: "Category Name",
						sortable: false,
						value: 'name',
					},
					{
						text: "Category Code",
						sortable: false,
						value: 'code',
					},
					{
						text: "Description",
						sortable: false,
						value: 'description',
					},
					{
						text: "Action",
						sortable: false,
						value: 'action',
					},
				]
			};
		},

		watch: {
			search: {
				handler() {
					this.getCategory()
				}
			}
		},

		methods: {
			getCategory() {
				this.$axios
					.$get(`api/category?search=${this.search}`)
					.then(res => {
						this.$set(this.$data, 'categories', res.categories.data);
						console.log(res);
					})
					.catch(err => {
						console.log(err.response);
					});
			},

			saveCategory() {
				this.$axios.$post(`api/category`, this.form)
				.then(res => {
					this.getCategory()
					this.closeDialog()
					this.$toast.success('Category Created Successfully!!')
				})
				.catch(err => {
					console.log(err.response);
					this.$toast.error('Pls try Again!!')
					this.$refs.form.validate(err.response.data.errors)
				})
			},

			updateCategory() {
				this.$axios.$patch(`api/category/` + this.form.id, {
					name: this.form.name,
					code: this.form.code,
					description: this.form.description,
				})
				.then(res => {
					this.getCategory()
					this.create = true;
					this.closeDialog()
					this.$toast.success('Update item Successfully');
				})
				.catch(err => {
					console.log(err);
					this.$toast.error('Delete fail, try again!!');
				})
			},

			editItem(item) {
				this.form = Object.assign({}, item)
				this.dialog = true
				this.create = false
			},

			deleteItem(item) {
				if(confirm('Are u sure to delete it??')) {
					this.$axios.delete(`api/category/` + item.id)
					.then(res => {
						this.$toast.success('Delete item Successfully..')
						this.getCategory()
						console.log(res);
					})
					.catch(err => {
						this.$toast.error('Delete item fail, try again!!')
						console.log(err.response);
					})
				}
			},

			openDialog() {
				this.dialog = true;
			},

			closeDialog() {
				this.dialog = false;
				this.form = {}
			}
		}
	};
</script>

<style lang="scss">

.category-search {
	border: 1px solid #64b811;
	padding: 5px 10px 5px 10px;
	width: 50%;
	border-radius: 5px;
	outline: none;
}
</style>