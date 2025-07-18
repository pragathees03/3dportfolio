import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import './App.css';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { FaFolder, FaFolderOpen, FaArrowLeft } from 'react-icons/fa';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';

const sortImages = (modules) => {
  const paths = Object.keys(modules).sort().reverse();
  return paths.map(path => modules[path]);
};

const sortVideos = (modules) => {
  const paths = Object.keys(modules).sort().reverse();
  return paths.map(path => modules[path]);
};

const graphicImages = sortImages(import.meta.glob('/src/assets/projects/graphic designs/*.*', { eager: true, as: 'url' }));
const websiteImages = sortImages(import.meta.glob('/src/assets/projects/websites/*.*', { eager: true, as: 'url' }));

// Combine local files and Google Drive links for 3D models
const localModelImages = sortImages(import.meta.glob('/src/assets/projects/3d models/*.*', { eager: true, as: 'url' }));
const modelImages = [
  ...localModelImages,
  // Large image replaced with direct link
  "https://drive.google.com/uc?export=download&id=1PnFtR2h8CpgAwhUbV-w_b6vnDCi-ZzTb",
];

// Combine local files and Google Drive links for video edits
const localVideoFiles = sortVideos(import.meta.glob('/src/assets/projects/video edits/*.mp4', { eager: true, as: 'url' }));
const videoFiles = [
  ...localVideoFiles,
  "https://drive.google.com/uc?export=download&id=1_0eQAiU5HtLkVyCw5VH_utTI0cF9NnCB", // asthra.mp4
  "https://drive.google.com/uc?export=download&id=1PFv3a1K2SfRJyymHXEw88oporTuNzjZT", // Aurora.mp4
  "https://drive.google.com/uc?export=download&id=15uVhMIB8nRn-Bv5bp1tT77XwBOi5VZ0f", // finall thisis.mp4
  "https://drive.google.com/uc?export=download&id=1OiqilfqdyC1N9Zxb7H1ZSfqYN6o2yDEC", // Ilaiyaraaja Concert.mp4
  "https://drive.google.com/uc?export=download&id=1oYULIlbfLvQcMOx2Ipt1NB_2jjdEtITG", // Ilaiyaraaja Meet & Greet.mp4
  "https://drive.google.com/uc?export=download&id=1vRn0UaTe6li_Vkb4O9JclJQNOFYJ8Btt", // kalam drop ig.mp4
  "https://drive.google.com/uc?export=download&id=1SLym-qJYVnJcohUx6JxLOcpGrRQqFF7m", // Rotract Club.mp4
  "https://drive.google.com/uc?export=download&id=1BtPlEl_JHTM9B_jmsivz5sRhKkL7rISa", // Rukmini.mp4
  "https://drive.google.com/uc?export=download&id=1NYKfR0IeDezSWWNRzzMCmiy3RynmFIZd", // side sponsors final.mp4
  "https://drive.google.com/uc?export=download&id=17nPN8KPLNrPosJj7riK1SzqDNt7nhGaU", // skfinal.mp4
];

