import UnicornScene from '../components/UnicornScene';

export default function Home() {
  return (
    <main>
      <div className='relative grid grid-cols-1 place-items-center min-h-screen'>
        <UnicornScene
          className='absolute inset-0 min-h-screen'
          jsonFilePath='/unicorn/cosmic-toothpaste.json'
        />
        <UnicornScene
          className='absolute h-1/2 w-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
          jsonFilePath='/unicorn/tide-pod-dreams.json'
        />
        <div className='absolute p-10 rounded-3xl bottom-1/8 left-1/2 -translate-x-1/2  bg-black/50'>
          <h1 className='text-6xl whitespace-nowrap overflow-hidden text-purple-100  font-extrabold'>
            Cosmic <span className='text-slate-400'>Toothpaste</span>
            <div className='text-xl font-normal text-center'>
              Test of a unicorn hook with zustand
            </div>
          </h1>
        </div>
      </div>
    </main>
  );
}
