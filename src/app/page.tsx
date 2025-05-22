// src/app/page.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react'; // Import useState

// Note: Three.js and GSAP are loaded via CDN in layout.tsx.

export default function ConstructXLandingPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // This effect runs once on the client after initial render,
    // indicating that the component is mounted.
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) {
      // Don't run any DOM manipulation or animation setup until mounted on client
      return;
    }

    // Ensure THREE and gsap are available globally from CDN
    if (typeof THREE === 'undefined' || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || typeof ScrollToPlugin === 'undefined') {
      console.warn("Three.js or GSAP not loaded. Animations might not work.");
      return;
    }

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Updated for newer Three.js versions
    if (renderer.outputColorSpace) {
        renderer.outputColorSpace = THREE.SRGBColorSpace;
    } else { 
        (renderer as any).outputEncoding = (THREE as any).sRGBEncoding;
    }
    
    // Check if renderer.domElement is already appended to prevent duplicates during HMR
    const existingCanvas = document.querySelector('canvas');
    if (existingCanvas && existingCanvas.parentElement === document.body) {
        document.body.removeChild(existingCanvas);
    }
    document.body.appendChild(renderer.domElement);

    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '-1';

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.3);
    scene.add(hemisphereLight);

    camera.position.z = 5;

    const heroElements: THREE.Mesh[] = [];

    const createConstructionElements = () => {
      const craneBaseGeometry = new THREE.BoxGeometry(0.5, 0.1, 0.5);
      const craneBaseMaterial = new THREE.MeshPhongMaterial({ color: 0x555555 });
      const craneBase = new THREE.Mesh(craneBaseGeometry, craneBaseMaterial);
      craneBase.position.y = -1;
      scene.add(craneBase);
      heroElements.push(craneBase);

      const craneTowerGeometry = new THREE.BoxGeometry(0.2, 2, 0.2);
      const craneTowerMaterial = new THREE.MeshPhongMaterial({ color: 0x3b82f6 }); // Blue from theme
      const craneTower = new THREE.Mesh(craneTowerGeometry, craneTowerMaterial);
      craneTower.position.y = 0;
      scene.add(craneTower);
      heroElements.push(craneTower);

      const craneArmGeometry = new THREE.BoxGeometry(2, 0.1, 0.1);
      const craneArmMaterial = new THREE.MeshPhongMaterial({ color: 0x3b82f6 }); // Blue from theme
      const craneArm = new THREE.Mesh(craneArmGeometry, craneArmMaterial);
      craneArm.position.y = 1.5;
      craneArm.position.x = 1;
      scene.add(craneArm);
      heroElements.push(craneArm);

      const buildingGeometry = new THREE.BoxGeometry(1.5, 0.5, 1.5);
      const buildingMaterial = new THREE.MeshPhongMaterial({
        color: 0xcccccc,
        transparent: true,
        opacity: 0.8
      });
      const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
      building.position.y = -0.5;
      building.position.x = -1;
      scene.add(building);
      heroElements.push(building);

      for (let i = 0; i < 4; i++) {
        const workerGeometry = new THREE.SphereGeometry(0.1, 16, 16);
        const workerMaterial = new THREE.MeshPhongMaterial({ color: 0x10b981 }); // Green from theme
        const worker = new THREE.Mesh(workerGeometry, workerMaterial);
        worker.position.x = -1 + Math.random() * 0.5;
        worker.position.y = -0.8;
        worker.position.z = -0.5 + Math.random();
        scene.add(worker);
        heroElements.push(worker);
      }
    };

    createConstructionElements();

    const tenderPapers: THREE.Mesh[] = [];
    const createTenderPapers = () => {
      const paperGeometry = new THREE.PlaneGeometry(0.8, 1.2);
      const paperMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9
      });

      for (let i = 0; i < 6; i++) {
        const paper = new THREE.Mesh(paperGeometry, paperMaterial);
        paper.position.x = (Math.random() - 0.5) * 8;
        paper.position.y = (Math.random() - 0.5) * 4;
        paper.position.z = Math.random() * -5;
        paper.rotation.x = Math.random() * Math.PI * 0.1;
        paper.rotation.y = Math.random() * Math.PI * 0.1;
        tenderPapers.push(paper);
        scene.add(paper);
      }

      const stampGeometry = new THREE.CircleGeometry(0.1, 32);
      const redMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });

      for (let i = 0; i < 3; i++) {
        const stamp = new THREE.Mesh(stampGeometry, redMaterial);
        stamp.position.copy(tenderPapers[i].position);
        stamp.position.z += 0.01;
        stamp.rotation.copy(tenderPapers[i].rotation);
        scene.add(stamp);
        tenderPapers.push(stamp);
      }
    };

    const workerIcons: THREE.Mesh[] = [];
    const createWorkerIcons = () => {
      const workerGeometry = new THREE.SphereGeometry(0.2, 16, 16);
      const workerMaterial = new THREE.MeshPhongMaterial({
        color: 0x10b981, // Green from theme
        emissive: 0x064e3b,
        emissiveIntensity: 0.5
      });

      for (let i = 0; i < 8; i++) {
        const worker = new THREE.Mesh(workerGeometry, workerMaterial);
        worker.position.x = (Math.random() - 0.5) * 8;
        worker.position.y = (Math.random() - 0.5) * 4;
        worker.position.z = Math.random() * -5;
        workerIcons.push(worker);
        scene.add(worker);
      }
    };

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    gsap.to(camera.position, {
      z: 8,
      scrollTrigger: {
        trigger: '#home',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    heroElements.forEach(element => {
      gsap.to(element.rotation, {
        y: Math.PI * 0.5,
        scrollTrigger: {
          trigger: '#home',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
      gsap.to(element.position, {
        x: 3, y: 2,
        scrollTrigger: {
          trigger: '#home',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    createTenderPapers();
    tenderPapers.forEach((paper, i) => {
      gsap.to(paper.rotation, {
        y: Math.PI * 0.5,
        scrollTrigger: {
          trigger: '#tender',
          start: 'top center',
          end: 'bottom center',
          scrub: true
        }
      });
      gsap.to(paper.position, {
        x: (i - 3) * 1.5, y: 0, z: -2,
        scrollTrigger: {
          trigger: '#tender',
          start: 'top center',
          end: 'bottom center',
          scrub: true
        }
      });
    });

    createWorkerIcons();
    workerIcons.forEach((worker, i) => {
      gsap.to(worker.position, {
        x: (i % 4 - 1.5) * 2, y: Math.floor(i / 4) * 1.5 - 1, z: -3,
        scrollTrigger: {
          trigger: '#labor',
          start: 'top center',
          end: 'bottom center',
          scrub: true
        }
      });
    });

    gsap.to(camera.position, {
      z: 15,
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
      }
    });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');

    const openMenu = () => {
      if (mobileMenu) {
        mobileMenu.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    };
    const closeMenu = () => {
      if (mobileMenu) {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = '';
      }
    };

    if (mobileMenuButton) mobileMenuButton.addEventListener('click', openMenu);
    if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMenu);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (this: HTMLAnchorElement, e: Event) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                closeMenu(); // Close mobile menu on link click
                // Using GSAP's ScrollToPlugin for potentially smoother scrolling
                gsap.to(window, { duration: 1, scrollTo: targetElement, ease: "power2.inOut" });
            }
        }
      });
    });

    let animationFrameId: number;
    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      if (!ScrollTrigger.isScrolling) {
        heroElements.forEach(element => {
          element.rotation.y += 0.005;
        });
      }
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mobileMenuButton) mobileMenuButton.removeEventListener('click', openMenu);
      if (mobileMenuClose) mobileMenuClose.removeEventListener('click', closeMenu);
      
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Clean up event listeners for scroll links if necessary, though often not strictly needed for simple click listeners
        // If complex event listeners were added, they should be removed here.
      });

      cancelAnimationFrame(animationFrameId);
      
      // Dispose of Three.js objects
      heroElements.forEach(el => {
        if (el.geometry) el.geometry.dispose();
        if (Array.isArray(el.material)) el.material.forEach(m => m.dispose());
        else if (el.material) (el.material as THREE.Material).dispose();
        scene.remove(el);
      });
      heroElements.length = 0; // Clear the array

      tenderPapers.forEach(el => {
        if (el.geometry) el.geometry.dispose();
        if (Array.isArray(el.material)) el.material.forEach(m => m.dispose());
        else if (el.material) (el.material as THREE.Material).dispose();
        scene.remove(el);
      });
      tenderPapers.length = 0;

      workerIcons.forEach(el => {
        if (el.geometry) el.geometry.dispose();
        if (Array.isArray(el.material)) el.material.forEach(m => m.dispose());
        else if (el.material) (el.material as THREE.Material).dispose();
        scene.remove(el);
      });
      workerIcons.length = 0;
      
      scene.remove(ambientLight, directionalLight, hemisphereLight);
      // Dispose lights if they are complex/custom, though standard lights often don't need explicit disposal beyond scene removal.

      // Remove canvas from body
      if (renderer.domElement.parentElement === document.body) {
        document.body.removeChild(renderer.domElement);
      }
      renderer.dispose();

      // Reset body overflow if it was changed
      document.body.style.overflow = '';
      
      // Kill GSAP ScrollTriggers to prevent memory leaks
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMounted]); // Depend on isMounted

  // Render null or a loader until isMounted is true to prevent premature DOM manipulation
  if (!isMounted) {
    return null; // Or a loading spinner, or a static version of the page
  }

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-sm">
        <div className="container">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <i className="fas fa-hard-hat text-3xl text-[color:var(--primary)] mr-3"></i>
                <span className="text-xl font-bold text-gray-900">ConstructX</span>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#home" className="nav-link text-gray-900 hover:text-[color:var(--primary)]">Home</a>
                <a href="#features" className="nav-link text-gray-900 hover:text-[color:var(--primary)]">Features</a>
                {/* Updated links to point to actual app pages */}
                <Link href="/tenders" className="nav-link text-gray-900 hover:text-[color:var(--primary)]">Tenders</Link>
                <Link href="/labor" className="nav-link text-gray-900 hover:text-[color:var(--primary)]">Labor</Link>
                <Link href="/projects" className="nav-link text-gray-900 hover:text-[color:var(--primary)]">Projects</Link>
                <Link href="/material-estimation" className="nav-link text-gray-900 hover:text-[color:var(--primary)]">Material AI</Link>
                {/* End of updated links */}
                <a href="#pricing" className="nav-link text-gray-900 hover:text-[color:var(--primary)]">Pricing</a>
                <a href="#contact" className="nav-link text-gray-900 hover:text-[color:var(--primary)]">Contact</a>
              </div>
            </div>
            <div className="hidden lg:block">
              <button className="btn-primary">Get Started</button>
            </div>
            <div className="lg:hidden">
              <button id="mobile-menu-button" className="text-gray-900 p-2">
                <i className="fas fa-bars text-2xl"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div id="mobile-menu" className="fixed inset-0 z-40 bg-white hidden lg:hidden">
        <div className="container h-full flex flex-col justify-center items-center">
          <div className="absolute top-5 right-5">
            <button id="mobile-menu-close" className="text-gray-900 p-2">
              <i className="fas fa-times text-2xl"></i>
            </button>
          </div>
          <div className="flex flex-col items-center space-y-8">
            <a href="#home" className="text-2xl font-medium text-gray-900 hover:text-[color:var(--primary)]">Home</a>
            <a href="#features" className="text-2xl font-medium text-gray-900 hover:text-[color:var(--primary)]">Features</a>
            <Link href="/tenders" className="text-2xl font-medium text-gray-900 hover:text-[color:var(--primary)]">Tenders</Link>
            <Link href="/labor" className="text-2xl font-medium text-gray-900 hover:text-[color:var(--primary)]">Labor</Link>
            <Link href="/projects" className="text-2xl font-medium text-gray-900 hover:text-[color:var(--primary)]">Projects</Link>
            <Link href="/material-estimation" className="text-2xl font-medium text-gray-900 hover:text-[color:var(--primary)]">Material AI</Link>
            <a href="#pricing" className="text-2xl font-medium text-gray-900 hover:text-[color:var(--primary)]">Pricing</a>
            <a href="#contact" className="text-2xl font-medium text-gray-900 hover:text-[color:var(--primary)]">Contact</a>
            <button className="btn-primary mt-4">Get Started</button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section id="home" className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="section-title">
                <span className="gradient-text">Transforming</span> Indian Construction
              </h1>
              <p className="section-subtitle">
                ConstructX: India&apos;s first comprehensive digital platform for contractors. All services are free of cost. From tender to completion, we&apos;ve got you covered.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <button className="btn-primary">Start Free Trial</button>
                <button className="btn-outline">
                  <i className="fas fa-play-circle mr-2"></i> Watch Demo
                </button>
              </div>
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="stats-card">
                  <div className="stats-number">10,000+</div>
                  <div className="stats-label">Projects</div>
                </div>
                <div className="stats-card">
                  <div className="stats-number">5,000+</div>
                  <div className="stats-label">Contractors</div>
                </div>
                <div className="stats-card">
                  <div className="stats-number">₹5000Cr+</div>
                  <div className="stats-label">Project Value</div>
                </div>
                <div className="stats-card">
                  <div className="stats-number">24/7</div>
                  <div className="stats-label">Support</div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block h-[400px] relative">
              <p className="text-center text-gray-400 absolute inset-0 flex items-center justify-center">3D Hero Model Area</p>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <i className="fas fa-chevron-down text-2xl text-gray-400"></i>
        </div>
      </section>

      {/* Features Overview */}
      <section id="features" className="section bg-gray-50 py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Everything You Need to <span className="gradient-text">Build Better</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Our comprehensive platform covers all aspects of construction project
              management with India-specific features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-file-signature"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Tender Management</h3>
              <p className="text-gray-600">
                Find, analyze and bid on tenders with intelligent tools. Get alerts for relevant tenders across all government portals.
                <Link href="/tenders" className="text-[color:var(--primary)] hover:underline block mt-2">Explore Tenders &rarr;</Link>
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Labor Management</h3>
              <p className="text-gray-600">
                Digital attendance, payroll, and compliance tools. Track worker attendance with biometrics and automate PF/ESIC compliance.
                <Link href="/labor" className="text-[color:var(--primary)] hover:underline block mt-2">Manage Labor &rarr;</Link>
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-calculator"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">BOQ & Estimation</h3>
              <p className="text-gray-600">
                Create accurate bills of quantities and cost estimates. Compare your estimates with similar completed projects.
                <Link href="/boq-calculators" className="text-[color:var(--primary)] hover:underline block mt-2">Use Calculators &rarr;</Link>
                <Link href="/material-estimation" className="text-[color:var(--primary)] hover:underline block mt-1">AI Material Estimation &rarr;</Link>
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-truck"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Material Procurement</h3>
              <p className="text-gray-600">
                Streamline purchasing with vendor management and inventory tracking. Get competitive pricing.
                <Link href="/market" className="text-[color:var(--primary)] hover:underline block mt-2">Check Market Prices &rarr;</Link>
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Project Financials</h3>
              <p className="text-gray-600">
                Complete financial control with accounting, billing, and cash flow management. Generate RA bills with automatic GST.
                <Link href="/financials" className="text-[color:var(--primary)] hover:underline block mt-2">Financial Guide &rarr;</Link>
                <Link href="/gst" className="text-[color:var(--primary)] hover:underline block mt-1">GST Info &rarr;</Link>
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-tasks"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Project & Task Management</h3>
              <p className="text-gray-600">
                Oversee all your projects with Kanban boards, track progress, costs, and manage tasks efficiently.
                <Link href="/projects" className="text-[color:var(--primary)] hover:underline block mt-2">Manage Projects &rarr;</Link>
                <Link href="/tasks" className="text-[color:var(--primary)] hover:underline block mt-1">Manage Tasks &rarr;</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tender Management Section (Simplified Placeholder) */}
      <section id="tender" className="section bg-white py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">
                <span className="gradient-text">Smarter</span> Tender Bidding
              </h2>
              <p className="section-subtitle">
                Win more projects with our intelligent tender discovery and
                bidding tools tailored for Indian construction market.
                Access comprehensive tender listings and insights.
              </p>
              <Link href="/tenders" className="btn-primary mt-6">
                Explore Tender Listings
              </Link>
            </div>
            <div className="hidden lg:block h-[300px] relative">
              <p className="text-center text-gray-400 absolute inset-0 flex items-center justify-center">3D Tender Documents Model Area</p>
            </div>
          </div>
        </div>
      </section>

      {/* Labor Management Section (Simplified Placeholder) */}
      <section id="labor" className="section bg-gray-50 py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 hidden lg:block h-[300px] relative">
              <p className="text-center text-gray-400 absolute inset-0 flex items-center justify-center">3D Labor Management Model Area</p>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="section-title">
                <span className="gradient-text">Digital</span> Workforce Management
              </h2>
              <p className="section-subtitle">
                Streamline your labor operations with our comprehensive
                workforce management system designed for Indian construction sites.
                Manage your team and find external resources.
              </p>
              <Link href="/labor" className="btn-primary mt-6">
                Manage Your Labor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section bg-white py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Simple, <span className="gradient-text">Transparent Pricing</span>
            </h2>
            <p className="section-subtitle mx-auto">
              ConstructX is India&apos;s first contractor app offering all its premium services completely free of cost.
              Empower your business without any financial burden.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="feature-card col-span-1 md:col-span-3 lg:col-span-1 lg:col-start-2"> {/* Centered single card */}
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">ConstructX Standard Plan</h3>
                <p className="text-gray-600 mb-6">All features, completely free.</p>
                <div className="text-4xl font-bold mb-6">
                  <span className="gradient-text">₹0</span>
                  <span className="text-lg font-normal text-gray-600">/month</span>
                </div>
                <button className="btn-primary w-full">Get Started For Free</button>
              </div>
              <div className="mt-8 space-y-4">
                <div className="flex items-center"><i className="fas fa-check text-green-500 mr-3"></i><span>Unlimited Projects</span></div>
                <div className="flex items-center"><i className="fas fa-check text-green-500 mr-3"></i><span>Full Tender Management</span></div>
                <div className="flex items-center"><i className="fas fa-check text-green-500 mr-3"></i><span>Comprehensive Labor Management</span></div>
                <div className="flex items-center"><i className="fas fa-check text-green-500 mr-3"></i><span>BOQ & AI Estimation Tools</span></div>
                <div className="flex items-center"><i className="fas fa-check text-green-500 mr-3"></i><span>Material Procurement & Market Insights</span></div>
                <div className="flex items-center"><i className="fas fa-check text-green-500 mr-3"></i><span>Project Financials & GST Guidance</span></div>
                <div className="flex items-center"><i className="fas fa-check text-green-500 mr-3"></i><span>HRMS & Compliance Features</span></div>
                <div className="flex items-center"><i className="fas fa-check text-green-500 mr-3"></i><span>24/7 Support</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Placeholder */}
      <section className="section bg-gray-50 py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Trusted by <span className="gradient-text">Leading Contractors</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Placeholder Testimonials */}
            {[1, 2, 3].map(i => (
              <div key={i} className="feature-card">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-[color:var(--primary)] font-bold text-xl mr-4">
                    {['CS', 'RV', 'PM'][i - 1]}
                  </div>
                  <div>
                    <h4 className="font-bold">Contractor {i}</h4>
                    <p className="text-sm text-gray-600">City, State</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  &quot;ConstructX has been a game-changer for our operations. The comprehensive suite of free tools is unbeatable!&quot;
                </p>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, j) => <i key={j} className="fas fa-star"></i>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="contact" className="section bg-gradient-to-br from-[color:var(--primary)] to-[color:var(--secondary)] py-20">
        <div className="container">
          <div className="text-center text-white">
            <h2 className="section-title">
              Ready to Transform Your Construction Business?
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-12">
              Join thousands of Indian contractors who are building smarter
              with ConstructX. It&apos;s completely free, forever.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="btn-primary bg-white text-[color:var(--primary)] hover:bg-gray-100">
                Sign Up For Free
              </button>
              <button className="btn-outline border-white text-white hover:bg-white hover:text-[color:var(--primary)]">
                <i className="fas fa-phone-alt mr-2"></i> Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center mb-6">
                <i className="fas fa-hard-hat text-3xl text-blue-400 mr-3"></i>
                <span className="text-xl font-bold">ConstructX</span>
              </div>
              <p className="text-gray-400 mb-6">
                The complete digital platform for Indian construction contractors.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white text-xl"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="text-gray-400 hover:text-white text-xl"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-gray-400 hover:text-white text-xl"><i className="fab fa-linkedin-in"></i></a>
                <a href="#" className="text-gray-400 hover:text-white text-xl"><i className="fab fa-instagram"></i></a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link href="/dashboard" className="text-gray-400 hover:text-white">Dashboard</Link></li>
                <li><Link href="/projects" className="text-gray-400 hover:text-white">Projects</Link></li>
                <li><Link href="/tasks" className="text-gray-400 hover:text-white">Tasks</Link></li>
                <li><Link href="/architects" className="text-gray-400 hover:text-white">Architects</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Resources</h3>
              <ul className="space-y-3">
                <li><Link href="/financials" className="text-gray-400 hover:text-white">Financial Guide</Link></li>
                <li><Link href="/gst" className="text-gray-400 hover:text-white">GST Info</Link></li>
                <li><Link href="/market" className="text-gray-400 hover:text-white">Market Prices</Link></li>
                <li><Link href="/boq-calculators" className="text-gray-400 hover:text-white">BOQ Calculators</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Support</h3>
              <ul className="space-y-3">
                <li><a href="#contact" className="text-gray-400 hover:text-white">Help Center</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} ConstructX. All rights reserved. Built for India.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
