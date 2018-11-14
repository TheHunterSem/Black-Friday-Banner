Pts.namespace( window );
Pts.quickStart( "#pt", "#123" );

(function() {

  var world;

  space.add( {

    start: (bound, space) => {

      // Create world and 100 random points
      world = new World( space.innerBound, 1, 0 );
      let pts = Create.distributeRandom( space.innerBound, 15 );

      // Create particles and hit them with a random impulse
      for (let i=0, len=pts.length; i<len; i++) {
        let p = new Particle( pts[i] ).size(60);
        let p2 = new Particle( pts[i] ).size(40);
        let p3 = new Particle( pts[i] ).size(20);
        p.hit( Num.randomRange(-50,50), Num.randomRange(-25, 25) );
        world.add( p );
        world.add( p2 );
        world.add( p3 );
      }

      world.particle( 0 ).lock = true; // lock it to move it by pointer later on

    },


    animate: (time, ftime) => {
      world.drawParticles( (p, i) => {
        let color = (i===0) ? "#fff" : "#000000";
        form.fillOnly( color ).point( p, p.radius, "circle" )
      });

      world.update( ftime );
    },


    action:( type, px, py) => {
      if (type == "move") {
        world.particle( 0 ).position = new Pt(px, py);
      }

    },

    resize: (bound, evt) => {
        if (world) world.bound = space.innerBound;
    }

  });

  space.bindMouse().bindTouch();
  space.play();

})();