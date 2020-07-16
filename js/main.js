'use strict'
let mapData = {}
class StarMap {

	constructor(){
		var self = this
		self.day = document.querySelector('#day');
		self.month = document.querySelector('#month');
		self.year = document.querySelector('#year');
		self.time = document.querySelector('#time');

		self.place = document.querySelector('#location');

		self.text = document.querySelector('#text_label');
	}

	getLocation() {
		let location = this.place;
		location.value = 'Санкт-Петербург, Россия'
		location.onblur = function(){
			setTimeout(function(){
			if(location.value == '' || location.value == null) {
				location.value = 'Санкт-Петербург, Россия'
				
			} else {
			async function fetchCollectionList () {
				const response = await fetch(`http://search.maps.sputnik.ru/search?q=${location.value}`)
				let collectionList = await response.json()
				return collectionList
				}
			fetchCollectionList().then(data => setLocation(data.result[0].position))
			}
			}, 100)

		}
	}

	date() {
		updateMapDate()
		let inputDay = mapData.date.day =  self.day.value, inputMonth = mapData.date.month = self.month.value, 
		inputYear = mapData.date.year = self.year.value, inputTime = mapData.date.time = self.time.value;
		let fullDate = inputMonth + ' ' + inputDay + ', ' + inputYear + ', ' +inputTime + ':00'
		self.day.oninput = function() {
    		inputDay = mapData.date.day =  self.day.value
    		mapSettings()
    	};		
    	self.month.oninput = function() {
    		inputMonth = mapData.date.month = self.month.value
    		fullDate = inputMonth + ' ' + inputDay + ', ' + inputYear  + ', ' + inputTime + ':00'
    		mapSettings()
    	};
    	self.year.oninput = function() {
    		inputYear = mapData.date.year = self.year.value
    		mapSettings()
    	}
    	self.time.oninput = function() {
    		inputTime = mapData.date.time = self.time.value
    		mapSettings()
    	}

    	console.log(mapData)
    	return fullDate

	};
	startData () {
		let dateNow = new Date()
		let dayNow = dateNow.getDate()
		let monthNow = dateNow.getMonth()
		let yearNow = dateNow.getFullYear()
		let hoursNow = dateNow.getHours()
		let minutesNow = dateNow.getMinutes()
		if(minutesNow < 10) {
			minutesNow = '0' + minutesNow
		}
		let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
		self.day.value = dayNow;
		self.month.value = months[monthNow]
		self.year.value = yearNow
		self.time.value = hoursNow + ':' + minutesNow
	};

	getText() {
		self.month.oninput = function() {
    		
    		mapSettings()
    	};
	}

}
$('#time').bootstrapMaterialDatePicker({
				date: false,
				shortTime: false,
				format: 'HH:mm'
			}).on('change', function(){
				mapSettings()
			});

let createMap = new StarMap;
createMap.startData()
createMap.getLocation()

let arrCoords = [30.31413, 59.93863];


function updateMapDate(){
	mapData ={
		date: {
			time: '',
			day: '',
			month: '',
			year: ''
		},
		formatData: document.querySelector('.format-date-active').innerHTML,
		location: document.querySelector('.text-location').innerHTML,
		text: document.querySelector('.text').innerHTML,
		toggleSetting: {
			line: setElems('#constellations'),
			galaxy: setElems('#galaxy'),
			eq: setElems('#gridlines'),
			plantes: setElems('#showplanets'),
			boundaries: setElems('#boundaries')
		},
		standartFill: document.querySelector('.btn-color-active').getAttribute('is-color'),
		customColor: {
			bgColor: customColors.bgColor,
			borderColor: customColors.borderColor,
			textColor: customColors.textColor,
			mapColor: customColors.mapColor,
			lineColor: customColors.lineColor,
			eqColor: customColors.eqColor
		},
		designForm: document.querySelector('.view-map-elem-active').getAttribute('disign-form'),
		formatPrint: document.querySelector('#format-image').value,

	}	
}


function setLocation(data) {
	arrCoords = [data.lon, data.lat]
	mapSettings()
}
mapSettings()
let mainProjection = "fisheye"

