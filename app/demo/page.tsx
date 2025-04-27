"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, Settings, Play, Info, ArrowLeft, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { FileUploader } from "@/components/file-uploader"
import { ResultsViewer } from "@/components/results-viewer"

export default function DemoPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("upload")
  const [isProcessing, setIsProcessing] = useState(false)
  const [hasResults, setHasResults] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  // Detection parameters - matching gui.py options
  const [params, setParams] = useState({
    threshold: 0.75,
    minSize: 3,
    maxSize: 15,
    backgroundCorrection: true,
    colormap: "viridis",
    showMarkers: true,
    confidenceThreshold: 0.8,
    medianFilter: true,
    filterSize: 3,
  })

  const handleFileUpload = (file: File) => {
    setUploadedFile(file)
    // Automatically move to the next tab after upload
    setActiveTab("parameters")
  }

  const handleRunAnalysis = () => {
    setIsProcessing(true)

    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false)
      setHasResults(true)
      setActiveTab("results")
    }, 3000)
  }

  const handleReset = () => {
    setUploadedFile(null)
    setHasResults(false)
    setActiveTab("upload")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">NVision Interactive Demo</h1>
            <p className="text-muted-foreground">Run the NVision algorithm on your FSM scan data</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload" disabled={isProcessing}>
              <Upload className="mr-2 h-4 w-4" />
              Upload Data
            </TabsTrigger>
            <TabsTrigger value="parameters" disabled={!uploadedFile || isProcessing}>
              <Settings className="mr-2 h-4 w-4" />
              Parameters
            </TabsTrigger>
            <TabsTrigger value="results" disabled={!hasResults || isProcessing}>
              <Info className="mr-2 h-4 w-4" />
              Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4">
            <FileUploader onFileUpload={handleFileUpload} />
          </TabsContent>

          <TabsContent value="parameters" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Detection Parameters</CardTitle>
                  <CardDescription>Configure the parameters for NV center detection</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="threshold">Detection Threshold</Label>
                      <span className="text-sm text-muted-foreground">{params.threshold.toFixed(2)}</span>
                    </div>
                    <Slider
                      id="threshold"
                      min={0}
                      max={1}
                      step={0.01}
                      value={[params.threshold]}
                      onValueChange={(value) => setParams({ ...params, threshold: value[0] })}
                    />
                    <p className="text-xs text-muted-foreground">
                      Higher values increase precision but may miss some NV centers
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="confidenceThreshold">Confidence Threshold</Label>
                      <span className="text-sm text-muted-foreground">{params.confidenceThreshold.toFixed(2)}</span>
                    </div>
                    <Slider
                      id="confidenceThreshold"
                      min={0}
                      max={1}
                      step={0.01}
                      value={[params.confidenceThreshold]}
                      onValueChange={(value) => setParams({ ...params, confidenceThreshold: value[0] })}
                    />
                    <p className="text-xs text-muted-foreground">Minimum confidence level for NV center detection</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="minSize">Minimum Size</Label>
                      <Input
                        id="minSize"
                        type="number"
                        min={1}
                        max={params.maxSize - 1}
                        value={params.minSize}
                        onChange={(e) => setParams({ ...params, minSize: Number.parseInt(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxSize">Maximum Size</Label>
                      <Input
                        id="maxSize"
                        type="number"
                        min={params.minSize + 1}
                        max={50}
                        value={params.maxSize}
                        onChange={(e) => setParams({ ...params, maxSize: Number.parseInt(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="bgCorrection">Background Correction</Label>
                      <p className="text-xs text-muted-foreground">Removes background noise from the scan</p>
                    </div>
                    <Switch
                      id="bgCorrection"
                      checked={params.backgroundCorrection}
                      onCheckedChange={(checked) => setParams({ ...params, backgroundCorrection: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="medianFilter">Median Filter</Label>
                      <p className="text-xs text-muted-foreground">Apply median filter to reduce noise</p>
                    </div>
                    <Switch
                      id="medianFilter"
                      checked={params.medianFilter}
                      onCheckedChange={(checked) => setParams({ ...params, medianFilter: checked })}
                    />
                  </div>

                  {params.medianFilter && (
                    <div className="space-y-2">
                      <Label htmlFor="filterSize">Filter Size</Label>
                      <Select
                        value={params.filterSize.toString()}
                        onValueChange={(value) => setParams({ ...params, filterSize: Number.parseInt(value) })}
                      >
                        <SelectTrigger id="filterSize">
                          <SelectValue placeholder="Select filter size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3x3</SelectItem>
                          <SelectItem value="5">5x5</SelectItem>
                          <SelectItem value="7">7x7</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">Size of the median filter kernel</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button onClick={handleRunAnalysis} disabled={isProcessing} className="w-full">
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Run Analysis
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Visualization Options</CardTitle>
                  <CardDescription>Configure how results will be displayed</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="colormap">Color Map</Label>
                    <Select
                      value={params.colormap}
                      onValueChange={(value) => setParams({ ...params, colormap: value })}
                    >
                      <SelectTrigger id="colormap">
                        <SelectValue placeholder="Select a colormap" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="viridis">Viridis</SelectItem>
                        <SelectItem value="plasma">Plasma</SelectItem>
                        <SelectItem value="inferno">Inferno</SelectItem>
                        <SelectItem value="magma">Magma</SelectItem>
                        <SelectItem value="cividis">Cividis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="showMarkers">Show NV Center Markers</Label>
                      <p className="text-xs text-muted-foreground">
                        Highlight detected NV centers on the visualization
                      </p>
                    </div>
                    <Switch
                      id="showMarkers"
                      checked={params.showMarkers}
                      onCheckedChange={(checked) => setParams({ ...params, showMarkers: checked })}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Button variant="outline" onClick={handleReset}>
                            Reset
                          </Button>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Clear current data and start over</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="results" className="space-y-4">
            <ResultsViewer params={params} onReset={handleReset} />
          </TabsContent>
        </Tabs>

        {/* Demo explanation with actual Python code from gui.py */}
        <div className="mt-12 p-6 bg-black/20 rounded-xl border border-border">
          <h2 className="text-xl font-semibold mb-4">How This Demo Works</h2>
          <p className="mb-4">
            This interactive demo showcases the NVision algorithm's capabilities for identifying Nitrogen-Vacancy
            centers in FSM scans of delta-doped diamond. In a production environment, the web interface would connect to
            a backend service that runs the Python code from the repository.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <div>
              <h3 className="text-lg font-medium mb-4">The NVision Algorithm (gui.py)</h3>
              <div className="bg-black rounded-lg p-4 overflow-x-auto text-sm h-[400px] overflow-y-auto">
                <pre className="text-gray-300">
                  {`# Core detection function from the NVision repository (gui.py)
import numpy as np
import json
import tkinter as tk
from tkinter import filedialog, ttk
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
from scipy import ndimage
import matplotlib.colors as mcolors

class NVisionGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("NVision - NV Center Detection")
        self.root.geometry("1200x800")
        
        # Data variables
        self.scan_data = None
        self.results = None
        
        # Parameters
        self.threshold_var = tk.DoubleVar(value=0.75)
        self.min_size_var = tk.IntVar(value=3)
        self.max_size_var = tk.IntVar(value=15)
        self.bg_correction_var = tk.BooleanVar(value=True)
        self.colormap_var = tk.StringVar(value="viridis")
        self.show_markers_var = tk.BooleanVar(value=True)
        self.confidence_threshold_var = tk.DoubleVar(value=0.8)
        self.median_filter_var = tk.BooleanVar(value=True)
        self.filter_size_var = tk.IntVar(value=3)
        
        # Create UI
        self.create_ui()
    
    def create_ui(self):
        # Main frame
        main_frame = ttk.Frame(self.root)
        main_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        # Left panel (controls)
        left_panel = ttk.LabelFrame(main_frame, text="Controls")
        left_panel.pack(side=tk.LEFT, fill=tk.Y, padx=5, pady=5)
        
        # File selection
        file_frame = ttk.Frame(left_panel)
        file_frame.pack(fill=tk.X, padx=5, pady=5)
        
        ttk.Button(file_frame, text="Load JSON File", command=self.load_file).pack(fill=tk.X)
        
        # Parameters frame
        params_frame = ttk.LabelFrame(left_panel, text="Detection Parameters")
        params_frame.pack(fill=tk.X, padx=5, pady=5)
        
        # Threshold
        ttk.Label(params_frame, text="Detection Threshold:").pack(anchor=tk.W)
        threshold_scale = ttk.Scale(params_frame, from_=0, to=1, variable=self.threshold_var)
        threshold_scale.pack(fill=tk.X)
        
        # Confidence Threshold
        ttk.Label(params_frame, text="Confidence Threshold:").pack(anchor=tk.W)
        confidence_scale = ttk.Scale(params_frame, from_=0, to=1, variable=self.confidence_threshold_var)
        confidence_scale.pack(fill=tk.X)
        
        # Size range
        size_frame = ttk.Frame(params_frame)
        size_frame.pack(fill=tk.X, pady=5)
        
        ttk.Label(size_frame, text="Min Size:").grid(row=0, column=0)
        ttk.Spinbox(size_frame, from_=1, to=50, textvariable=self.min_size_var, width=5).grid(row=0, column=1)
        
        ttk.Label(size_frame, text="Max Size:").grid(row=0, column=2, padx=(10, 0))
        ttk.Spinbox(size_frame, from_=1, to=50, textvariable=self.max_size_var, width=5).grid(row=0, column=3)
        
        # Background correction
        ttk.Checkbutton(params_frame, text="Background Correction", variable=self.bg_correction_var).pack(anchor=tk.W, pady=5)
        
        # Median filter
        median_check = ttk.Checkbutton(params_frame, text="Median Filter", variable=self.median_filter_var, command=self.toggle_filter_size)
        median_check.pack(anchor=tk.W)
        
        self.filter_size_frame = ttk.Frame(params_frame)
        self.filter_size_frame.pack(fill=tk.X, pady=5)
        
        ttk.Label(self.filter_size_frame, text="Filter Size:").pack(side=tk.LEFT)
        filter_combo = ttk.Combobox(self.filter_size_frame, textvariable=self.filter_size_var, values=[3, 5, 7], width=5)
        filter_combo.pack(side=tk.LEFT, padx=5)
        
        # Visualization options
        viz_frame = ttk.LabelFrame(left_panel, text="Visualization")
        viz_frame.pack(fill=tk.X, padx=5, pady=5)
        
        ttk.Label(viz_frame, text="Colormap:").pack(anchor=tk.W)
        colormap_combo = ttk.Combobox(viz_frame, textvariable=self.colormap_var, 
                                      values=["viridis", "plasma", "inferno", "magma", "cividis"])
        colormap_combo.pack(fill=tk.X, pady=2)
        
        ttk.Checkbutton(viz_frame, text="Show NV Center Markers", variable=self.show_markers_var).pack(anchor=tk.W, pady=5)
        
        # Run button
        ttk.Button(left_panel, text="Run Analysis", command=self.run_analysis).pack(fill=tk.X, padx=5, pady=10)
        
        # Right panel (visualization)
        right_panel = ttk.Frame(main_frame)
        right_panel.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True, padx=5, pady=5)
        
        # Tabs for different visualizations
        self.tabs = ttk.Notebook(right_panel)
        self.tabs.pack(fill=tk.BOTH, expand=True)
        
        # Visualization tab
        self.viz_tab = ttk.Frame(self.tabs)
        self.tabs.add(self.viz_tab, text="Visualization")
        
        # Data tab
        self.data_tab = ttk.Frame(self.tabs)
        self.tabs.add(self.data_tab, text="Data")
        
        # Histogram tab
        self.hist_tab = ttk.Frame(self.tabs)
        self.tabs.add(self.hist_tab, text="Histogram")
        
        # Setup visualization
        self.setup_visualization()
        
        # Status bar
        self.status_var = tk.StringVar(value="Ready")
        status_bar = ttk.Label(self.root, textvariable=self.status_var, relief=tk.SUNKEN, anchor=tk.W)
        status_bar.pack(side=tk.BOTTOM, fill=tk.X)
    
    def toggle_filter_size(self):
        if self.median_filter_var.get():
            self.filter_size_frame.pack(fill=tk.X, pady=5)
        else:
            self.filter_size_frame.pack_forget()
    
    def setup_visualization(self):
        # Visualization tab
        self.fig_viz, self.ax_viz = plt.subplots(figsize=(6, 6))
        self.canvas_viz = FigureCanvasTkAgg(self.fig_viz, master=self.viz_tab)
        self.canvas_viz.get_tk_widget().pack(fill=tk.BOTH, expand=True)
        
        # Data tab
        self.data_frame = ttk.Frame(self.data_tab)
        self.data_frame.pack(fill=tk.BOTH, expand=True)
        
        # Treeview for data
        columns = ("id", "x", "y", "size", "intensity", "confidence")
        self.tree = ttk.Treeview(self.data_frame, columns=columns, show="headings")
        
        # Define headings
        self.tree.heading("id", text="ID")
        self.tree.heading("x", text="X Position")
        self.tree.heading("y", text="Y Position")
        self.tree.heading("size", text="Size")
        self.tree.heading("intensity", text="Intensity")
        self.tree.heading("confidence", text="Confidence")
        
        # Define columns
        self.tree.column("id", width=50)
        self.tree.column("x", width=100)
        self.tree.column("y", width=100)
        self.tree.column("size", width=80)
        self.tree.column("intensity", width=100)
        self.tree.column("confidence", width=100)
        
        # Add scrollbar
        scrollbar = ttk.Scrollbar(self.data_frame, orient=tk.VERTICAL, command=self.tree.yview)
        self.tree.configure(yscroll=scrollbar.set)
        
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        self.tree.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        
        # Histogram tab
        self.fig_hist, self.ax_hist = plt.subplots(figsize=(6, 6))
        self.canvas_hist = FigureCanvasTkAgg(self.fig_hist, master=self.hist_tab)
        self.canvas_hist.get_tk_widget().pack(fill=tk.BOTH, expand=True)
    
    def load_file(self):
        file_path = filedialog.askopenfilename(
            title="Select JSON File",
            filetypes=[("JSON files", "*.json"), ("All files", "*.*")]
        )
        
        if file_path:
            try:
                with open(file_path, 'r') as f:
                    data = json.load(f)
                
                self.scan_data = np.array(data['scan_data'])
                self.status_var.set(f"Loaded file: {file_path}")
                
                # Display the scan data
                self.display_scan()
            except Exception as e:
                self.status_var.set(f"Error loading file: {str(e)}")
    
    def display_scan(self):
        if self.scan_data is not None:
            self.ax_viz.clear()
            self.ax_viz.imshow(self.scan_data, cmap=self.colormap_var.get())
            self.ax_viz.set_title("FSM Scan Data")
            self.canvas_viz.draw()
    
    def run_analysis(self):
        if self.scan_data is None:
            self.status_var.set("No data loaded. Please load a JSON file first.")
            return
        
        self.status_var.set("Running analysis...")
        self.root.update()
        
        # Get parameters
        params = {
            'threshold': self.threshold_var.get(),
            'min_size': self.min_size_var.get(),
            'max_size': self.max_size_var.get(),
            'background_correction': self.bg_correction_var.get(),
            'confidence_threshold': self.confidence_threshold_var.get(),
            'median_filter': self.median_filter_var.get(),
            'filter_size': self.filter_size_var.get()
        }
        
        # Process the data
        processed_data = self.preprocess_data(self.scan_data, params)
        
        # Detect NV centers
        self.results = self.detect_nv_centers(processed_data, params)
        
        # Update visualizations
        self.update_visualizations()
        
        self.status_var.set(f"Analysis complete. Detected {len(self.results['centers'])} NV centers.")
    
    def preprocess_data(self, data, params):
        # Apply median filter if enabled
        if params['median_filter']:
            data = ndimage.median_filter(data, size=params['filter_size'])
        
        # Apply background correction if enabled
        if params['background_correction']:
            # Apply Gaussian filter to estimate background
            background = ndimage.gaussian_filter(data, sigma=10)
            
            # Subtract background from original image
            corrected_data = data - background
            
            # Clip negative values to zero
            corrected_data = np.clip(corrected_data, 0, None)
            
            return corrected_data
        
        return data
    
    def detect_nv_centers(self, image_data, params):
        # Apply threshold to identify potential NV centers
        binary_image = image_data > params['threshold'] * np.max(image_data)
        
        # Label connected components
        labeled_image, num_features = ndimage.label(binary_image)
        
        # Filter by size
        centers = []
        for i in range(1, num_features + 1):
            region = labeled_image == i
            size = np.sum(region)
            
            if params['min_size'] <= size <= params['max_size']:
                # Calculate center of mass
                y, x = ndimage.center_of_mass(region)
                intensity = np.mean(image_data[region])
                
                # Calculate confidence (example metric)
                confidence = intensity / np.max(image_data)
                
                if confidence >= params['confidence_threshold']:
                    centers.append({
                        'id': len(centers) + 1,
                        'x': float(x),
                        'y': float(y),
                        'size': int(size),
                        'intensity': float(intensity),
                        'confidence': float(confidence)
                    })
        
        return {
            'centers': centers,
            'total': len(centers),
            'params': params,
            'binary_image': binary_image
        }
    
    def update_visualizations(self):
        if self.results is None:
            return
        
        # Update visualization tab
        self.ax_viz.clear()
        self.ax_viz.imshow(self.scan_data, cmap=self.colormap_var.get())
        
        if self.show_markers_var.get():
            for center in self.results['centers']:
                circle = plt.Circle((center['x'], center['y']), 
                                   np.sqrt(center['size']/np.pi), 
                                   fill=False, 
                                   edgecolor='white')
                self.ax_viz.add_patch(circle)
        
        self.ax_viz.set_title(f"Detected {len(self.results['centers'])} NV Centers")
        self.canvas_viz.draw()
        
        # Update data tab
        for item in self.tree.get_children():
            self.tree.delete(item)
        
        for center in self.results['centers']:
            self.tree.insert("", tk.END, values=(
                center['id'],
                f"{center['x']:.2f}",
                f"{center['y']:.2f}",
                center['size'],
                f"{center['intensity']:.2f}",
                f"{center['confidence']:.2f}"
            ))
        
        # Update histogram tab
        self.ax_hist.clear()
        
        if self.results['centers']:
            intensities = [center['intensity'] for center in self.results['centers']]
            self.ax_hist.hist(intensities, bins=10, color='purple', alpha=0.7)
            self.ax_hist.set_title("Intensity Distribution")
            self.ax_hist.set_xlabel("Intensity")
            self.ax_hist.set_ylabel("Count")
        
        self.canvas_hist.draw()

if __name__ == "__main__":
    root = tk.Tk()
    app = NVisionGUI(root)
    root.mainloop()`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Quantum Visualization</h3>
              <div className="bg-black rounded-lg p-4 h-[400px] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20"></div>

                {/* Diamond lattice visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-4/5 h-4/5">
                    {/* Diamond lattice structure */}
                    <div className="absolute inset-0">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div
                          key={`row-${i}`}
                          className="absolute w-full border-t border-white/10"
                          style={{ top: `${i * 10}%` }}
                        />
                      ))}
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div
                          key={`col-${i}`}
                          className="absolute h-full border-l border-white/10"
                          style={{ left: `${i * 10}%` }}
                        />
                      ))}
                    </div>

                    {/* NV centers */}
                    {Array.from({ length: 15 }).map((_, i) => {
                      const x = Math.random() * 100
                      const y = Math.random() * 100
                      const size = Math.random() * 1.5 + 0.5

                      return (
                        <div
                          key={`nv-${i}`}
                          className="absolute rounded-full animate-pulse"
                          style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            width: `${size}rem`,
                            height: `${size}rem`,
                            backgroundColor: `rgba(${Math.floor(100 + Math.random() * 155)}, ${Math.floor(100 + Math.random() * 155)}, 255, 0.6)`,
                            boxShadow: `0 0 ${size * 5}px rgba(120, 120, 255, 0.8)`,
                            transform: "translate(-50%, -50%)",
                            animationDuration: `${3 + Math.random() * 2}s`,
                          }}
                        />
                      )
                    })}

                    {/* Carbon atoms */}
                    {Array.from({ length: 100 }).map((_, i) => {
                      const x = Math.random() * 100
                      const y = Math.random() * 100

                      return (
                        <div
                          key={`atom-${i}`}
                          className="absolute rounded-full bg-white/30"
                          style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            width: "0.15rem",
                            height: "0.15rem",
                            transform: "translate(-50%, -50%)",
                          }}
                        />
                      )
                    })}
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 text-xs text-white/70">
                  <p>Diamond lattice with NV centers (blue glow)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
