import React, { useRef, useState } from 'react';
import {
  useListProjects,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
  getListProjectsQueryKey
} from '@/hooks/useProjects';
import type { Project, ProjectInput } from '@/hooks/useProjects';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useQueryClient } from '@tanstack/react-query';
import { Plus, Search, Filter, MoreHorizontal, Pencil, Trash2, ExternalLink, Github, FolderKanban, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { safeHref } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const { data: projects, isLoading } = useListProjects();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject();
  const deleteMutation = useDeleteProject();

  const [imageUrl, setImageUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage, uploading } = useImageUpload();

  const handleOpenCreate = () => {
    setEditingProject(null);
    setImageUrl('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    setImageUrl(project.imageUrl || '');
    setIsModalOpen(true);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadImage(file);
      setImageUrl(url);
    } catch (err) {
      toast({ title: 'Upload failed', description: 'Could not upload the image.', variant: 'destructive' });
    } finally {
      e.target.value = '';
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteMutation.mutateAsync({ id });
      queryClient.invalidateQueries({ queryKey: getListProjectsQueryKey() });
      toast({ title: 'Project deleted' });
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const techStackStr = formData.get('techStack') as string;
    
    const payload: ProjectInput = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      category: formData.get('category') as string,
      status: formData.get('status') as 'published' | 'draft' | 'archived',
      techStack: techStackStr.split(',').map(s => s.trim()).filter(Boolean),
      imageUrl: imageUrl || undefined,
      liveUrl: formData.get('liveUrl') as string || undefined,
      githubUrl: formData.get('githubUrl') as string || undefined,
      featured: formData.get('featured') === 'on',
    };

    if (editingProject) {
      await updateMutation.mutateAsync({ id: editingProject.id, data: payload });
      toast({ title: 'Project updated' });
    } else {
      await createMutation.mutateAsync({ data: payload });
      toast({ title: 'Project created' });
    }

    queryClient.invalidateQueries({ queryKey: getListProjectsQueryKey() });
    setIsModalOpen(false);
  };

  const filteredProjects = projects?.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-sm font-medium text-primary mb-1 uppercase tracking-wider">Projects Management</p>
          <h1 className="text-3xl font-bold tracking-tight">Manage Projects</h1>
        </div>
        <Button onClick={handleOpenCreate} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" /> Add New Project
        </Button>
      </div>

      <div className="glass-panel border-border rounded-lg p-4">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search projects..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 bg-background/50"
            />
          </div>
          <Button variant="outline" className="shrink-0">
            <Filter className="h-4 w-4 mr-2" /> Filters
          </Button>
        </div>

        <div className="rounded-md border border-border overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Tech Stack</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-32 text-muted-foreground">Loading projects...</TableCell>
                </TableRow>
              ) : filteredProjects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-32 text-muted-foreground">No projects found.</TableCell>
                </TableRow>
              ) : (
                filteredProjects.map((project) => (
                  <TableRow key={project.id} className="group hover:bg-muted/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded bg-muted flex items-center justify-center overflow-hidden shrink-0">
                          {project.imageUrl ? (
                            <img src={project.imageUrl} alt={project.title} className="h-full w-full object-cover" />
                          ) : (
                            <FolderKanban className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm flex items-center gap-2">
                            {project.title}
                            {project.featured && <Badge variant="secondary" className="h-4 px-1 text-[10px]">Featured</Badge>}
                          </p>
                          <p className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">{project.description}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {project.techStack.slice(0, 3).map((tech, i) => (
                          <Badge key={i} variant="outline" className="bg-primary/5 text-primary border-primary/20 hover:bg-primary/10">{tech}</Badge>
                        ))}
                        {project.techStack.length > 3 && (
                          <Badge variant="outline" className="text-muted-foreground">+{project.techStack.length - 3}</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none">{project.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        project.status === 'published' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                        project.status === 'draft' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                        'bg-slate-500/10 text-slate-400 border-slate-500/20'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${
                          project.status === 'published' ? 'bg-emerald-400' : 
                          project.status === 'draft' ? 'bg-amber-400' : 'bg-slate-400'
                        }`} />
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                          <DropdownMenuItem onClick={() => handleOpenEdit(project)}>
                            <Pencil className="h-4 w-4 mr-2" /> Edit Project
                          </DropdownMenuItem>
                          {project.liveUrl && (
                            <DropdownMenuItem asChild>
                              <a href={safeHref(project.liveUrl)} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" /> View Live
                              </a>
                            </DropdownMenuItem>
                          )}
                          {project.githubUrl && (
                            <DropdownMenuItem asChild>
                              <a href={safeHref(project.githubUrl)} target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4 mr-2" /> View Repo
                              </a>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => handleDelete(project.id)} className="text-destructive focus:bg-destructive/10">
                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px] bg-background border-border">
          <form onSubmit={handleSave}>
            <DialogHeader>
              <DialogTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input id="title" name="title" defaultValue={editingProject?.title} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select name="category" defaultValue={editingProject?.category || 'Web'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Web">Web Development</SelectItem>
                      <SelectItem value="Mobile">Mobile App</SelectItem>
                      <SelectItem value="Design">UI/UX Design</SelectItem>
                      <SelectItem value="IoT">IoT</SelectItem>
                      <SelectItem value="Desktop">Desktop App</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" name="description" defaultValue={editingProject?.description} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="techStack">Tech Stack (comma separated)</Label>
                <Input id="techStack" name="techStack" defaultValue={editingProject?.techStack.join(', ')} placeholder="React, TypeScript, Tailwind..." required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="liveUrl">Live URL (optional)</Label>
                  <Input id="liveUrl" name="liveUrl" defaultValue={editingProject?.liveUrl || ''} placeholder="https://..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="githubUrl">GitHub URL (optional)</Label>
                  <Input id="githubUrl" name="githubUrl" defaultValue={editingProject?.githubUrl || ''} placeholder="https://github.com/..." />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image (optional)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="imageUrl"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://... or upload"
                    />
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif"
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="shrink-0"
                      disabled={uploading}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select name="status" defaultValue={editingProject?.status || 'published'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="featured" 
                  name="featured" 
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                  defaultChecked={editingProject?.featured} 
                />
                <Label htmlFor="featured" className="text-sm font-normal">Feature this project on the homepage</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                {editingProject ? 'Save Changes' : 'Create Project'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
