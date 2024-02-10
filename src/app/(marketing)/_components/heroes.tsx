import Image from 'next/image';

export default function Heroes() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 h-[300px] md:h-[350px] max-w-4xl w-full'>
      <div className='relative'>
        <Image src='/documents.png' fill className='object-contain dark:hidden' alt='Documents' />
        <Image src='/documents-dark.png' fill className='object-contain hidden dark:block' alt='Documents' />
      </div>
      <div className='relative hidden md:block'>
        <Image src='/reading.png' fill className='object-contain dark:hidden' alt='Reading' />
        <Image src='/reading-dark.png' fill className='object-contain hidden dark:block' alt='Reading' />
      </div>
    </div>
  );
}