function mapSettings() {
		var planetarium; 
		S(document).ready(function() {
		//The projection type as 'polar', 'stereo', 'lambert', 'ortho', 
		//'equirectangular', 'mollweide', 'planechart' or 'fisheye'
			planetarium = S.virtualsky({
				id: 'starmap',
				projection: mainProjection,
				constellations: setElems('#constellations'),
				cardinalpoints: false,
				showposition: false,
				showdate: false,
				showstars: true,
				clock: new Date(createMap.date()),
				showplanets : setElems('#showplanets'),
				gridlines_az: false,
				gridlines_eq: setElems('#gridlines'),
				gridlines_gal: false,
				gridlineswidth: 1.6,
				constellationwidth: 2.2,
				scalestars: 2.3,
				gridstep: 15,
				magnitude: 1000,
				gradient: false,
				longitude: arrCoords[0],
				latitude : arrCoords[1],
				az: 180,
				showgalaxy: setElems('#galaxy'),
				galaxywidth: 60,
				transparent: false,
				gradient: false,
				constellationboundaries: setElems('#boundaries'),
				constellationboundarieswidth: 2.2

			});

			

		});
	let inputText = document.querySelector('#text_label');
	let text = document.querySelector('.text');
	let textLocation = document.querySelector('.text-location')
	let location = document.querySelector('#location')

	let textDate = document.querySelector('.text-date')
	let day = document.querySelector('#day')
	let month = document.querySelector('#month')
	let year = document.querySelector('#year')
	let textCoords = document.querySelector('.text-coords')
	let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
	
	text.innerHTML = inputText.value.replace(/\n/g,'<br/>')
	inputText.value = inputText.value.replace(/\s+/g, ' ').trim()
	
	inputText.oninput = function(){
		text.innerHTML = inputText.value.replace(/\n/g,'<br/>')
	} 			
	let zeroDay = '0'
	if(day.value > 9) zeroDay = '';
	let zeroMonth = '0'
	if(+months.indexOf(month.value)+1 > 9) zeroMonth = '';
	let elemFormatDate = document.querySelectorAll('.format-date>div span')
	if(elemFormatDate[0].classList.contains("format-date-active")) {
		textDate.textContent = 	zeroDay + '' + day.value + '.' + zeroMonth + (+months.indexOf(month.value)+1) + '.' + year.value;
	} else {
		textDate.textContent = 	zeroMonth + (+months.indexOf(month.value)+1) + '.' + zeroDay + '' + day.value + '.' + year.value;
	}
	textLocation.textContent = location.value;
	
	textCoords.textContent = toCoords(arrCoords[1]) + ', ' + toCoords(arrCoords[0])

}

ymaps.ready(init);
function init() {
	var suggestView1 = new ymaps.SuggestView('location')
}

window.addEventListener('resize',function(){
    setParam()
    scaleImage()
});
function scaleImage() {
		let outputImage = document.querySelector('.output-image');
		outputImage.oncontextmenu = function(){
			return false
		}
	    if(document.documentElement.clientWidth < 875){
		document.addEventListener('touchstart', function (e) {
			
			if(outputImage.contains(e.target)){
				outputImage.style.transform = 'scale(0.6) translateX(-120px) translateY(150px)';
			}
			
		})
		document.addEventListener('touchend', function (e) {
			if(outputImage.contains(e.target)){
				outputImage.style.transform = 'scale(0.3) translateX(0) translateY(0)';
			}
			
		})
    }
}scaleImage()


function setParam() {
	let output_image = document.querySelector('.output-image')
	let border = document.querySelector('.border');
	let map = document.querySelector('.map')
	let starMap = document.querySelector('#starmap')
	border.style.height = output_image.offsetHeight - 40 + 'px';
	border.style.width = output_image.offsetWidth - 40 + 'px';

	map.style.width = output_image.offsetWidth * 2.7 + 'px';
	map.style.height = output_image.offsetWidth * 2.7 + 'px';
	
	starMap.style.width = map.offsetWidth + 'px';
	starMap.style.height = map.offsetWidth  + 'px';
	
}
setParam()

