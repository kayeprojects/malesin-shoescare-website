import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ShirtIcon, 
  LayoutDashboard, 
  Package, 
  Wrench, 
  TruckIcon, 
  CreditCard, 
  BarChart3,
  Bell,
  LogOut,
  Menu,
  X,
  Loader2,
  ChevronDown,
  ChevronRight,
  Settings,
  ClipboardList,
  PackageCheck,
  PackagePlus
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface MenuItem {
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

interface MenuGroup {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  items: MenuItem[];
}

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["orders", "admin"]);

  // Single menu items (no group)
  const singleItems: MenuItem[] = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  ];

  // Grouped menu items with dropdowns
  const menuGroups: MenuGroup[] = [
    {
      id: "orders",
      label: "Orders",
      icon: Package,
      items: [
        { path: "/dashboard/orders", icon: ClipboardList, label: "Semua Order" },
        { path: "/dashboard/order", icon: PackagePlus, label: "Buat Order Baru" },
      ]
    },
    {
      id: "admin",
      label: "Admin",
      icon: Settings,
      items: [
        { path: "/dashboard/services", icon: Wrench, label: "Kelola Layanan" },
        { path: "/dashboard/payment", icon: CreditCard, label: "Transaksi" },
        { path: "/dashboard/reports", icon: BarChart3, label: "Laporan" },
      ]
    },
    {
      id: "kurir",
      label: "Kurir",
      icon: TruckIcon,
      items: [
        { path: "/dashboard/kurir", icon: TruckIcon, label: "Pickup & Delivery" },
      ]
    },
    {
      id: "workshop",
      label: "Workshop",
      icon: Wrench,
      items: [
        { path: "/dashboard/workshop", icon: PackageCheck, label: "Proses & QC" },
      ]
    },
  ];

  const isActive = (path: string) => {
    // Exact match for dashboard index
    if (path === "/dashboard") {
      return location.pathname === path;
    }
    // Exact match for all other routes to prevent /order and /orders both highlighting
    return location.pathname === path;
  };

  const isGroupActive = (group: MenuGroup) => {
    return group.items.some(item => isActive(item.path));
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b fixed top-0 left-0 right-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <Link to="/" className="flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <ShirtIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">CleanStride</h1>
                  <p className="text-xs text-gray-500">Admin Panel</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Notifikasi</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={async () => {
                  await logout();
                  navigate("/login");
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <LogOut className="h-4 w-4 mr-2" />
                )}
                <span className="hidden sm:inline">{user?.name || 'Logout'}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside 
          className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white/80 backdrop-blur-md border-r shadow-lg transition-transform duration-300 z-30 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } w-64 overflow-y-auto`}
        >
          <nav className="p-4 space-y-1">
            {/* Single Items */}
            {singleItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    active
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}

            {/* Grouped Items */}
            {menuGroups.map((group) => {
              const GroupIcon = group.icon;
              const isExpanded = expandedGroups.includes(group.id);
              const groupActive = isGroupActive(group);
              
              return (
                <div key={group.id} className="space-y-1">
                  <button
                    onClick={() => toggleGroup(group.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                      groupActive && !isExpanded
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <GroupIcon className="h-5 w-5" />
                      <span className="font-medium">{group.label}</span>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  
                  {isExpanded && (
                    <div className="ml-4 space-y-1">
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);
                        
                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                              active
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            <span className="text-sm">{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main 
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? 'lg:ml-64' : 'ml-0'
          }`}
        >
          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
