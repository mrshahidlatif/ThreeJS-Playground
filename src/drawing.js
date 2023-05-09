import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

const hdrTextureUrl = new URL("./assets/MR_INT-002_BathroomHard_Pierre.hdr", import.meta.url);

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("canvas") });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("#757575");

// For correcting the bright spots of the HDR Texture
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.8;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 50);

const animate = () => {
    renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);

// user controls to pan and zoom
const orbitControls = new OrbitControls(camera, renderer.domElement);

const hdrTextureLoader = new RGBELoader();
hdrTextureLoader.load(hdrTextureUrl, (hdrTexture) => {
    hdrTexture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = hdrTexture;
    scene.environment = hdrTexture;
});

const sphereMesh = new THREE.Mesh(
    new THREE.SphereGeometry(8, 64, 64),
    new THREE.MeshStandardMaterial({ roughness: 0, metalness: 0.5, color: "#f7c948" })
);
scene.add(sphereMesh);

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