function toCoords(data) {
		let degrees = Math.floor(data)
		let minutes = (( +('0.' + (data + '').split(".")[1].substr()) )*60);
		let seconds = (( +('0.' + (minutes + '').split(".")[1].substr()) )*60);
		return degrees + '°' + Math.round(minutes) + "'" + Math.round(seconds) + '"';
		 
}
function setElems(d) {
	let a = document.querySelector(d)
	if(a.classList.contains('active-elem')) {
		return true
	} else {
		return false
	}
}



function toggleSettings() {
	let btnChecked = document.querySelectorAll('.btn-checked');
	let divs = document.querySelectorAll('.view-elem')
	for(let i = 0; i < divs.length; i++){
		document.addEventListener('click',function (e) {
			if(btnChecked[i].contains(e.target)){
				let btnSlider = document.querySelectorAll('.btn-slider')[i];
				btnSlider.classList.toggle('btn-slder-active');
				btnChecked[i].classList.toggle('btn-checked-active');
				divs[i].classList.toggle('active-elem')
				mapSettings()
			}
		})
		}
	}
toggleSettings()


$(function() {

  function quantityProducts(input, minus, plus) {
    var $quantityArrowMinus = $(minus);
    var $quantityArrowPlus = $(plus);
    var $quantityNum = $(input);

    $quantityArrowMinus.click(quantityPlus);
    $quantityArrowPlus.click(quantityMinus);

    function quantityMinus() {
      if ($quantityNum.val() > 1) {
        $quantityNum.val(+$quantityNum.val() - 1);
        mapSettings()
      }
    }

    function quantityPlus() {
    	if ($quantityNum.val() < 31 && $quantityNum[0].id == 'day') {
      $quantityNum.val(+$quantityNum.val() + 1);
      mapSettings()
  		} else if($quantityNum[0].id == 'year') {
  			$quantityNum.val(+$quantityNum.val() + 1);
  			mapSettings()
  		}
    }
  };
quantityProducts('#day', '.day-minus', '.day-plus')
quantityProducts('#year', '.year-minus', '.year-plus')

});

function setColor() {
	let btnColors = document.querySelectorAll('.btn-color ')
	let outputImage = document.querySelector('.output-image')
	let border = document.querySelector('.output-image .border')
	let map = document.querySelector('.map')
	let starmap = document.querySelector('#starmap')
	for(let i = 0; i < btnColors.length; i++){
		document.addEventListener('click',function (e) {
			if(e.target == btnColors[i]){
				for(let j = 0; j < btnColors.length; j++){
					if(btnColors[j].classList.contains("btn-color-active")){
						btnColors[j].classList.remove("btn-color-active")
					}
				}
			if(e.target == btnColors[0]){
				btnColors[0].classList.toggle('btn-color-active');
				if(!map.classList.contains("border-white")) {
					map.classList.add('border-white')
				}
				outputImage.style.background = '#000';
				starmap.style.background = 'rgba(0,0,0,0.4)';
				outputImage.style.color = '#fff';
				border.style.borderColor = '#fff';
				border.classList.remove('starmap-black')
				colorEq = 'rgba(100,100,100,0.5)';
				colorGrid = 'rgba(105, 105, 105, 0.8)';
				mapSettings()
			}			
			if(e.target == btnColors[1]){
				btnColors[1].classList.toggle('btn-color-active');
			if(!map.classList.contains("border-white")) {
				map.classList.add('border-white')
			}
				outputImage.style.background = '#24223b';
				starmap.style.background = 'rgba(0,0,0,0.4)';
				outputImage.style.color = '#fff';
				border.style.borderColor = '#fff';
				border.classList.remove('starmap-black')
				colorEq = 'rgba(100,100,100,0.5)';
				colorGrid = 'rgba(105, 105, 105, 0.8)';
				mapSettings()
			}

			if(e.target == btnColors[2]){
				btnColors[2].classList.toggle('btn-color-active');
				if(map.classList.contains("border-white")) {
					map.classList.remove('border-white')
				}
				border.classList.add('starmap-black')
				outputImage.style.background = '#fff';
				starmap.style.background = '#000';
				outputImage.style.color = '#000';
				border.style.borderColor = '#000';
				colorEq = 'rgba(100,100,100,0.5)';
				colorGrid = 'rgba(105, 105, 105, 0.8)';
				mapSettings()
			}
			}
				
			
		})
	}
}setColor()

