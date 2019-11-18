<template>
	<v-app>
		<v-app-bar color="blue darken-3" app fixed clipped dense>
			<v-app-bar-nav-icon @click.stop="toggle = !toggle"></v-app-bar-nav-icon>
			<v-toolbar-title>Page title</v-toolbar-title>
		</v-app-bar>

		<v-navigation-drawer app clipped-left class="color" dense v-model="toggle">
			<v-list-item class="text-center font-weight-bold color--item">
				<v-list-item-content>
					<v-list-item-title class="color--text">
						YIKOI
					</v-list-item-title>
				</v-list-item-content>
			</v-list-item>

			<v-divider></v-divider>

			<v-list dense rounded>
                <div v-for="(item, i) in menus" :key="i" router exact>
                    <v-list-item v-if="!item.children" :key="i" :to="item.to">
                        <v-list-item-content>
                            <v-list-item-title>
                            	<v-icon>{{ item.icon }}</v-icon>
                            	{{ item.name }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-group v-else :key="i.name" :value="false">
                        <template v-slot:activator>
                            <v-list-item-content>
                                <v-list-item-title>
                                	<v-icon>{{ item.icon }}</v-icon>
                                	{{ item.name }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </template>
                        <v-list-item v-for="(subMenu, i) in item.children" :to="subMenu.to" :key="i" exact class="subMenu">
                            <v-list-item-content>
                            	<v-list-item-title>
                                	<v-icon>{{ subMenu.icon }}</v-icon>
                                	{{ subMenu.name }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-group>
                </div>

            </v-list>
		</v-navigation-drawer>

		<v-content>
			<nuxt />
		</v-content>
	</v-app>
</template>

<script>
export default {
	data() {
		return {
			toggle: true,
			menus: [
				{
					name: 'Dashboard',
					icon: 'mdi-view-dashboard',
					to: '/'
				},
				{
					name: 'Website Control',
					icon: 'mdi-desktop-mac',
					children: [
						{ 
							name: 'General Settings', 
							icon: 'mdi-settings', 
							to: "/webcontrol/generalsettings"
						},
						{ 
							name: 'Policy/Term', 
							icon: 'mdi-note', 
							to: '/webcontrol/terms' 
						},
						{ 
							name: 'Email Template', 
							icon: 'mdi-email-open', 
							to: '/webcontrol/template' 
						},
						{ 
							name: 'SMS Api', 
							icon: 'mdi-message-text',
							to: '/webcontrol/sms-api', 
						},
					]
				},
				{
					name: 'Charge/Commision',
					icon: 'mdi-cash',
					to: '/charge'
				},
				{
					name: 'Website Interface',
					icon: 'mdi-internet-explorer',
					children: [ 
						{
							name: 'menu',
							icon: 'mdi-menu',
							to: '/webinterface/menu',
						},
						{
							name: 'Slide Image',
							icon: 'mdi-folder-multiple-image',
							to: '/webinterface/slide',
						},
						{
							name: 'Logo',
							icon: 'mdi-file-image',
							to: '/webinterface/logo',
						},
						{
							name: 'Service',
							icon: 'mdi-chart-line-stacked',
						},
						{
							name: 'Team',
							icon: 'mdi-sitemap',
							to: '/webinterface/team',
						},
						{
							name: 'Contact',
							icon: 'mdi-account-badge-horizontal-outline',
							to: '/webinterface/contact',
						},
						{
							name: 'About',
							icon: 'mdi-information',
							to: '/webinterface/about',
						},
						{
							name: 'Social',
							icon: 'mdi-facebook-box',
							to: '/webinterface/social',
						},
						{
							name: 'Footer',
							icon: 'mdi-content-save-all-outline',
							to: '/webinterface/footer',
						},
						{
							name: 'Testimonial',
							icon: 'mdi-message-reply-text',
							to: '/webinterface/testimonial',	
						},
						{
							name: 'User Tree Image',
							icon: 'mdi-account-circle',
							to: '/webinterface/tree-image',
						},
						{
							name: 'Background Image',
							icon: 'mdi-image'
						},
					]
				},
				{
					name: 'Withdraw System',
					icon: 'mdi-account-cash',
					children: [
						{ 
							name: 'Withdraw Methods',
							icon: 'mdi-paypal', 
							to: '/withdraw/method/'
						},
						{ 
							name: 'Withdraw Requests', 
							icon: 'mdi-loading',
							to: '/withdraw/requests/' 
						},
						{ 
							name: 'View Log', 
							icon: 'mdi-eye-outline',
							to: '/withdraw/log/' 
						},
					]
				},
				{
					name: 'Payment Gateways',
					icon: 'mdi-credit-card-outline',
					to: '/'
				},
				{
					name: 'Payment Log',
					icon: 'mdi-google-cardboard',
					to: '/payment-log/'
				},
				{
					name: 'Users Management',
					icon: 'mdi-account-group',
					to: '/users'
				},
				{
					name: 'Matching History',
					icon: 'mdi-content-copy',
					to: '/match-history/'
				},
				{
					name: 'Support',
					icon: 'mdi-face-agent',
					to: '/supports/'
				},
				{
					name: 'Generate Matching',
					icon: 'mdi-reload',
					to: '/'
				},
			]
		};
	}
};
</script>


<style lang="scss">
	.color {
		background: #34495e;
		&--item {
			background: #257db9;
		}
	}

	.subMenu {
		padding-left: 3em;
	}
</style>