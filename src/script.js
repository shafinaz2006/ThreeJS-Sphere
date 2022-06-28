import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui';

// loader
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load('/textures/normalMapHeight.png');

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64);

// Materials

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.color = new THREE.Color(0x292929);
material.normalMap = normalTexture;

// Mesh
const sphere = new THREE.Mesh(geometry,material);
scene.add(sphere);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0xff0000, 2);
pointLight2.position.set(-1.6, 1, -0.5);
pointLight2.intensity = 10;
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight(0x5719, 2);
pointLight3.position.set(2.1, -3, -2);
pointLight3.intensity = 7;

scene.add(pointLight3);

// to see the light controls in gui

const light2 = gui.addFolder('Light 1'); // this creates a folder for specific helpers to organize.

// check the difference for light2 and light3

light2.add(pointLight2.position, 'x').min(-6).max(6).step(0.01);
light2.add(pointLight2.position, 'y').min(-3).max(3).step(0.01);
light2.add(pointLight2.position, 'z').min(-3).max(3).step(0.01);

gui.add(pointLight3.position, 'x').min(-6).max(6).step(0.01);
gui.add(pointLight3.position, 'y').min(-3).max(3).step(0.01);
gui.add(pointLight3.position, 'z').min(-3).max(3).step(0.01);

// adding color change helper

const light3Color = {
    color: 0xff0000
}
gui.addColor(light3Color, 'color').onChange(() => {
    pointLight3.color.set(light3Color.color);
})

// To show the light source position

const pointLightHelper = new THREE.PointLightHelper(pointLight2, 0.5); 
// scene.add(pointLightHelper);

// Sizes

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

// Camera
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

//Renderer

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate

document.addEventListener('mousemove', onDocumentMouseMove);

let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove(event){
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
}

const clock = new THREE.Clock()

const tick = () => {

    const elapsedTime = clock.getElapsedTime();

    // Update objects
    sphere.rotation.y = .5 * elapsedTime; // this is for continuous rotation

    // Positioning on mouse movement
    
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;
    sphere.rotation.y += 0.5 * (targetY - sphere.rotation.y); 
    sphere.rotation.x += 0.05 * (targetX - sphere.rotation.x);
    // sphere.position.z += -0.05 * (targetY - sphere.rotation.x);

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()