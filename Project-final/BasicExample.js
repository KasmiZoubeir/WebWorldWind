/*
 * Copyright 2003-2006, 2009, 2017, 2020 United States Government, as represented
 * by the Administrator of the National Aeronautics and Space Administration.
 * All rights reserved.
 *
 * The NASAWorldWind/WebWorldWind platform is licensed under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License
 * at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed
 * under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * NASAWorldWind/WebWorldWind also contains the following 3rd party Open Source
 * software:
 *
 *    ES6-Promise – under MIT License
 *    libtess.js – SGI Free Software License B
 *    Proj4 – under MIT License
 *    JSZip – under MIT License
 *
 * A complete listing of 3rd Party software notices and licenses included in
 * WebWorldWind can be found in the WebWorldWind 3rd-party notices and licenses
 * PDF found in code  directory.
 */
/**
 * Illustrates how to build a basic WorldWind globe.
 */
requirejs(['./WorldWindShim',
        './LayerManager'],
    function (WorldWind,
              LayerManager) {
        "use strict";
//         setInterval(()=>{const data= fetch("https://tle.ivanstanojevic.me/api/tle/25544").then(x => x.text()).then(y=>{
//             console.log(JSON.parse(y));
//             const result =  JSON.parse(y);
//             const res =  `${result.name} \n ${result.line1} \n ${result.line2}`
//             const optionalTimestampMS = date.getTime() ;
//             const { getLatLngObj } = require("tle.js/dist/tlejs.cjs");
//             console.log(getLatLngObj)
//             const latLonObj = getLatLngObj(res, optionalTimestampMS);
//             console.log(latLonObj);
//   })},1000);

        var i=2;
        // Tell WorldWind to log only warnings and errors.
        WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

        // Create the WorldWindow.
        var wwd = new WorldWind.WorldWindow("canvasOne");
        var BMNGOneImageLayer = new WorldWind.BMNGOneImageLayer();
        
        wwd.addLayer(BMNGOneImageLayer);
         
        var starFieldLayer = new WorldWind.StarFieldLayer();
        var atmosphereLayer = new WorldWind.AtmosphereLayer();
        wwd.addLayer(starFieldLayer);
        atmosphereLayer.enabled=false;

        wwd.addLayer(atmosphereLayer);
        // Create and add layers to the WorldWindow.
        var layers = [
            // Imagery layers.
            {layer: new WorldWind.BMNGLayer(), enabled: true},
            {layer: new WorldWind.BMNGLandsatLayer(), enabled: false},
            {layer: new WorldWind.BingAerialLayer(null), enabled: false},
            {layer: new WorldWind.BingAerialWithLabelsLayer(null), enabled: true},
            {layer: new WorldWind.BingRoadsLayer(null), enabled: false},
            {layer: new WorldWind.OpenStreetMapImageLayer(null), enabled: false},
            // Add atmosphere layer on top of all base layers.
           
            // WorldWindow UI layers.
            {layer: new WorldWind.CompassLayer(), enabled: true},
            {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
            {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}
        ];

        for (var l = 0; l < layers.length; l++) {
            layers[l].layer.enabled = layers[l].enabled;
            wwd.addLayer(layers[l].layer);
        }
        // Create renderable layer to hold the Collada model.
        var modelLayer = new WorldWind.RenderableLayer("Duck");
        wwd.addLayer(modelLayer);
         // Define a position for locating the model.
         var position = new WorldWind.Position(30, -100, 1000e3);
          
         // // Create a Collada loader and direct it to the desired directory and .dae file.
         var colladaLoader = new WorldWind.ColladaLoader(position);
         colladaLoader.init({dirPath: './collada_models/duck/'});
         var duckScene = null;
         colladaLoader.load('duck.dae', function (scene) {
             scene.scale = 150000;
             modelLayer.addRenderable(scene); // Add the Collada model to the renderable layer within a callback.
             duckScene = scene;
         });
 
        // Set a date property for the StarField and Atmosphere layers to the current date and time.
        // This enables the Atmosphere layer to show a night side (and dusk/dawn effects in Earth's terminator).
        // The StarField layer positions its stars according to this date.
        var now = new Date();
        starFieldLayer.time = now;
        atmosphereLayer.time = now;
         // In this example, each full day/night cycle lasts 8 seconds in real time.
        var simulatedMillisPerDay = 60000;

        // Begin the simulation at the current time as provided by the browser.
        var startTimeMillis = Date.now();
        function runSimulation() {
            // Compute the number of simulated days (or fractions of a day) since the simulation began.
            var elapsedTimeMillis = Date.now() - startTimeMillis;
            var simulatedDays = elapsedTimeMillis / simulatedMillisPerDay;

            // Compute a real date in the future given the simulated number of days.
            var millisPerDay = 24 * 3600 * 1000; // 24 hours/day * 3600 seconds/hour * 1000 milliseconds/second
            var simulatedMillis = simulatedDays * millisPerDay;
            var simulatedDate = new Date(startTimeMillis + simulatedMillis);

            // Update the date in both the Starfield and the Atmosphere layers.
            starFieldLayer.time = simulatedDate;
            atmosphereLayer.time = simulatedDate;
            wwd.redraw(); // Update the WorldWindow scene.

            requestAnimationFrame(runSimulation);
        }

        // Animate the starry sky as well as the globe's day/night cycle.
        requestAnimationFrame(runSimulation);
         
             // Add click event to trigger the generation of the ray and the computation of its intersctions with the COLLADA model.
             var handleClick = function (o) {
              
                   
                   
                var position = new WorldWind.Position(30+5*i, -100, 1000e3);
               
               // Create a Collada loader and direct it to the desired directory and .dae file.
               var colladaLoader = new WorldWind.ColladaLoader(position);
                
               colladaLoader.init({dirPath: './collada_models/duck/'});
              
               var duckScene = null;
               
               colladaLoader.load('duck.dae', function (scene) {
                  
                   scene.scale = 150000;
                   modelLayer.addRenderable(scene);
                  
                   // Add the Collada model to the renderable layer within a callback.
                   duckScene = null;
               });
               // Redraw scene with the computed results.
              
               wwd.redraw();
                
               var layerManager = new LayerManager(wwd);
              
       
        
       
   };
    // Listen for mouse clicks to trigger the related event.
    wwd.addEventListener("click", handleClick);

    // Create a layer manager for controlling layer visibility.
    var layerManager = new LayerManager(wwd);
    });