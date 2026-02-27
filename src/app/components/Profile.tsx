import { User, Mail, Phone, FileText, Hash } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function Profile() {
    // Mock user data
    const user = {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+91 9876543210",
        gstin: "22AAAAA0000A1Z5",
        invoiceNum: "INV-2024-001",
    };

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-[#8B4513]">User Profile</h1>
                <p className="text-muted-foreground">Manage your personal and GST information.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Personal Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="flex items-center gap-2">
                                <User className="size-4" /> Name
                            </Label>
                            <Input id="name" defaultValue={user.name} readOnly />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="flex items-center gap-2">
                                <Mail className="size-4" /> Email
                            </Label>
                            <Input id="email" type="email" defaultValue={user.email} readOnly />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="flex items-center gap-2">
                                <Phone className="size-4" /> Phone Number
                            </Label>
                            <Input id="phone" type="tel" defaultValue={user.phone} readOnly />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>GST Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="gstin" className="flex items-center gap-2">
                                <FileText className="size-4" /> GSTIN
                            </Label>
                            <Input id="gstin" defaultValue={user.gstin} readOnly />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="invoiceNum" className="flex items-center gap-2">
                                <Hash className="size-4" /> Last Invoice Number
                            </Label>
                            <Input id="invoiceNum" defaultValue={user.invoiceNum} readOnly />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button className="bg-[#8B4513] hover:bg-[#A0522D] text-white">
                    Edit Profile
                </Button>
            </div>
        </div>
    );
}
