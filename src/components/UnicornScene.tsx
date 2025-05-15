'use client';

import { useEffect, useRef } from 'react';
import { useUnicornStudio } from '../hooks/useUnicornStudio';
import clsx from 'clsx';

export type UnicornSceneProps = {
  jsonFilePath: string;
  scale?: number;
  dpi?: number;
  fps?: number;
  altText?: string;
  ariaLabel?: string;
  className?: string;
  lazyLoad?: boolean;
};

export default function UnicornScene({
  jsonFilePath,
  scale = 1,
  dpi = 1.5,
  fps = 60,
  altText = 'Unicorn Scene',
  ariaLabel = altText,
  className = '',
  lazyLoad = false
}: UnicornSceneProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const { unicornStudioState, error, createScene } = useUnicornStudio();

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !jsonFilePath || unicornStudioState !== 'loaded') return;

    let scene: { destroy: () => void } | null = null;

    createScene({
      element,
      filePath: jsonFilePath
    }).then((s) => {
      scene = s;
    });

    return () => {
      if (scene) {
        scene.destroy();
      }
    };
  }, [unicornStudioState, jsonFilePath, createScene]);

  return (
    <div
      ref={elementRef}
      className={className}
      role='img'
      aria-label={ariaLabel}
      data-us-dpi={dpi}
      data-us-scale={scale}
      data-us-fps={fps}
      data-us-alttext={altText}
      data-us-arialabel={ariaLabel}
      data-us-lazyload={lazyLoad ? 'true' : ''}
    >
      {error && <div className='text-red-500'>{error}</div>}
    </div>
  );
}
