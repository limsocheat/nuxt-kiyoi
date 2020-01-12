<template>
	<v-app>
		<v-card class="mx-5 my-5">
			<div class="teal lighten-2" dark>
				<v-card-title class="white--text">
					Edit Return Sale
				</v-card-title >
			</div>
			<v-divider></v-divider>
			<v-row class="px-5">
				<v-col sm="4" cols="12">
					<label class="font-weight-bold" for="name">Customer *</label>
					<v-autocomplete item-value="name" item-text="name"  dense solo outlined :items="members"></v-autocomplete >
				</v-col>
			</v-row>
			<div class="pb-5 pt-3 px-5">
				<v-btn color="primary" v-permission="'add users'">
					<v-icon left>mdi-check</v-icon>
					Submit
				</v-btn>
			</div>
		</v-card>
	</v-app>
</template>

<script>
	export default {
			
		data() {
			return {
				form: {},
				members: []
			}
		},

		created() {
			// this.$axios.$get('api/return-sale/' + this.$route.params.id)
			// .then(res => {
			// 	this.form = res.index;
			// 	console.log(res)
			// }),

			this.fetchMember()
		},

		methods: {
			fetchMember() {
				this.$axios.$get(`api/member`)
				.then(res => {
					this.members = res.members.data;
					console.log(res)
				})
			},

			createBiller() {
				this.$axios.$post(`api/return-sale/` + this.form.id, {
					'members': this.form.members,
					_method: 'patch',
				})
				.then(res => {
					this.items = res.data;
					this.$router.push('/return/return-sale/index');
				})
				.catch(err => {
					console.log(err.response.data)
				})
			},
		},	
	}
</script>

<style lang="scss">
	.member--form {
		border: 1px solid #22cde0;
		padding: 5px 10px 5px 10px;
		width: 100%;
		outline: none;
	}
</style>