"use client";

import { PageHeader } from "@/components/general/PageHeader";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, User, Edit3, Save, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { updateProfile } from "firebase/auth";
import { auth, db } from "@/lib/firebase/client";
import { doc, updateDoc } from "firebase/firestore";

export default function SettingsPage() {
  const { user, userProfile, loading: authLoading } = useAuth();
  const [displayName, setDisplayName] = useState(userProfile?.displayName || "");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (userProfile) {
      setDisplayName(userProfile.displayName || "");
    }
  }, [userProfile]);

  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  }

  const handleSaveProfile = async () => {
    if (!user) {
      toast({ variant: "destructive", title: "Error", description: "You must be logged in." });
      return;
    }
    if (!displayName.trim()) {
      toast({ variant: "destructive", title: "Error", description: "Display name cannot be empty." });
      return;
    }

    setIsSaving(true);
    try {
      // Update Firebase Auth profile
      await updateProfile(user, { displayName });
      // Update Firestore document
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, { displayName });

      toast({ title: "Profile Updated", description: "Your display name has been updated." });
      setIsEditing(false);
      // AuthContext will pick up the change from onAuthStateChanged or manual refresh if needed
    } catch (error: any) {
      console.error("Profile update error:", error);
      toast({ variant: "destructive", title: "Error", description: error.message || "Failed to update profile." });
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !userProfile) {
    return (
      <div className="space-y-8">
        <PageHeader title="Settings" icon={Settings} />
        <p>Please log in to view your settings.</p>
      </div>
    );
  }


  return (
    <div className="space-y-8">
      <PageHeader
        title="User Settings"
        description="Manage your profile information and application preferences."
        icon={Settings}
      />

      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <User className="h-6 w-6 text-primary" /> Profile Information
          </CardTitle>
          <CardDescription>View and update your personal details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={userProfile.photoURL || undefined} alt={userProfile.displayName || "User"} data-ai-hint="profile avatar" />
              <AvatarFallback className="text-3xl">{getInitials(userProfile.displayName)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              {isEditing ? (
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input 
                    id="displayName" 
                    value={displayName} 
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="text-2xl font-semibold"
                  />
                </div>
              ) : (
                <h2 className="text-2xl font-semibold text-foreground">{userProfile.displayName || "Not Set"}</h2>
              )}
              <p className="text-muted-foreground">{userProfile.email}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>User ID</Label>
            <Input value={userProfile.uid} readOnly disabled className="bg-muted/50 cursor-not-allowed" />
            <p className="text-xs text-muted-foreground">This is your unique identifier within Teleflow.</p>
          </div>

        </CardContent>
        <CardFooter className="border-t pt-6 flex justify-end">
          {isEditing ? (
            <div className="space-x-2">
              <Button variant="outline" onClick={() => { setIsEditing(false); setDisplayName(userProfile.displayName || ""); }}>Cancel</Button>
              <Button onClick={handleSaveProfile} disabled={isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Placeholder for other settings sections */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Coming soon...</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Theme Customization</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Coming soon...</p>
        </CardContent>
      </Card> */}
    </div>
  );
}
