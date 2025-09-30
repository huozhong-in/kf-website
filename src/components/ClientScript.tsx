export const ClientScript = () => {
  return (
    <script dangerouslySetInnerHTML={{
      __html: `
        // Three.js animated background
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg-canvas'), alpha: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.position.z = 5;

        const geometry = new THREE.SphereGeometry(0.1, 16, 16);
        const particles = [];

        for (let i = 0; i < 100; i++) {
            const material = new THREE.MeshBasicMaterial({ 
                color: Math.random() > 0.5 ? 0x6366f1 : 0x8b5cf6,
                transparent: true,
                opacity: 0.6
            });
            const particle = new THREE.Mesh(geometry, material);
            
            particle.position.x = (Math.random() - 0.5) * 20;
            particle.position.y = (Math.random() - 0.5) * 20;
            particle.position.z = (Math.random() - 0.5) * 20;
            
            particle.velocity = {
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02
            };
            
            scene.add(particle);
            particles.push(particle);
        }

        function animate() {
            requestAnimationFrame(animate);
            
            particles.forEach(particle => {
                particle.position.x += particle.velocity.x;
                particle.position.y += particle.velocity.y;
                particle.position.z += particle.velocity.z;
                
                if (Math.abs(particle.position.x) > 10) particle.velocity.x *= -1;
                if (Math.abs(particle.position.y) > 10) particle.velocity.y *= -1;
                if (Math.abs(particle.position.z) > 10) particle.velocity.z *= -1;
                
                particle.rotation.x += 0.01;
                particle.rotation.y += 0.01;
            });
            
            renderer.render(scene, camera);
        }

        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
      `
    }} />
  )
}