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

export default function Layout({ children }: any) {
  //setar a lógica do collapsed
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const router = useRouter();
  return (
    <div className="w-screen min-h-screen overflow-hidden flex ">
      {collapsed === true ? (
        <aside className="w-80 min-h-screen bg-primary justify-between ">
          <div className="w-full h-[10%] flex justify-between items-center p-2">
            <Image
              className="w-9 h-9 hover:cursor-pointer"
              src={graphLogo}
              alt="logo-grafo"
              onClick={() => router.push('/')}
            />
            <h1 className="text-white">Nome do software</h1>
            <Image
              className="w-9 h-9 hover:cursor-pointer"
              src={menuIcon}
              alt="icone-menu"
              onClick={() => setCollapsed(!collapsed)}
            />
          </div>
          <nav className="h-[75%] mt-10">
            <ul className="p-2">
              <li
                className="m-2 p-2"
                key="createRandomGraph"
              >
                <Link
                  href="/createRandom"
                  className={`group flex text-white p-2 hover:bg-white hover:text-primary cursor-pointer items-center gap-4 rounded-2xl 
                ${
                  router.asPath === '/createRandom' &&
                  'bg-[#ffffff] text-[#444444]'
                }`}
                >
                  <GraphIcon
                    classAtributtes={`w-9 h-9 fill-white group-hover:fill-primary ${
                      router.asPath === '/createRandom' && 'fill-[#444444]'
                    }`}
                  />
                  Criar grafo aleatório
                </Link>
              </li>
              <li
                className="m-2 p-2"
                key="createGraph"
              >
                <Link
                  href="/createGraph"
                  className={`group flex text-white p-2 hover:bg-white hover:text-primary cursor-pointer items-center gap-4 rounded-2xl ${
                    router.asPath === '/createGraph' &&
                    'bg-[#ffffff] text-[#444444]'
                  }`}
                >
                  <PlusIcon
                    classAtributtes={`w-9 h-9 fill-white group-hover:fill-primary ${
                      router.asPath === '/createGraph' && 'fill-[#444444]'
                    }`}
                  />
                  Criar novo grafo
                </Link>
              </li>
              <li
                className="m-2 p-2"
                key="uploadGraph"
              >
                <Link
                  href="/importGraph"
                  className={`group flex text-white p-2 hover:bg-white hover:text-primary cursor-pointer items-center gap-4 rounded-2xl ${
                    router.asPath === '/importGraph' &&
                    'bg-[#ffffff] text-[#444444]'
                  }`}
                >
                  <UploadIcon
                    classAtributtes={`w-9 h-9 fill-white group-hover:fill-primary ${
                      router.asPath === '/importGraph' && 'fill-[#444444]'
                    }`}
                  />
                  Importar grafo
                </Link>
              </li>
            </ul>
          </nav>
          <div className="w-80 h-[14%] mt-auto flex justify-center items-center bg-secondary"></div>
        </aside>
      ) : (
        <aside className="w-28 min-h-screen bg-primary justify-between ">
          <div className="w-full h-[10%] flex justify-center items-center p-2">
            <Image
              className="w-9 h-9 hover:cursor-pointer "
              src={shortIcon}
              alt="icone-menu"
              onClick={() => setCollapsed(!collapsed)}
            />
          </div>
          <nav className="h-[75%] mt-10">
            <ul className="p-2">
              <li
                className="m-2 p-2 flex items-center justify-center"
                key="createRandomGraph"
              >
                <Link
                  href="/createRandom"
                  className={`group flex text-white p-2 hover:bg-white hover:text-primary cursor-pointer items-center rounded-2xl ${
                    router.asPath === '/createRandom' && 'bg-[#ffffff]'
                  }`}
                >
                  <GraphIcon
                    classAtributtes={`w-9 h-9 fill-white group-hover:fill-primary ${
                      router.asPath === '/createRandom' && 'fill-[#444444]'
                    }`}
                  />
                </Link>
              </li>
              <li
                className="m-2 p-2 flex items-center justify-center"
                key="createGraph"
              >
                <Link
                  href="/createGraph"
                  className={`group flex text-white p-2 hover:bg-white hover:text-primary cursor-pointer items-center rounded-2xl ${
                    router.asPath === '/createGraph' && 'bg-[#ffffff]'
                  }`}
                >
                  <PlusIcon
                    classAtributtes={`w-9 h-9 fill-white group-hover:fill-primary ${
                      router.asPath === '/createGraph' && 'fill-[#444444]'
                    }`}
                  />
                </Link>
              </li>
              <li
                className="m-2 p-2 flex items-center justify-center"
                key="uploadGraph"
              >
                <Link
                  href="/importGraph"
                  className={`group flex text-white p-2 hover:bg-white hover:text-primary cursor-pointer items-center rounded-2xl ${
                    router.asPath === '/importGraph' &&
                    'bg-[#ffffff]'
                  }`}
                >
                  <UploadIcon
                    classAtributtes={`w-9 h-9 fill-white group-hover:fill-primary ${
                      router.asPath === '/importGraph' && 'fill-[#444444]'
                    }`}
                  />
                </Link>
              </li>
            </ul>
          </nav>
          <div className="w-full h-[14%] mt-auto flex justify-center items-center bg-primary"></div>
        </aside>
      )}
      <main>{children}</main>
    </div>
  );
}