function setView() {
	let btnView = document.querySelectorAll('.view-map-elem ')
	let map = document.querySelector('.map')
	let outputImage = document.querySelector('.output-image')
	let border = document.querySelector('.output-image .border')
	let starmap = document.querySelector('#starmap')

	for(let i = 0; i < btnView.length; i++){
		document.addEventListener('click',function (e) {
			if(e.target == btnView[i]){
				for(let j = 0; j < btnView.length; j++){
					if(btnView[j].classList.contains("view-map-elem-active")){
						btnView[j].classList.remove("view-map-elem-active")
					}
				}
			if(e.target == btnView[0]){
				btnView[0].classList.toggle('view-map-elem-active');
				if(map.classList.contains("view-semy-sphere") || map.classList.contains("view-semy-rect") 
					|| map.classList.contains("view-rect")) {
					map.classList.remove('view-semy-sphere')
					map.classList.remove('view-semy-rect');
					map.classList.remove('view-rect')
					border.classList.remove('color-white');

					mainProjection = 'fisheye'
					starmap.style.borderRadius = '50%';
					mapSettings()
				}
			}			
			if(e.target == btnView[1]){
				btnView[1].classList.toggle('view-map-elem-active');
				if(!map.classList.contains("view-semy-sphere")) {
					map.classList.remove('view-semy-rect')
					map.classList.remove('view-rect')
					border.classList.remove('color-white');
					map.classList.add('view-semy-sphere')
					
					mainProjection = 'fisheye'
					starmap.style.borderRadius = '50%';
					mapSettings()
				}
			}
			if(e.target == btnView[2]){
				btnView[2].classList.toggle('view-map-elem-active');
				if(!map.classList.contains("view-semy-rect")) {
					map.classList.remove('view-semy-sphere')
					map.classList.remove('view-rect')
					map.classList.add('view-semy-rect')
					border.classList.add('color-white')
					starmap.style.borderRadius = '0%';
					mainProjection = 'stereo'
					mapSettings()
				}
			}
			if(e.target == btnView[3]){
				btnView[3].classList.toggle('view-map-elem-active');
				if(!map.classList.contains("view-rect")) {
					map.classList.remove('view-semy-sphere')
					map.classList.remove('view-semy-rect')
					border.classList.remove('color-white');
					map.classList.add('view-rect')
					starmap.style.borderRadius = '0%';
					mainProjection = 'stereo';

					mapSettings()
				}
			}
				
				
			}
			
		})
	}
}setView()

function setFormatDate() {
	
	let textDate = document.querySelector('.text-date')
	let day = document.querySelector('#day')
	let month = document.querySelector('#month')
	let year = document.querySelector('#year')
	let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
	let qDay = document.querySelector('.settings .date-block .q-day')
	let qYear = document.querySelector('.settings .date-block .q-year')
	let qMonth= document.querySelector('.settings .date-block select')

	let zeroDay = '0'
	if(day.value > 9) zeroDay = '';
	let zeroMonth = '0'
	if(+months.indexOf(month.value)+1 > 9) zeroMonth = '';
	let elemFormat = document.querySelectorAll('.format-date>div span')
	for(let i = 0; i < elemFormat.length; i++){
		document.addEventListener('click',function (e) {
			updateMapDate()
			if(e.target == elemFormat[i]){
				for(let j = 0; j < elemFormat.length; j++){
					if(elemFormat[j].classList.contains("format-date-active")){
						elemFormat[j].classList.remove("format-date-active");
					}
				}
			if(e.target == elemFormat[0]){
				elemFormat[0].classList.toggle('format-date-active');
				textDate.textContent = 	zeroDay + '' + day.value + '.' + zeroMonth + (+months.indexOf(month.value)+1) + '.' + year.value;
				qDay.style.order = '1';
				qMonth.style.order = '2';

			}			
			if(e.target == elemFormat[1]){
				elemFormat[1].classList.toggle('format-date-active');
				textDate.textContent = zeroMonth + (+months.indexOf(month.value)+1) + '.'+ zeroDay + '' + day.value + '.' + year.value;
				qDay.style.order = '2';
				qMonth.style.order = '1';
			}
				
			}
		})
	}
}setFormatDate()

