<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<v-card-title class="blue lighten-1 white--text">Add Location(Branch)</v-card-title>
			<v-divider></v-divider>
			<v-row class="pt-5 mx-5">
				<v-col md="6" cols="12">
					<label for="">Name</label>
					<validation-provider rules="required|min:3" v-slot="{errors}">
						<input type="text" class="form--location" v-model="form.name">
						<span class="location--validate">{{errors[0]}}</span>
					</validation-provider>
				</v-col>
				<v-col md="6" cols="12">
					<label for="">Address</label>
					<validation-provider rules="required|min:3" v-slot="{errors}">
						<input type="text" class="form--location" v-model="form.address">
						<span class="location--validate">{{errors[0]}}</span>
					</validation-provider>
				</v-col>
				<v-col md="6" cols="12">
					<label for="">City</label>
					<validation-provider rules="required|min:3" v-slot="{errors}">
						<input type="text" class="form--location" v-model="form.city">
						<span class="location--validate">{{errors[0]}}</span>
					</validation-provider>
				</v-col>
				<v-col md="6" cols="12">
					<label for="">Country</label>
					<input type="text" class="form--location" v-model="form.country">
				</v-col>
				<v-col cols="12">
					<label for="">Note</label>
					<textarea cols="30" rows="7" v-model="form.description" class="form--location"></textarea>
				</v-col>
			</v-row>
			<v-btn color="primary" class="mx-7 mb-5" @click="createItem">
				<v-icon>mdi-check</v-icon>
				Create
			</v-btn>
		</v-card>
	</v-app>
</template>

<script>
	export default {
		data() {
			return {
				form: {},
				items: []
			}
		},

		methods: {
			createItem() {
				this.$axios.$post(`api/location`, this.form)
				.then(res => {
					this.items = res.data;
					this.$router.push(`/location/`);
				})
				.catch(err => {
					console.log(err.response);
				})
			}
		},

	}
</script> 

<style lang="scss">
	.form--location {
		border: 1px solid #59bf19;
		padding: 5px 10px 5px 10px;
		width: 100%;
		outline: none;
	}

	.location--validate {
		color: red;
	}
</style>