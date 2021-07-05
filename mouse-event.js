 // selecting canvas
       var canvas = document.querySelector('canvas');

        // setting up width and height of canvas
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		//creating getContext Variable. 
		
		//this will use to draw all  the shape and lines in canvas 
		var c = canvas.getContext('2d'); //Magic line 


//Animating multiple  circles
  var mouse = {
  	x:undefined,
  	y:undefined
  }
  var maxRadius = 40;
  //var minRadius = 2;
  var colors = ['#FFF587','#FF8C64','#FF665A','#ff9933','#7D6B7D','#A3A1A8'];
 
   // adding event listener
   window.addEventListener('mousemove', (event) => {
          mouse.x = event.x;
          mouse.y = event.y;
     }); 
     window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		init();
     });  
    //crating an object function
     function Circle(x,y,dx,dy,radius){
	        this.x = x;
	        this.y = y;
	        this.dx = dx;
	        this.dy = dy;
	        this.r = radius;
	        this.minRadius = radius;
	        this.color = Math.floor(Math.random() * (colors.length));
	        this.draw = function(){
	         //drawing a circle
			   // var index = Math.floor(Math.random() * (colors.length));
				c.beginPath();
				c.arc(this.x,this.y,this.r,0,Math.PI * 2,false);
				//c.strokeStyle = colors[index];
				//c.stroke();
				c.fillStyle = colors[this.color];
				c.fill();

	        }
	        this.update = function(){

	        	

	        	//edge case for left and right boundary
				 if(this.x + this.r > innerWidth || this.x - this.r < 0){
			            this.dx = -this.dx; // changing direction when hit left or right
				 }
			    //edge case for top and bottom boundary
				 if(this.y + this.r > innerHeight || this.y - this.r < 0){
			            this.dy = -this.dy; // changing direction when hit top or bottom
				 }
				 //increasing x cordinate with dx
				 this.x += this.dx;
				 //increasing y cordinate with dy
				 this.y += this.dy;

				 // Interactivity :  4 content start
                  if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
                  	if(this.r < maxRadius){
                  		this.r += 1;
                  	}
                  }else if(this.r > this.minRadius){
                  	this.r -= 1;
                  }
				  this.draw();
	        }
		}
     
		
		var circleArray = [];
		
		function init(){
			circleArray = [];
			for(let i =0; i<1000;i++){
			 var r = Math.random() * 3 + 1; // radius
			 var x = Math.random() * (innerWidth - r * 2) + r; // x cordinate
		     var dx = (Math.random() - 0.5) * 1; //x velocity => adding dx to x each time when function call
			 var y = Math.random() * (innerHeight - r * 2) + r; // y cordinate
			 var dy = (Math.random() - 0.5) * 1; // y velocity => adding dy to y each time when function call
			
			circleArray.push(new Circle(x,y,dx,dy,r));
		}
		}
		function animateAll(){ // my function
		  requestAnimationFrame(animateAll); //built-in function for animation
		      // this will clear circle and move it with one circle
			  c.clearRect(0,0,innerWidth,innerHeight);
			 for(let i = 0; i < circleArray.length;i++){

                   circleArray[i].update();

			 }

		}

		init();
		animateAll();
		  