function ProjectsPopup({ triggerNod }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [openFolders, setOpenFolders] = useState({
    graphic: false,
    websites: false,
    models: false,
    videos: false,
  });
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const videoTimer = setTimeout(() => setShowVideo(true), 300);
    const loadingTimer = setTimeout(() => setLoading(false), 1300);
    return () => { clearTimeout(videoTimer); clearTimeout(loadingTimer); };
  }, []);
  
  const handleFolderClick = (folderKey) => {
    setOpenFolders({
      graphic: false,
      websites: false,
      models: false,
      videos: false,
      [folderKey]: true,
    });
  };

  const handleBack = () => {
    setOpenFolders({ graphic: false, websites: false, models: false, videos: false });
  };

  const handleVideoClick = (videoSrc) => {
    setSelectedVideo(videoSrc);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  // Handle escape key to close video modal
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && selectedVideo) {
        closeVideoModal();
      }
    };

    if (selectedVideo) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [selectedVideo]);

  const anyFolderOpen = openFolders.graphic || openFolders.websites || openFolders.models || openFolders.videos;

  if (loading) {
    return (
      <div className="popup-overlay">
        {showVideo ? (
          <video src="https://drive.google.com/uc?export=download&id=1HuMQP_maun9NCvIHO2ZDO7Fjr8p68jKE" autoPlay muted playsInline style={{ width: '100vw', height: '100vh', objectFit: 'cover', borderRadius: 0 }} />
        ) : null}
      </div>
    );
  }

  return (
    <div className="popup-overlay" onClick={anyFolderOpen ? handleBack : () => navigate('/')}>
      <div className="page-content projects-content" onClick={e => e.stopPropagation()}>
        <h1>Projects</h1>

        {anyFolderOpen && (
            <button className="back-button" onClick={handleBack}>
                <FaArrowLeft className="back-icon" />
                <span>Back</span>
            </button>
        )}

        {!anyFolderOpen ? (
          <div className="folder-container">
            <div className="project-section">
              <div className="project-folder" onClick={() => handleFolderClick('graphic')}>
                <FaFolder className="folder-icon" />
                <h2 className="project-category">Graphic Design</h2>
              </div>
            </div>
            <div className="project-section">
              <div className="project-folder" onClick={() => handleFolderClick('websites')}>
                <FaFolder className="folder-icon" />
                <h2 className="project-category">Websites</h2>
              </div>
            </div>
            <div className="project-section">
              <div className="project-folder" onClick={() => handleFolderClick('models')}>
                <FaFolder className="folder-icon" />
                <h2 className="project-category">3D Models</h2>
              </div>
            </div>
            <div className="project-section">
              <div className="project-folder" onClick={() => handleFolderClick('videos')}>
                <FaFolder className="folder-icon" />
                <h2 className="project-category">Video Edits</h2>
              </div>
            </div>
          </div>
        ) : (
          <>
            {openFolders.graphic && (
              <>
                <h2 className="gallery-folder-title">Graphic Design</h2>
                <div className="project-gallery">
                  {graphicImages.map((img, idx) => (
                    <img key={img} src={img} alt={`Graphic Design ${idx + 1}`} className="project-img" loading="lazy" />
                  ))}
                </div>
              </>
            )}
            {openFolders.websites && (
              <>
                <h2 className="gallery-folder-title">Websites</h2>
                <div className="project-gallery websites-gallery" onClick={e => e.stopPropagation()}>
                  {websiteImages.map((img, idx) => {
                    const isPortfolio = img.toLowerCase().includes('portfoliogd.jpg');
                    const isProfessional = img.toLowerCase().includes('professionalport.jpg');
                    const isLancido = img.toLowerCase().includes('lancido.jpg');
                    const isTodo = img.toLowerCase().includes('todo.jpg');
                    if (isPortfolio) {
                      return (
                        <a key={img} href="https://pragathees03.github.io/Portfolio/" target="_blank" rel="noopener noreferrer">
                          <img src={img} alt={`Website ${idx + 1}`} className="project-img" loading="lazy" />
                        </a>
                      );
                    } else if (isProfessional) {
                      return (
                        <a key={img} href="https://pragathees03.github.io/portfolio_off/" target="_blank" rel="noopener noreferrer">
                          <img src={img} alt={`Website ${idx + 1}`} className="project-img" loading="lazy" />
                        </a>
                      );
                    } else if (isLancido) {
                      return (
                        <a key={img} href="https://pragathees03.github.io/lancido/" target="_blank" rel="noopener noreferrer">
                          <img src={img} alt={`Website ${idx + 1}`} className="project-img" loading="lazy" />
                        </a>
                      );
                    } else if (isTodo) {
                      return (
                        <a key={img} href="https://pragathees03.github.io/todoweb-repo/" target="_blank" rel="noopener noreferrer">
                          <img src={img} alt={`Website ${idx + 1}`} className="project-img" loading="lazy" />
                        </a>
                      );
                    } else {
                      return (
                        <img key={img} src={img} alt={`Website ${idx + 1}`} className="project-img" loading="lazy" />
                      );
                    }
                  })}
                </div>
              </>
            )}
            {openFolders.models && (
              <>
                <h2 className="gallery-folder-title">3D Models</h2>
                <div className="project-gallery">
                  {modelImages.map((img, idx) => (
                    <img key={img} src={img} alt={`3D Model ${idx + 1}`} className="project-img" loading="lazy" />
                  ))}
                </div>
              </>
            )}
            {openFolders.videos && (
              <>
                <h2 className="gallery-folder-title">Video Edits</h2>
                <div className="project-gallery">
                  {videoFiles.map((video, idx) => (
                    <VideoThumbnail 
                      key={video} 
                      videoSrc={video} 
                      alt={`Video Edit ${idx + 1}`} 
                      onVideoClick={handleVideoClick}
                      isModalOpen={!!selectedVideo}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
      
      {/* Video Modal */}
      {selectedVideo && (
        <div className="video-modal-overlay" onClick={closeVideoModal}>
          <div className="video-modal-content" onClick={e => e.stopPropagation()}>
            <button className="video-modal-back" onClick={closeVideoModal}>
              <FaArrowLeft className="back-icon" />
              <span>Back</span>
            </button>
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="video-modal-player"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}

// Video component for hover play functionality
function VideoThumbnail({ videoSrc, alt, onVideoClick, isModalOpen }) {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && isLoaded && !isModalOpen) {
      videoRef.current.play().catch(error => {
        console.log('Video play failed:', error);
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleVideoLoad = () => {
    setIsLoaded(true);
  };

  const handleVideoError = (error) => {
    console.error('Video loading error:', error);
  };

  return (
    <div 
      className="video-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onVideoClick(videoSrc)}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        alt={alt}
        className="project-video"
        muted
        playsInline
        loop
        preload="metadata"
        onLoadedMetadata={handleVideoLoad}
        onError={handleVideoError}
      />
      {!isHovered && (
        <div className="video-overlay">
          <div className="play-icon">▶</div>
        </div>
      )}
    </div>
  );
}

function ContactPopup({ triggerNod }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  useEffect(() => {
    const videoTimer = setTimeout(() => setShowVideo(true), 300);
    const loadingTimer = setTimeout(() => setLoading(false), 1300);
    return () => { clearTimeout(videoTimer); clearTimeout(loadingTimer); };
  }, []);
  if (loading) {
    return (
      <div className="popup-overlay">
        {showVideo ? (
          <video src="https://drive.google.com/uc?export=download&id=1e8b6eqo6uk1gLBlJmmNEmrVK6CoefekF" autoPlay muted playsInline style={{ width: '100vw', height: '100vh', objectFit: 'cover', borderRadius: 0 }} />
        ) : null}
      </div>
    );
  }
  return (
    <div className="popup-overlay" onClick={() => navigate('/') }>
      <div className="page-content contact-content" onClick={e => e.stopPropagation()}>
        <img src="https://drive.google.com/uc?export=download&id=1CJBjc6WS6pGsteEzxyYWYUWeIYMu0RJ-" alt="Pragatheeswaran S.K watermark" className="profile-pic" style={{ margin: '0 auto 1.2rem auto', display: 'block' }} />
        <h1>Contact</h1>
        <p>Feel free to reach out to me via social media or email. I'm always open to new opportunities and collaborations!</p>
        <ul>
          <li><SiGmail className="contact-icon" /> <a href="mailto:pragatheeswaranoffl@gmail.com">pragatheeswaranoffl@gmail.com</a></li>
          <li><FaLinkedin className="contact-icon" /> <a href="https://www.linkedin.com/in/pragatheeswaran-s-k-66993b368" target="_blank" rel="noopener noreferrer">Pragatheeswaran S.K</a></li>
          <li><FaInstagram className="contact-icon" /> <a href="https://www.instagram.com/praga.dz/?__pwa=1#" target="_blank" rel="noopener noreferrer">@praga.dz</a></li>
        </ul>
      </div>
    </div>
  );
}

function AboutPopup({ triggerNod }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [animateContent, setAnimateContent] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  
  useEffect(() => {
    const videoTimer = setTimeout(() => setShowVideo(true), 300);
    const loadingTimer = setTimeout(() => setLoading(false), 1300);
    const contentTimer = setTimeout(() => setAnimateContent(true), 1400);
    return () => { 
      clearTimeout(videoTimer); 
      clearTimeout(loadingTimer); 
      clearTimeout(contentTimer);
    };
  }, []);
  
  if (loading) {
    return (
      <div className="popup-overlay">
        {showVideo ? (
          <video src="https://drive.google.com/uc?export=download&id=1tQGEQyg9ooncjqf5Wh27ARBZ0LXWPKSD" autoPlay muted playsInline style={{ width: '100vw', height: '100vh', objectFit: 'cover', borderRadius: 0 }} />
        ) : null}
      </div>
    );
  }
  
  const skills = ['graphic designer', 'video editor', '3D artist', 'full-stack developer'];
  const tools = ['Adobe Photoshop', 'Illustrator', 'After Effects', 'Premiere Pro', 'DaVinci Resolve', 'Blender'];
  const techs = ['MongoDB', 'Express.js', 'React.js', 'Node.js'];
  
  return (
    <div className="popup-overlay" onClick={() => navigate('/') }>
      <div className={`page-content about-content ${animateContent ? 'animate-in' : ''}`} onClick={e => e.stopPropagation()}>
        <div className={`profile-section ${animateContent ? 'slide-in' : ''}`}>
          <div className="profile-pic-container">
            <img src="https://drive.google.com/uc?export=download&id=1gxcEIgobqWosZRp89Im_sgv3PR93Cw_J" alt="Pragatheeswaran S.K" className="profile-pic" />
            <div className="profile-glow"></div>
          </div>
          <h1 className={`highlight-name ${animateContent ? 'name-reveal' : ''}`}>PRAGATHEES</h1>
        </div>
        
        <div className={`about-text ${animateContent ? 'fade-in' : ''}`}>
          <p className="text-paragraph">
            Hi, I'm Pragatheeswaran, a passionate and versatile{' '}
            {skills.map((skill, index) => (
              <span 
                key={skill}
                className={`highlight-skill ${hoveredSkill === skill ? 'skill-hovered' : ''}`}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                {skill}
              </span>
            )).reduce((prev, curr) => [prev, ', ', curr])}
            {' '}from Coimbatore.
          </p>
          
          <p className="text-paragraph">
            I specialize in crafting visually compelling and technically sound projects across a wide range of mediums, including{' '}
            <span className="highlight-work">posters</span>, <span className="highlight-work">YouTube thumbnails</span>, <span className="highlight-work">logos</span>, <span className="highlight-work">brand identities</span>, <span className="highlight-work">promotional videos</span>, and <span className="highlight-work">interactive web applications</span>.
          </p>
          
          <p className="text-paragraph">
            With strong skills in{' '}
            {tools.map((tool, index) => (
              <span 
                key={tool}
                className={`highlight-tool ${hoveredSkill === tool ? 'tool-hovered' : ''}`}
                onMouseEnter={() => setHoveredSkill(tool)}
                onMouseLeave={() => setHoveredSkill(null)}
                style={{ animationDelay: `${0.8 + index * 0.01}s` }}
              >
                {tool}
              </span>
            )).reduce((prev, curr) => [prev, ', ', curr])}
            , I blend creativity and precision to bring ideas to life—whether it's through <span className="highlight-style">2D design</span>, <span className="highlight-style">cinematic video edits</span>, or <span className="highlight-style">realistic 3D scenes</span>.
          </p>
          
          <p className="text-paragraph">
            In addition, I develop modern and scalable web apps using the <span className="highlight-tech">MERN stack</span> ({' '}
            {techs.map((tech, index) => (
              <span 
                key={tech}
                className={`highlight-tech ${hoveredSkill === tech ? 'tech-hovered' : ''}`}
                onMouseEnter={() => setHoveredSkill(tech)}
                onMouseLeave={() => setHoveredSkill(null)}
                style={{ animationDelay: `${1.8 + index * 0.08}s` }}
              >
                {tech}
              </span>
            )).reduce((prev, curr) => [prev, ', ', curr])}
            ), allowing me to build interactive portfolios, branded websites, and design-driven user interfaces that elevate digital presence.
          </p>
          
          <p className="text-paragraph">
            Design is more than just my profession—it's what I <span className="highlight-love">love</span>.
          </p>
          
          <p className="text-paragraph">
            I focus on <span className="highlight-quality">clean</span>, <span className="highlight-quality">engaging</span>, and <span className="highlight-quality">effective visuals</span> and experiences that help brands and individuals stand out, communicate clearly, and leave a lasting impact—whether on screen, paper, or the web.
          </p>
        </div>
      </div>
    </div>
  );
}

function MainApp({ loading, triggerNod, nodSkull, nodTarget }) {
  const mountRef = useRef(null);
  const [nameColorIdx, setNameColorIdx] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const nameColors = ['#00ff8c', '#ff00ea', '#ffb300', '#00ccff'];
  const navigate = useNavigate();
  const location = useLocation();

  // Store nav refs
  const projectsRef = useRef();
  const contactRef = useRef();
  const aboutRef = useRef();

  useEffect(() => {
    if (loading) return;
    const currentMount = mountRef.current;
    // Scene
    const scene = new THREE.Scene();
    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 3;
    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 5);
    pointLight.position.set(1, 1, 1);
    scene.add(pointLight);
    // Load Model
    let skull;
    const loader = new GLTFLoader();
    loader.load(
      '/skull.gltf',
      (gltf) => {
        skull = gltf.scene;
        skull.scale.set(1.3, 1.1, 1.3);
        skull.position.set(0, 0, 0);
        skull.traverse((child) => {
          if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({ color: 0x9b5de5 });
          }
        });
        scene.add(skull);
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );
    // Mouse tracking
    const mouse = new THREE.Vector2();
    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);
    // Nodding animation state
    let nodding = false;
    let nodStart = null;
    let nodDuration = 700; // ms
    // Animation
    const animate = (now) => {
      requestAnimationFrame(animate);
      if (skull) {
        // Default: mouse tracking
        let targetY = mouse.x * 0.5;
        let targetX = -mouse.y * 0.5;
        // If nodding, face the nodTarget
        if (nodSkull && nodTarget && !nodding) {
          nodding = true;
          nodStart = now;
        }
        if (nodding && nodTarget) {
          const elapsed = now - nodStart;
          // Face the target
          targetY = nodTarget.x * 0.5;
          targetX = -nodTarget.y * 0.5;
          if (elapsed < nodDuration) {
            // Nodding motion
            skull.rotation.y = targetY;
            skull.rotation.x = targetX + 0.4 * Math.sin((Math.PI * elapsed) / nodDuration);
          } else {
            skull.rotation.y = targetY;
            skull.rotation.x = -mouse.y * 0.5;
            nodding = false;
            triggerNod(false);
          }
        } else {
          skull.rotation.y = targetY;
          skull.rotation.x = targetX;
        }
      }
      renderer.render(scene, camera);
    };
    animate(performance.now());
    // Handle resize
    const onResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', onResize);
    // Cleanup
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      currentMount.removeChild(renderer.domElement);
    };
  }, [loading, nodSkull, triggerNod, nodTarget]);

  // Handler for nav links
  const handleNavClick = (to, ref) => {
    // Get the center of the nav link
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Convert to NDC
    const ndcX = (centerX / window.innerWidth) * 2 - 1;
    const ndcY = -((centerY / window.innerHeight) * 2 - 1);
    triggerNod(true, { x: ndcX, y: ndcY });
    navigate(to);
  };

  return (
    <div className="App">
      <video
        className={`background-video${videoLoaded ? ' video-loaded' : ''}`}
        src="/background.mp4"
        poster="/background-poster.jpg"
        autoPlay
        loop
        muted
        playsInline
        onCanPlay={() => setVideoLoaded(true)}
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', objectFit: 'cover', zIndex: 0 }}
      />
      <Link to="/projects" className="nav-link work" ref={projectsRef} onClick={e => { e.preventDefault(); handleNavClick('/projects', projectsRef); }}>Projects</Link>
      <Link to="/contact" className="nav-link words" ref={contactRef} onClick={e => { e.preventDefault(); handleNavClick('/contact', contactRef); }}>Contact</Link>
      <Link to="/about" className="nav-link about" ref={aboutRef} onClick={e => { e.preventDefault(); handleNavClick('/about', aboutRef); }}>about</Link>
      <div ref={mountRef} className="three-canvas"></div>
      <div
        className="footer-name"
        style={{ color: hovered ? nameColors[nameColorIdx] : '#fff' }}
        onMouseEnter={() => { setHovered(true); setNameColorIdx((prev) => (prev + 1) % nameColors.length); }}
        onMouseLeave={() => setHovered(false)}
      >
        Pragathees
      </div>
      <div className="footer-social">
        <a href="https://www.instagram.com/praga.dz/?__pwa=1#" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={28} />
        </a>
        <a href="https://www.linkedin.com/in/pragatheeswaran-s-k-66993b368" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={28} />
        </a>
        <a href="https://github.com/pragathees03" target="_blank" rel="noopener noreferrer">
          <FaGithub size={28} />
        </a>
        <a href="mailto:pragatheeswaranoffl@gmail.com" target="_blank" rel="noopener noreferrer">
          <SiGmail size={28} />
        </a>
      </div>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [nodSkull, setNodSkull] = useState(false);
  const [nodTarget, setNodTarget] = useState(null);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);
  const triggerNod = (val, target = null) => {
    setNodSkull(val);
    setNodTarget(target);
  };

  if (loading) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#000',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <video src="https://drive.google.com/uc?export=download&id=1xY8Iv3SBoHJrQ2BDDda3_VVSpwE6S_WP" autoPlay muted playsInline style={{ width: '100vw', height: '100vh', objectFit: 'cover' }} />
      </div>
    );
  }

  return (
    <>
      {/* Watermark profile image in top right corner */}
      <img 
        src="https://drive.google.com/uc?export=download&id=1CJBjc6WS6pGsteEzxyYWYUWeIYMu0RJ-" 
        alt="Pragatheeswaran S.K watermark" 
        className="profile-watermark"
      />
      {/* Portfolio text in top left corner */}
      <span className="portfolio-watermark">Portfolio</span>
      <Router>
        <MainApp loading={loading} triggerNod={triggerNod} nodSkull={nodSkull} nodTarget={nodTarget} />
        <Routes>
          <Route path="/projects" element={<ProjectsPopup triggerNod={triggerNod} />} />
          <Route path="/contact" element={<ContactPopup triggerNod={triggerNod} />} />
          <Route path="/about" element={<AboutPopup triggerNod={triggerNod} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
