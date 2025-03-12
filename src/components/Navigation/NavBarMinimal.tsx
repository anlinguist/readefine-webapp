import { useContext, useEffect, useRef, useState } from 'react';
import {
  IconBook,
  IconBooks,
  IconBubbleText,
  IconChevronCompactRight,
  IconCrown,
  IconForms,
  IconHome,
  IconListLetters,
  IconQuestionMark,
  IconSchool,
  IconSettings,
  IconShield,
  IconTransform,
  IconTrash,
} from '@tabler/icons-react';
import {
  Avatar,
  Stack,
  UnstyledButton,
  Menu,
  Center,
  Alert,
  Text,
  Indicator,
} from '@mantine/core';
import { openContextModal } from '@mantine/modals';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from './NavBarMinimal.module.css';
import MainLogo from '../Logo/main_logo';
import ToggleSwitch from '../Header/ToggleSwitch';
import { RDFNContext } from '../../RDFNContext';
import { useAuth } from '../../contexts/AuthContext';
import { Logout } from '../../services/logout';

const userMenuData = [
  { icon: IconBook, label: 'Personal Dictionary', path: '/personal-dictionary' },
  { icon: IconBooks, label: 'Community Dictionaries', path: '/community-dictionaries' },
  { icon: IconTransform, indicator: 'New!', label: 'Conversions', path: '/conversions' },
  { icon: IconCrown, label: 'AI', path: '/ai' },
  { icon: IconSchool, label: 'Learn', path: '/learn' },
  {
    icon: IconQuestionMark,
    label: 'About',
    path: '/about',
    submenu: [
      { icon: IconForms, label: 'Contact', path: '/about?section=contact' },
      { icon: IconBubbleText, label: 'FAQ', path: '/about?section=faq' },
      { icon: IconShield, label: 'Privacy', path: '/about?section=privacy' },
      { icon: IconListLetters, label: 'Terms', path: '/about?section=terms' },
    ],
  },
];

const guestMenuData = [
  { icon: IconHome, label: 'Home', path: '/' },
  { icon: IconSchool, label: 'Learn', path: '/learn' },
  {
    icon: IconQuestionMark,
    label: 'About',
    path: '/about',
    submenu: [
      { icon: IconForms, label: 'Contact', path: '/about?section=contact' },
      { icon: IconBubbleText, label: 'FAQ', path: '/about?section=faq' },
      { icon: IconShield, label: 'Privacy', path: '/about?section=privacy' },
      { icon: IconListLetters, label: 'Terms', path: '/about?section=terms' },
    ],
  },
];

