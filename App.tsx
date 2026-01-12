
import React, { useState, useEffect } from 'react';
import { Section, Service, BlogPost, GalleryImage } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import { 
  SITE_NAME, 
  OWNER_NAME, 
  SERVICES as INITIAL_SERVICES, 
  BLOG_POSTS as INITIAL_BLOG, 
  GALLERY as INITIAL_GALLERY 
} from './constants';
import { 
  Mail, MapPin, Phone, 
  ChevronRight, Trash2, Edit2, ImageIcon, 
  FileText, Briefcase, Lock, Settings, ArrowLeft, Image as LucideImage, Check
} from 'lucide-react';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<Section>('accueil');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminSubSection, setAdminSubSection] = useState<'menu' | 'services' | 'blog' | 'gallery' | 'security' | 'config'>('menu');

  const [storedPassword, setStoredPassword] = useState<string>(() => localStorage.getItem('herbier_admin_pwd') || 'admin123');
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('herbier_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('herbier_blog');
    return saved ? JSON.parse(saved) : INITIAL_BLOG;
  });
  const [gallery, setGallery] = useState<GalleryImage[]>(() => {
    const saved = localStorage.getItem('herbier_gallery');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });
  const [sitePhotos, setSitePhotos] = useState(() => {
    const saved = localStorage.getItem('herbier_site_photos');
    return saved ? JSON.parse(saved) : {
      hero: "https://images.unsplash.com/photo-1515202913167-d9a698095ebf?auto=format&fit=crop&w=1200&q=95",
      about: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=95"
    };
  });

  useEffect(() => { localStorage.setItem('herbier_services', JSON.stringify(services)); }, [services]);
  useEffect(() => { localStorage.setItem('herbier_blog', JSON.stringify(blogPosts)); }, [blogPosts]);
  useEffect(() => { localStorage.setItem('herbier_gallery', JSON.stringify(gallery)); }, [gallery]);
  useEffect(() => { localStorage.setItem('herbier_site_photos', JSON.stringify(sitePhotos)); }, [sitePhotos]);
  useEffect(() => { localStorage.setItem('herbier_admin_pwd', storedPassword); }, [storedPassword]);

  const [editingItem, setEditingItem] = useState<any>(null);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === storedPassword) { 
      setIsAdminLoggedIn(true);
      setAdminSubSection('menu');
      setPasswordInput('');
    } else {
      alert('Code erroné.');
    }
  };

  const handleSectionChange = (s: Section) => {
    setCurrentSection(s);
    setSelectedPost(null);
    setEditingItem(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <div className="mb-16 md:mb-20 text-center animate-reveal px-4 max-w-4xl mx-auto flex flex-col items-center">
      <h2 className="text-5xl md:text-7xl lg:text-[8rem] font-serif italic text-white mb-6 leading-tight lg:leading-none">{title}</h2>
      {subtitle && <p className="text-[#E1AEE1] tracking-[0.3em] md:tracking-[0.5em] uppercase text-[10px] md:text-xs font-extrabold">{subtitle}</p>}
      <div className="mt-8 md:mt-12 w-24 md:w-32 h-[1px] bg-white/20"></div>
    </div>
  );

  const renderSection = () => {
    switch (currentSection) {
      case 'accueil':
        return (
          <div className="animate-reveal">
            <section className="relative min-h-[90vh] flex items-center justify-center px-6">
              <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center py-12 md:py-20">
                <div className="animate-reveal text-center lg:text-left order-2 lg:order-1 flex flex-col items-center lg:items-start">
                  <span className="text-[#E1AEE1] tracking-[0.6em] uppercase text-[10px] font-black mb-8 md:mb-12 block">Herboristerie Vosgienne</span>
                  <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-serif italic leading-[0.9] lg:leading-[0.85] text-white mb-10 md:mb-14">
                    L'herbier <br/><span className="text-[#E1AEE1]">du temps.</span>
                  </h2>
                  <p className="text-white/80 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed mb-12 md:mb-20 font-light italic px-4 md:px-0">
                    Un voyage sensoriel au rythme des plantes, pour redécouvrir la sagesse millénaire du végétal au cœur de nos montagnes.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-6 md:gap-8 items-center w-full">
                    <button onClick={() => handleSectionChange('contact')} className="btn-purple w-full sm:w-auto px-16 py-7 text-[11px] uppercase tracking-[0.4em] font-black rounded-full shadow-lg">
                      Me contacter
                    </button>
                    <button onClick={() => handleSectionChange('services')} className="border-2 border-white/40 text-white w-full sm:w-auto px-16 py-7 text-[11px] uppercase tracking-[0.4em] font-black rounded-full hover:bg-white/10 transition-all">
                      Découvrir les ateliers
                    </button>
                  </div>
                </div>
                <div className="relative order-1 lg:order-2 flex justify-center items-center">
                  <div className="aspect-[4/5] w-full max-w-[450px] overflow-hidden rounded-[60px] md:rounded-[100px] border-8 border-white/20 shadow-2xl">
                    <img src={sitePhotos.hero} className="w-full h-full object-cover" alt="L'Herbier du Temps" />
                  </div>
                  <div className="absolute -bottom-8 -left-4 md:-bottom-12 md:-left-12 card-violet p-8 md:p-12 rounded-[40px] md:rounded-[50px] shadow-3xl border-2 border-white/10 hidden md:block">
                    <p className="text-white font-serif italic text-2xl md:text-3xl leading-snug">"Le soin est un <br/>dialogue avec <br/>la nature."</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
      case 'services':
        return (
          <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto animate-reveal flex flex-col items-center">
            <SectionHeader title="Savoirs" subtitle="Ateliers & Soins Naturels" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14 justify-center w-full">
              {services.map((s) => (
                <div key={s.id} className="card-violet rounded-[50px] md:rounded-[60px] p-8 md:p-12 shadow-2xl group hover:translate-y-[-10px] transition-all duration-500 flex flex-col items-center text-center mx-auto w-full max-w-sm">
                  <div className="aspect-square w-full mb-10 overflow-hidden rounded-[30px] md:rounded-[40px] border border-white/20 shadow-inner">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover transition-all duration-[1.5s] group-hover:scale-110" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif italic text-white mb-6 leading-tight">{s.title}</h3>
                  <p className="text-white/60 text-base leading-relaxed mb-10 font-light italic">{s.description}</p>
                  <div className="w-full flex justify-between items-center pt-8 border-t border-white/10 mt-auto">
                    <span className="text-xs font-black text-[#E1AEE1] uppercase tracking-[0.2em]">{s.price}</span>
                    <button onClick={() => handleSectionChange('contact')} className="text-white hover:text-[#E1AEE1] transition-all transform hover:scale-125"><ChevronRight size={32} strokeWidth={1}/></button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      case 'galerie':
        return (
          <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto animate-reveal flex flex-col items-center">
            <SectionHeader title="Regards" subtitle="Instantanés de l'Herbier" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 justify-center w-full">
              {gallery.map((img) => (
                <div key={img.id} className="group relative overflow-hidden rounded-[40px] md:rounded-[50px] aspect-square shadow-2xl border-4 border-white/10 mx-auto w-full max-w-sm">
                  <img src={img.url} alt={img.alt} className="w-full h-full object-cover transition-all duration-[2s] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-[#5D2E5D]/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center p-8 text-center">
                    <p className="text-white text-[12px] uppercase tracking-[0.5em] font-black border-b-2 border-[#E1AEE1] pb-6">{img.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      case 'blog':
        return (
          <section className="py-24 md:py-32 px-6 max-w-4xl mx-auto animate-reveal">
            {selectedPost ? (
              <div className="animate-reveal flex flex-col items-center">
                <button onClick={() => setSelectedPost(null)} className="flex items-center gap-4 text-[#E1AEE1] text-[10px] font-black uppercase tracking-[0.4em] mb-12 md:mb-16 hover:text-white transition-colors group">
                  <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform"/> Retour au journal
                </button>
                <div className="w-full rounded-[50px] md:rounded-[80px] overflow-hidden mb-12 md:mb-20 border-4 md:border-8 border-white/10 shadow-3xl">
                  <img src={selectedPost.image} className="w-full aspect-video object-cover" alt={selectedPost.title} />
                </div>
                <div className="max-w-3xl mx-auto space-y-10 md:space-y-16 text-center">
                   <time className="text-[11px] uppercase font-black text-[#E1AEE1] tracking-[0.5em] opacity-60">{selectedPost.date}</time>
                   <h2 className="text-5xl md:text-7xl font-serif italic text-white leading-tight">{selectedPost.title}</h2>
                   <div className="text-white/80 leading-[1.8] text-xl md:text-2xl font-light space-y-8 md:space-y-10 italic">
                     {selectedPost.content.split('\n').map((para, i) => <p key={i}>{para}</p>)}
                   </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <SectionHeader title="Journal" subtitle="Écrits Botaniques" />
                <div className="space-y-32 md:space-y-48 w-full">
                  {blogPosts.map((post) => (
                    <article key={post.id} className="group cursor-pointer text-center flex flex-col items-center" onClick={() => { setSelectedPost(post); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
                      <div className="w-full aspect-[21/10] overflow-hidden rounded-[50px] md:rounded-[80px] mb-10 md:mb-16 border-4 border-white/10 shadow-2xl">
                        <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[6s]" alt={post.title} />
                      </div>
                      <div className="max-w-3xl mx-auto px-4">
                        <time className="text-[11px] uppercase font-black text-[#E1AEE1] mb-6 md:mb-8 block tracking-[0.6em]">{post.date}</time>
                        <h3 className="text-4xl md:text-6xl font-serif italic text-white mb-8 md:mb-10 group-hover:text-[#E1AEE1] transition-colors leading-tight">{post.title}</h3>
                        <p className="text-white/50 mb-10 md:mb-14 font-light leading-relaxed text-lg md:text-xl italic">{post.excerpt}</p>
                        <span 
                          className="text-[11px] font-black uppercase tracking-[0.5em] border-b-2 border-[#E1AEE1]/40 text-[#E1AEE1] pb-4 group-hover:text-white group-hover:border-white transition-all inline-block"
                        >
                          Découvrir l'article
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </section>
        );
      case 'propos':
        return (
          <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto animate-reveal">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-32 items-center text-center lg:text-left">
              <div className="relative flex justify-center order-2 lg:order-1 mt-12 lg:mt-0 items-center">
                <img src={sitePhotos.about} className="w-full max-w-[500px] rounded-[100px] md:rounded-[140px] shadow-3xl border-8 border-white/10" alt="Myriam Grandemange" />
                <div className="absolute -bottom-8 -right-4 md:-bottom-12 md:-right-12 w-40 h-40 md:w-56 md:h-56 bg-[#E1AEE1] rounded-full flex items-center justify-center border-8 md:border-[12px] border-[#5D2E5D] shadow-2xl">
                  <span className="text-[#5D2E5D] text-[10px] md:text-[12px] uppercase font-black tracking-[0.3em] text-center leading-tight">Myriam <br/>Grandemange</span>
                </div>
              </div>
              <div className="space-y-10 md:space-y-14 order-1 lg:order-2 flex flex-col items-center lg:items-start">
                <span className="text-[#E1AEE1] tracking-[0.7em] uppercase text-[11px] font-black">Mon Histoire</span>
                <h2 className="text-6xl md:text-8xl font-serif italic text-white leading-tight">{OWNER_NAME}</h2>
                <div className="space-y-8 md:space-y-10 text-white/70 text-xl md:text-2xl leading-relaxed font-light italic max-w-xl">
                  <p>Issue des Hautes-Vosges, je vis en harmonie avec les cycles du vivant depuis mon enfance.</p>
                  <p>L'Herbier du Temps est mon sanctuaire, un espace où je partage ma passion pour l'herboristerie traditionnelle et le bien-être naturel.</p>
                  <p>Mon engagement est de vous transmettre les clés d'une santé équilibrée, guidée par les plantes qui nous entourent.</p>
                </div>
              </div>
            </div>
          </section>
        );
      case 'contact':
        return (
          <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto animate-reveal flex flex-col items-center">
             <SectionHeader title="Ecrire" subtitle="Un Temps de Partage" />
             <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-start w-full">
                <div className="lg:col-span-2 space-y-12 order-2 lg:order-1 flex flex-col items-center w-full">
                  <div className="card-violet p-10 md:p-16 rounded-[50px] md:rounded-[80px] shadow-2xl space-y-12 md:space-y-20 w-full max-w-lg">
                    {[
                      { icon: <Mail size={40} strokeWidth={1}/>, label: "Adresse Email", val: "herbierdutemps@gmail.com" },
                      { icon: <Phone size={40} strokeWidth={1}/>, label: "Téléphone", val: "+33 6 02 71 89 68" },
                      { icon: <MapPin size={40} strokeWidth={1}/>, label: "Emplacement", val: "Thaon-les-Vosges (88)" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-col md:flex-row gap-6 md:gap-10 items-center text-center md:text-left group">
                        <div className="text-[#E1AEE1] group-hover:text-white transition-all transform group-hover:scale-110 flex-shrink-0">{item.icon}</div>
                        <div className="overflow-hidden">
                          <p className="text-[10px] uppercase tracking-[0.5em] font-black text-[#E1AEE1]/50 mb-3">{item.label}</p>
                          <p className="text-white font-serif text-2xl md:text-3xl italic break-words">{item.val}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-3 order-1 lg:order-2 w-full">
                  <form action="https://formspree.io/f/mqkvnndl" method="POST" className="card-violet p-10 md:p-20 rounded-[50px] md:rounded-[80px] shadow-2xl space-y-12 md:space-y-20 w-full max-w-3xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                      <div className="border-b-2 border-white/20 py-4 md:py-6 focus-within:border-[#E1AEE1] transition-all">
                        <label className="text-[10px] uppercase tracking-widest font-black text-[#E1AEE1]/60 mb-4 block">Votre Identité</label>
                        <input type="text" name="name" required placeholder="Prénom & Nom" className="w-full bg-transparent outline-none text-white text-xl md:text-2xl placeholder:text-white/10" />
                      </div>
                      <div className="border-b-2 border-white/20 py-4 md:py-6 focus-within:border-[#E1AEE1] transition-all">
                        <label className="text-[10px] uppercase tracking-widest font-black text-[#E1AEE1]/60 mb-4 block">Votre Contact</label>
                        <input type="email" name="email" required placeholder="Email" className="w-full bg-transparent outline-none text-white text-xl md:text-2xl placeholder:text-white/10" />
                      </div>
                    </div>
                    <div className="border-b-2 border-white/20 py-4 md:py-6 focus-within:border-[#E1AEE1] transition-all">
                      <label className="text-[10px] uppercase tracking-widest font-black text-[#E1AEE1]/60 mb-4 block">Votre Message</label>
                      <textarea name="message" rows={6} required placeholder="Dites-moi tout sur vos besoins..." className="w-full bg-transparent outline-none text-white text-xl md:text-2xl resize-none placeholder:text-white/10 italic leading-relaxed"></textarea>
                    </div>
                    <button type="submit" className="btn-purple w-full py-8 md:py-10 rounded-[30px] md:rounded-[40px] uppercase tracking-[0.6em] text-[12px] font-black shadow-3xl">
                      Envoyer ma demande
                    </button>
                  </form>
                </div>
             </div>
          </section>
        );
      case 'admin':
        return renderAdminSection();
      default: return null;
    }
  };

  const renderAdminSection = () => {
    if (!isAdminLoggedIn) {
      return (
        <section className="py-24 md:py-32 px-6 max-w-md mx-auto animate-reveal min-h-[75vh] flex items-center justify-center">
          <div className="w-full card-violet p-12 md:p-16 rounded-[60px] md:rounded-[80px] shadow-3xl flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-serif italic text-white text-center mb-12 md:mb-14 leading-tight">Accès <br/>Propriétaire</h2>
            <form onSubmit={handleAdminLogin} className="space-y-10 md:space-y-12 w-full">
              <input 
                type="password" 
                value={passwordInput} 
                onChange={(e) => setPasswordInput(e.target.value)} 
                placeholder="Code secret" 
                className="w-full bg-black/40 p-6 md:p-8 rounded-3xl outline-none border-2 border-white/10 focus:border-[#E1AEE1] transition-all text-center text-white text-xl" 
                autoFocus 
              />
              <button type="submit" className="btn-purple w-full py-6 md:py-7 rounded-3xl uppercase text-[11px] font-black tracking-[0.5em]">Entrer dans l'Herbier</button>
            </form>
          </div>
        </section>
      );
    }

    return (
      <section className="py-20 md:py-24 px-6 max-w-7xl mx-auto animate-reveal min-h-[85vh]">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 md:mb-24 border-b border-white/10 pb-10 md:pb-12 text-center md:text-left gap-8">
          <div>
            <h2 className="text-6xl md:text-7xl font-serif italic text-white">Gestion du Site</h2>
            <p className="text-[#E1AEE1] text-[12px] font-black uppercase tracking-[0.6em] mt-4 md:mt-6">Session active — {OWNER_NAME}</p>
          </div>
          <button onClick={() => setIsAdminLoggedIn(false)} className="text-[11px] font-black text-red-300 uppercase tracking-[0.4em] border-2 border-red-300/30 px-12 md:px-14 py-5 md:py-6 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-xl">Déconnexion</button>
        </div>

        {adminSubSection === 'menu' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 justify-center">
            <AdminMenuButton id="services" icon={<Briefcase size={32} />} label="Prestations" onClick={() => setAdminSubSection('services')} />
            <AdminMenuButton id="blog" icon={<FileText size={32} />} label="Le Journal" onClick={() => setAdminSubSection('blog')} />
            <AdminMenuButton id="gallery" icon={<ImageIcon size={32} />} label="La Galerie" onClick={() => setAdminSubSection('gallery')} />
            <AdminMenuButton id="config" icon={<Settings size={32} />} label="Photos Site" onClick={() => setAdminSubSection('config')} />
            <AdminMenuButton id="security" icon={<Lock size={32} />} label="Sécurité" onClick={() => setAdminSubSection('security')} />
          </div>
        ) : (
          <div className="card-violet p-8 md:p-16 rounded-[40px] md:rounded-[80px] shadow-3xl animate-reveal border-2 border-white/10 max-w-5xl mx-auto">
            <button onClick={() => { setAdminSubSection('menu'); setEditingItem(null); }} className="text-[#E1AEE1] text-[11px] font-black uppercase tracking-[0.5em] mb-12 md:mb-20 flex items-center justify-center lg:justify-start gap-4 md:gap-6 hover:text-white transition-colors group">
              <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform"/> Retour au Tableau de Bord
            </button>
            <div className="animate-reveal">
                {adminSubSection === 'services' && renderManageServices()}
                {adminSubSection === 'blog' && renderManageBlog()}
                {adminSubSection === 'gallery' && renderManageGallery()}
                {adminSubSection === 'config' && renderManageConfig()}
                {adminSubSection === 'security' && renderSecurity()}
            </div>
          </div>
        )}
      </section>
    );
  };

  const AdminMenuButton = ({ icon, label, onClick }: any) => (
    <button onClick={onClick} className="card-violet p-12 md:p-20 rounded-[40px] md:rounded-[80px] shadow-2xl hover:translate-y-[-10px] transition-all text-center space-y-8 md:space-y-10 group border-2 border-white/5 mx-auto w-full max-w-sm flex flex-col items-center">
      <div className="w-24 h-24 md:w-28 md:h-28 bg-white/5 rounded-full flex items-center justify-center mx-auto text-[#E1AEE1] group-hover:bg-[#E1AEE1] group-hover:text-[#5D2E5D] transition-all transform group-hover:scale-110">{icon}</div>
      <p className="font-serif italic text-3xl md:text-4xl text-white">{label}</p>
    </button>
  );

  const renderManageServices = () => {
    const isAdding = editingItem?.id === -1;
    return (
      <div className="space-y-16 md:space-y-20 flex flex-col items-center">
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/10 pb-10 md:pb-12 gap-6 w-full">
          <h3 className="text-4xl md:text-5xl font-serif italic text-white text-center md:text-left">Nos Soins</h3>
          {!editingItem && (
            <button onClick={() => setEditingItem({ id: -1, title: '', description: '', price: '', image: '' })} className="btn-purple px-10 md:px-12 py-4 md:py-5 rounded-full text-[11px] font-black uppercase tracking-widest">Ajouter</button>
          )}
        </div>
        {editingItem ? (
           <div className="bg-black/40 p-8 md:p-16 rounded-[40px] md:rounded-[60px] space-y-10 md:space-y-12 border-2 border-white/5 w-full">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase text-[#E1AEE1]/60 tracking-widest">Titre de la prestation</label>
                <input value={editingItem.title} onChange={e => setEditingItem({...editingItem, title: e.target.value})} className="w-full p-6 md:p-7 bg-white/5 rounded-3xl outline-none text-xl md:text-2xl text-white" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase text-[#E1AEE1]/60 tracking-widest">Description détaillée</label>
                <textarea value={editingItem.description} onChange={e => setEditingItem({...editingItem, description: e.target.value})} rows={5} className="w-full p-6 md:p-7 bg-white/5 rounded-3xl outline-none text-white italic" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase text-[#E1AEE1]/60 tracking-widest">Prix (ex: 50€)</label>
                  <input value={editingItem.price} onChange={e => setEditingItem({...editingItem, price: e.target.value})} className="w-full p-6 md:p-7 bg-white/5 rounded-3xl outline-none text-white" />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase text-[#E1AEE1]/60 tracking-widest">Lien de la photo</label>
                  <input value={editingItem.image} onChange={e => setEditingItem({...editingItem, image: e.target.value})} className="w-full p-6 md:p-7 bg-white/5 rounded-3xl outline-none text-white font-mono text-sm" />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 pt-6">
                <button onClick={() => {
                  if (isAdding) setServices([{ ...editingItem, id: Date.now() }, ...services]);
                  else setServices(services.map(s => s.id === editingItem.id ? editingItem : s));
                  setEditingItem(null);
                }} className="btn-purple flex-1 py-6 md:py-7 rounded-[25px] md:rounded-[30px] font-black uppercase tracking-widest">Enregistrer</button>
                <button onClick={() => setEditingItem(null)} className="bg-white/10 flex-1 py-6 md:py-7 rounded-[25px] md:rounded-[30px] font-black uppercase tracking-widest">Annuler</button>
              </div>
           </div>
        ) : (
          <div className="divide-y divide-white/10 w-full">
            {services.map(s => (
              <div key={s.id} className="py-8 md:py-12 flex flex-col md:flex-row justify-between items-center group hover:bg-white/5 px-6 md:px-8 rounded-[30px] md:rounded-[40px] transition-all gap-8 w-full">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 text-center md:text-left">
                  <img src={s.image} className="w-24 h-24 md:w-28 md:h-28 rounded-[30px] md:rounded-[35px] object-cover border-2 border-white/20" alt={s.title} />
                  <div>
                    <p className="font-serif italic text-white text-3xl md:text-4xl">{s.title}</p>
                    <p className="text-[#E1AEE1] font-black uppercase text-xs mt-3 tracking-widest opacity-60">{s.price}</p>
                  </div>
                </div>
                <div className="flex gap-4 md:gap-6">
                  <button onClick={() => setEditingItem(s)} className="p-4 md:p-6 text-[#E1AEE1] hover:bg-white/10 rounded-full transition-all"><Edit2 size={24}/></button>
                  <button onClick={() => setServices(prev => prev.filter(x => x.id !== s.id))} className="p-4 md:p-6 text-red-400 hover:bg-red-500/10 rounded-full transition-all"><Trash2 size={24}/></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderManageBlog = () => {
    const isAdding = editingItem?.id === -1;
    return (
      <div className="space-y-16 md:space-y-20 flex flex-col items-center">
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/10 pb-10 md:pb-12 gap-6 w-full text-center md:text-left">
          <h3 className="text-4xl md:text-5xl font-serif italic text-white">Le Journal</h3>
          {!editingItem && (
            <button onClick={() => setEditingItem({ id: -1, title: '', excerpt: '', content: '', date: new Date().toLocaleDateString('fr-FR'), image: '' })} className="btn-purple px-10 md:px-12 py-4 md:py-5 rounded-full text-[11px] font-black uppercase tracking-widest">Écrire</button>
          )}
        </div>
        {editingItem ? (
           <div className="bg-black/40 p-8 md:p-16 rounded-[40px] md:rounded-[60px] space-y-8 md:space-y-10 border-2 border-white/5 w-full">
              <input value={editingItem.title} onChange={e => setEditingItem({...editingItem, title: e.target.value})} placeholder="Titre de l'article" className="w-full p-6 md:p-8 bg-white/5 rounded-3xl outline-none text-xl md:text-2xl text-white" />
              <input value={editingItem.image} onChange={e => setEditingItem({...editingItem, image: e.target.value})} placeholder="Lien de la photo" className="w-full p-6 md:p-8 bg-white/5 rounded-3xl outline-none text-white font-mono text-sm" />
              <textarea value={editingItem.excerpt} onChange={e => setEditingItem({...editingItem, excerpt: e.target.value})} placeholder="Résumé pour la liste..." rows={2} className="w-full p-6 md:p-8 bg-white/5 rounded-3xl outline-none text-white italic" />
              <textarea value={editingItem.content} onChange={e => setEditingItem({...editingItem, content: e.target.value})} placeholder="Votre texte botanique ici..." rows={15} className="w-full p-6 md:p-8 bg-white/5 rounded-3xl outline-none text-white leading-relaxed" />
              <div className="flex flex-col sm:flex-row gap-6 md:gap-8 pt-6">
                <button onClick={() => {
                  if (isAdding) setBlogPosts([{ ...editingItem, id: Date.now() }, ...blogPosts]);
                  else setBlogPosts(blogPosts.map(p => p.id === editingItem.id ? editingItem : p));
                  setEditingItem(null);
                }} className="btn-purple flex-1 py-6 md:py-7 rounded-[25px] md:rounded-[30px] font-black uppercase tracking-widest">Publier</button>
                <button onClick={() => setEditingItem(null)} className="bg-white/10 flex-1 py-6 md:py-7 rounded-[25px] md:rounded-[30px] font-black uppercase tracking-widest">Abandonner</button>
              </div>
           </div>
        ) : (
          <div className="divide-y divide-white/10 w-full">
            {blogPosts.map(p => (
              <div key={p.id} className="py-10 flex flex-col md:flex-row justify-between items-center group hover:bg-white/5 px-6 md:px-8 rounded-[30px] md:rounded-[40px] transition-all gap-8 w-full">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 text-center md:text-left">
                    <img src={p.image} className="w-28 h-20 md:w-32 md:h-20 rounded-[15px] md:rounded-[20px] object-cover border border-white/10" alt={p.title} />
                    <p className="font-serif italic text-white text-3xl md:text-4xl leading-tight">{p.title}</p>
                </div>
                <div className="flex gap-4 md:gap-6">
                  <button onClick={() => setEditingItem(p)} className="p-4 md:p-6 text-[#E1AEE1] hover:bg-white/10 rounded-full transition-all"><Edit2 size={24}/></button>
                  <button onClick={() => setBlogPosts(prev => prev.filter(x => x.id !== p.id))} className="p-4 md:p-6 text-red-400 hover:bg-red-500/10 rounded-full transition-all"><Trash2 size={24}/></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderManageGallery = () => (
    <div className="space-y-16 md:space-y-20 flex flex-col items-center">
      <h3 className="text-4xl md:text-5xl font-serif italic text-white text-center md:text-left w-full">Galerie Instantanée</h3>
      <div className="bg-black/40 p-8 md:p-16 rounded-[40px] md:rounded-[60px] grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-end border-2 border-white/5 w-full">
        <div className="space-y-4">
            <label className="text-[10px] font-black uppercase text-[#E1AEE1]/60 tracking-widest">URL de l'image</label>
            <input id="gal-url" placeholder="https://..." className="w-full p-6 md:p-7 bg-white/5 rounded-3xl outline-none text-sm text-white" />
        </div>
        <div className="space-y-4">
            <label className="text-[10px] font-black uppercase text-[#E1AEE1]/60 tracking-widest">Catégorie</label>
            <input id="gal-cat" placeholder="ex: Nature, Atelier..." className="w-full p-6 md:p-7 bg-white/5 rounded-3xl outline-none text-sm text-white" />
        </div>
        <button onClick={() => {
          const u = document.getElementById('gal-url') as HTMLInputElement;
          const c = document.getElementById('gal-cat') as HTMLInputElement;
          if(u.value && c.value) {
            setGallery([{ id: Date.now(), url: u.value, category: c.value, alt: c.value }, ...gallery]);
            u.value = ''; c.value = '';
          }
        }} className="btn-purple py-6 md:py-7 rounded-[25px] md:rounded-[30px] uppercase font-black text-[11px] tracking-widest">Ajouter</button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-4 md:gap-8 w-full justify-center">
        {gallery.map(img => (
          <div key={img.id} className="relative aspect-square rounded-[20px] md:rounded-[30px] overflow-hidden border-2 border-white/10 shadow-xl group cursor-pointer mx-auto w-full">
            <img src={img.url} className="w-full h-full object-cover" alt="Gal" />
            <div className="absolute inset-0 bg-red-600/90 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                <button onClick={() => setGallery(prev => prev.filter(x => x.id !== img.id))} className="text-white transform group-hover:scale-125 transition-transform"><Trash2 size={24}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderManageConfig = () => {
    const [tempPhotos, setTempPhotos] = useState(sitePhotos);
    const [saved, setSaved] = useState(false);

    const handleSaveConfig = () => {
        setSitePhotos(tempPhotos);
        localStorage.setItem('herbier_site_photos', JSON.stringify(tempPhotos));
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="space-y-16 md:space-y-20 max-w-4xl mx-auto py-8 md:py-10 animate-reveal text-center flex flex-col items-center">
          <div className="space-y-4">
            <h3 className="text-5xl md:text-6xl font-serif italic text-white">Atmosphère du Site</h3>
            <p className="text-[#E1AEE1] text-xs font-black uppercase tracking-[0.4em] opacity-60">Gestion globale des visuels de structure</p>
          </div>
          <div className="space-y-12 md:space-y-16 bg-black/40 p-8 md:p-20 rounded-[50px] md:rounded-[80px] border-2 border-white/5 w-full flex flex-col items-center">
            <div className="space-y-8 w-full">
              <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-6 mb-4">
                  <div className="bg-[#E1AEE1]/10 p-4 rounded-full text-[#E1AEE1]"><LucideImage size={24}/></div>
                  <label className="text-[11px] font-black uppercase tracking-[0.4em] text-[#E1AEE1]">Image de la Page d'Accueil (Hero)</label>
              </div>
              <input 
                value={tempPhotos.hero} 
                onChange={e => setTempPhotos({...tempPhotos, hero: e.target.value})} 
                className="w-full p-6 md:p-8 bg-white/5 rounded-3xl outline-none text-white font-mono text-sm border-2 border-white/5 focus:border-[#E1AEE1]/40" 
                placeholder="URL de l'image"
              />
              <div className="w-full aspect-video rounded-[30px] md:rounded-[50px] overflow-hidden border-4 border-white/10 shadow-inner group">
                <img src={tempPhotos.hero} className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110" alt="Prévisu Accueil" />
              </div>
            </div>

            <div className="h-[2px] bg-white/5 w-full"></div>

            <div className="space-y-8 w-full">
              <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-6 mb-4">
                  <div className="bg-[#E1AEE1]/10 p-4 rounded-full text-[#E1AEE1]"><LucideImage size={24}/></div>
                  <label className="text-[11px] font-black uppercase tracking-[0.4em] text-[#E1AEE1]">Image de la Section "À Propos"</label>
              </div>
              <input 
                value={tempPhotos.about} 
                onChange={e => setTempPhotos({...tempPhotos, about: e.target.value})} 
                className="w-full p-6 md:p-8 bg-white/5 rounded-3xl outline-none text-white font-mono text-sm border-2 border-white/5 focus:border-[#E1AEE1]/40" 
                placeholder="URL de l'image"
              />
              <div className="w-full aspect-video rounded-[30px] md:rounded-[50px] overflow-hidden border-4 border-white/10 shadow-inner group">
                <img src={tempPhotos.about} className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110" alt="Prévisu Propos" />
              </div>
            </div>

            <div className="pt-6 w-full max-w-sm">
              <button 
                onClick={handleSaveConfig} 
                className={`w-full py-8 md:py-10 rounded-full uppercase text-[12px] font-black tracking-[0.6em] transition-all flex items-center justify-center gap-4 ${saved ? 'bg-green-500 text-white' : 'btn-purple shadow-3xl'}`}
              >
                {saved ? <><Check /> Changements Appliqués</> : "Mettre à jour le Site"}
              </button>
            </div>
          </div>
        </div>
    );
  };

  const renderSecurity = () => {
    const [sec, setSec] = useState({ old: '', n: '', c: '' });
    return (
      <div className="max-w-lg mx-auto space-y-16 md:space-y-20 text-center py-16 md:py-24 animate-reveal flex flex-col items-center">
        <div className="space-y-6">
            <h3 className="text-5xl md:text-6xl font-serif italic text-white leading-tight">Accès au <br/>Domaine</h3>
            <p className="text-[#E1AEE1] text-xs font-black uppercase tracking-[0.5em] opacity-60">Changer votre code secret</p>
        </div>
        <div className="space-y-8 md:space-y-10 bg-black/30 p-10 md:p-16 rounded-[50px] md:rounded-[70px] border-2 border-white/5 w-full flex flex-col items-center">
          <input type="password" value={sec.old} onChange={e => setSec({...sec, old: e.target.value})} placeholder="Code actuel" className="w-full p-6 md:p-8 bg-white/5 rounded-[25px] md:rounded-[40px] outline-none text-center border-2 border-white/5 focus:border-[#E1AEE1] transition-all text-xl md:text-2xl text-white" />
          <div className="w-[2px] h-10 md:h-12 bg-white/10 mx-auto"></div>
          <input type="password" value={sec.n} onChange={e => setSec({...sec, n: e.target.value})} placeholder="Nouveau code" className="w-full p-6 md:p-8 bg-white/5 rounded-[25px] md:rounded-[40px] outline-none text-center border-2 border-white/5 focus:border-[#E1AEE1] transition-all text-xl md:text-2xl text-white" />
          <input type="password" value={sec.c} onChange={e => setSec({...sec, c: e.target.value})} placeholder="Confirmer le code" className="w-full p-6 md:p-8 bg-white/5 rounded-[25px] md:rounded-[40px] outline-none text-center border-2 border-white/5 focus:border-[#E1AEE1] transition-all text-xl md:text-2xl text-white" />
          <div className="pt-8 w-full">
            <button onClick={() => {
              if(sec.old === storedPassword && sec.n === sec.c && sec.n.length >= 4) {
                setStoredPassword(sec.n);
                alert("Votre code d'accès a été modifié avec succès !");
                setAdminSubSection('menu');
              } else {
                alert("Erreur : les informations saisies sont incorrectes.");
              }
            }} className="btn-purple w-full py-7 md:py-9 rounded-full uppercase text-[11px] font-black tracking-[0.6em] shadow-3xl">Valider</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-[#E1AEE1] selection:text-[#5D2E5D]">
      <Header currentSection={currentSection} setSection={handleSectionChange} />
      <main className="flex-grow bg-[#5D2E5D] flex flex-col">
        {renderSection()}
      </main>
      <Footer setSection={handleSectionChange} />
    </div>
  );
};

export default App;
