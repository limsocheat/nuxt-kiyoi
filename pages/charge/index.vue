<template>
	<v-app>
		<v-card class="my-5 mx-5">
			<v-card-title class="charge--header">
				<v-icon>mdi-settings</v-icon>
				Commission Settings
			</v-card-title>
			<v-divider></v-divider>
			<div class="px-7 pb-5">
				<v-row>
					<v-col md="6">
						<label class="font-weight-bold">Transfer Charge User To User:</label>
						<input type="text" class="form-control">
						<v-icon class="form-icon" style="font-size: 30px;">mdi-percent</v-icon>
					</v-col>
					<v-col md="6">
						<label class="font-weight-bold">Withdraw Charge:</label>
						<input type="text" class="form-control">
						<v-icon class="form-icon" style="font-size: 30px;">mdi-percent</v-icon>
					</v-col>
				</v-row>
				<v-row>
					<v-col md="4">
						<label class="font-weight-bold">UPGRADE Charge:</label>
						<input type="text" class="form-control">
						<v-icon class="form--icon" style="font-size: 30px;">mdi-currency-usd</v-icon>
					</v-col>
					<v-col md="4">
						<label class="font-weight-bold">UPGRADE Commision To TREE:</label>
						<input type="text" class="form-control">
						<v-icon class="form--icon" style="font-size: 30px;">mdi-currency-usd</v-icon>
					</v-col>
					<v-col md="4">
						<label class="font-weight-bold">UPGRADE Commision To Sponsor:</label>
						<input type="text" class="form-control">
						<v-icon class="form--icon" style="font-size: 30px;">mdi-currency-usd</v-icon>
					</v-col>
				</v-row>
			</div>
			<v-divider></v-divider>
			<div class="pt-5 px-5 pb-5">
				<p class="font-weight-bold">UPGRADE To Premium Text:</p>
				<client-only>
					<vue-editor v-model="content"></vue-editor>
				</client-only>
			</div>
			<button class="px-4 py-1 mx-5 mb-5 charge--btn">
				<v-icon color="grey lighten-3">mdi-check</v-icon>
				Update
			</button>
		</v-card>
	</v-app>
</template>

<script>
export default {
  	data() {
  		return {
  			content: "<p>Some initial content</p>"
  		}
  	}
};
</script>

<style lang="scss">
	.charge--header {
		background-color: #42A5F5;
	}

	.form-control {
		padding-top:5px;
		padding-left:15px;
		padding-right:15px;
		padding-bottom: 5px;
		width: 100%;
		border: 1px solid rgba(0,0,0,0.125);
		border-radius: 5px;
		outline: none;
	}

	.form-icon {
		position: relative;
		bottom: 32px;
		left:  445px;
	}

	.form--icon {
		position: relative;
		bottom: 32px;
		left: 275px;
	}

	.charge--btn {
		background-color: #3598dc;
		border-radius: 2px;
		color: #fff;
	}
</style>