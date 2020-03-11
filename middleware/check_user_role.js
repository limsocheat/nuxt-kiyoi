export default ({ store, redirect }) => {
	let authenticatedUser = store.state.auth.user;
	
	// if(authenticatedUser.role == 'administrator') {
	// 	return redirect('/')

	// }
	// else if(authenticatedUser.role == 'member') {
	// 	return redirect('/member/dashboard')
	// }
}