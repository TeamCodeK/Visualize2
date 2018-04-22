function SlideBar(x, y, w, h, min, max, firtValue) {
	this.pos = createVector(x, y);
	this.size = createVector(w, h);
	this.min = min;
	this.max = max;
	this.val = firtValue;
	this.boxcontain = new BoxContain(this.pos.x, this.pos.y, this.size.x, this.size.y);

	this.show = function(){
		strokeWeight(1);
		stroke(255);

		fill(color('rgba(0, 0, 0, 0.6)'));
		var ConvertValue = map(this.val, this.min, this.max, 0, this.size.x);
		var valuePos = this.pos.x - this.size.x/2 + ConvertValue/2;
		rect(valuePos, this.pos.y, ConvertValue, this.size.y);

		noFill();
		rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
		textSize(this.size.y);
		text("Volume", this.pos.x, this.pos.y+this.size.y/2);

		// show box contain
		if(showBoxContain){
			strokeWeight(1);
			stroke(255);
			this.boxcontain.show();
		}
	}

	this.clicked = function(mousex, mousey){
		if(mousex > this.pos.x - this.size.x/2 && mousex < this.pos.x + this.size.x/2
		&& mousey > this.pos.y - this.size.y/2 && mousey < this.pos.y + this.size.y/2){
			var newVolume = map(mousex-(this.pos.x-this.size.x/2), 
							 0, this.size.x, 
							 this.min, this.max);
			this.val = newVolume;
			myAudio.volume(newVolume);
			//myAudio.elt.volume = newVolume;
		}
	}
}