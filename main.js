
var scene,camera,renderer,plane,controls,container = document.getElementById('container');
var arrowr = document.getElementById('arrowr');
var arrowl = document.getElementById('arrowl');
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var mat,geo,composer,curobj;
function oncontainerResize(){
    w = container.offsetWidth;
    h = container.offsetHeight;
    camera.aspect = w / h;
    renderer.setSize( w, h );
    camera.updateProjectionMatrix();
    
}
window.addEventListener( 'resize', oncontainerResize);
function returnModel(model){
  model.traverse( function( object ) 
  {            
    if ((object instanceof THREE.Mesh))
     { 
           mat = object.material;
           geo = object.geometry;
     }
 }) 
}
function init(){
    console.log(container);
    var width = container.offsetWidth;
    var height = container.offsetHeight;
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, width / height, 1, 1000 );
    scene.add( camera );
    var light = new THREE.AmbientLight(0xffffff,5);
    var dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(0,-20,0);
    scene.add(dirLight);
    scene.add(light);
    var dirLight2 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight2.position.set(0,0,-20);
    scene.add(dirLight2);
    var dirLight3 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight3.position.set(-20,0,0);
    scene.add(dirLight3);
    var dirLight4 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight4.position.set(20,0,0);
    scene.add(dirLight4);
    var dirLight5 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight5.position.set(0,20,0);
    scene.add(dirLight5);
    var dirLight6 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight6.position.set(0,0,20);
    scene.add(dirLight6);
    camera.position.set(0,0,-20);
    camera.lookAt(0,0,0);
    renderer = new THREE.WebGLRenderer({anitalias:true});
    renderer.setPixelRatio(window.devicePixelRatio*2);
    renderer.setSize(container.offsetWidth,container.offsetHeight);
    renderer.setClearColor(0xfff000,1.0);
    document.getElementById('container').appendChild(renderer.domElement);
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    scene.add(model2);
    console.log(scene)
    curobj = 2;
    arrowl.addEventListener('click',()=>{
        if(curobj==1){
          scene.remove(model1);
          scene.add(model3);
          curobj = 3;
        }
        else if(curobj==2){
          scene.remove(model2);
          scene.add(model1);
          curobj = 1;
        }
        else if(curobj==3){
          scene.remove(model3);
          scene.add(model2);
          curobj = 2;
        }
    })
    arrowr.addEventListener('click',()=>{
      if(curobj==1){
        scene.remove(model1);
        scene.add(model2);
        curobj = 2;
      }
      else if(curobj==2){
        scene.remove(model2);
        scene.add(model3);
        curobj = 3;
      }
      else if(curobj==3){
        scene.remove(model3);
        scene.add(model1);
        curobj = 1;
      }
    })
    // model2.scene.children.forEach(element => {
        
    //         console.log(element)
    //         // add children to main scene
    //         scene.add(element);
         
    // });
    // model2.animations; 
    // model2.scene; 
    // model2.scenes; 
    // model2.cameras; 
    // model2.asset;
    //model2.scale.set(10,10,10);
    //scene.add(model2);
    // composer = new POSTPROCESSING.EffectComposer(renderer);
    // composer.addPass(new POSTPROCESSING.RenderPass(scene,camera));
    // effectFXAA = new POSTPROCESSING.ShaderPass(threeShaderFXAA ());
    // console.log(effectFXAA);
    // effectFXAA.uniforms.resolution.value.set(width, height)
    // effectFXAA.uniforms[ 'resolution' ].value.x = 1 / ( window.innerWidth * pixelRatio );
    // effectFXAA.uniforms[ 'resolution' ].value.y = 1 / ( window.innerHeight * pixelRatio );
    // composer.addPass( effectFXAA );
// composer = new EffectComposer(renderer)
// composer.addPass(new EffectComposer.RenderPass(scene, camera))

// // Add FXAA pass
// var shaderPass = new EffectComposer.ShaderPass(threeShaderFXAA());
// shaderPass.renderToScreen = true
// composer.addPass(shaderPass)

    animate();
}


function loadModel(url) {
    return new Promise(resolve => {
      new THREE.GLTFLoader().load(url, resolve);
    });
  }
let model1, model2, model3,model4;
let p1 = loadModel('./scene.glb').then(result => {  model1 = result.scene;   
  returnModel(model1);
  model1.position.set(0,-3,0);
});
let p2 = loadModel('./gun.glb').then(result => {  model2 = result.scene;
  returnModel(model2);
  model2.scale.set(0.5,0.5,0.5); });
let p3 = loadModel('./scene2.glb').then(result => {  model3 = result.scene;
  returnModel(model3);});
let p4 = loadModel('./king.glb').then(result => {  model4 = result.scene;
    returnModel(model4);
    model4.scale.set(1,1,1);
  }  
    );
Promise.all([p1,p2,p3,p4]).then(() => {
console.log('Done',model2);

init();
});

function animate() {
    requestAnimationFrame( animate );
  //  plane.material.uniforms.time.value += 0.05;
    renderer.render(scene,camera);
    controls.update();
    // model1.rotation.y+=0.01;
    // model2.rotation.y+=0.01;
    // model3.rotation.y+=0.01;
    // model4.rotation.x+=0.01;
}    


