export default ({ store, redirect }) => {
	let authenticatedUser = store.state.auth.user;
	
	// if(authenticatedUser.role == 'administrator') {
	// 	return redirect('/')

	// }
	if(authenticatedUser.role == 'member') {
		return redirect('/member/product')
	}
	// else {
	// 	return redirect('/')
	// }
}