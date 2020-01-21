import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, alpha, email, min} from 'vee-validate/dist/rules';

import Vue from 'vue';
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);


extend('required', {
  ...required,
  message: '*This {_field_} field is required'
});

extend('alpha', {
  ...alpha,
  message: "*This field must only contain alphabetic characters"
});

extend('email', {
  ...email,
  message: "*This field must be a valid email"
});


extend('min', {
	...min,
	message: "*Name Must be 3 characters at least"
});

// import Vue from 'vue';
// import VeeValidateLaravel from 'vee-validate-laravel';

// Vue.use(VeeValidateLaravel);