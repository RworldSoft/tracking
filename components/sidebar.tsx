"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Navigation,
  Package,
  ChevronDown,
  ChevronUp,
  Users,
  FileText,
  Settings,
  Phone,
  Crown,
  X,
  ShoppingCart,
  Truck,
  MapPin,
  CreditCard,
  Route,
  Clock,
  User,
} from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface NavItem {
  icon: any;
  label: string;
  href: string;
  hasDropdown?: boolean;
  subItems?: { label: string; href: string }[];
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({
    inventory: true,
    purchase: false,
    delivery: false,
    finance: false,
    routes: false,
    user: false,
  });

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const navItems: NavItem[] = [
    { icon: BarChart3, label: "Dashboard", href: "/" },
    { icon: Navigation, label: "Live Location", href: "/live-location" },
    {
      icon: Package,
      label: "Inventory",
      href: "/inventory",
      hasDropdown: true,
      subItems: [
        { label: "Items", href: "/inventory/items" },
        { label: "Manage Store", href: "/inventory/manage-store" },
        { label: "Price Lists", href: "/inventory/price-lists" },
      ],
    },
    // { icon: Users, label: "Lead", href: "/lead" },
    {
      icon: Users,
      label: "Parties",
      href: "/parties",
      hasDropdown: true,
      subItems: [
        { label: "Customers", href: "/parties/customers" },
        { label: "Suppliers", href: "/parties/suppliers" },
      ],
    },
    {
      icon: ShoppingCart,
      label: "Purchase",
      href: "/purchase",
      hasDropdown: true,
    },
    { icon: Truck, label: "Van Sale", href: "/van-sale" },
    {
      icon: MapPin,
      label: "Delivery",
      href: "/delivery",
      hasDropdown: true,
    },
    {
      icon: CreditCard,
      label: "Finance",
      href: "/finance",
      hasDropdown: true,
    },
    {
      icon: Route,
      label: "Routes",
      href: "/routes",
      hasDropdown: true,
    },
    { icon: Clock, label: "Attendance", href: "/attendance" },
    {
      icon: User,
      label: "User",
      href: "/user",
      hasDropdown: true,
    },
    { icon: FileText, label: "Report", href: "/report" },
  ];

  return (
    <aside
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 z-50 w-56 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static flex flex-col`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-12 px-3 border-b border-gray-200">
        <div className="flex items-center gap-1.5">
          <span className="text-lg font-bold text-primary">TrackOn</span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          const menuKey = item.label.toLowerCase().replace(" ", "-");
          const isMenuOpen = openMenus[menuKey];

          return (
            <div key={item.href} className="mb-0.5">
              {item.hasDropdown ? (
                <>
                  <button
                    onClick={() => toggleMenu(menuKey)}
                    className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-sm transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <item.icon size={18} strokeWidth={2} />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {isMenuOpen ? (
                      <ChevronUp size={14} strokeWidth={2.5} />
                    ) : (
                      <ChevronDown size={14} strokeWidth={2.5} />
                    )}
                  </button>
                  {isMenuOpen && item.subItems && (
                    <div className="ml-3 mt-0.5 border-l-2 border-primary/50 pl-3 space-y-0.5">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={`block px-3 py-1.5 rounded-md text-sm transition-colors ${
                            pathname === subItem.href
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <item.icon size={18} strokeWidth={2} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-gray-200 p-3 ">
        <Link
          href="/settings"
          className={`flex items-center gap-2.5 px-3  rounded-md text-sm transition-colors ${
            pathname === "/settings"
              ? "bg-primary/10 text-primary"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          <Settings size={18} strokeWidth={2} />
          <span className="font-medium">Settings</span>
        </Link>
      </div>
    </aside>
  );
}
