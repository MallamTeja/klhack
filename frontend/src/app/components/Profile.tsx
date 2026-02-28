import { User, Mail, Phone, FileText, Hash, Edit2, LogOut, Check, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function Profile() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("taxflow_user");
        navigate("/login");
    };

    const [user, setUser] = useState({
        name: "ramu",
        email: "ramu@gmail.com",
        phone: "+91 9876543210",
        gstin: "22AAAAA0000A1Z5",
        invoiceNum: "INV-2024-001",
    });

    const [editingField, setEditingField] = useState<keyof typeof user | null>(null);
    const [editValue, setEditValue] = useState("");

    const handleEditStart = (field: keyof typeof user, currentValue: string) => {
        setEditingField(field);
        setEditValue(currentValue);
    };

    const handleEditSave = (field: keyof typeof user) => {
        setUser({ ...user, [field]: editValue });
        setEditingField(null);
    };

    const handleEditCancel = () => {
        setEditingField(null);
    };

    const EditableField = ({
        id,
        label,
        icon: Icon,
        value,
        type = "text"
    }: {
        id: keyof typeof user,
        label: string,
        icon: any,
        value: string,
        type?: string
    }) => {
        const isEditingThis = editingField === id;

        return (
            <div className="space-y-2">
                <Label htmlFor={id} className="flex items-center gap-2 text-muted-foreground font-medium">
                    <Icon className="size-4" /> {label}
                </Label>
                {isEditingThis ? (
                    <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-200">
                        <Input
                            id={id}
                            type={type}
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="flex-1 focus-visible:ring-[#8B4513] border-[#8B4513]/30 bg-white"
                            autoFocus
                        />
                        <Button size="icon" className="shrink-0 bg-green-600 hover:bg-green-700 text-white shadow-sm" onClick={() => handleEditSave(id)}>
                            <Check className="size-4" />
                        </Button>
                        <Button size="icon" variant="outline" className="shrink-0 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 shadow-sm bg-white" onClick={handleEditCancel}>
                            <X className="size-4" />
                        </Button>
                    </div>
                ) : (
                    <div className="group flex items-center justify-between p-3 rounded-lg border border-transparent bg-black/5 hover:bg-black/10 transition-all duration-200">
                        <span className="font-medium text-gray-900">{value}</span>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="opacity-0 group-hover:opacity-100 h-8 w-8 p-0 text-gray-500 hover:text-[#8B4513] transition-opacity duration-200"
                            onClick={() => handleEditStart(id, value)}
                        >
                            <Edit2 className="size-4" />
                        </Button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-[#8B4513]">User Profile</h1>
                <p className="text-muted-foreground">Manage your personal and GST information.</p>
            </div>

            <Card className="shadow-lg border-white/20 bg-white/80 backdrop-blur-md">
                <CardHeader>
                    <CardTitle className="text-[#8B4513]">Personal Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <EditableField id="name" label="Name" icon={User} value={user.name} />
                        <EditableField id="email" label="Email" icon={Mail} value={user.email} type="email" />
                        <EditableField id="phone" label="Phone Number" icon={Phone} value={user.phone} type="tel" />
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-lg border-white/20 bg-white/80 backdrop-blur-md">
                <CardHeader>
                    <CardTitle className="text-[#8B4513]">GST Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-6">
                        <EditableField id="gstin" label="GSTIN" icon={FileText} value={user.gstin} />
                        <EditableField id="invoiceNum" label="Invoice Number" icon={Hash} value={user.invoiceNum} />
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-between items-center mt-8">
                <Button
                    variant="outline"
                    className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 shadow-sm bg-white"
                    onClick={handleLogout}
                >
                    <LogOut className="size-4 mr-2" />
                    Logout
                </Button>
            </div>
        </div>
    );
}