import { ValidationProvider, extend } from 'vee-validate';
import { required, alpha, email, min} from 'vee-validate/dist/rules';

import Vue from 'vue';
Vue.component('ValidationProvider', ValidationProvider);


extend('required', {
  ...required,
  message: '*This field is required'
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