var elem = document.querySelector('#click');

elem.addEventListener('click', function(){
	console.log('clicked!');
	navigator.bluetooth.requestDevice({ filters: [{ services: ['battery_service'] }] })
	.then(device => { device.connectGATT(); })
	.then(server => { return server.getPrimaryService('battery_service'); })
	.then(service => { return service.getCharacteristic('battery_level'); })
	.then(characteristic => { return characteristic.readValue(); })
	.then(value => { value = value.buffer ? value : new DataView(value); console.log("Battery level: " + value.getUint(0)); })
	.catch(error => { console.log(error); });
});