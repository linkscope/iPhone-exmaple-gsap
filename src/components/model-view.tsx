import type { MutableRefObject } from 'react'
import { Suspense } from 'react'
import { Html, OrbitControls, PerspectiveCamera, View } from '@react-three/drei'
import * as THREE from 'three'
import { cn } from '@/lib/utils.ts'
import Lights from '@/components/lights.tsx'
import IPhone from '@/components/iphone.tsx'

interface Props {
  index: number
  groupRef: MutableRefObject<any>
  gsapType: 'view1' | 'view2'
  controlRef: MutableRefObject<any>
  setRotationState: (value: number) => void
  item: {
    title: string
    color: string[]
    img: string
  }
  size: 'small' | 'large'
}

export default function ModelView({ index, groupRef, controlRef, gsapType, size, setRotationState, item }: Props) {
  return (
    <View
      index={index}
      id={gsapType}
      className={cn('size-full', index === 2 && 'right-[-100%]')}
    >
      {/*  环境光 */}
      <ambientLight intensity={0.3} />
      {/*  镜头 缩放为4 */}
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      {/*  光照 */}
      <Lights />
      {/*  鼠标控制 */}
      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />
      <group
        ref={groupRef}
        name={`${index === 1 ? 'small' : 'large'}`}
        position={[0, 0, 0]}
      >
        <Suspense fallback={(
          <Html>
            <div>加载中</div>
          </Html>
        )}
        >
          <IPhone scale={index === 1 ? [15, 15, 15] : [17, 17, 17]} />
        </Suspense>
      </group>
    </View>
  )
}
