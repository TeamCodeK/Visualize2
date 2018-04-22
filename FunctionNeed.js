function addSongFromFile(inputString){
	for(var i = 0; i < inputString.length; i+=2){
		nameSongs.push(inputString[i]);
		linkSongs.push(inputString[i+1]);
	}
}

function showNameSong() {
	strokeWeight(1);
	stroke(255);	
	noFill();
	textSize(27);
	// text(nameSongs[songNow], width/2, height/2-250);
	text(stringWeb.data.title + " - " + stringWeb.data.artist.name, width/2, height/2-250);
}

function showCurrentState(){
	// networkState & readyState http://www.developphp.com/lib/JavaScript/Audio
	if(myAudio.elt.networkState == 1 && myAudio.elt.readyState == 4) 
	{
		if(myAudio.elt.paused)
			buts[0].changeName("Play");
		else buts[0].changeName("Pause");
	}
	else {
		var loading = "Loading";
		var timeAnimation = (millis()/200)%(loading.length);
		var textAnimation = "";
		for(var i = 0; i < timeAnimation; i++){
			textAnimation += loading[i];
		}
		buts[0].changeName(textAnimation);
	}
}

function showTime(x, y){
	var Se = floor(myAudio.elt.duration % 60);
	var Mi = floor((myAudio.elt.duration / 60) % 60);

	var s = floor(myAudio.elt.currentTime % 60);
	var m = floor((myAudio.elt.currentTime / 60) % 60);

	//Add 0 if seconds less than 10
	if(Se < 10) Se = '0' + Se;
	if (s < 10) s = '0' + s;

	//Show
	textSize(15);
	stroke(255);
	noFill();
	text(m+":"+s +" / "+ Mi+":"+Se, x, y);
}

function PlayPause(){
	if(myAudio.elt.paused && myAudio.elt.duration > 0)
		myAudio.elt.play();
	else myAudio.elt.pause();
}

function NextPre(nextOrPre){
		if(nextOrPre == 'next') songNow++;
		else songNow--;

		if(songNow >= nameSongs.length) songNow -= nameSongs.length;
		if(songNow < 0) songNow += nameSongs.length;

		// myAudio.src = 'music/'+ nameSongs[songNow];	
		myAudio.src = linkSongs[songNow];
}

function LoopMusic(isLooping){
	if(isLooping) {
		myAudio.elt.loop = false;
		buts[3].changeName("Loop");
	}
	else {
	 myAudio.elt.loop = true;
	 buts[3].changeName("noLoop");
	}
}

function getFileLocal(file) {
	if (file.type === 'image') {
		backG = createImg(file.data).hide();

	} else if(file.type === 'text'){
		// get data 
		var nameS = [], linkS = [];
		var index = 0;
		var putToName = true;

		for(var i = 0; i < file.data.length; i++)
		{
			if(file.data[i] != "\n")
			{
				if(putToName)
					nameS[index] = nameS[index]?(nameS[index] += file.data[i]):file.data[i];
				else linkS[index] = linkS[index]?(linkS[index] += file.data[i]):file.data[i];

			} else if(file.data[i+1] != "\n")
			{
				if(putToName){
					putToName = false;
				}
				else {
					putToName = true;
					index++;
				}
			} else continue;
		}

		// reset value
		nameSongs = [];
		linkSongs = [];

		// add value from data
		console.log(nameS);
		console.log(linkS);
		for(var i = 0; i < nameS.length; i++){
			nameSongs[i] = nameS[i].toString();
			linkSongs[i] = linkS[i].toString();
		}
		console.log(nameSongs);
		console.log(linkSongs);

		// play
		NextPre('next');

	}else{
		alert('File type not support , Please choose another file');
	}
}

function changeBackGround(){
	backgNow++;
	if(backgNow > 25) backgNow = 1;
	backG = loadImage("image/BackG"+backgNow+".jpg");
}

function showGuide(){
	fill(color('rgba(51, 51, 51, 0.5)'));
	strokeWeight(1);
	stroke(255);
	rect(150+5, height-80, 300, 150);
	
	textSize(15);
	noFill();
	var x = 150+5;
	var y = height-80-75+15;
	text('drag image to this web to change background', x, y+=20);
	text('B : change back ground auto', x, y+=20);
	text('C : show / hide controls', x, y+=20);
	text('Left-Right arrow : jump 5s', x, y+=20);
	text('G : Open / Close Guide', x, y+=20);
}

function getChromeVersion () {
    var pieces = navigator.userAgent.match(/Chrom(?:e|ium)\/([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)/);
    if (pieces == null || pieces.length != 5) {
        return undefined;
    }
    pieces = pieces.map(piece => parseInt(piece, 10));
    return {
        major: pieces[1],
        minor: pieces[2],
        build: pieces[3],
        patch: pieces[4]
    };
}

// var http = new HttpRequest();
// var htmlSong = http.Get(inputLink).ToString();
// var regular = @"<div id=""zplayerjs-wrapper"" class=""player"" data-xml=""(.*?)""";
// var getJson = @"http://mp3.zing.vn" + Regex.Match(htmlSong, regular, RegexOptions.Singleline).Value.Replace(@"<div id=""zplayerjs-wrapper"" class=""player"" data-xml=""", "").Replace("\"", "");
// var htmlJson = http.Get(getJson).ToString();