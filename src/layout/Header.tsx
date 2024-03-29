import Image from 'next/image';
import linkedInLogo from '~/assets/linkedin.png';
import gitHubLogo from '~/assets/github.svg';

export default function Header() {
 return (
   <header className="top-0 left-0 fixed flex justify-between items-center z-10 p-5 w-full backdrop-blur-xl bg-white bg-opacity-15 border border-b-violet-100 border-opacity-30">
     <div className="flex gap-10 items-center">
       <div className="border-4 font-extrabold text-4xl rounded-full flex justify-center items-center h-20 w-20">IC</div>
       <a className="text-white text-xl">Blog</a>
       <a className="text-white text-xl">Contact</a>
     </div>
     <div className="flex gap-3">
       <a href="https://www.linkedin.com/in/joelchavoya/" target="_blank">
         <Image src={linkedInLogo} alt="LinkedIn Logo" className="h-14 w-14 white-img" />
       </a>
       <a href="https://github.com/Serlych" target="_blank">
         <Image src={gitHubLogo} alt="GitHub Logo" className="h-14 w-14 white-img" />
       </a>
     </div>
   </header>
 )
}
