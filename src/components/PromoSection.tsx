"use client";

import { motion } from 'framer-motion';

export default function PromoSection() {
  const stats = [
    { number: "300+", label: "Lotes Disponibles", delay: 0 },
    { number: "24/7", label: "Seguridad Privada", delay: 0.1 },
    { number: "100%", label: "Financiamiento", delay: 0.2 }
  ];

  return (
    <section className="relative min-h-[80vh] flex flex-col md:flex-row bg-primary overflow-hidden">
      
      {/* LEFT SIDE: Content & Stats (Editorial Style) */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-20 py-20 z-10 bg-primary">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative Line */}
          <div className="w-20 h-1 bg-accent mb-8" />
          
          <h2 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            CONSTRUYENDO <br />
            <span className="text-white/20">TU FUTURO</span>
          </h2>

          <p className="text-lg text-white/70 font-light max-w-md mb-12 leading-relaxed">
            Ubicado estratégicamente en la zona de mayor crecimiento de Tegucigalpa. 
            Ciudad Venecia no es solo un terreno, es el escenario de tu nueva vida.
          </p>

          {/* Stats Grid - Vertical on mobile, Grid on desktop */}
          <div className="grid grid-cols-1 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + stat.delay, duration: 0.5 }}
                className="group flex items-center gap-6 border-b border-white/10 pb-6 hover:border-accent/50 transition-colors duration-300 cursor-default"
              >
                <span className="text-4xl md:text-5xl font-display font-bold text-white group-hover:text-accent transition-colors duration-300 w-32">
                  {stat.number}
                </span>
                <span className="text-sm md:text-base uppercase tracking-widest text-white/60 group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* RIGHT SIDE: Parallax Image Window */}
      <div className="w-full md:w-1/2 relative min-h-[50vh] md:min-h-auto overflow-hidden">
        {/* The Image Container with subtle movement */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053')",
          }}
        />
        
        {/* Gradient Overlay for integration */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/20 to-transparent md:bg-gradient-to-r md:from-primary md:via-transparent md:to-transparent" />
        
        {/* Floating Abstract Element (Optional Factor WOW) */}
        <div className="absolute bottom-10 right-10 bg-white/10 backdrop-blur-md p-6 border border-white/20 max-w-xs hidden md:block">
          <p className="text-white text-xs uppercase tracking-widest mb-2 font-bold text-accent">Ubicación Premium</p>
          <p className="text-white/90 text-sm font-light">
            Conectado con las principales arterias viales, pero lejos del ruido de la ciudad.
          </p>
        </div>
      </div>

    </section>
  );
}
