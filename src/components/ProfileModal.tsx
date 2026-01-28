import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, Phone, MapPin, LogOut, Edit2, Save, X } from "lucide-react";

interface ProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProfileModal = ({ open, onOpenChange }: ProfileModalProps) => {
  const { userName, userType, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock user data - in real app would come from backend
  const [userData, setUserData] = useState({
    name: userName || "Usuário",
    email: "usuario@email.com",
    phone: "(11) 99999-9999",
    city: "São Paulo",
    state: "SP",
  });

  const [editData, setEditData] = useState(userData);

  const handleSave = () => {
    setUserData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(userData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    onOpenChange(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Meu Perfil</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-4">
          {/* Avatar */}
          <Avatar className="w-20 h-20">
            <AvatarFallback className="bg-accent text-accent-foreground text-xl font-bold">
              {getInitials(userData.name)}
            </AvatarFallback>
          </Avatar>

          {/* User Type Badge */}
          <span className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent font-medium">
            {userType === "designer" ? "Projetista" : "Cliente"}
          </span>
        </div>

        {/* Profile Fields */}
        <div className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-muted-foreground">
              <User className="w-4 h-4" />
              Nome
            </Label>
            {isEditing ? (
              <Input
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              />
            ) : (
              <p className="text-foreground font-medium pl-6">{userData.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-muted-foreground">
              <Mail className="w-4 h-4" />
              E-mail
            </Label>
            {isEditing ? (
              <Input
                type="email"
                value={editData.email}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
              />
            ) : (
              <p className="text-foreground font-medium pl-6">{userData.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-muted-foreground">
              <Phone className="w-4 h-4" />
              Telefone
            </Label>
            {isEditing ? (
              <Input
                value={editData.phone}
                onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
              />
            ) : (
              <p className="text-foreground font-medium pl-6">{userData.phone}</p>
            )}
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              Localização
            </Label>
            {isEditing ? (
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Cidade"
                  value={editData.city}
                  onChange={(e) => setEditData({ ...editData, city: e.target.value })}
                />
                <Input
                  placeholder="Estado"
                  value={editData.state}
                  onChange={(e) => setEditData({ ...editData, state: e.target.value })}
                />
              </div>
            ) : (
              <p className="text-foreground font-medium pl-6">
                {userData.city}, {userData.state}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 mt-6">
          {isEditing ? (
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleCancel}
              >
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
              <Button
                variant="accent"
                className="flex-1"
                onClick={handleSave}
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Editar Perfil
            </Button>
          )}

          <Button
            variant="ghost"
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair da Conta
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
