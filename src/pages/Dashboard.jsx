import { useState, useEffect } from 'react';
import { Topbar } from '../components/Topbar';
import { Sidebar } from '../components/Sidebar';
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import BuildingImage from '../assets/building.png';
import MarkdownEditor from '../components/MarkdownEditor';
import { useAldoAlert } from 'aldo-alert';
import { ScaleLoader } from 'react-spinners';
import QRCode from 'qrcode.react';
import { Link } from 'react-router-dom';


const Dashboard = () => {

  const { showAldoAlert } = useAldoAlert();
  const [tab, setTab] = useState(() => {
    const savedTab = localStorage.getItem('tab');
    return savedTab !== null ? Number(savedTab) : 0;
  });
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [loading, setLoading] = useState(false); // State for controlling loading animation
  const [loadingUrl, setLoadingUrl] = useState(false); // State for controlling loading animation
  const [qrCodeValue, setQrCodeValue] = useState(''); // State for storing QR code value


  // Load data from localStorage when component mounts
  useEffect(() => {
    const storedProjectTitle = localStorage.getItem('projectTitle');
    const storedProjectDescription = localStorage.getItem('projectDescription');
    if (storedProjectTitle) setProjectTitle(storedProjectTitle);
    if (storedProjectDescription) setProjectDescription(storedProjectDescription);
  }, []);

  const submitUrlFunction = () => {
    setLoadingUrl(true); // Show loading animation

      // Simulate saving to smart contract and hiding loader
      setTimeout(() => {
        setLoadingUrl(false); // Hide loading animation after 3 seconds
        showAldoAlert('Project 3D URL connected!', 'warning');
        setTab(1);
        localStorage.setItem('tab', setTab); // Save QR data to localStorage
  
      }, 3000);

  };

    // Effect to sync tab state with localStorage
    useEffect(() => {
      localStorage.setItem('tab', tab);
    }, [tab]);
  

  const generateAI = (text, setText) => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setText(text.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50); // Adjust animation speed (milliseconds per character)
  };

  const generateAITitle = () => {
    generateAI('Virtual Cityscape Project', setProjectTitle);
  };

  const generateAIDescription = () => {
    generateAI('The Virtual Cityscape Project aims to create a detailed 3D model of a futuristic cityscape, incorporating advanced architectural designs and urban planning concepts. The project will leverage cutting-edge technology to simulate various environmental factors and showcase interactive features for urban development analysis and public engagement.', setProjectDescription);
  };

  const saveToSmartContract = () => {
    setLoading(true); // Show loading animation

    // Save data to localStorage
    localStorage.setItem('projectTitle', projectTitle);
    localStorage.setItem('projectDescription', projectDescription);
    // Fetch generated documentation from localStorage
    const documentation = localStorage.getItem('generatedDocumentation');

    // Generate QR code value
    const qrData = {
      title: projectTitle,
      description: projectDescription,
      documents: documentation
    };


    // Simulate saving to smart contract and hiding loader
    setTimeout(() => {
      setLoading(false); // Hide loading animation after 3 seconds
      showAldoAlert('Project saved to Smart Contract!', 'warning');
      setQrCodeValue(JSON.stringify(qrData));
      localStorage.setItem('qrCodeData', JSON.stringify(qrData)); // Save QR data to localStorage

    }, 3000);

  };

  return (
    <div>
      <Topbar />
      <div className='flex'>
        <Sidebar />
        <div className="flex flex-col items-center w-full p-5">
          <Card color="white" shadow={true} className="w-full h-auto p-5">
            {tab === 0 ? (
              <>
                <Typography variant="h4" color="blue-gray" className="mb-4">
                  Enter URL
                </Typography>
                <form className="w-full">
                  <div className="mb-6">
                    <Input
                      size="lg"
                      placeholder="https://example.com"
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                  <Button onClick={submitUrlFunction} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                      {loadingUrl ? <ScaleLoader color='#ffffff' loading={loadingUrl} height={16} width={6} radius={2} margin={3} />
                        : "Submit URL"}
                    </Button>
                </form>
              </>
            ) : (
              <div className='flex flex-col'>
                <Typography variant="h4" color="blue-gray" className="mb-4">
                  Building Details
                </Typography>
                <div className='flex flow-row gap-4'>
                  <div className='flex flex-col gap-2 w-2/5'>
                    <img src={BuildingImage} className='h-[300px]' />
                    <Typography variant="h4" color="blue-gray" className="mb-4">
                      QR Code Project:
                    </Typography>
                    {qrCodeValue && (
                      <>
                      <QRCode value={qrCodeValue} size={256} />
                      <Typography variant="h6" color="blue-gray" className="">
                       Note: <span className='font-normal italic mr-2'>Save this QR code for future reference.</span> 
                    </Typography>
                    <Link
                      to="/print-invoice">
                    <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit">
                        Print
                      </Button>
                      </Link>
                    </>
                    )}
                  </div>
                  <div className='flex flex-col gap-1 w-full'>
                    <Typography variant="h4" color="blue-gray" className="mb-4">
                      Project Title
                    </Typography>
                    <div className="mb-6">
                      <Button onClick={generateAITitle} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2">
                        Generate AI for Title
                      </Button>
                      <Input
                        size="lg"
                        placeholder="Project Title"
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    </div>
                    <Typography variant="h4" color="blue-gray" className="mb-4">
                      Project Description
                    </Typography>
                    <div className="mb-6">
                      <Button onClick={generateAIDescription} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2">
                        Generate AI for Description
                      </Button>
                      <textarea
                        placeholder="Enter description here..."
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        className="w-full p-3 border border-t-blue-gray-200 focus:border-t-gray-900 rounded-md h-36"
                        style={{ resize: 'none', height: '100px' }}
                      ></textarea>
                    </div>
                    <MarkdownEditor />
                    <Button onClick={saveToSmartContract} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                      {loading ? <ScaleLoader color='#ffffff' loading={loading} height={16} width={6} radius={2} margin={3} />
                        : "Save to Smart Contract"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
