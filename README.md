# yoctu-logger-notifications
Send notification to your desktop for Yoctu/logger service

### Prerequisites

#### General
This project use Node.JS\
This project has been created for the service [logger](https://github.com/flash-global/logger-client)

You'll need a licence for logger. see https://www.yoctu.com/ for more informations.

#### Receiving notifications
- macOS: >= 10.8 for native notifications, or Growl if earlier.
- Linux: notify-osd or libnotify-bin installed (Ubuntu should have this by default)
- Windows: >= 8, or task bar balloons for Windows < 8. Growl as fallback. Growl takes precedence over Windows balloons.
- General Fallback: Growl

## Configuration

This app needs just some minor configuration:
- the port used for the WS connection
- the port used by the HTTP server

## Installation

- git clone the project
- update the configuration file (config/default.json)
- run `npm install`
- start the script `node app.js`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
