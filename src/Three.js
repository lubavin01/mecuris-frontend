import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const sceneSizes = {
    width: window.innerWidth/2,
    height: window.innerHeight,
};

export default class Three {
    constructor(canvasContainer) {
        this.initScene();
        this.initCamera();
        this.initRenderer(canvasContainer);
        this.initOrbitControls();
    }

    initScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color('grey');
    }

    initCamera() {
        const near = -400;
        const far = 400;

        this.camera = new THREE.OrthographicCamera(
            sceneSizes.width / -2,
            sceneSizes.width / 2,
            sceneSizes.height / 2,
            sceneSizes.height / -2,
            near,
            far
        );

        this.camera.position.set(0, 0, 1); // Обязательно нужно для работы OrbitControls
    }

    initRenderer(canvasContainer) {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(sceneSizes.width, sceneSizes.height);

        canvasContainer.appendChild(this.renderer.domElement);
    }

    addBox({ width, height, depth, positionX, positionY, positionZ, color }) {
        this.scene.clear();

        const boxGeometry = new THREE.BoxGeometry(width, height, depth);
        const material = new THREE.MeshBasicMaterial({ color });
        const box = new THREE.Mesh(boxGeometry, material);

        box.position.x = positionX;
        box.position.y = positionY;
        box.position.z = positionZ;

        this.scene.add(box);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }



    initOrbitControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.controls.autoRotate = true;
        // this.controls.enableDamping = true;
        // this.controls.dampingFactor = 0.05;

        // this.controls.maxPolarAngle = -Math.PI / 2;
        // this.controls.minPolarAngle = Math.PI / 2;

        // this.controls.addEventListener("start", () =>
        //   meshColorChange(ROTATION_START_COLOR)
        // );
        // this.controls.addEventListener("change", () =>
        //   meshColorChange(ROTATION_CHANGE_COLOR)
        // );
        // this.controls.addEventListener("end", () =>
        //   meshColorChange(ROTATION_END_COLOR)
        // );
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        this.controls.update(); // Чтобы эффекты работали

        this.render();
    }
}
