<template>
	<v-container>
		<v-card>
			<div class="posheader">
				<span class="posheader--header">POS</span>
				<span class="posheader--search">
					<input type="text" class="posheader--input" placeholder="Search...." v-model="search" />
				</span>
			</div>
			<v-divider></v-divider>
			<v-data-table :headers="headers" :items="pos">
				<template v-slot:item="{ item }">
					<tr>
						<td>{{ item.created_at }}</td>
						<td>{{ item.reference_no }}</td>
						<td>{{ item.member.name }}</td>
						<td>
							<span :class="item.payment_status === 'paid' ? 'paid' : 'due'">{{ item.payment_status }}</span>
						</td>
						<td>{{ item.payment_method }}</td>
						<td>$ {{ item.grand_total | formatMoney }}</td>
						<td>$ {{ item.paid | formatMoney }}</td>
						<td>
							<v-btn small icon outlined>
								<v-icon small color="teal">mdi-eye</v-icon>
							</v-btn>
							<v-btn small icon outlined>
								<v-icon small color="primary">mdi-pencil</v-icon>
							</v-btn>
							<v-btn small icon outlined>
								<v-icon small color="red">mdi-delete</v-icon>
							</v-btn>
						</td>
					</tr>
				</template>
			</v-data-table>
		</v-card>
	</v-container>
</template>

<script>
import Vue from 'vue';

let numeral = require('numeral');

Vue.filter('formatMoney', function(value) {
    return numeral(value).format('0,0.00');
});

export default { 
    name: 'PosList',

    created() {
        this.fetchSale()
    },

    watch: {
        search: {
            handler() {
                this.fetchSale();
            }
        }
    },

    data() {
        return {
            pos: [],
            search: '',
            headers: [
                {text: 'Date', sortable: false,},
                {text: 'Invoice Number', sortable: false,},
                {text: 'Customer', sortable: false,},
                {text: 'Payment Status', sortable: false,},
                {text: 'Payment Method', sortable: false,},
                {text: 'Total Amount', sortable: false,},
                {text: 'Total Paid', sortable: false,},
                {text: 'Actions', sortable: false,},
            ],
        }
    },

    methods: {
        fetchSale() {
            this.$axios.$get(`api/sale?search=${this.search}`)
            .then(res => {
                Vue.set(this.$data, 'pos', res.sales.data);
                console.log(res);
            })
            .catch(err => {
                console.log(err.response);
            })
        }
    }
}
</script>

<style lang="scss">
	.paid {
		background-color: #36d160;
		padding: 5px 7px 5px 7px;
		border-radius: 5px;
	}

	.due {
		background-color: #e0355a;
		padding: 5px 7px 5px 7px;
		border-radius: 5px;
		color: #fff;
	}

	.posheader {
		padding: 10px 15px 10px 15px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		&--search {
			width: 50%;
		}
		&--input {
			border: 1px solid olivedrab;
			outline: none;
			padding: 7px 15px 7px 15px;
			font-size: 15px;
			width: 100%;
			border-radius: 3px;
		}
	}
</style>