var elem = document.getElementById('click');
var info = document.getElementById('info');

elem.addEventListener('click', function(){
	document.getElementById('info').innerHTML='clicked!';
	navigator.bluetooth.requestDevice({ filters: [{ services: ['battery_service'] }] })
	.then(device => return device.connectGATT())
	.then(server => {
  		return server.getPrimaryService('battery_service');
	})
	.then(service => {
  		return service.getCharacteristic('battery_level');
	})
	.then(characteristic => {
  		return characteristic.readValue();
	})
	.then(value => {
  		value = value.buffer ? value : new DataView(value);
  		info.innerHTML='Battery percentage is ' + value.getUint8(0);
	})
	.catch(error => { info.innerHTML=error; });
});