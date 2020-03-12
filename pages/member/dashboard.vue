<template>
	<v-container>
		<v-card>
			<v-card-title>Your Profile</v-card-title>
			<v-divider></v-divider>
			<v-card-text>
				<div>
					<img :src="baseURL + `image/${user.image}`" alt="">
				</div>
				<div>
					<label for="id">ID</label>
					<span>{{ user.referral_code }}</span>
				</div>
				<div>
					<label for="name">Name</label>
					<span>{{ user.name }}</span>
				</div>
				<div>
					<label for="address">Address</label>
					<span>{{ user.address }}</span>
				</div>
				<div>
					<label for="phone">Phone</label>
					<span>{{ user.phone }}</span>
				</div>
				<div>
					<label for="city">City</label>
					<span>{{ user.city }}</span>
				</div>
				<div>
					<label for="country">Country</label>
					<span>{{ user.country }}</span>
				</div>
			</v-card-text>
		</v-card>

	</v-container>
</template>

<script>



export default {

	created() {
		this.getProfile()
	},

	data() {
		return {
			user: [],
			baseURL: process.env.APP_URL,
		}
	},

	methods: {
		getProfile() {
			let user = this.$store.state.auth.user.user;

			this.$axios.$get(`api/user/` + user.id)
			.then(res => {
				this.$set(this.$data, 'user', res.user)
				console.log(res);
			})
			.catch(err => {
				console.log(err.response);
			})
		}
	}
}

</script>