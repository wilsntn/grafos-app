import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { GraphIcon } from './Assets/GraphIcon';
import { PlusIcon } from './Assets/PlusIcon';
import { UploadIcon } from './Assets/UploadIcon';
import { Link } from 'react-router-dom';
import graphLogo from '../assets/networking.svg';
import menuIcon from '../assets/bars-sort.svg';
import shortIcon from '../assets/bars.svg';
import { useMenuState } from '../hooks/menuHook';

type LinkItem = {
  href: string;
  isActive: boolean;
  icon: JSX.Element;
  text?: JSX.Element;
};

export function SidebarMenu() {
  const { menuState, setMenuState } = useMenuState();
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    {
      href: '/createRandom',
      isActive: location.pathname === '/createRandom',
      icon: (
        <GraphIcon
          classAtributtes={`w-9 h-9 outline-none group-hover:fill-primary ${
            location.pathname == '/createRandom' ? 'fill-primary' : 'fill-white'
          }`}
        />
      ),
      text: (
        <div
          className={`${
            location.pathname == '/createRandom' && 'text-primary'
          }`}
        >
          Criar grafo aleatório
        </div>
      ),
    },
    {
      href: '/createGraph',
      isActive: location.pathname === '/createGraph',
      icon: (
        <PlusIcon
          classAtributtes={`w-9 h-9 outline-none group-hover:fill-primary ${
            location.pathname == '/createGraph' ? 'fill-primary' : 'fill-white'
          }`}
        />
      ),
      text: (
        <div
          className={`${location.pathname == '/createGraph' && 'text-primary'}`}
        >
          Criar novo grafo
        </div>
      ),
    },
    {
      href: '/importGraph',
      isActive: location.pathname === '/importGraph',
      icon: (
        <UploadIcon
          classAtributtes={`w-9 h-9 outline-none group-hover:fill-primary ${
            location.pathname == '/importGraph' ? 'fill-primary' : 'fill-white'
          }`}
        />
      ),
      text: (
        <div
          className={`${location.pathname == '/importGraph' && 'text-primary'}`}
        >
          Importar grafo
        </div>
      ),
    },
  ];

  const collapsedLinks = [
    {
      href: '/createRandom',
      isActive: location.pathname === '/createRandom',
      icon: (
        <GraphIcon
          classAtributtes={`w-9 h-9 outline-none group-hover:fill-primary ${
            location.pathname == '/createRandom' ? 'fill-primary' : 'fill-white'
          }`}
        />
      ),
    },
    {
      href: '/createGraph',
      isActive: location.pathname === '/createGraph',
      icon: (
        <PlusIcon
          classAtributtes={`w-9 h-9 outline-none group-hover:fill-primary ${
            location.pathname == '/createGraph' ? 'fill-primary' : 'fill-white'
          }`}
        />
      ),
    },
    {
      href: '/importGraph',
      isActive: location.pathname === '/importGraph',
      icon: (
        <UploadIcon
          classAtributtes={`w-9 h-9 outline-none group-hover:fill-primary ${
            location.pathname == '/importGraph' ? 'fill-primary' : 'fill-white'
          }`}
        />
      ),
    },
  ];

  function ListItem({ href, isActive, icon, text }: LinkItem) {
    const activeClass = isActive ? 'bg-[#ffffff]' : '';

    return (
      <li
        className="m-2 p-2"
        key={href}
      >
        <Link
          to={href}
          className={`group flex outline-none text-white p-2 ${
            !menuState && 'w-12'
          } hover:bg-white hover:text-primary cursor-pointer items-center gap-2 rounded-2xl ${activeClass}`}
        >
          {icon}
          {text}
        </Link>
      </li>
    );
  }

  return (
    <div className="w-screen min-h-screen overflow-hidden flex ">
      {menuState === true ? (
        <aside className="w-80 min-h-screen bg-primary justify-between xl:max-w-[20%]">
          <div className="w-full h-[10%] flex justify-between items-center p-2">
            <img
              className="w-9 h-9 hover:cursor-pointer"
              src={graphLogo}
              alt="logo-grafo"
              onClick={() => navigate('/')}
            />
            <h1 className="text-white">Grafos App</h1>
            <img
              className="w-9 h-9 hover:cursor-pointer"
              src={menuIcon}
              alt="icone-menu"
              onClick={() => setMenuState(!menuState)}
            />
          </div>
          <nav className="h-[75%] mt-10">
            <ul className="p-2">
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
          <div className="w-80 h-[14%] mt-auto flex justify-center items-center bg-primary"></div>
        </aside>
      ) : (
        <aside className="w-28 min-h-screen bg-primary justify-between ">
          <div className="w-full h-[10%] flex justify-center items-center p-2">
            <img
              className="w-9 h-9 hover:cursor-pointer "
              src={shortIcon}
              alt="icone-menu"
              onClick={() => setMenuState(!menuState)}
            />
          </div>
          <nav className="h-[75%] mt-10">
            <ul className="p-2">
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
          <div className="w-full h-[14%] mt-auto flex justify-center items-center bg-primary"></div>
        </aside>
      )}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
