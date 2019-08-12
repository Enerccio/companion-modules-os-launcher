var instance_skel = require('../../instance_skel');
var process = require('child_process');
var debug;
var log;

function instance(system, id, config) {
	var self = this;

	instance_skel.apply(this, arguments);
	self.actions();
	return self;
}

instance.prototype.init = function () {
	var self = this;

  debug = self.debug;
	log = self.log;

	self.status(self.STATUS_OK);
};

instance.prototype.config_fields = function () {
	var self = this;
	return [
		{
			type: 'text',
			id: 'info',
			width: 12,
			label: 'Information',
			value: 'This module is for spawning OS processes or commands.'
		}
	];
};

instance.prototype.config_fields = function () {
	var self = this;
	return [];
};

instance.prototype.destroy = function () {
	var self = this;
	debug("destroy", self.id);
};

instance.prototype.actions = function (system) {
  var self = this;

  var actions = {
		'Command': {
			label: 'Execute command with arguments',
			options: [
				{
					type: 'textinput',
					label: 'Command',
					id: 'command',
					default: ''
				},
        {
					type: 'textinput',
					label: 'Arguments',
					id: 'arguments',
					default: '',
				},
			]
		}
  };

  self.setActions(actions);
};

instance.prototype.action = function (action) {

  if (action.action == "Command") {
    var command = action.options.command;
    var arguments = action.options.arguments;

    if (arguments !== "") {
      command += " " + arguments;
    }

    debug("exec", command);
    process.exec(command, function(error, stdout, stderr) {
      if (error) {
        debug("exec", error);
      }
    });
  }
};

instance_skel.extendedBy(instance);
exports = module.exports = instance;