let formatImage = document.querySelector('#format-image')
formatImage.oninput = function() {
	setFormatImage ()
	setParam()
}
function setFormatImage () {
	let format = formatImage.value
	let output_image = document.querySelector('.output-image')
	if(format == '30x40' || format == '60x80' && !output_image.classList.contains('size30x40')) {
		output_image.classList.add('size30x40')
		output_image.classList.remove('size42x60')
		output_image.classList.remove('size40x60')
	} else if(format == '42x60' || format == '70x100' && !output_image.classList.contains('size42x60')) {
		output_image.classList.remove('size30x40')
		output_image.classList.add('size42x60')
		output_image.classList.remove('size40x60')
	} else if(format == '40x60' && !output_image.classList.contains('size40x60')) {
		output_image.classList.remove('size30x40')
		output_image.classList.remove('size42x60')
		output_image.classList.add('size40x60')
	} else {
		output_image.classList.remove('size30x40')
		output_image.classList.remove('size42x60')
		output_image.classList.remove('size40x60')
	}
}

var fileImage;
function downloadFile () {
	fileImage.save('starmap.pdf')
}

function startGeneratePDF() {
	if(screen.width < 900 ) { 
			document.getElementById("viewport").setAttribute("content", "width=950px"); }
			setTimeout(function () {
				generatePDF()
			}, 1000)
}
function generatePDF(quality = 5) {
	const filename  = 'starmap.pdf';
	let output_image = document.querySelector('.output-image');
	let format = document.querySelector('#format-image');
	let $toPay = $('#toPay');
	let html = document.querySelector('html')
	let scaleElem = window.getComputedStyle(output_image).transform.substr(7,3)
	if(+scaleElem < 1) { quality /= +scaleElem }
	let widthPage = 0;
	let heightPage = 0;
	let formatPrint = 'a4'
	console.log(window.innerWidth)

		html.style.pointerEvents = 'none';
		if ($toPay.hasClass('active') || $toPay.hasClass('success')) {
			return false;
		}
		$toPay.addClass('active');
		setTimeout(function () {
			$toPay.addClass('loader');
		}, 125);
			if(format.value == 'a5' ) {
				formatPrint = 'a5'
				widthPage = 148;
				heightPage = 210;
			}
			if(format.value == 'a4') {
				formatPrint = 'a4'
				widthPage = 210;
				heightPage = 298;
			}
			if(format.value == '30x40') {
				formatPrint = [300,400]
				widthPage = 300;
				heightPage = 400;
			}
			if(format.value == 'a3') {
				formatPrint = 'a3'
				widthPage = 297;
				heightPage = 420;
				quality = 6
			}
			if(format.value == '40x60') {
				formatPrint = [400,600]
				widthPage = 400;
				heightPage = 600;
			}
			if(format.value == 'a2') {
				formatPrint = 'a2'
				widthPage = 420;
				heightPage = 594;
				quality = 7
			}
			if(format.value == '42x60') {
				formatPrint = [420,600]
				widthPage = 420;
				heightPage = 600;
			}
			if(format.value == '60x80') {
				formatPrint = [600,800]
				widthPage = 600;
				heightPage = 800;
			}						
			if(format.value == 'a1') {
				formatPrint = 'a1'
				widthPage = 594;
				heightPage = 841;
				quality = 8
			}
			if(format.value == '70x100') {
				formatPrint = [700,1000]
				widthPage = 700;
				heightPage = 1000;
			}			
			if(format.value == 'a0') {
				formatPrint = 'a0'
				widthPage = 841;
				heightPage = 1189;
				quality = 8
			}
		$("html").addClass("hide-scrollbar");	
		html2canvas(output_image, 
								{
									scale: quality,
									allowTaint: true,
									removeContainer: true,
									scrollX: -window.pageXOffset,
    								scrollY: -window.pageYOffset,
    								useCORS: true,
    								logging: true,

    							
								}
						 ).then(canvas => {
			console.log(-window.pageXOffset, -window.pageYOffset)
			let pdf = new jsPDF('p', 'mm', formatPrint);
			pdf.addImage(canvas.toDataURL('image/png'), 'PNG',0,0, widthPage, heightPage);
			fileImage = pdf;
			console.log(format.value + ',' + widthPage + ',' + heightPage + ',' + quality)
			$("html").removeClass("hide-scrollbar");
			$toPay.removeClass('loader active');
			$toPay.text('Success');
			$toPay.addClass('success animated pulse');
			document.getElementById("viewport").setAttribute("content", "width=device-width, initial-scale=1");
			html.style.pointerEvents = 'auto';
		});
}

