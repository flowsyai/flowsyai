import React from 'react';

const SimpleTestIndex: React.FC = () => {
  // Debug logging for SimpleTestIndex page
  React.useEffect(() => {
    console.log('🧪 SimpleTestIndex page component mounted', {
      timestamp: new Date().toISOString(),
      location: window.location.href,
    });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Simple Navbar */}
      <nav className="border-b border-border bg-background/95 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">FA</span>
            </div>
            <span className="font-bold text-lg">FlowsyAI</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/waitlist" className="text-muted-foreground hover:text-foreground">
              Join Waitlist
            </a>
            <a href="/roadmap" className="text-muted-foreground hover:text-foreground">
              Roadmap
            </a>
          </div>
        </div>
      </nav>

      {/* Simple Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 py-12">
        <div className="text-center max-w-4xl mx-auto">
          {/* Revolutionary Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-6 py-2 mb-8 border border-primary/20">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-primary">REVOLUTIONARY AI PLATFORM</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 tracking-tight">
            <span className="block text-foreground mb-2">Revolutionary</span>
            <span className="block bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
              AI Automation Platform
            </span>
          </h1>

          {/* Subtitle */}
          <div className="mb-8">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Build Workflows in Augmented Reality
            </div>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Create powerful AI automations in{' '}
              <span className="text-primary font-semibold">3D space</span> using your mobile device.
              Connect <span className="text-yellow-500 font-semibold">enterprise AI models</span>{' '}
              with intuitive gesture controls and transform how you
              <span className="text-blue-500 font-semibold"> build automation workflows</span>.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            {[
              { text: 'AR Interface', color: 'text-yellow-500', description: 'Mobile AR' },
              { text: 'Real AI APIs', color: 'text-primary', description: 'Live Services' },
              { text: 'Instant Results', color: 'text-emerald-500', description: 'Real-time' },
              { text: '3D Workflows', color: 'text-blue-500', description: 'Spatial UI' },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl border border-border bg-card text-center hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center">
                  <div className={`w-6 h-6 rounded-full bg-current ${feature.color}`}></div>
                </div>
                <div className={`font-bold text-sm ${feature.color} mb-1`}>{feature.text}</div>
                <div className="text-xs text-muted-foreground">{feature.description}</div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="/waitlist"
              className="group relative overflow-hidden bg-gradient-to-r from-primary to-blue-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 ease-in-out text-base sm:text-lg px-10 py-6 w-full sm:w-auto text-center"
            >
              <span className="relative z-10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                📱 Join Waitlist →
              </span>
            </a>

            <a
              href="/roadmap"
              className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-semibold rounded-xl hover:shadow-xl hover:shadow-yellow-500/30 transition-all duration-300 ease-in-out text-base sm:text-lg px-10 py-6 w-full sm:w-auto text-center"
            >
              <span className="relative z-10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                ✨ View Roadmap →
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="border-t border-border bg-background py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">© 2025 FlowsyAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SimpleTestIndex;
