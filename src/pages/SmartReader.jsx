import { useState, useEffect } from 'react';
import { Topbar } from '../components/Topbar';
import { Sidebar } from '../components/Sidebar';
import {
  Card,
  Button,
  Typography,
  Input
} from "@material-tailwind/react";
import { useAldoAlert } from 'aldo-alert';
import { ScaleLoader } from 'react-spinners';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const SmartReader = () => {
  const { showAldoAlert } = useAldoAlert();
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [value, setValue] = useState("");

  // Load data from localStorage when component mounts
  useEffect(() => {
    const storedProjectTitle = localStorage.getItem('projectTitle');
    const storedProjectDescription = localStorage.getItem('projectDescription');
    if (storedProjectTitle) setProjectTitle(storedProjectTitle);
    if (storedProjectDescription) setProjectDescription(storedProjectDescription);
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveToSmartContract = () => {
    setLoading(true);

    localStorage.setItem('projectTitle', projectTitle);
    localStorage.setItem('projectDescription', projectDescription);
    const documentation = localStorage.getItem('generatedDocumentation');

    const qrData = {
      title: projectTitle,
      description: projectDescription,
      documents: documentation
    };

    setTimeout(() => {
      setLoading(false);
      showAldoAlert('QR code scanned successfully!', 'warning');
      localStorage.setItem('qrCodeData', JSON.stringify(qrData));
      setQrCodeData(qrData);
    }, 3000);
  };

  const generateRandomDocumentation = () => {
    const documentation = `
# 3D Project Documentation

## Introduction
This documentation outlines the development process and key features of our 3D project.

## Project Overview
Our project aims to create a virtual 3D environment for immersive experiences.

## Features
- **Realistic Rendering**: Utilizes advanced rendering techniques for lifelike visuals.
- **Interactivity**: Allows users to interact with objects within the environment.
- **Customization**: Provides options for users to customize their experience.

## Development Timeline
1. **Planning Phase**: Define project scope and requirements.
2. **Design Phase**: Create wireframes and mockups.
3. **Development Phase**: Implement core functionalities.
4. **Testing Phase**: Conduct thorough testing for performance and usability.
5. **Deployment**: Release the project to production.

## Technologies Used
- **Unity**: Main engine for building the 3D environment.
- **Blender**: Used for modeling and animation.
- **JavaScript**: Programming language for scripting interactions.
- **React**: Frontend framework for user interface.

## Conclusion
Our 3D project aims to push the boundaries of virtual reality and create engaging experiences for users.

`;
    let currentIndex = 0;
    localStorage.setItem('generatedDocumentation', documentation);
    const interval = setInterval(() => {
      if (currentIndex <= documentation.length) {
        setValue(documentation.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50);
  };

  return (
    <div>
      <Topbar />
      <div className='flex'>
        <Sidebar />
        <div className="flex flex-col items-center w-full p-5">
          <Card color="white" shadow={true} className="w-full h-auto p-5">
            <div className='flex flex-col'>
              <Typography variant="h4" color="blue-gray" className="mb-4">
                Smart Reader
              </Typography>
              <div className='flex flow-row gap-4'>
                <div className='flex flex-col gap-2 w-2/5'>
                  <Input type="file" onChange={handleImageUpload} />
                  {selectedImage && <img src={selectedImage} alt="Selected" className="mt-4 rounded-lg shadow-md" />}
                </div>
                <div className='flex flex-col gap-1 w-full'>
                  <Button onClick={saveToSmartContract} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                    {loading ? <ScaleLoader color='#ffffff' loading={loading} height={16} width={6} radius={2} margin={3} /> : "Scan"}
                  </Button>
                  {qrCodeData && (
                    <div className="mt-4 p-4 border rounded-lg shadow-md bg-gray-50">
                      <Typography variant="h5" color="blue-gray" className="mb-2">
                        QR Code Data
                      </Typography>
                      <Typography variant="h6" color="blue-gray" className="mb-1">
                        <strong>Title:</strong> <br />
                        <span className='font-normal'>{qrCodeData.title}</span>
                      </Typography>
                      <Typography variant="h6" color="blue-gray" className="mb-1">
                        <strong>Description:</strong> <br />
                        <span className='font-normal'>{qrCodeData.description}</span>
                      </Typography>
                      <Typography variant="h6" color="blue-gray">
                        <strong>Documents:</strong>
                        <MDEditor.Markdown source={qrCodeData.documents} />
                      </Typography>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SmartReader;
