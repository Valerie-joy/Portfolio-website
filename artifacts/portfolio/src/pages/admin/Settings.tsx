import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Settings() {
  const { toast } = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings Saved",
      description: "Your profile information has been updated successfully.",
    });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your personal information and portfolio settings.</p>
      </div>

      <form onSubmit={handleSave}>
        <div className="space-y-6">
          <Card className="glass-panel border-border">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                This information will be displayed publicly on your portfolio.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24 border-2 border-primary/20">
                  <AvatarImage src="/headshot.png" />
                  <AvatarFallback className="text-2xl">VI</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button type="button" variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" /> Change Avatar
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Recommended: Square JPG, PNG, or GIF, at least 400x400px.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="Valerie Joy Intong" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Professional Title</Label>
                  <Input id="title" defaultValue="Graphic Designer / Social Media Manager" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Short Bio</Label>
                <Textarea
                  id="bio"
                  className="min-h-[100px]"
                  defaultValue="Passionate working-student graphic designer with 5 years of hands-on experience in graphic design and social media strategy. Dedicated to helping brands grow through high-quality visual content and effective audience engagement."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Public Email</Label>
                  <Input id="email" type="email" defaultValue="bethanyivalerie@gmail.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input id="phone" type="tel" defaultValue="+63 912 437 0402" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" defaultValue="Pagadian City, Zamboanga del Sur, Philippines" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="available">Availability</Label>
                  <div className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                    <span>Available for freelance work</span>
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/10 border-t border-border px-6 py-4">
              <Button type="submit" className="ml-auto">
                <Save className="h-4 w-4 mr-2" /> Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card className="glass-panel border-border">
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
              <CardDescription>
                Connect your social profiles to your portfolio.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input id="instagram" defaultValue="https://www.instagram.com/_valewie05/" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-social">Email</Label>
                <Input id="email-social" defaultValue="mailto:bethanyivalerie@gmail.com" />
              </div>
            </CardContent>
            <CardFooter className="bg-muted/10 border-t border-border px-6 py-4">
              <Button type="submit" className="ml-auto">
                <Save className="h-4 w-4 mr-2" /> Save Links
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
}
