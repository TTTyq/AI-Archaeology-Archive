import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Html } from '@react-three/drei';
import * as THREE from 'three';

// 单个星点组件
function StarPoint({ artifact, onClick, isSelected }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // 添加轻微的脉动效果
      const scale = isSelected ? 1.5 : (hovered ? 1.2 : 1.0);
      meshRef.current.scale.setScalar(scale + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    <group position={[artifact.position.x, artifact.position.y, artifact.position.z]}>
      <mesh
        ref={meshRef}
        onClick={() => onClick(artifact)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[artifact.size || 0.5, 16, 16]} />
        <meshStandardMaterial
          color={artifact.color || '#FFD700'}
          emissive={artifact.color || '#FFD700'}
          emissiveIntensity={isSelected ? 0.5 : (hovered ? 0.3 : 0.1)}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* 悬停时显示名称 */}
      {hovered && (
        <Html distanceFactor={10}>
          <div className="artifact-tooltip">
            <div className="tooltip-title">{artifact.name}</div>
            <div className="tooltip-info">{artifact.culture} - {artifact.ageDescription}</div>
          </div>
        </Html>
      )}
    </group>
  );
}

// 星图场景组件
function StarMapScene({ artifacts, onArtifactClick, selectedArtifact }) {
  const { camera } = useThree();

  useEffect(() => {
    // 设置相机初始位置
    camera.position.set(0, 0, 50);
  }, [camera]);

  return (
    <>
      {/* 环境光 */}
      <ambientLight intensity={0.3} />
      
      {/* 主光源 */}
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* 背景星空 */}
      <Stars
        radius={300}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      
      {/* 渲染所有考古文物星点 */}
      {artifacts.map((artifact) => (
        <StarPoint
          key={artifact._id}
          artifact={artifact}
          onClick={onArtifactClick}
          isSelected={selectedArtifact?._id === artifact._id}
        />
      ))}
      
      {/* 轨道控制器 */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        zoomSpeed={1.2}
        panSpeed={0.8}
        rotateSpeed={0.4}
        minDistance={5}
        maxDistance={200}
      />
    </>
  );
}

// 主星图组件
export default function StarMap({ artifacts = [], onArtifactSelect }) {
  const [selectedArtifact, setSelectedArtifact] = useState(null);

  const handleArtifactClick = (artifact) => {
    setSelectedArtifact(artifact);
    if (onArtifactSelect) {
      onArtifactSelect(artifact);
    }
  };

  return (
    <div className="star-map-container">
      <Canvas
        camera={{ position: [0, 0, 50], fov: 75 }}
        style={{ background: 'linear-gradient(to bottom, #000011 0%, #000033 100%)' }}
      >
        <StarMapScene
          artifacts={artifacts}
          onArtifactClick={handleArtifactClick}
          selectedArtifact={selectedArtifact}
        />
      </Canvas>
      
      {/* 控制说明 */}
      <div className="controls-info">
        <div className="control-item">
          <span className="control-key">鼠标左键拖拽</span>
          <span className="control-desc">旋转视角</span>
        </div>
        <div className="control-item">
          <span className="control-key">鼠标滚轮</span>
          <span className="control-desc">缩放</span>
        </div>
        <div className="control-item">
          <span className="control-key">鼠标右键拖拽</span>
          <span className="control-desc">平移</span>
        </div>
        <div className="control-item">
          <span className="control-key">点击星点</span>
          <span className="control-desc">查看详情</span>
        </div>
      </div>
    </div>
  );
}
