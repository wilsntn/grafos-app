import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import graphLogo from '../../assets/networking.svg';
import menuIcon from '../../assets/bars-sort.svg';
import { useState } from 'react';
import { UploadIcon } from '@/components/UploadIcon';
import { PlusIcon } from '@/components/PlusIcon';
import { GraphIcon } from '@/components/GraphIcon';
import shortIcon from '../../assets/bars.svg';

type LinkItem = {
  href: string;
  isActive: boolean;
  icon: JSX.Element;
  text?: JSX.Element;
};

export default function Layout({ children }: any) {
  //setar a lógica do collapsed
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const router = useRouter();

  const links = [
    {
      href: '/createRandom',
      isActive: router.asPath === '/createRandom',
      icon: (
        <GraphIcon
        classAtributtes={`w-9 h-9 outline-none group-hover:fill-primary ${router.asPath == '/createRandom' ? 'fill-primary' : 'fill-white'}`}
      />
      ),
      text: (
        <div
          className={`${router.asPath == '/createRandom' && 'text-primary'}`}
        >
          Criar grafo aleatório
        </div>
      ),
    },
    {
      href: '/createGraph',
      isActive: router.asPath === '/createGraph',
      icon: (
        <PlusIcon
        classAtributtes={`w-9 h-9 outline-none group-hover:fill-primary ${router.asPath == '/createGraph' ? 'fill-primary' : 'fill-white'}`}
      />
      ),
      text: (
        <div className={`${router.asPath == '/createGraph' && 'text-primary'}`}>
          Criar novo grafo
        </div>
      ),
    },
    {
      href: '/importGraph',
      isActive: router.asPath === '/importGraph',
      icon: (
        <UploadIcon
        classAtributtes={`w-9 h-9 outline-none group-hover:fill-primary ${router.asPath == '/importGraph' ? 'fill-primary' : 'fill-white'}`}
      />
      ),
      text: (
        <div className={`${router.asPath == '/importGraph' && 'text-primary'}`}>
          Importar grafo
        </div>
      ),
    },
  ];

  const collapsedLinks = [
    {
      href: '/createRandom',
      isActive: router.asPath === '/createRandom',
      icon: (
        <GraphIcon
          classAtributtes={`w-9 h-9 outline-none group-hover:fill-primary ${router.asPath == '/createRandom' ? 'fill-primary' : 'fill-white'}`}
        />
      ),
    },
    {
      href: '/createGraph',
      isActive: router.asPath === '/createGraph',
      icon: (
        <PlusIcon
          classAtributtes={`w-9 h-9 outline-none group-hover:fill-primary ${router.asPath == '/createGraph' ? 'fill-primary' : 'fill-white'}`}
        />
      ),
    },
    {
      href: '/importGraph',
      isActive: router.asPath === '/importGraph',
      icon: (
        <UploadIcon
          classAtributtes={`w-9 h-9 outline-none group-hover:fill-primary ${router.asPath == '/importGraph' ? 'fill-primary' : 'fill-white'}`}
        />
      ),
    },
  ];

  function ListItem({ href, isActive, icon, text }: LinkItem) {
    const activeClass = isActive ? 'bg-[#ffffff]' : '';

    return (
      <li className='m-2 p-2' key={href}>
        <Link
          href={href}
          className={`group flex outline-none text-white p-2 ${!collapsed && 'w-12'} hover:bg-white hover:text-primary cursor-pointer items-center gap-2 rounded-2xl ${activeClass}`}       >
          {icon}
          {text}
        </Link>
      </li>
    );
  }

  return (
    <div className='w-screen min-h-screen overflow-hidden flex '>
      {collapsed === true ? (
        <aside className='w-80 min-h-screen bg-primary justify-between '>
          <div className='w-full h-[10%] flex justify-between items-center p-2'>
            <Image
              className='w-9 h-9 hover:cursor-pointer'
              src={graphLogo}
              alt='logo-grafo'
              onClick={() => router.push('/')}
            />
            <h1 className='text-white'>Grafos App</h1>
            <Image
              className='w-9 h-9 hover:cursor-pointer'
              src={menuIcon}
              alt='icone-menu'
              onClick={() => setCollapsed(!collapsed)}
            />
          </div>
          <nav className='h-[75%] mt-10'>
            <ul className='p-2'>
              {links.map((link) => (
                <ListItem
                  key={link.href}
                  href={link.href}
                  isActive={link.isActive}
                  icon={link.icon}
                  text={link.text}
                />
              ))}
            </ul>
          </nav>
          <div className='w-80 h-[14%] mt-auto flex justify-center items-center bg-secondary'></div>
        </aside>
      ) : (
        <aside className='w-28 min-h-screen bg-primary justify-between '>
          <div className='w-full h-[10%] flex justify-center items-center p-2'>
            <Image
              className='w-9 h-9 hover:cursor-pointer '
              src={shortIcon}
              alt='icone-menu'
              onClick={() => setCollapsed(!collapsed)}
            />
          </div>
          <nav className='h-[75%] mt-10'>
            <ul className='p-2'>
            {collapsedLinks.map((link) => (
                <ListItem
                  key={link.href}
                  href={link.href}
                  isActive={link.isActive}
                  icon={link.icon}
                />
              ))}
            </ul>
          </nav>
          <div className='w-full h-[14%] mt-auto flex justify-center items-center bg-primary'></div>
        </aside>
      )}
      <main>{children}</main>
    </div>
  );
}