$(document).ready(function(){
    var textArea = $('#text_label');
    var maxRows = 4;
    var maxChars = 40;
    textArea.keypress(function(e){
        var text = textArea.val();
        var lines = text.split('\n');
        if (e.keyCode == 13){
            return lines.length < maxRows;
        }
        else{ //Should check for backspace/del/etc.
            var caret = textArea.get(0).selectionStart;
            
            var line = 0;
            var charCount = 0;
            $.each(lines, function(i,e){
                charCount += e.length;
                if (caret <= charCount){
                    line = i;
                    return false;
                }
                //\n count for 1 char;
                charCount += 1;
            });
                   
            var theLine = lines[line];
            return theLine.length < maxChars;
        }
    });
    
});

const btnBgColor = document.querySelector('.bg-color')
const btnTextColor = document.querySelector('.text-color')
const bgPicker = document.querySelector('#bg-picker')
const textPicker = document.querySelector('#text-picker')
const btnMapColor = document.querySelector('.map-color')
const mapPicker = document.querySelector('#map-picker')
const btnGridColor = document.querySelector('.grid-color')
const gridPicker = document.querySelector('#grid-picker')
const btnEqColor = document.querySelector('.eq-color')
const eqPicker = document.querySelector('#eq-picker')
const btnBorderColor = document.querySelector('.border-color')
const borderPicker = document.querySelector('#border-picker')
let isActiveBtn = 0;
document.addEventListener('click', function (e) {
	if(e.target == btnBgColor) {
		bgPicker.style.transform = 'scale(1)'
		btnBgColor.classList.add('btn-bg-active')
	} else if(!bgPicker.contains(e.target) && btnBgColor.classList.contains('btn-bg-active') 
		|| e.target == btnBgColor && btnBgColor.classList.contains('btn-bg-active') ){
		bgPicker.style.transform = 'scale(0)';
		btnBgColor.classList.remove('btn-bg-active')
	}

	if(e.target == btnBorderColor) {
		borderPicker.style.transform = 'scale(1)';
		btnBorderColor.classList.add('btn-text-active')
	} else if(!borderPicker.contains(e.target) && btnBorderColor.classList.contains('btn-text-active') ) {
		borderPicker.style.transform = 'scale(0)';
		btnBorderColor.classList.remove('btn-text-active')
		
	}

	if(e.target == btnTextColor) {
		textPicker.style.transform = 'scale(1)';
		btnTextColor.classList.add('btn-text-active')
	} else if(!textPicker.contains(e.target) && btnTextColor.classList.contains('btn-text-active') ) {
		textPicker.style.transform = 'scale(0)';
		btnTextColor.classList.remove('btn-text-active')
		
	}

	if(e.target == btnMapColor) {
		mapPicker.style.transform = 'scale(1)';
		btnMapColor.classList.add('btn-text-active')
	} else if(!mapPicker.contains(e.target) && btnMapColor.classList.contains('btn-text-active') ) {
		mapPicker.style.transform = 'scale(0)';
		btnMapColor.classList.remove('btn-text-active')
		
	}
	if(e.target == btnGridColor) {
		gridPicker.style.transform = 'scale(1)';
		btnGridColor.classList.add('btn-text-active')
	} else if(!gridPicker.contains(e.target) && btnGridColor.classList.contains('btn-text-active') ) {
		gridPicker.style.transform = 'scale(0)';
		btnGridColor.classList.remove('btn-text-active')
		
	}

	if(e.target == btnEqColor) {
		eqPicker.style.transform = 'scale(1)';
		btnEqColor.classList.add('btn-text-active')
	} else if(!eqPicker.contains(e.target) && btnEqColor.classList.contains('btn-text-active') ) {
		eqPicker.style.transform = 'scale(0)';
		btnEqColor.classList.remove('btn-text-active')
		
	}

})

