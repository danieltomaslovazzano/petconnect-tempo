import React from "react";
import { Button } from "./ui/button";
import { MapIcon, Search, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import UserMenu from "./auth/UserMenu";
import LoginDialog from "./auth/LoginDialog";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Input } from "./ui/input";

interface HeaderProps {
  activeView?: "lost" | "found" | "adoptions";
  onViewChange?: (view: "lost" | "found" | "adoptions") => void;
  onMapViewToggle?: () => void;
  isMapView?: boolean;
  onSearch?: (query: string) => void;
}

const Header = ({
  activeView = "lost",
  onViewChange = () => {},
  onMapViewToggle = () => {},
  isMapView = false,
  onSearch = () => {},
}: HeaderProps) => {
  const { user } = useAuth();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  return (
    <header className="w-full h-[72px] px-6 bg-white border-b border-gray-200 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <h1 className="text-2xl font-bold text-primary">PetConnect</h1>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={activeView === "lost" ? "bg-secondary" : ""}
                onClick={() => onViewChange("lost")}
              >
                Lost Pets
              </NavigationMenuTrigger>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={activeView === "found" ? "bg-secondary" : ""}
                onClick={() => onViewChange("found")}
              >
                Found Pets
              </NavigationMenuTrigger>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={activeView === "adoptions" ? "bg-secondary" : ""}
                onClick={() => onViewChange("adoptions")}
              >
                Adoptions
              </NavigationMenuTrigger>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            className="pl-10"
            placeholder="Search pets..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={isMapView ? "secondary" : "outline"}
            size="icon"
            onClick={onMapViewToggle}
          >
            <MapIcon className="h-4 w-4" />
          </Button>

          {user ? (
            <UserMenu />
          ) : (
            <Button variant="default" onClick={() => setShowLoginDialog(true)}>
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
          )}
        </div>

        <LoginDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} />
      </div>
    </header>
  );
};

export default Header;
