var elem = document.querySelector('#click');
var info = document.querySelector('#info');

elem.addEventListener('click', function(){
	console.log('clicked!');
	navigator.bluetooth.requestDevice({ filters: [{ services: ['battery_service'] }] })
	.then(device => device.gatt.connect())
	.then(server => {
  		// Getting Battery Service...
  		return Promise.all([
  			server.getPrimaryService('battery_service')
  		])
		//return server.getPrimaryService('battery_service');
	})
	.then(service => {
  		// Getting Battery Level Characteristic...
  		return service.getCharacteristics('battery_level');
	})
	.then(characteristic => {
  		// Reading Battery Level...
  		return characteristic.readValue();
	})
	.then(value => {
  		// In Chrome 50+, a DataView is returned instead of an ArrayBuffer.
  		value = value.buffer ? value : new DataView(value);
  		info.innerHTML('Battery percentage is ' + value.getUint8(0));
	})
	.catch(error => { info.innerHTML(error); });
});