let customColors = {
			bgColor: '',
			borderColor: '',
			textColor: '',
			mapColor: '',
			lineColor: '',
			eqColor: ''
}

var bgColor = new iro.ColorPicker('#bg-picker', {
	width: 150,
	height: 150,
	display: 'inline-block',
	borderColor: '#000d33'
});
bgColor.on('color:change', function(color) {
  $('.bg-color').css('backgroundColor', color.hexString)
  $('.text-color').css('backgroundColor', color.hexString);
$('.output-image').css('backgroundColor', color.hexString);
$('.map-color').css('backgroundColor', color.hexString);
$('.eq-color').css('backgroundColor', color.hexString);
$('.grid-color').css('backgroundColor', color.hexString);
$('.border-color').css('backgroundColor', color.hexString);
customColors.bgColor = color.hexString
});

var borderColor = new iro.ColorPicker('#border-picker', {
	width: 150,
	height: 150,
	display: 'inline-block',
	borderColor: '#000d33'
});
borderColor.on('color:change', function(color) {
		$('.border-color-mini').css('borderColor', color.hexString);
		$('.border').css('borderColor', color.hexString);
		customColors.borderColor = color.hexString
});

var textColor = new iro.ColorPicker('#text-picker', {
	width: 150,
	height: 150,
	display: 'inline-block',
	borderColor: '#000d33'
});
textColor.on('color:change', function(color) {
		$('.text-color').css('color', color.hexString);
		$('.output-image').css('color', color.hexString);
		customColors.textColor = color.hexString
});

var mapColor = new iro.ColorPicker('#map-picker', {
	width: 150,
	height: 150,
	display: 'inline-block',
	borderColor: '#000d33'
});
mapColor.on('color:change', function(color) {
		$('.map-color-mini').css('background', color.hexString);
		$('#starmap').css('background', color.hexString);
		customColors.mapColor = color.hexString
});

var gridColor = new iro.ColorPicker('#grid-picker', {
	width: 150,
	height: 150,
	display: 'inline-block',
	borderColor: '#000d33'
});
gridColor.on('color:change', function(color) {
		colorGrid =  'rgba(' + color.rgbString.substr(4, color.rgbString.length - 5) + ', 0.5)'
		$('.grid-color-mini g').css('stroke', color.hexString);
		$('.grid-color-mini g').css('fill', color.hexString);
		customColors.lineColor = color.hexString
		mapSettings()
});

var eqColor = new iro.ColorPicker('#eq-picker', {
	width: 150,
	height: 150,
	display: 'inline-block',
	borderColor: '#000d33'
});
eqColor.on('color:change', function(color) {
		colorEq =  'rgba(' + color.rgbString.substr(4, color.rgbString.length - 5) + ', 0.4)'
		$('.eq-color-mini g').css('stroke', color.hexString);
		customColors.eqColor = color.hexString
		mapSettings()
});

window.onload = function(){
 window.innerWidth
 window.innerHeight
};
// var sw = screen.width;
// var sh = screen.height;
// var iw = window.innerWidth;
// var ih = window.innerHeight;
// function getValues(){
//   sw = screen.width;
//   sh = screen.height;
//   iw = window.innerWidth;
//   ih = window.innerHeight;
// }
// let scale = 0;
// function getScale() {
//   if (Math.round(window.innerWidth*100/iw) !=     Math.round(window.innerHeight*100/ih)){
//     //зум не изменился, поменялись размеры окна
//     getValues(); //обновим значения ширины и высоты
//   }
//   else {
//     //изменился уровень зума
//     scale = Math.round(iw/window.innerWidth * 10);
//     console.log(scale);
//   }
// }
// setInterval(function(){
// 	getScale() 
// console.log(scale)
// }, 1000)