var amplitudeGraph;
var fftGraph;
var showBoxContain = false;
var nameInCircle = "Visualyze\nDemo";

var backG;
var backgNow;
var isShowGuide = true;

var myAudio;
var songNow;
var nameSongs = [];
var linkSongs = [];
var fileSongInput;

var buts = [];
var slideVolume;

var stringWeb;
function preload(){
	fileSongInput = loadStrings("ZingMp3link.txt");
	stringWeb = loadJSON("https://mp3.zing.vn/xhr/media/get-source?type=audio&key=LGJHTknaziacRdcyHtFnknTkWFzBchQbS");
}

function setup() {
	createCanvas(windowWidth, windowHeight).position(0, 0)
		.drop(getFileLocal);
	textAlign(CENTER);
	rectMode(CENTER);
	colorMode(HSB);

	console.log(stringWeb);
	console.log('https:'+stringWeb.data.source[128]);

	addSongFromFile(fileSongInput);
	slideVolume = new SlideBar(width/2, height/2-150, 200, 20, 0, 1, 0.7);
	songNow = floor(random(0,nameSongs.length));

	

// this code i learn from p5js.org and chrome console
	myAudio = createAudio('https:'+stringWeb.data.source[128]);
	myAudio.autoplay(true);	
	myAudio.loop(true);
	myAudio.volume(slideVolume.val);
	myAudio.connect(p5.soundOut);
	/* another way to load music use new Audio() 
	https://github.com/processing/p5.js-sound/issues/225*/

// prepare all object
	backgNow = floor(random(1, 25));
	// backG = loadImage("image/BackG"+backgNow+".jpg");
	backG = loadImage(stringWeb.data.artist.thumbnail);

	amplitudeGraph = new AmplitudeGraph(width/2, height/2, width/2, height/4, 100, nameInCircle);
	fftGraph = new FFTGraph(width/2, height/2+height/4+50, width/2, height/4, 64);

	buts.push(new buttonShape(width/2	, height/2-200, 100, 60, "Play"  , 27, function(){PlayPause();}));
	buts.push(new buttonShape(width/2+80, height/2-190, 50 , 35, "Next"  , 15, function(){NextPre('next');}));
	buts.push(new buttonShape(width/2-80, height/2-190, 50 , 35, "Pre"   , 15, function(){NextPre('pre');}));
	buts.push(new buttonShape(width/2+75, height/2-220, 40 , 20, "noLoop", 10, function(){LoopMusic(myAudio.elt.loop);}));
}

function draw(){
	image(backG, 0, 0, width, height, 0, 0, backG.width, backG.height);
	if(myAudio.elt.ended && !myAudio.elt.loop) NextPre("next");

	showCurrentState();
	showNameSong();
	showTime(amplitudeGraph.pos.x+amplitudeGraph.size.x/2-20, amplitudeGraph.pos.y+20);
	slideVolume.show();

	for(var i = 0; i < buts.length; i++){
		buts[i].run();
	}

	amplitudeGraph.run();
	fftGraph.run();

	if(isShowGuide)
		showGuide();
}

function keyPressed(){
	if(keyCode == ENTER){
		showBoxContain = !showBoxContain;

	} else if(keyCode == LEFT_ARROW){
		if(myAudio.elt.currentTime >= 5)
			myAudio.play().time(myAudio.elt.currentTime-5);

	} else if(keyCode == RIGHT_ARROW){
		if(myAudio.elt.currentTime < myAudio.elt.duration-5)
			myAudio.play().time(myAudio.elt.currentTime+5);

	} else if(keyCode == 32) {	// Space
		PlayPause();

	} else if(keyCode == 67) {	// C key
		if(!myAudio.elt.controls)
			myAudio.showControls();
		else myAudio.hideControls();

	} else if(keyCode == 66) { // B key
		changeBackGround();

	} else if(keyCode == 71) {// G key
		isShowGuide = !isShowGuide;
	}

}

function mouseClicked(){
	for(var i = 0 ; i < buts.length; i ++){
		buts[i].clicked(mouseX, mouseY);
	}

	slideVolume.clicked(mouseX, mouseY);
}

function mouseDragged(){
	slideVolume.clicked(mouseX, mouseY);	
}

