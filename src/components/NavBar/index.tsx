"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Button from "@/UI/Button";
import HideIcon from "../../../public/icons/HideIcon";
import DashboardIcon from "../../../public/icons/DashboardIcon";
import ShopIcon from "../../../public/icons/ShopIcon";
import CategoriesIcon from "../../../public/icons/CategoriesIcon";
import CartIcon from "../../../public/icons/CartIcon";
import OrdersIcon from "../../../public/icons/OrdersIcon";
import ClientsIcon from "../../../public/icons/ClientsIcon";
import ChevronDownIcon from "../../../public/icons/ChevronDownIcon";
import CogIcon from "../../../public/icons/CogIcon";
import SupportIcon from "../../../public/icons/SupportIcon";
import LogoutIcon from "../../../public/icons/LogoutIcon";
import LanguageSelector from "@/UI/LanguageSelector";
import LogotypeIcon from "../../../public/icons/LogotypeIcon";
import { useAuthStore } from "@/hooks/useAuthStore";
import Link from "next/link";

// Типы для навигационных элементов
interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
  children?: Omit<NavItem, "children">[];
}

const footerItems: NavItem[] = [
  {
    id: "settings",
    label: "Поддержка",
    icon: <SupportIcon />,
    path: "/support",
  },
  {
    id: "settings",
    label: "Настройки",
    icon: <CogIcon />,
    path: "/settings",
  },
  {
    id: "logout",
    label: "Выйти",
    icon: <LogoutIcon />,
    path: "/logout",
  },
];

// Данные навигации
const navItems: NavItem[] = [
  {
    id: "home",
    label: "Главная",
    icon: <DashboardIcon />,
    path: "/dashboard",
  },
  {
    id: "shop",
    label: "Магазин",
    icon: <ShopIcon />,
    children: [
      {
        id: "categories",
        label: "Категории",
        path: "/categories",
        icon: <CategoriesIcon />,
      },
      {
        id: "products",
        label: "Товары",
        path: "/products",
        icon: <CartIcon />,
      },
    ],
  },
  {
    id: "orders",
    label: "Заказы",
    icon: <OrdersIcon />,
    path: "/orders",
  },
  {
    id: "clients",
    label: "Клиенты",
    icon: <ClientsIcon />,
    path: "/clients",
  },
  {
    id: "settings",
    label: "Настройки",
    icon: <CogIcon />,
    path: "/settings",
  },
];

