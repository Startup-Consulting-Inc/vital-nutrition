import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { useT } from '@/lib/i18n';

function FibonacciSphere(index: number, total: number, radius: number): THREE.Vector3 {
  const phi = Math.acos(1 - 2 * (index + 0.5) / total);
  const theta = Math.PI * (1 + Math.sqrt(5)) * (index + 0.5);
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.sin(phi) * Math.sin(theta),
    radius * Math.cos(phi)
  );
}

function noise4D(x: number, y: number, z: number, t: number): number {
  const sinXt = Math.sin(x * 0.8 + t * 1.2);
  const cosYt = Math.cos(y * 0.6 + t * 0.9);
  const sinZt = Math.sin(z * 0.7 + t * 1.1);
  const cosXYZ = Math.cos((x + y + z) * 0.3 + t * 0.7);
  return (sinXt + cosYt + sinZt + cosXYZ) * 0.25;
}

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useT();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let animId = 0;
    let disposed = false;

    try {
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(new THREE.Color('#202a26'), 1);

      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
      camera.position.z = 25;

      const ambientLight = new THREE.AmbientLight('#374640', 0.8);
      scene.add(ambientLight);

      const spotLight = new THREE.SpotLight('#ffe8b2', 800);
      spotLight.position.set(20, 40, 25);
      spotLight.angle = 0.5;
      spotLight.penumbra = 0.8;
      scene.add(spotLight);

      const fillLight = new THREE.DirectionalLight('#d95c39', 1.0);
      fillLight.position.set(-10, 10, 5);
      scene.add(fillLight);

      const pointLight = new THREE.PointLight('#ffe8b2', 200, 50);
      pointLight.position.set(0, 0, 10);
      scene.add(pointLight);

      const cloudGroup = new THREE.Group();
      scene.add(cloudGroup);

      const material = new THREE.MeshPhysicalMaterial({
        transmission: 0.9,
        opacity: 1,
        metalness: 0.1,
        roughness: 0.2,
        ior: 1.7,
        thickness: 0.4,
        specularIntensity: 1,
        clearcoat: 0.8,
        clearcoatRoughness: 0.2,
        color: '#ffe8b2',
        transparent: true,
        side: THREE.DoubleSide,
      });

      const blobCount = 25;
      const basePositions: THREE.Vector3[] = [];
      const blobs: THREE.Mesh[] = [];

      for (let i = 0; i < blobCount; i++) {
        const basePos = FibonacciSphere(i, blobCount, 10);
        const scale = 1.5 + Math.random() * 2.5;
        const geom = new THREE.IcosahedronGeometry(scale, 3);
        const mesh = new THREE.Mesh(geom, material);
        mesh.position.copy(basePos);
        cloudGroup.add(mesh);
        basePositions.push(basePos);
        blobs.push(mesh);
      }

      const clock = new THREE.Clock();

      const animate = () => {
        if (disposed) return;
        animId = requestAnimationFrame(animate);
        const time = clock.getElapsedTime();

        for (let i = 0; i < blobCount; i++) {
          const basePos = basePositions[i];
          const n = noise4D(basePos.x * 0.05, basePos.y * 0.05, basePos.z * 0.05, time * 0.2);
          const movement = n * 1.5;
          blobs[i].position.copy(basePos).multiplyScalar(1 + movement * 0.05);
          blobs[i].rotation.x = time * 0.1 + i;
          blobs[i].rotation.y = time * 0.15 + i * 0.5;
        }

        currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.05;
        currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.05;
        cloudGroup.rotation.x = currentRotation.current.x;
        cloudGroup.rotation.y = currentRotation.current.y + time * 0.05;

        renderer.render(scene, camera);
      };

      animate();

      const onPointerMove = (e: PointerEvent) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -(e.clientY / window.innerHeight) * 2 + 1;
        targetRotation.current.y = x * 0.3;
        targetRotation.current.x = y * 0.3;
      };

      const onResize = () => {
        if (!container || disposed) return;
        const nw = container.clientWidth;
        const nh = container.clientHeight;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
      };

      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('resize', onResize);

      return () => {
        disposed = true;
        cancelAnimationFrame(animId);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('resize', onResize);
        renderer.dispose();
        material.dispose();
        blobs.forEach(b => b.geometry.dispose());
      };
    } catch (err) {
      console.error('Hero 3D init failed:', err);
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden" style={{ height: '100vh', backgroundColor: '#202a26' }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          display: 'block',
        }}
      />
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        style={{ zIndex: 2 }}
      >
        <p
          className="mb-6 text-sm uppercase tracking-widest"
          style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, sans-serif' }}
        >
          {t('hero.eyebrow')}
        </p>
        <h1
          className="mb-6 max-w-4xl"
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(3rem, 8vw, 8rem)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: '#ffffff',
            textShadow: '0 4px 30px rgba(0,0,0,0.6)',
          }}
        >
          {t('hero.title')}
        </h1>
        <p
          className="text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.75)' }}
        >
          {t('hero.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            to="/nutrients"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-lg text-sm font-medium text-white hover:bg-[#c44e2f] transition-colors duration-300"
            style={{ backgroundColor: '#d95c39' }}
          >
            {t('hero.ctaPrimary')}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link
            to="/analyzer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-lg text-sm font-medium text-white hover:bg-white/20 transition-colors duration-300 backdrop-blur-sm border border-white/10"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
            {t('hero.ctaSecondary')}
          </Link>
        </div>
      </div>
    </section>
  );
}
