"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, File, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface FileUploaderProps {
  onFileUpload: (file: File) => void
}

export function FileUploader({ onFileUpload }: FileUploaderProps) {
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    // Check if file is JSON
    if (file.type !== "application/json" && !file.name.endsWith(".json")) {
      alert("Please upload a JSON file")
      return
    }

    setSelectedFile(file)
    onFileUpload(file)
  }

  const removeFile = () => {
    setSelectedFile(null)
  }

  const openFileSelector = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  // For demo purposes, we'll provide a sample file option
  const useSampleData = () => {
    // Create a mock file object
    const mockFile = new File(
      ['{"scan_data": [[0.1, 0.2, 0.3], [0.4, 0.5, 0.6], [0.7, 0.8, 0.9]]}'],
      "sample_fsm_scan.json",
      {
        type: "application/json",
      },
    )
    handleFile(mockFile)
  }

  return (
    <div className="space-y-4">
      <div
        className={`
          border-2 border-dashed rounded-lg p-8
          ${dragActive ? "border-primary bg-primary/5" : "border-border"}
          ${selectedFile ? "bg-black/10" : ""}
          transition-colors duration-200
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input ref={inputRef} type="file" className="hidden" accept=".json" onChange={handleChange} />

        {!selectedFile ? (
          <div className="flex flex-col items-center justify-center py-4">
            <Upload className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Upload FSM Scan Data</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Drag and drop your JSON scan file here, or click to browse
            </p>
            <Button onClick={openFileSelector}>Select File</Button>
            <p className="text-xs text-muted-foreground mt-4">Supported format: JSON files containing FSM scan data</p>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
                <File className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">{(selectedFile.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={removeFile}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">Don't have an FSM scan file?</p>
        <Button variant="outline" onClick={useSampleData}>
          Use Sample Data
        </Button>
      </div>

      <Card className="mt-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-2">What is an FSM scan?</h3>
          <p className="text-sm text-muted-foreground">
            Fluorescence Scanning Microscopy (FSM) is a technique used to image fluorescent objects, such as
            Nitrogen-Vacancy (NV) centers in diamond. FSM scans capture the fluorescence intensity at each point in a
            sample, creating a 2D image where brighter areas indicate higher fluorescence, potentially corresponding to
            NV centers. The NVision algorithm processes these scans in JSON format.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
