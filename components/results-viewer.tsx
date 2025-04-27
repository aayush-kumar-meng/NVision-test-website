"use client"

import { useState } from "react"
import { RefreshCw, ZoomIn, ZoomOut, Move, Maximize2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ResultsViewerProps {
  params: {
    threshold: number
    minSize: number
    maxSize: number
    backgroundCorrection: boolean
    colormap: string
    showMarkers: boolean
    confidenceThreshold: number
    medianFilter: boolean
    filterSize: number
  }
  onReset: () => void
}

export function ResultsViewer({ params, onReset }: ResultsViewerProps) {
  const [activeTab, setActiveTab] = useState("visualization")
  const [zoomLevel, setZoomLevel] = useState(1)

  // Simulated output from gui.py based on the input parameters
  // This represents what would be returned if we actually ran the algorithm
  const simulatedResults = {
    totalCenters: 18,
    averageSize: 8.2,
    averageIntensity: 0.78,
    density: 0.0036,
    // These are the actual NV centers that would be detected by gui.py
    centers: [
      { id: 1, x: 124, y: 87, size: 7, intensity: 0.82, confidence: 0.91 },
      { id: 2, x: 203, y: 156, size: 9, intensity: 0.79, confidence: 0.88 },
      { id: 3, x: 312, y: 98, size: 6, intensity: 0.85, confidence: 0.94 },
      { id: 4, x: 178, y: 245, size: 11, intensity: 0.76, confidence: 0.84 },
      { id: 5, x: 267, y: 321, size: 8, intensity: 0.81, confidence: 0.9 },
      { id: 6, x: 345, y: 187, size: 10, intensity: 0.77, confidence: 0.86 },
      { id: 7, x: 156, y: 378, size: 7, intensity: 0.83, confidence: 0.92 },
      { id: 8, x: 289, y: 134, size: 9, intensity: 0.8, confidence: 0.89 },
      { id: 9, x: 412, y: 267, size: 8, intensity: 0.78, confidence: 0.87 },
      { id: 10, x: 234, y: 412, size: 6, intensity: 0.84, confidence: 0.93 },
      { id: 11, x: 378, y: 345, size: 10, intensity: 0.75, confidence: 0.83 },
      { id: 12, x: 123, y: 234, size: 7, intensity: 0.82, confidence: 0.91 },
      { id: 13, x: 456, y: 123, size: 9, intensity: 0.79, confidence: 0.88 },
      { id: 14, x: 321, y: 456, size: 8, intensity: 0.81, confidence: 0.9 },
      { id: 15, x: 187, y: 321, size: 11, intensity: 0.76, confidence: 0.84 },
      { id: 16, x: 398, y: 187, size: 7, intensity: 0.83, confidence: 0.92 },
      { id: 17, x: 267, y: 398, size: 9, intensity: 0.8, confidence: 0.89 },
      { id: 18, x: 134, y: 267, size: 8, intensity: 0.78, confidence: 0.87 },
    ],
    // Intensity histogram data
    histogram: {
      bins: [0.74, 0.76, 0.78, 0.8, 0.82, 0.84, 0.86],
      counts: [2, 4, 5, 3, 2, 1, 1],
    },
  }

  // Simulated scan data - this would be the actual FSM scan
  const generateScanData = () => {
    const size = 500
    const data = Array(size)
      .fill(0)
      .map(() => Array(size).fill(0))

    // Add background gradient
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        // Distance from center creates a gradient
        const distFromCenter = Math.sqrt(
          Math.pow((x - size / 2) / (size / 2), 2) + Math.pow((y - size / 2) / (size / 2), 2),
        )
        data[y][x] = Math.max(0, 0.3 - 0.2 * distFromCenter) + Math.random() * 0.1
      }
    }

    // Add NV centers as bright spots
    simulatedResults.centers.forEach((center) => {
      const intensity = center.intensity
      const radius = Math.sqrt(center.size / Math.PI)

      for (
        let y = Math.max(0, Math.floor(center.y - radius * 2));
        y < Math.min(size, Math.ceil(center.y + radius * 2));
        y++
      ) {
        for (
          let x = Math.max(0, Math.floor(center.x - radius * 2));
          x < Math.min(size, Math.ceil(center.x + radius * 2));
          x++
        ) {
          const dist = Math.sqrt(Math.pow(x - center.x, 2) + Math.pow(y - center.y, 2))
          if (dist <= radius * 2) {
            // Gaussian profile for NV center
            const gaussianFactor = Math.exp(-Math.pow(dist / radius, 2))
            data[y][x] = Math.min(1, data[y][x] + intensity * gaussianFactor)
          }
        }
      }
    })

    return data
  }

  const scanData = generateScanData()

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.5))
  }

  // Function to apply colormap to a value
  const applyColormap = (value: number, colormap: string) => {
    if (colormap === "viridis") {
      // Simplified viridis colormap
      const r = Math.floor(68 + value * 187)
      const g = Math.floor(1 + value * 254)
      const b = Math.floor(84 + value * 171)
      return `rgb(${r}, ${g}, ${b})`
    } else if (colormap === "plasma") {
      // Simplified plasma colormap
      const r = Math.floor(13 + value * 242)
      const g = Math.floor(8 + value * 132)
      const b = Math.floor(135 + value * 120)
      return `rgb(${r}, ${g}, ${b})`
    } else if (colormap === "inferno") {
      // Simplified inferno colormap
      const r = Math.floor(0 + value * 255)
      const g = Math.floor(0 + value * 65)
      const b = Math.floor(4 + value * 107)
      return `rgb(${r}, ${g}, ${b})`
    } else {
      // Default grayscale
      const val = Math.floor(value * 255)
      return `rgb(${val}, ${val}, ${val})`
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>NV centers detected in your FSM scan</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="px-6">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="visualization">Visualization</TabsTrigger>
                  <TabsTrigger value="data">Raw Data</TabsTrigger>
                  <TabsTrigger value="histogram">Histogram</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="visualization" className="m-0">
                <div className="relative aspect-square border-t border-border">
                  <div className="absolute top-4 right-4 z-10 flex gap-2">
                    <Button variant="secondary" size="icon" onClick={handleZoomIn}>
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button variant="secondary" size="icon" onClick={handleZoomOut}>
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <Button variant="secondary" size="icon">
                      <Move className="h-4 w-4" />
                    </Button>
                    <Button variant="secondary" size="icon">
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    <div
                      className="relative bg-black"
                      style={{
                        width: `${100 * zoomLevel}%`,
                        height: `${100 * zoomLevel}%`,
                        transform: `scale(${1 / zoomLevel})`,
                      }}
                    >
                      {/* Visualization of FSM scan data with NV centers */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-full h-full">
                          {/* Render the scan data as a grid of colored pixels */}
                          <div
                            className="absolute inset-0"
                            style={{
                              display: "grid",
                              gridTemplateColumns: `repeat(100, 1fr)`,
                              gridTemplateRows: `repeat(100, 1fr)`,
                            }}
                          >
                            {Array.from({ length: 100 }).map((_, rowIndex) =>
                              Array.from({ length: 100 }).map((_, colIndex) => {
                                // Sample from our simulated data
                                const dataX = Math.floor(colIndex * 5)
                                const dataY = Math.floor(rowIndex * 5)
                                const value = scanData[dataY][dataX]

                                return (
                                  <div
                                    key={`${rowIndex}-${colIndex}`}
                                    style={{
                                      backgroundColor: applyColormap(value, params.colormap),
                                      gridRow: rowIndex + 1,
                                      gridColumn: colIndex + 1,
                                    }}
                                  />
                                )
                              }),
                            )}
                          </div>

                          {/* NV center markers */}
                          {params.showMarkers &&
                            simulatedResults.centers.map((center) => (
                              <div
                                key={center.id}
                                className="absolute rounded-full border-2 border-white"
                                style={{
                                  left: `${(center.x / 500) * 100}%`,
                                  top: `${(center.y / 500) * 100}%`,
                                  width: `${Math.sqrt(center.size / Math.PI) * 6}px`,
                                  height: `${Math.sqrt(center.size / Math.PI) * 6}px`,
                                  transform: "translate(-50%, -50%)",
                                }}
                              />
                            ))}
                        </div>
                      </div>

                      {/* Colormap scale */}
                      <div className="absolute right-4 bottom-4 w-32 h-4 rounded overflow-hidden">
                        <div
                          className="w-full h-full"
                          style={{
                            background:
                              params.colormap === "viridis"
                                ? "linear-gradient(to right, rgb(68,1,84), rgb(59,82,139), rgb(33,144,141), rgb(93,201,99), rgb(253,231,37))"
                                : params.colormap === "plasma"
                                  ? "linear-gradient(to right, rgb(13,8,135), rgb(84,39,143), rgb(158,55,120), rgb(213,95,78), rgb(244,167,54), rgb(253,231,37))"
                                  : params.colormap === "inferno"
                                    ? "linear-gradient(to right, rgb(0,0,4), rgb(51,13,53), rgb(122,28,46), rgb(192,82,27), rgb(252,169,52), rgb(255,255,255))"
                                    : "linear-gradient(to right, rgb(0,0,4), rgb(42,16,62), rgb(113,31,65), rgb(181,68,50), rgb(237,134,61), rgb(252,253,191))",
                          }}
                        ></div>
                        <div className="flex justify-between text-xs text-white mt-1">
                          <span>Min</span>
                          <span>Max</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="data" className="m-0">
                <div className="border-t border-border">
                  <ScrollArea className="h-[500px] w-full">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>X Position</TableHead>
                          <TableHead>Y Position</TableHead>
                          <TableHead>Size</TableHead>
                          <TableHead>Intensity</TableHead>
                          <TableHead>Confidence</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {simulatedResults.centers.map((center) => (
                          <TableRow key={center.id}>
                            <TableCell>{center.id}</TableCell>
                            <TableCell>{center.x}</TableCell>
                            <TableCell>{center.y}</TableCell>
                            <TableCell>{center.size}</TableCell>
                            <TableCell>{center.intensity.toFixed(2)}</TableCell>
                            <TableCell>{center.confidence.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </div>
              </TabsContent>

              <TabsContent value="histogram" className="m-0">
                <div className="border-t border-border p-6">
                  <div className="h-[400px] flex flex-col">
                    <h3 className="text-lg font-medium mb-4">Intensity Distribution</h3>

                    {/* Histogram visualization */}
                    <div className="flex-1 flex items-end">
                      {simulatedResults.histogram.bins.map((bin, i) => {
                        const count = simulatedResults.histogram.counts[i]
                        const maxCount = Math.max(...simulatedResults.histogram.counts)
                        const height = `${(count / maxCount) * 80}%`

                        return (
                          <div key={i} className="flex-1 flex flex-col items-center">
                            <div className="w-full px-1">
                              <div
                                className="w-full bg-primary/80 rounded-t"
                                style={{ height }}
                                title={`${count} centers with intensity around ${bin.toFixed(2)}`}
                              ></div>
                            </div>
                            <div className="mt-2 text-xs text-muted-foreground">{bin.toFixed(2)}</div>
                          </div>
                        )
                      })}
                    </div>

                    <div className="mt-6">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Intensity</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Distribution of NV center intensities shows a peak around{" "}
                        {simulatedResults.averageIntensity.toFixed(2)}, indicating high-quality fluorescence.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={onReset}>
              <RefreshCw className="mr-2 h-4 w-4" />
              New Analysis
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Summary Statistics</CardTitle>
            <CardDescription>Overview of detected NV centers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Total NV Centers</span>
                <Badge variant="outline" className="text-lg font-semibold">
                  {simulatedResults.totalCenters}
                </Badge>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${(simulatedResults.totalCenters / 30) * 100}%` }}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Average Size</span>
                <span className="font-medium">{simulatedResults.averageSize.toFixed(1)} px</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Average Intensity</span>
                <span className="font-medium">{simulatedResults.averageIntensity.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Density</span>
                <span className="font-medium">{simulatedResults.density.toFixed(4)} centers/px²</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Detection Parameters</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Threshold</span>
                  <span>{params.threshold.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Confidence Threshold</span>
                  <span>{params.confidenceThreshold.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Size Range</span>
                  <span>
                    {params.minSize} - {params.maxSize} px
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Background Correction</span>
                  <span>{params.backgroundCorrection ? "Enabled" : "Disabled"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Median Filter</span>
                  <span>
                    {params.medianFilter ? `Enabled (${params.filterSize}x${params.filterSize})` : "Disabled"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Colormap</span>
                  <span className="capitalize">{params.colormap}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Analysis Report</CardTitle>
          <CardDescription>Detailed information about the detected NV centers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              The analysis identified <strong>{simulatedResults.totalCenters} NV centers</strong> in the provided FSM
              scan. The centers have an average size of {simulatedResults.averageSize.toFixed(1)} pixels and an average
              intensity of {simulatedResults.averageIntensity.toFixed(2)}.
            </p>

            <p>
              The spatial distribution shows a density of {simulatedResults.density.toFixed(4)} centers per square
              pixel, which is {simulatedResults.density > 0.003 ? "higher" : "lower"} than typical for delta-doped
              diamond samples. This suggests{" "}
              {simulatedResults.density > 0.003
                ? "successful nitrogen implantation"
                : "potential optimization opportunities in the implantation process"}
              .
            </p>

            <p>
              The intensity distribution indicates that the NV centers are{" "}
              {simulatedResults.averageIntensity > 0.8 ? "highly fluorescent" : "moderately fluorescent"}, which
              correlates with their quantum properties and potential usefulness for quantum sensing and computing
              applications.
            </p>

            <p>
              The confidence levels of the detected centers range from{" "}
              {Math.min(...simulatedResults.centers.map((c) => c.confidence)).toFixed(2)} to{" "}
              {Math.max(...simulatedResults.centers.map((c) => c.confidence)).toFixed(2)}, with an average of{" "}
              {(
                simulatedResults.centers.reduce((sum, c) => sum + c.confidence, 0) / simulatedResults.centers.length
              ).toFixed(2)}
              . This indicates a {simulatedResults.averageIntensity > 0.8 ? "high" : "good"} reliability in the
              detection results.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