const NavBar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Проверяем, активен ли элемент
  const isActive = (item: NavItem): boolean => {
    if (item.path) {
      return pathname === item.path;
    }
    if (item.children) {
      return item.children.some((child) => pathname === child.path);
    }
    return false;
  };

  // Проверяем, развернут ли элемент
  const isExpanded = (itemId: string): boolean => {
    return expandedItems.includes(itemId);
  };

  // Переключаем состояние развертывания
  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Обработчик клика по элементу
  const handleItemClick = (item: NavItem) => {
    if (item.children) {
      toggleExpanded(item.id);
    }
    if (item.path) {
      router.push(item.path);
    }
    if (item.id === "logout") {
      logout();
    }
    // Здесь можно добавить навигацию, если нужно
  };

  // Обработчик клика по кнопке сворачивания
  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    // Автоматически сворачиваем все открытые подменю при сворачивании навбара
    if (!isCollapsed) {
      setExpandedItems([]);
    }
  };

  return (
    <div
      className={`${
        isCollapsed ? "min-w-[66px] w-[66px]" : "min-w-[220px] w-[220px]"
      } flex min-h-screen sticky top-0 flex-col justify-between h-full bg-surface rounded-br-[16px] rounded-tr-[16px] px-3 py-6 transition-all duration-300`}
    >
      <div
        className="absolute w-[calc((5000px)/2)] h-screen right-0 -z-1 top-0 bg-surface transition-colors duration-300"
        aria-hidden="true"
      />
      <div>
        <header className="flex justify-between items-center mb-6">
          {!isCollapsed && (
            <Link href="/dashboard">
              <h1 className="text-white flex items-center gap-2 text-[18px] font-regular hover:text-primary transition-colors duration-200"><LogotypeIcon className='w-[44px] h-[44px] text-white' /> QwikStore</h1>
            </Link>
          )}
          <Button
            variant="dark"
            className={`!p-[12px] h-[44px] w-[44px] ${isCollapsed ? "mx-auto" : ""}`}
            onClick={handleToggleCollapse}
          >
            <HideIcon
              className={`w-4 h-4 transition-transform duration-300 ${
                isCollapsed ? "rotate-180" : ""
              }`}
            />
          </Button>
        </header>

        <main className="space-y-1">
          {!isCollapsed && (
            <p className="text-muted text-[10px] font-light mb-2 ml-3">Общее</p>
          )}

          {navItems.map((item) => (
            <div key={item.id}>
              {/* Основной элемент навигации */}
              {item.id === "shop" ? (
                <>{user?.primaryShopId ? (
                  <Button
                variant={isActive(item) ? "primary" : "ghost"}
                className={`w-full justify-start !px-3 !py-[11px] ${
                  isActive(item)
                    ? "bg-primary text-white"
                    : "text-white hover:bg-white/10"
                } ${isCollapsed ? "justify-center !px-2 !py-[11px]" : ""}`}
                leftIcon={item.icon}
                rightIcon={
                  !isCollapsed && item.children ? (
                    <ChevronDownIcon
                      className={
                        isExpanded(item.id)
                          ? "scale-y-[-1] transition-all absolute right-3"
                          : "transition-all absolute right-3"
                      }
                    />
                  ) : undefined
                }
                onClick={() => handleItemClick(item)}
                title={isCollapsed ? item.label : undefined}
              >
                {!isCollapsed && item.label}
              </Button>
                ) : (
                  
                  <Button
                    variant="ghost"
                    className={`w-full justify-start !px-3 !py-[11px] ${
                isActive(item)
                  ? "bg-primary text-white"
                  : "text-white hover:bg-white/10"
              } ${isCollapsed ? "justify-center !px-2 !py-[11px]" : ""}`}
                    leftIcon={<ShopIcon />}
                    onClick={() => router.push("/dashboard?create=true")}
                  >
                    Создать магазин
                  </Button>
                )}</>
              ) : <Button
              variant={isActive(item) ? "primary" : "ghost"}
              className={`w-full justify-start !px-3 !py-[11px] ${
                isActive(item)
                  ? "bg-primary text-white"
                  : "text-white hover:bg-white/10"
              } ${isCollapsed ? "justify-center !px-2 !py-[11px]" : ""}`}
              leftIcon={item.icon}
              rightIcon={
                !isCollapsed && item.children ? (
                  <ChevronDownIcon
                    className={
                      isExpanded(item.id)
                        ? "scale-y-[-1] transition-all absolute right-3"
                        : "transition-all absolute right-3"
                    }
                  />
                ) : undefined
              }
              onClick={() => handleItemClick(item)}
              title={isCollapsed ? item.label : undefined}
            >
              {!isCollapsed && item.label}
            </Button>}
              

              {/* Выпадающий список */}
              {!isCollapsed && item.children && isExpanded(item.id) && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <Button
                      key={child.id}
                      variant={pathname === child.path ? "primary" : "ghost"}
                      className={`w-full justify-start !px-3 !py-[11px] text-sm ${
                        pathname === child.path
                          ? "bg-primary text-white"
                          : "text-white hover:bg-white/10"
                      }`}
                      leftIcon={child.icon}
                      onClick={() => {
                        // Здесь можно добавить навигацию
                        console.log(`Navigate to: ${child.path}`);
                      }}
                    >
                      {child.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </main>
      </div>

      <footer className="space-y-1">
        {!isCollapsed && (
          <p className="text-muted text-[10px] font-light mb-2 ml-3">
            Настройки
          </p>
        )}

        {!isCollapsed && <LanguageSelector />}
        {footerItems.map((item) => (
          <div key={item.id}>
            {/* Основной элемент навигации */}
            <Button
              variant={isActive(item) ? "primary" : "ghost"}
              className={`w-full justify-start !px-3 !py-[11px] ${
                isActive(item)
                  ? "bg-primary text-white"
                  : "text-white hover:bg-white/10"
              } ${isCollapsed ? "justify-center !px-2 !py-[11px]" : ""}`}
              leftIcon={item.icon}
              rightIcon={
                !isCollapsed && item.children ? (
                  <ChevronDownIcon
                    className={
                      isExpanded(item.id)
                        ? "scale-y-[-1] transition-all absolute right-3"
                        : "transition-all absolute right-3"
                    }
                  />
                ) : undefined
              }
              onClick={() => handleItemClick(item)}
              title={isCollapsed ? item.label : undefined}
            >
              {!isCollapsed && item.label}
            </Button>
          </div>
        ))}
      </footer>
    </div>
  );
};

export default NavBar;
