Template.signup.created = function() {
	Session.set('signup.errors', '');
	Session.set('signup.success', '');
};

Template.signup.errors = function(t) {
	return Session.get('signup.errors');
};

Template.signup.success = function(t) {
	return Session.get('signup.success');
};

Template.signup.events({
	'submit form#signup-form': function(e, t) {
		e.preventDefault();
		// prevent submit

		var name = t.find('#your-name'),
			nickname = t.find('#irc-nickname'),
			email = t.find('#email-address'),
			password = t.find('#password'),
			confirmPassword = t.find('#confirm-password');
		// grab all our variables

		Meteor.call('registerUser', name, nickname, email, password, confirmPassword, function(err, result) {
			if (result.failed) {
				Session.set('signup.errors', result.errors);
				Session.set('signup.success', '');
				// reset some fields to keep our user happy
			} else {
				Session.set('signup.errors', '');
				Session.set('signup.success', result.successMessage);
			}
		});
	}
});

Template.signup.preserve({
	'input#your-name': function(node) {
		return node.id;
	},

	'input#irc-nickname': function(node) {
		return node.id;
	},

	'input#email-address': function(node) {
		return node.id;
	},
});