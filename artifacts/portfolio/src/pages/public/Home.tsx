import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion, type Variants } from 'framer-motion';
import { useListSkills } from '@/hooks/useSkills';
import { useListExperience } from '@/hooks/useExperience';
import { useListTestimonials } from '@/hooks/useTestimonials';
import { useSubmitContact } from '@/hooks/useMessages';
import {
  Instagram,
  Mail,
  MapPin,
  Phone,
  Palette,
  Layout,
  Video,
  Sparkles,
  Image as ImageIcon,
  Send,
  Star,
  Quote
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ProjectsShowcase } from '@/components/portfolio/ProjectsShowcase';

const ROLES = ['Graphic Designer', 'Social Media Manager', 'Video Editor'];

function RotatingRole() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % ROLES.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <h2 className="text-2xl md:text-3xl text-foreground/80 font-medium relative h-9 md:h-10">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[index]}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="absolute inset-0 flex items-center md:justify-start"
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </h2>
  );
}

export default function Home() {
  const { data: skills } = useListSkills();
  const { data: experiences } = useListExperience();
  const { data: testimonials } = useListTestimonials();
  const submitContact = useSubmitContact();
  const { toast } = useToast();

  const [isScrolled, setIsScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      await submitContact.mutateAsync({
        data: {
          name: formData.get('name') as string,
          email: formData.get('email') as string,
          projectType: formData.get('projectType') as string || undefined,
          budget: formData.get('budget') as string || undefined,
          message: formData.get('message') as string,
        }
      });
      toast({ title: 'Message sent!', description: "I'll get back to you as soon as possible." });
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to send message.', variant: 'destructive' });
    }
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans">
      {/* 1. Navbar */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-tighter flex items-center gap-2">
            <img src="/logo.jpg" alt="Valerie Joy Intong logo" className="w-8 h-8 rounded-full object-cover" />
            Valerie<span className="text-primary">.</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="text-foreground/80 hover:text-primary transition-colors">About</a>
            <a href="#skills" onClick={(e) => handleNavClick(e, 'skills')} className="text-foreground/80 hover:text-primary transition-colors">Skills</a>
            <a href="#experience" onClick={(e) => handleNavClick(e, 'experience')} className="text-foreground/80 hover:text-primary transition-colors">Experience</a>
            <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className="text-foreground/80 hover:text-primary transition-colors">Projects</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="text-foreground/80 hover:text-primary transition-colors">Contact</a>
          </nav>

          <Button asChild variant="default" className="hidden md:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] transition-shadow">
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Hire Me</a>
          </Button>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section id="hero" className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden" animate="visible" variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Available for freelance work
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Valerie Joy Intong</span>
              </motion.h1>

              <motion.div variants={fadeInUp} className="space-y-4">
                <RotatingRole />
                <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                  Graphic designer specializing in branding, social media, AI-powered visuals, e-commerce content, and high-converting creative assets.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 pt-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(139,92,246,0.4)] px-8" asChild>
                  <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')}>View Work</a>
                </Button>
                <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/10 px-8" asChild>
                  <a href="/my-resume-intong.pdf" download>Download CV</a>
                </Button>
              </motion.div>

              <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-lg">
                <div>
                  <p className="text-3xl font-bold text-foreground">5+</p>
                  <p className="text-xs text-muted-foreground mt-1">Years Experience</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">13+</p>
                  <p className="text-xs text-muted-foreground mt-1">Brands Served</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">8+</p>
                  <p className="text-xs text-muted-foreground mt-1">Design Tools</p>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-96 h-96 mx-auto">
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary/30 blur-[2px]"
                  animate={reduceMotion ? undefined : { rotate: 360 }}
                  transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-4 rounded-full border border-secondary/30"
                  initial={{ rotate: 45 }}
                  animate={reduceMotion ? { rotate: 45 } : { rotate: -315 }}
                  transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-8 rounded-full overflow-hidden border-2 border-primary shadow-[0_0_30px_rgba(139,92,246,0.3)]"
                  animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <img src="/headshot.webp" alt="Valerie Joy Intong" width={768} height={768} fetchPriority="high" className="w-full h-full object-cover" />
                </motion.div>

                {/* Floating design card */}
                <motion.div
                  className="absolute -bottom-6 -left-12 glass-panel p-4 rounded-xl shadow-2xl"
                  animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Palette className="w-4 h-4 text-primary" />
                    <span className="text-xs font-semibold text-foreground/90">Design Toolkit</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-w-[180px]">
                    {['Canva', 'Premiere Pro', 'CapCut', 'WordPress'].map((tool) => (
                      <span key={tool} className="text-[10px] font-medium px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">
                        {tool}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. About Section */}
      <section id="about" className="py-24 relative">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Who I Am</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="md:col-span-5 glass-panel rounded-2xl p-8 border-border flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <Quote className="h-10 w-10 text-primary/20 mb-6" />
                <p className="text-lg leading-relaxed text-foreground/90 mb-8">
                  Passionate working-student graphic designer with 5 years of hands-on experience in graphic design and social media strategy. I'm dedicated to helping brands grow through high-quality visual content, on-brand reels, and effective audience engagement — currently studying Computer Science at Saint Columban College.
                </p>
                <div className="flex gap-4">
                  <a href="https://www.instagram.com/_valewie05/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-foreground hover:bg-primary/20 hover:text-primary transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="mailto:bethanyivalerie@gmail.com" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-foreground hover:bg-primary/20 hover:text-primary transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>

            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: <Palette className="w-6 h-6 text-primary" />, title: 'Branding & Identity', desc: 'Logos, color systems, and visual identities that make brands instantly recognizable.' },
                { icon: <Instagram className="w-6 h-6 text-primary" />, title: 'Social Media Management', desc: 'Content calendars, graphics, and captions across Instagram, Facebook, and Meta Business Suite.' },
                { icon: <Video className="w-6 h-6 text-primary" />, title: 'Reel & Video Editing', desc: 'Short-form reels and promotional videos edited in Premiere Pro and CapCut.' },
                { icon: <Layout className="w-6 h-6 text-primary" />, title: 'Web & WordPress Design', desc: 'Clean, on-brand website builds and edits using WordPress and Wix.' },
                { icon: <Sparkles className="w-6 h-6 text-primary" />, title: 'AI-Assisted Design', desc: 'Prompt engineering and AI tools to speed up ideation and content production.' },
                { icon: <ImageIcon className="w-6 h-6 text-primary" />, title: 'Print & Digital Layout', desc: 'Flyers, menus, and digital assets crafted in Canva and Adobe tools.' },
              ].map((cap, i) => (
                <motion.div 
                  key={i}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { delay: i * 0.1 } }
                  }}
                  className="glass-panel p-6 rounded-2xl border-border hover:border-primary/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    {cap.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{cap.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{cap.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Skills Section */}
      <section id="skills" className="py-24 bg-background/50 relative border-y border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Technical Expertise</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {['Design & Creative', 'Video Editing', 'Social Media & Web'].map((category, idx) => (
              <motion.div 
                key={category}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { delay: idx * 0.2 } }
                }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-semibold tracking-tight text-foreground/90 border-b border-white/10 pb-4">
                  {category}
                </h3>
                <div className="space-y-6">
                  {skills?.filter(s => s.category === category).map((skill) => (
                    <div key={skill.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm text-foreground/80">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">{skill.proficiency}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className="h-full bg-gradient-to-r from-primary to-secondary relative"
                        >
                          <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/30 blur-[2px]" />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                  {(!skills || skills.filter(s => s.category === category).length === 0) && (
                    <p className="text-muted-foreground text-sm italic">Expertise building...</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Experience Section */}
      <section id="experience" className="py-24 relative">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Career Timeline</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
          </motion.div>

          <div className="space-y-12 border-l-2 border-primary/20 pl-8 ml-4 md:ml-0 md:border-l-0 md:pl-0 md:relative md:before:absolute md:before:inset-y-0 md:before:left-1/2 md:before:-translate-x-px md:before:w-[2px] md:before:bg-primary/20">
            {experiences?.map((exp, idx) => (
              <motion.div 
                key={exp.id}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { delay: 0.1 } }
                }}
                className={`relative md:w-1/2 ${idx % 2 === 0 ? 'md:pr-12 md:ml-0 md:text-right' : 'md:pl-12 md:ml-auto'}`}
              >
                {/* Timeline Dot */}
                <div className="absolute top-0 -left-10 md:left-auto md:top-6 w-4 h-4 rounded-full bg-background border-2 border-primary shadow-[0_0_10px_rgba(139,92,246,0.5)] z-10
                  md:-translate-x-1/2 md:left-1/2"
                />
                
                <div className={`glass-panel p-6 rounded-2xl border-border hover:border-primary/40 transition-colors ${exp.featured ? 'shadow-[0_0_20px_rgba(139,92,246,0.1)]' : ''}`}>
                  <div className={`flex flex-col ${idx % 2 === 0 ? 'md:items-end' : 'md:items-start'} mb-4`}>
                    <Badge variant="outline" className="mb-3 bg-primary/5 text-primary border-primary/20 w-fit">{exp.startDate} - {exp.endDate || 'Present'}</Badge>
                    <h3 className="text-xl font-bold">{exp.role}</h3>
                    <h4 className="text-lg text-foreground/70 font-medium">{exp.company}</h4>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{exp.description}</p>
                  <div className={`flex flex-wrap gap-2 ${idx % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                    <Badge variant="secondary" className="bg-white/5">{exp.type}</Badge>
                    <Badge variant="secondary" className="bg-white/5 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {exp.location}
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Projects — work collections, process flow and certifications */}
      <ProjectsShowcase />

      {/* 7. Testimonials */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">What Clients Say</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials?.map((testimonial, idx) => (
              <motion.div
                key={testimonial.id}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1, transition: { delay: idx * 0.1 } }
                }}
                className="glass-panel p-8 rounded-2xl border-border relative"
              >
                <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/10" />
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'fill-primary text-primary' : 'text-white/20'}`} />
                  ))}
                </div>
                <p className="text-foreground/80 leading-relaxed mb-8 relative z-10 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <Avatar className="w-12 h-12 border-2 border-primary/20">
                    <AvatarImage src={testimonial.avatarUrl || undefined} />
                    <AvatarFallback className="bg-primary/20 text-primary font-bold">
                      {testimonial.author.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-sm">{testimonial.author}</h4>
                    <p className="text-xs text-muted-foreground">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Contact Section */}
      <section id="contact" className="py-24 bg-background/80 relative border-t border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Let's work together.</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-8" />
                <p className="text-lg text-muted-foreground max-w-md">
                  I'm currently available for freelance projects. Whether you have a specific project in mind or just want to say hi, my inbox is always open.
                </p>
              </div>

              <div className="space-y-6 pt-8">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary group-hover:border-primary/30 transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <a href="mailto:bethanyivalerie@gmail.com" className="text-lg font-medium hover:text-primary transition-colors">bethanyivalerie@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary group-hover:border-primary/30 transition-all">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Location</p>
                    <p className="text-lg font-medium">Pagadian City, Zamboanga del Sur, Philippines (Remote)</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary group-hover:border-primary/30 transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    <p className="text-lg font-medium">+63 912 437 0402</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            >
              <form onSubmit={handleContactSubmit} className="glass-panel p-8 rounded-2xl border-border space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" name="name" placeholder="John Doe" required className="bg-background/50 border-white/10 focus:border-primary/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Your Email</Label>
                    <Input id="email" name="email" type="email" placeholder="john@example.com" required className="bg-background/50 border-white/10 focus:border-primary/50" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="projectType">Project Type</Label>
                    <Select name="projectType">
                      <SelectTrigger className="bg-background/50 border-white/10 focus:border-primary/50">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Website">Website</SelectItem>
                        <SelectItem value="Web App">Web App</SelectItem>
                        <SelectItem value="Mobile App">Mobile App</SelectItem>
                        <SelectItem value="Design">UI/UX Design</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget (Optional)</Label>
                    <Select name="budget">
                      <SelectTrigger className="bg-background/50 border-white/10 focus:border-primary/50">
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="<$5k">&lt; $5,000</SelectItem>
                        <SelectItem value="$5k-$10k">$5,000 - $10,000</SelectItem>
                        <SelectItem value="$10k-$25k">$10,000 - $25,000</SelectItem>
                        <SelectItem value=">$25k">&gt; $25,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    placeholder="Tell me about your project..." 
                    required 
                    className="min-h-[150px] bg-background/50 border-white/10 focus:border-primary/50" 
                  />
                </div>

                <Button type="submit" disabled={submitContact.isPending} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(139,92,246,0.3)] h-12 text-lg">
                  {submitContact.isPending ? 'Sending...' : (
                    <>Send Message <Send className="w-4 h-4 ml-2" /></>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="py-8 bg-black border-t border-white/5 text-center">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Valerie Joy Intong. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/_valewie05/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="mailto:bethanyivalerie@gmail.com" className="text-muted-foreground hover:text-white transition-colors">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
