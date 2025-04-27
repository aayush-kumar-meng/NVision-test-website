import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Github, Download, Zap, Database, Microscope, Code } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full opacity-80"></div>
                <div className="absolute inset-1 bg-black rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                </div>
              </div>
              <span className="font-bold text-xl tracking-tight">NVision</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
            <Link href="#technology" className="text-sm font-medium transition-colors hover:text-primary">
              Technology
            </Link>
            <Link href="#features" className="text-sm font-medium transition-colors hover:text-primary">
              Features
            </Link>
            <Link href="#documentation" className="text-sm font-medium transition-colors hover:text-primary">
              Documentation
            </Link>
            <Link
              href="https://github.com/karaev-uchicago/quantum-NVision"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              GitHub
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button asChild>
              <Link href="https://github.com/karaev-uchicago/quantum-NVision/archive/refs/heads/main.zip">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-black py-24 md:py-32">
          <div className="absolute inset-0 z-0 opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(120,119,198,0.3),transparent_70%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(78,210,214,0.3),transparent_70%)]"></div>
          </div>
          <div className="container relative z-10 mx-auto px-4 text-center">
            <h1 className="bg-gradient-to-r from-purple-400 via-cyan-500 to-purple-400 bg-clip-text text-transparent text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Quantum Precision
              <br />
              Algorithmic Vision
            </h1>
            <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-300">
              NVision is an advanced algorithmic solution for identifying Nitrogen-Vacancy centers in FSM scans of
              delta-doped diamond, revolutionizing quantum sensing and computing applications.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="#technology">
                  Explore Technology
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="https://github.com/karaev-uchicago/quantum-NVision">
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 md:py-24 bg-gradient-to-b from-black to-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-6">What is NVision?</h2>
                <p className="text-lg mb-4 text-muted-foreground">
                  NVision is a cutting-edge algorithmic solution designed to identify and analyze Nitrogen-Vacancy (NV)
                  centers in delta-doped diamond samples using Fluorescence Scanning Microscopy (FSM) scans.
                </p>
                <p className="text-lg mb-6 text-muted-foreground">
                  Developed by quantum researchers, NVision automates the detection process, significantly improving
                  accuracy and efficiency compared to manual identification methods.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" asChild>
                    <Link href="#technology">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-cyan-900/20"></div>
                <Image
                  src="/placeholder.svg?height=720&width=1280"
                  alt="NVision Diamond Scan Visualization"
                  width={1280}
                  height={720}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm">Visualization of NV centers in diamond lattice</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section id="technology" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Advanced Quantum Technology</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                NVision leverages sophisticated algorithms to identify and characterize Nitrogen-Vacancy centers,
                crucial components for quantum computing and sensing applications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-black/5 dark:bg-white/5 p-8 rounded-xl border border-border">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-6">
                  <Microscope className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Precision Detection</h3>
                <p className="text-muted-foreground">
                  Identifies NV centers with nanometer precision from FSM scans, enabling accurate mapping of quantum
                  resources in diamond substrates.
                </p>
              </div>

              <div className="bg-black/5 dark:bg-white/5 p-8 rounded-xl border border-border">
                <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center mb-6">
                  <Code className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Algorithmic Analysis</h3>
                <p className="text-muted-foreground">
                  Employs advanced image processing and machine learning algorithms to distinguish NV centers from
                  background noise and artifacts.
                </p>
              </div>

              <div className="bg-black/5 dark:bg-white/5 p-8 rounded-xl border border-border">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-6">
                  <Database className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Data Integration</h3>
                <p className="text-muted-foreground">
                  Seamlessly processes and integrates data from various microscopy sources, providing comprehensive
                  analysis of diamond samples.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-black text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Powerful Features</h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                NVision provides researchers and quantum engineers with powerful tools to accelerate their work with NV
                centers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="relative">
                <div className="aspect-square rounded-xl overflow-hidden border border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10"></div>
                  <Image
                    src="/placeholder.svg?height=800&width=800"
                    alt="NVision Interface"
                    width={800}
                    height={800}
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                        <Zap className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold">Automated Detection</h3>
                    </div>
                    <p className="text-gray-300 pl-11">
                      Automatically identifies NV centers from FSM scans with high accuracy, eliminating the need for
                      manual identification.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                        <Zap className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold">Statistical Analysis</h3>
                    </div>
                    <p className="text-gray-300 pl-11">
                      Provides comprehensive statistical analysis of NV center distributions, densities, and
                      characteristics.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                        <Zap className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold">Visualization Tools</h3>
                    </div>
                    <p className="text-gray-300 pl-11">
                      Generates clear visualizations of NV center locations and properties for easy interpretation and
                      presentation.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                        <Zap className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold">Batch Processing</h3>
                    </div>
                    <p className="text-gray-300 pl-11">
                      Process multiple scans in batch mode, saving time and ensuring consistent analysis across samples.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Documentation Section */}
        <section id="documentation" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-6">Comprehensive Documentation</h2>
                <p className="text-lg mb-6 text-muted-foreground">
                  Get started quickly with our detailed documentation, including installation guides, API references,
                  and example workflows.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <span className="font-semibold text-purple-600 dark:text-purple-400">1</span>
                    </div>
                    <p className="font-medium">Installation and Setup</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <span className="font-semibold text-purple-600 dark:text-purple-400">2</span>
                    </div>
                    <p className="font-medium">Data Preparation</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <span className="font-semibold text-purple-600 dark:text-purple-400">3</span>
                    </div>
                    <p className="font-medium">Running Analysis</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <span className="font-semibold text-purple-600 dark:text-purple-400">4</span>
                    </div>
                    <p className="font-medium">Interpreting Results</p>
                  </div>
                </div>
                <div className="mt-8">
                  <Button asChild>
                    <Link href="https://github.com/karaev-uchicago/quantum-NVision/blob/main/README.md">
                      View Documentation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="bg-black/5 dark:bg-white/5 p-6 rounded-xl border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="flex-1"></div>
                  <div className="text-xs text-muted-foreground">example.py</div>
                </div>
                <pre className="text-sm overflow-x-auto p-4 bg-black text-gray-300 rounded-lg">
                  <code>{`import nvision

# Load FSM scan data
scan_data = nvision.load_scan("diamond_sample_001.fsm")

# Configure detection parameters
params = nvision.DetectionParams(
    threshold=0.75,
    min_size=3,
    max_size=15,
    background_correction=True
)

# Run NV center detection
results = nvision.detect_nv_centers(scan_data, params)

# Generate visualization
fig = nvision.visualize(
    scan_data, 
    results, 
    show_markers=True,
    colormap='viridis'
)

# Export results
nvision.export_results(results, "sample_001_results.csv")
print(f"Detected {len(results.centers)} NV centers")`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-6">Ready to Revolutionize Your Quantum Research?</h2>
            <p className="text-lg mb-8 text-muted-foreground max-w-2xl mx-auto">
              Start using NVision today and transform how you identify and analyze Nitrogen-Vacancy centers in your
              diamond samples.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="https://github.com/karaev-uchicago/quantum-NVision">
                  <Github className="mr-2 h-4 w-4" />
                  Get Started on GitHub
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#documentation">Explore Documentation</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background/80">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full opacity-80"></div>
                  <div className="absolute inset-1 bg-black rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                  </div>
                </div>
                <span className="font-bold text-xl tracking-tight">NVision</span>
              </Link>
              <p className="text-sm text-muted-foreground mb-4 max-w-md">
                NVision is an algorithmic solution for identifying Nitrogen-Vacancy centers in FSM scans of delta-doped
                diamond, developed for quantum research applications.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="https://github.com/karaev-uchicago/quantum-NVision"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#documentation"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/karaev-uchicago/quantum-NVision/blob/main/README.md"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Installation Guide
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/karaev-uchicago/quantum-NVision/issues"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Report Issues
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Project</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://github.com/karaev-uchicago/quantum-NVision"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    GitHub Repository
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/karaev-uchicago/quantum-NVision/blob/main/LICENSE"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    License
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/karaev-uchicago/quantum-NVision/blob/main/CONTRIBUTING.md"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contributing
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} NVision. All rights reserved.</p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
