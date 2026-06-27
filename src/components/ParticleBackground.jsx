// src/components/ParticleBackground.jsx
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Effects } from '@react-three/drei';
import { UnrealBloomPass } from 'three-stdlib';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

extend({ UnrealBloomPass });

const ParticleSwarm = () => {
  const meshRef = useRef();
  const count = 3000;
  const speedMult = 0.5;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const pColor = useMemo(() => new THREE.Color(), []);
  
  const positions = useMemo(() => {
    const pos = [];
    for(let i = 0; i < count; i++) {
      pos.push(new THREE.Vector3(
        (Math.random() - 0.5) * 120,
        (Math.random() - 0.5) * 120,
        (Math.random() - 0.5) * 120
      ));
    }
    return pos;
  }, []);

  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 }
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vColor;
      void main() {
        vUv = uv;
        vColor = instanceColor;
        vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      varying vec3 vColor;
      uniform float uTime;
      void main() {
        float dist = distance(vUv, vec2(0.5));
        float ring = smoothstep(0.4, 0.45, dist) - smoothstep(0.45, 0.5, dist);
        float core = 1.0 - smoothstep(0.0, 0.1, dist);
        float alpha = core + ring * (0.5 + 0.5 * sin(uTime * 2.0));
        if (alpha < 0.05) discard;
        gl_FragColor = vec4(vColor, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  }), []);

  const geometry = useMemo(() => new THREE.PlaneGeometry(0.6, 0.6), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * speedMult;

    if(material.uniforms && material.uniforms.uTime) {
      material.uniforms.uTime.value = time;
    }

    // Create a double spiral / vortex motion
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const radius = 25 + 15 * Math.sin(t * Math.PI * 8 + time * 0.3);
      const angle = t * Math.PI * 12 + time * 0.5;
      const height = (t - 0.5) * 60 + 10 * Math.sin(t * Math.PI * 6 + time * 0.4);
      
      target.set(
        radius * Math.cos(angle + time * 0.2),
        height,
        radius * Math.sin(angle + time * 0.2)
      );
      
      // Color gradient based on position and time
      const hue = (t * 0.6 + time * 0.02) % 1;
      pColor.setHSL(0.55 + hue * 0.15, 0.8, 0.6);
      
      positions[i].lerp(target, 0.08);
      dummy.position.copy(positions[i]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, pColor);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, material, count]} />
  );
};

const ParticleBackground = () => {
  return (
    <div className="particle-background">
      <Canvas 
        camera={{ position: [0, 0, 80], fov: 60 }}
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <fog attach="fog" args={['#0a0a0a', 30, 100]} />
        <ParticleSwarm />
        <Effects disableGamma>
          <unrealBloomPass threshold={0.1} strength={0.6} radius={0.3} />
        </Effects>
      </Canvas>
    </div>
  );
};

export default React.memo(ParticleBackground);