export function NavbarMinimal() {
  const [active, setActive] = useState(0);
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // @ts-expect-error Adjust if your context is properly typed
  const { userPhoto, userName, userCount } = useContext(RDFNContext);

  const [collapsed, setCollapsed] = useState(false);
  const [isAnyMenuOpen, setIsAnyMenuOpen] = useState(false);
  const initialCollapse = useRef(false);

  // Decide which menu data to use
  const menuData = user ? userMenuData : guestMenuData;

  useEffect(() => {
    function handleResize() {
      // @ts-expect-error
      if (typeof browser !== "undefined" && browser?.runtime?.id) {
        if (!initialCollapse.current) {
          initialCollapse.current = true;
          setCollapsed(true);
        }
        return;
      }
      if (window.innerWidth < 500) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const path = location.pathname;
    const index = menuData.findIndex((link) => {
      if (path === '/' && link.path === '/') {
        return true;
      } else if (path !== '/' && link.path === '/') {
        return false;
      }
      return path.startsWith(link.path)
  });
    setActive(index);
  }, [location, menuData]);

  const handleMouseEnter = () => {
    if (window.innerWidth < 500) {
      setCollapsed(false);
    }
  };

  const handleMouseLeave = () => {
    if (!isAnyMenuOpen && window.innerWidth < 500) {
      setCollapsed(true);
    }
  };

  const handleMenuOpen = () => {
    setIsAnyMenuOpen(true);
    if (window.innerWidth < 500) {
      setCollapsed(false);
    }
  };

  const handleMenuClose = () => {
    setIsAnyMenuOpen(false);
    if (window.innerWidth < 500) {
      setCollapsed(true);
    }
  };

  const links = menuData.map((link, index) => (
    <Menu
      key={link.label}
      shadow="md"
      withArrow
      arrowPosition="center"
      withinPortal
      transitionProps={{ duration: 150 }}
      openDelay={100}
      closeDelay={100}
      position="right-start"
      offset={10}
      trigger="hover"
      zIndex={1001}
      classNames={{
        dropdown: classes.submenudd,
        itemLabel: classes.menutext,
      }}
    >
      <Menu.Target>
        <Indicator
          color="rdfnyellow.3"
          offset={7}
          autoContrast
          inline
          processing
          // @ts-expect-error
          disabled={!link.indicator}
          // @ts-expect-error
          label={link.indicator}
          size={16}
        >
          <UnstyledButton
            className={classes.link}
            data-active={index === active || undefined}
            onClick={() => navigate(link.path)}
            w="60px"
            h="60px"
            m="5px 0"
          >
            <link.icon width={30} height={30} stroke={1.5} />
          </UnstyledButton>
        </Indicator>
      </Menu.Target>

      {link.submenu ? (
        <Menu.Dropdown onMouseEnter={handleMenuOpen} onMouseLeave={handleMenuClose}>
          {link.submenu.map((item) => (
            <Menu.Item
              key={item.label}
              leftSection={<item.icon stroke={1.2} />}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      ) : (
        <Menu.Dropdown onMouseEnter={handleMenuOpen} onMouseLeave={handleMenuClose}>
          <Menu.Item
            key={link.label}
            onClick={() => navigate(link.path)}
          >
            {link.label}
          </Menu.Item>
        </Menu.Dropdown>
      )}
    </Menu>
  ));

  return (
    <nav
      className={`${classes.navbar} ${collapsed ? classes.navbarCollapsed : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={classes.indicator}>
        <IconChevronCompactRight size={16} />
      </div>

      <div className={classes.navbarContent}>
        <Stack w="calc(100% + 20px)" align="center" justify="center" gap={0}>
          <MainLogo />
        </Stack>

        <div className={classes.navbarMain}>
          <Stack justify="center" gap={0}>
            {links}
          </Stack>
        </div>

        {/* If there is a user, show the avatar and settings; otherwise, hide it */}
        {user && (
          <Stack align="center" justify="center" gap={0}>
            <ToggleSwitch />
            <Menu
              shadow="md"
              withArrow
              arrowPosition="center"
              transitionProps={{ duration: 150 }}
              openDelay={100}
              closeDelay={100}
              position="right-start"
              offset={10}
              withinPortal={true}
              trigger="hover"
              zIndex={1001}
              classNames={{
                dropdown: classes.submenuprofile,
                itemLabel: classes.menutext,
              }}
            >
              <Menu.Target>
                <Avatar src={userPhoto} alt={userName} radius="xl" size={40} />
              </Menu.Target>

              <Menu.Dropdown onMouseEnter={handleMenuOpen} onMouseLeave={handleMenuClose}>
                <Center>
                  <Avatar src={userPhoto} alt={userName} radius="50%" size={80} />
                </Center>

                <Alert ta="center" m="10px 20px" variant="light" color="rdfnyellow.6">
                  <Text size="sm">Readefine has changed</Text>
                  <Text className={classes.titlerdfncount} component="p">
                    {userCount.toLocaleString()}
                  </Text>
                  <Text size="sm">words or phrases for you.</Text>
                </Alert>

                <Menu.Label>Account</Menu.Label>
                <Menu.Item
                  onClick={() =>
                    openContextModal({
                      modal: 'settings',
                      title: 'Settings',
                      size: 'lg',
                      centered: true,
                      innerProps: {},
                    })
                  }
                  leftSection={<IconSettings />}
                >
                  Settings
                </Menu.Item>

                <Menu.Item color="red" onClick={Logout} leftSection={<IconTrash />}>
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Stack>
        )}
      </div>
    </nav>
  );
}
