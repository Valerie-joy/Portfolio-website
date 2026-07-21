import React, { useState } from 'react';
import {
  useListSkills, useCreateSkill, useUpdateSkill, useDeleteSkill, getListSkillsQueryKey,
} from '@/hooks/useSkills';
import type { Skill, SkillInput } from '@/hooks/useSkills';
import {
  useListExperience, useCreateExperience, useUpdateExperience, useDeleteExperience, getListExperienceQueryKey,
} from '@/hooks/useExperience';
import type { Experience, ExperienceInput } from '@/hooks/useExperience';
import {
  useListTestimonials, useCreateTestimonial, useUpdateTestimonial, useDeleteTestimonial, getListTestimonialsQueryKey
} from '@/hooks/useTestimonials';
import type { Testimonial, TestimonialInput } from '@/hooks/useTestimonials';
import { useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2, Calendar, MapPin, Building, Star, Link as LinkIcon, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Skills() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Skills, Experience & Testimonials</h1>
        <p className="text-muted-foreground mt-1">Manage your professional background and client feedback.</p>
      </div>

      <Tabs defaultValue="skills" className="w-full">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="skills" className="data-[state=active]:bg-background">Skills</TabsTrigger>
          <TabsTrigger value="experience" className="data-[state=active]:bg-background">Experience</TabsTrigger>
          <TabsTrigger value="testimonials" className="data-[state=active]:bg-background">Testimonials</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="skills" className="m-0 focus-visible:outline-none">
            <SkillsTab />
          </TabsContent>
          <TabsContent value="experience" className="m-0 focus-visible:outline-none">
            <ExperienceTab />
          </TabsContent>
          <TabsContent value="testimonials" className="m-0 focus-visible:outline-none">
            <TestimonialsTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

function SkillsTab() {
  const { data: skills, isLoading } = useListSkills();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const createMutation = useCreateSkill();
  const updateMutation = useUpdateSkill();
  const deleteMutation = useDeleteSkill();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [activeCategory, setActiveCategory] = useState<'Design & Creative' | 'Video Editing' | 'Social Media & Web'>('Design & Creative');

  const categories = ['Design & Creative', 'Video Editing', 'Social Media & Web'] as const;

  const handleOpenCreate = (category: 'Design & Creative' | 'Video Editing' | 'Social Media & Web') => {
    setEditingSkill(null);
    setActiveCategory(category);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setActiveCategory(skill.category as 'Design & Creative' | 'Video Editing' | 'Social Media & Web');
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      await deleteMutation.mutateAsync({ id });
      queryClient.invalidateQueries({ queryKey: getListSkillsQueryKey() });
      toast({ title: 'Skill deleted' });
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const payload: SkillInput = {
      name: formData.get('name') as string,
      category: formData.get('category') as 'Design & Creative' | 'Video Editing' | 'Social Media & Web',
      description: formData.get('description') as string,
      proficiency: parseInt(formData.get('proficiency') as string, 10),
    };

    if (editingSkill) {
      await updateMutation.mutateAsync({ id: editingSkill.id, data: payload });
      toast({ title: 'Skill updated' });
    } else {
      await createMutation.mutateAsync({ data: payload });
      toast({ title: 'Skill created' });
    }

    queryClient.invalidateQueries({ queryKey: getListSkillsQueryKey() });
    setIsModalOpen(false);
  };

  if (isLoading) return <div className="py-8 text-center text-muted-foreground">Loading skills...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {categories.map(category => {
        const categorySkills = skills?.filter(s => s.category === category) || [];
        return (
          <div key={category} className="glass-panel border-border rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">{category}</h3>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => handleOpenCreate(category)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              {categorySkills.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No skills added yet.</p>
              ) : (
                categorySkills.map(skill => (
                  <div key={skill.id} className="group relative p-3 rounded-md bg-background/50 border border-border hover:border-primary/30 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-sm">{skill.name}</h4>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="icon" variant="ghost" className="h-6 w-6 text-muted-foreground hover:text-primary" onClick={() => handleOpenEdit(skill)}>
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-6 w-6 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(skill.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{skill.description}</p>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-secondary transition-all" 
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-background border-border">
          <form onSubmit={handleSave}>
            <DialogHeader>
              <DialogTitle>{editingSkill ? 'Edit Skill' : 'Add Skill'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Skill Name</Label>
                <Input id="name" name="name" defaultValue={editingSkill?.name} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select name="category" defaultValue={editingSkill?.category || activeCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Short Description</Label>
                <Input id="description" name="description" defaultValue={editingSkill?.description} required />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="proficiency">Proficiency (%)</Label>
                </div>
                <Input id="proficiency" name="proficiency" type="number" min="1" max="100" defaultValue={editingSkill?.proficiency || 80} required />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                {editingSkill ? 'Save Changes' : 'Add Skill'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ExperienceTab() {
  const { data: experiences, isLoading } = useListExperience();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const createMutation = useCreateExperience();
  const updateMutation = useUpdateExperience();
  const deleteMutation = useDeleteExperience();

  const [editingExp, setEditingExp] = useState<Experience | null>(null);

  const handleAddNew = () => {
    setEditingExp(null);
    setTimeout(() => {
      document.getElementById('exp-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleEdit = (exp: Experience) => {
    setEditingExp(exp);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this experience entry?')) {
      await deleteMutation.mutateAsync({ id });
      if (editingExp?.id === id) setEditingExp(null);
      queryClient.invalidateQueries({ queryKey: getListExperienceQueryKey() });
      toast({ title: 'Experience deleted' });
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const payload: ExperienceInput = {
      role: formData.get('role') as string,
      company: formData.get('company') as string,
      location: formData.get('location') as string,
      startDate: formData.get('startDate') as string,
      endDate: formData.get('endDate') as string || undefined,
      type: formData.get('type') as 'Full-time' | 'Part-time' | 'Freelance' | 'Contract',
      description: formData.get('description') as string,
      featured: formData.get('featured') === 'on',
    };

    if (editingExp) {
      await updateMutation.mutateAsync({ id: editingExp.id, data: payload });
      toast({ title: 'Experience updated' });
    } else {
      await createMutation.mutateAsync({ data: payload });
      toast({ title: 'Experience added' });
    }

    queryClient.invalidateQueries({ queryKey: getListExperienceQueryKey() });
    setEditingExp(null);
  };

  if (isLoading) return <div className="py-8 text-center text-muted-foreground">Loading experience...</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* List Panel */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Timeline</h2>
          <Button onClick={handleAddNew} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" /> Add Entry
          </Button>
        </div>
        
        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/20 before:to-transparent">
          {experiences?.map((exp) => (
            <div key={exp.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/30 bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-primary">
                <Building className="h-4 w-4" />
              </div>
              <Card className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] glass-panel border-border group-hover:border-primary/50 transition-colors">
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-base text-foreground">{exp.role}</h3>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-primary" onClick={() => handleEdit(exp)}>
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(exp.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-primary mb-2">{exp.company}</div>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {exp.startDate} - {exp.endDate || 'Present'}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {exp.location}</span>
                    <Badge variant="outline" className="text-[10px] py-0 h-4">{exp.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{exp.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Editor Panel */}
      <div id="exp-form" className="glass-panel border-border rounded-lg p-6 h-fit sticky top-6">
        <h2 className="text-xl font-semibold mb-6">
          {editingExp ? 'Edit Experience' : 'Add New Experience'}
        </h2>
        
        <form onSubmit={handleSave} className="space-y-4 text-left">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role">Role Title</Label>
              <Input id="role" name="role" defaultValue={editingExp?.role} placeholder="Senior Developer" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" name="company" defaultValue={editingExp?.company} placeholder="Acme Inc." required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" name="startDate" defaultValue={editingExp?.startDate} placeholder="Jan 2020" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" name="endDate" defaultValue={editingExp?.endDate || ''} placeholder="Present or Dec 2022" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" defaultValue={editingExp?.location} placeholder="Remote / SF" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Job Type</Label>
              <Select name="type" defaultValue={editingExp?.type || 'Full-time'}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Freelance">Freelance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="exp-description">Description</Label>
            <Textarea 
              id="exp-description" 
              name="description" 
              defaultValue={editingExp?.description} 
              className="min-h-[120px]" 
              placeholder="Describe your responsibilities and achievements..."
              required 
            />
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <input 
              type="checkbox" 
              id="exp-featured" 
              name="featured" 
              className="rounded border-gray-300 text-primary focus:ring-primary"
              defaultChecked={editingExp?.featured} 
            />
            <Label htmlFor="exp-featured" className="text-sm font-normal">Highlight this experience prominently</Label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            {editingExp && (
              <Button type="button" variant="ghost" onClick={() => setEditingExp(null)}>Cancel</Button>
            )}
            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
              {editingExp ? 'Update Experience' : 'Save Experience'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function TestimonialsTab() {
  const { data: testimonials, isLoading } = useListTestimonials();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const createMutation = useCreateTestimonial();
  const updateMutation = useUpdateTestimonial();
  const deleteMutation = useDeleteTestimonial();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  const handleOpenCreate = () => {
    setEditingTestimonial(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      await deleteMutation.mutateAsync({ id });
      queryClient.invalidateQueries({ queryKey: getListTestimonialsQueryKey() });
      toast({ title: 'Testimonial deleted' });
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const payload: TestimonialInput = {
      author: formData.get('author') as string,
      company: formData.get('company') as string,
      role: formData.get('role') as string,
      content: formData.get('content') as string,
      rating: parseInt(formData.get('rating') as string, 10),
      avatarUrl: formData.get('avatarUrl') as string || undefined,
    };

    if (editingTestimonial) {
      await updateMutation.mutateAsync({ id: editingTestimonial.id, data: payload });
      toast({ title: 'Testimonial updated' });
    } else {
      await createMutation.mutateAsync({ data: payload });
      toast({ title: 'Testimonial added' });
    }

    queryClient.invalidateQueries({ queryKey: getListTestimonialsQueryKey() });
    setIsModalOpen(false);
  };

  if (isLoading) return <div className="py-8 text-center text-muted-foreground">Loading testimonials...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={handleOpenCreate}>
          <Plus className="h-4 w-4 mr-2" /> Add Testimonial
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials?.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No testimonials yet. Add your first client review!
          </div>
        ) : (
          testimonials?.map(testimonial => (
            <Card key={testimonial.id} className="glass-panel border-border relative group">
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 z-10 bg-background/80 backdrop-blur rounded p-1">
                <Button size="icon" variant="ghost" className="h-6 w-6 text-muted-foreground hover:text-primary" onClick={() => handleOpenEdit(testimonial)}>
                  <Pencil className="h-3 w-3" />
                </Button>
                <Button size="icon" variant="ghost" className="h-6 w-6 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(testimonial.id)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              <CardContent className="p-6 pt-8">
                <Quote className="h-8 w-8 text-primary/20 absolute top-6 left-6" />
                <div className="flex mb-4 relative z-10 pl-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-muted'}`} />
                  ))}
                </div>
                <p className="text-sm text-foreground/90 mb-6 italic relative z-10 pl-2">"{testimonial.content}"</p>
                <div className="flex items-center gap-3 mt-auto">
                  <Avatar className="h-10 w-10 border border-primary/20">
                    <AvatarImage src={testimonial.avatarUrl || undefined} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">{testimonial.author.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-sm">{testimonial.author}</h4>
                    <p className="text-xs text-muted-foreground">{testimonial.role} @ {testimonial.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px] bg-background border-border">
          <form onSubmit={handleSave}>
            <DialogHeader>
              <DialogTitle>{editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Client Name</Label>
                  <Input id="author" name="author" defaultValue={editingTestimonial?.author} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" name="company" defaultValue={editingTestimonial?.company} required />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" name="role" defaultValue={editingTestimonial?.role} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating (1-5)</Label>
                  <Select name="rating" defaultValue={editingTestimonial?.rating.toString() || "5"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 Stars</SelectItem>
                      <SelectItem value="4">4 Stars</SelectItem>
                      <SelectItem value="3">3 Stars</SelectItem>
                      <SelectItem value="2">2 Stars</SelectItem>
                      <SelectItem value="1">1 Star</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="avatarUrl">Avatar URL (optional)</Label>
                <Input id="avatarUrl" name="avatarUrl" defaultValue={editingTestimonial?.avatarUrl || ''} placeholder="https://..." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Testimonial Content</Label>
                <Textarea 
                  id="content" 
                  name="content" 
                  defaultValue={editingTestimonial?.content} 
                  className="min-h-[100px]" 
                  required 
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                {editingTestimonial ? 'Save Changes' : 'Add Testimonial'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
