const config = require('config');

const notifier = require('node-notifier');
const socket = require('socket.io-client')(config.get('server.websocket.url') + ':' + config.get('server.websocket.port') + '/logger');

socket.on('connect', () => {
	notifier.notify({title: 'Logger WS', message: "Connected"})
});

socket.on('logger.notification.create', (data) => {
	let notification = data.notification;
	let img = '';

	switch (notification.level) {
		case '4':
			img = 'images/logger-warning.png';
			break;
		case '8':
			img = 'images/logger-error.png';
			break;
		default:
			img = 'images/logger-default.png';
			break;
    }

    if (!notification.namespace.includes(config.get('filter.namespace'))) {
    	return;
	}

	notifier.notify({
	  title: `New log (${notification.level_label})`,
	  message: notification.message,
	  open: config.get('server.http.url') + ':' + config.get('server.http.port') + '?notification_id=' + notification.id,
	  icon: img,
	  timeout: 5
	});
}); 

socket.on('disconnect', () => notifier.notify({title: 'Logger WS', message: "Disconnected"}));
