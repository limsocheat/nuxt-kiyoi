<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<v-card-title class="headline font-weight-light">
				ADD User
			</v-card-title>
			<v-divider></v-divider>
			<v-row class="px-5">
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="name">User Name</label>
					<v-text-field 
						outlined solo dense
						label="Product Name"
					></v-text-field>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="name">Company Name</label>
					<v-text-field 
						outlined solo dense
						label="Company Name"
					></v-text-field>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">Password</label>
					<v-text-field 
						outlined solo dense
						label="Product Code"
					></v-text-field>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">Role</label>
					<v-select outlined solo dense label="Please Select"></v-select>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">Email</label>
					<v-text-field 
						outlined solo dense  
						label="email@email.com"
					></v-text-field>
				</v-col>
				<v-col sm="6" cols="12">
					<label class="font-weight-bold" for="">Warehouse</label>
					<v-select 
						outlined solo dense
						label="email@email.com"
					></v-select>
				</v-col>
			</v-row>
			<v-row class="px-5">
				<v-col sm="6" cols="12">
					<label class="font-weight-bold">Phone Number</label>
					<v-text-field outlined solo dense label="Phone Number"></v-text-field>
				</v-col>
				<v-col sm="12" cols="12" class="d-flex align-center">
					<v-checkbox></v-checkbox>
					<label class="font-weight-bold">Active</label>
				</v-col>
			</v-row>
			<v-btn class="teal lighten-3 mx-5 mb-5">
				<v-icon left>mdi-check</v-icon>
				Submit
			</v-btn>
		</v-card>
	</v-app>
</template>

<script>
	export default {
		data() {
			return {

			}
		}	
	}
</script>