import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";

const PageNav = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  if (isAuthenticated) {
    return (
      <Navbar isBordered className="w-full">
        <NavbarBrand>
          <Link href="/app" className="h-[57px] overflow-hidden">
            <img width={150} src="/images/MorvaridLogo.png" alt="Logo" />
            <p className="ms-[-3rem] font-bold text-inherit">مروارید</p>
          </Link>
          <ThemeSwitch />
        </NavbarBrand>

        <NavbarContent className="hidden gap-8 sm:flex" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/app/posts">
              لیست آگهی ها
            </Link>
          </NavbarItem>

          <NavbarItem>
            <Link color="foreground" href="/app/add-post">
              آگهی جدید
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/app/my-posts">
              آگهی های من
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <Button onClick={handleLogout} color="danger" variant="bordered">
              خروج از حساب کاربری
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    );
  }

  return (
    <Navbar className=" w-full">
      <NavbarBrand>
        <Link href="/app" className="h-[57px] overflow-hidden">
          <img width={150} src="/images/MorvaridLogo.png" alt="Logo" />
          <p className="ms-[-3rem] font-bold text-inherit">مروارید</p>
        </Link>
        <ThemeSwitch />
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/login">ورود</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/signup" variant="flat">
            ثبت نام
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default PageNav;
