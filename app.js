const config = require('config');

const server_url = config.get('server.url');
const port_web = config.get('server.port.web');
const port_ws = config.get('server.port.websocket');

const notifier = require('node-notifier');
const socket = require('socket.io-client')(server_url + ':' + port_ws + '/logger');

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


	notifier.notify({
	  title: `New log (${notification.level_label})`,
	  message: notification.message,
	  open: server_url + ':' + port_web + '?notification_id=' + notification.id,
	  icon: img,
	  timeout: 3
	});
}); 

socket.on('disconnect', () => notifier.notify({title: 'Logger WS', message: "Disconnected"}));
