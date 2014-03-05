var zombie = $('#zombie'),
	pLocs = [0, -250, -500, -750, -1000, -1250, -1500],
	curFrm = 0,
	lastStep = 0,
	animationCycle, backPosY;

skrollr.init({
	beforerender: function(o){
		if(o.curTop < 2800){
			animationCycle=7;
			backPosY='0px';
		}else{
			animationCycle=4;
			backPosY='-190px';
		}
		
		if(o.curTop > lastStep + 50){
			if (curFrm>=animationCycle-1){curFrm=-1;}
			zombie.css('background-position', pLocs[++curFrm] + 'px ' + backPosY);
			lastStep=o.curTop;
			
			
		}else if(o.curTop < lastStep - 50){
			if (curFrm<=0){curFrm=animationCycle;}
			zombie.css('background-position', pLocs[--curFrm] + 'px ' + backPosY);
			lastStep = o.curTop;
		}
	}		
});		



