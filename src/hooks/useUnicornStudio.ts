import { create } from 'zustand';
import { useEffect } from 'react';

const UNICORN_WIDGET_VERSION = '1.4.19';
const UNICORN_WIDGET_SRC = `https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v${UNICORN_WIDGET_VERSION}/dist/unicornStudio.umd.js`;

type UnicornStudioState = 'idle' | 'loading' | 'loaded' | 'error';

export type SceneInstance = {
  destroy: () => void;
};

export type SceneConfig = {
  element: HTMLElement | null;
  filePath: string;
};

declare global {
  interface Window {
    UnicornStudio: {
      addScene: (config: SceneConfig) => Promise<SceneInstance>;
    };
  }
}

type UnicornStore = {
  state: UnicornStudioState;
  error: string | null;
  scriptLoadPromise: Promise<void> | null;
  loadScript: () => Promise<void>;
  createScene: (config: SceneConfig) => Promise<SceneInstance>;
};

const useUnicornStore = create<UnicornStore>((set, get) => ({
  state: 'idle',
  error: null,
  scriptLoadPromise: null,

  loadScript: async () => {
    const { scriptLoadPromise, state } = get();

    if (state === 'loaded') return;
    if (state === 'error') {
      set({ state: 'idle', error: null, scriptLoadPromise: null });
    }
    if (scriptLoadPromise) return scriptLoadPromise;

    const promise = new Promise<void>((resolve, reject) => {
      if (typeof window !== 'undefined' && window.UnicornStudio) {
        set({ state: 'loaded' });
        resolve();
        return;
      }

      set({ state: 'loading' });
      const script = document.createElement('script');
      script.src = UNICORN_WIDGET_SRC;
      script.async = true;
      script.onload = () => {
        set({ state: 'loaded' });
        resolve();
      };
      script.onerror = (e) => {
        const error = `Failed to load Unicorn Studio script: ${
          e instanceof ErrorEvent ? e.message : 'Unknown error'
        }`;
        set({ state: 'error', error });
        reject(new Error(error));
      };
      document.head.appendChild(script);
    });

    set({ scriptLoadPromise: promise });
    return promise;
  },

  createScene: async (config: SceneConfig) => {
    try {
      return await window.UnicornStudio.addScene(config);
    } catch (err) {
      const error = `Failed to create scene: ${
        err instanceof Error ? err.message : 'Unknown error'
      }`;
      set({ error });
      throw new Error(error);
    }
  }
}));

export const useUnicornStudio = () => {
  const { state, error, createScene, loadScript } = useUnicornStore();

  useEffect(() => {
    if (state === 'idle') {
      loadScript();
    }
  }, [state, loadScript]);

  return {
    unicornStudioState: state,
    isLoaded: state === 'loaded',
    isError: state === 'error',
    error,
    createScene
  };
};
