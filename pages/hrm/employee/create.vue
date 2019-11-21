<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<h3 class="px-5 py-2 blue lighten-1 grey--text text--lighten-4">Add Employee</h3>
			<v-divider></v-divider>
			<div class="px-5">
				<v-row>
					<v-col md="6" cols="12">
						<label class="font-weight-bold">Name</label>
						<v-text-field
							solo
							outlined
							dense
							label="Name"
						></v-text-field>
					</v-col>
					<v-col md="6" cols="12">
						<label class="font-weight-bold">Department</label>
						<v-select
							solo
							outlined
							dense
						></v-select>
					</v-col>
					<v-col md="6" cols="12">
						<label class="font-weight-bold">Email</label>
						<v-text-field
							solo
							outlined
							dense
							label="email@email.com"
						></v-text-field>
					</v-col>
					<v-col md="6" cols="12">
						<label class="font-weight-bold">Phone Number</label>
						<v-text-field
							solo
							outlined
							dense
							label="Phone Number"
						></v-text-field>
					</v-col>
					<v-col md="6" cols="12">
						<label class="font-weight-bold">Address</label>
						<v-text-field
							solo
							outlined
							dense
							label="Address"
						></v-text-field>
					</v-col>
					<v-col md="6" cols="12">
						<label class="font-weight-bold">City</label>
						<v-text-field
							solo
							outlined
							dense
							label="City"
						></v-text-field>
					</v-col>
					<v-col md="6" cols="12">
						<label class="font-weight-bold">Country</label>
						<v-text-field
							solo
							outlined
							dense
							label="Country"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col md="6" cols="12" class="d-flex align-center pl-3">
						<label class="font-weight-bold">Add User</label>
						<v-checkbox v-model="checkbox"></v-checkbox>
					</v-col>
				</v-row>
				<v-row v-if="checkbox">
					<v-col md="6" cols="12">
						<label class="font-weight-bold">User Name</label>
						<v-text-field 
							solo
							outlined
							label="User Name"
							dense
						></v-text-field>
					</v-col>
					<v-col md="6" cols="12">
						<label class="font-weight-bold">Password</label>
						<v-text-field 
							solo
							outlined
							label="Password"
							dense
						></v-text-field>
					</v-col>
					<v-col md="6" cols="12">
						<label class="font-weight-bold">Role</label>
						<v-select 
							solo
							outlined
							dense
						></v-select>
					</v-col>
				</v-row>
			</div>
			<v-btn class="purple darken-1 mx-5 mb-5" dark>Submit</v-btn>
		</v-card>
	</v-app>
</template>


<script>
	export default {
		data() {
			return {
				checkbox: true,
			}
		}
	}
</script>