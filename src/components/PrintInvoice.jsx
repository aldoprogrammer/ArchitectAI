import QRCode from 'qrcode.react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/ArchitectAI.png';
import ButtonBlockchain from '../components/ButtonBlockchain';

const PrintInvoice = () => {
    const qrCodeData = localStorage.getItem('qrCodeData');
    const qrData = qrCodeData ? JSON.parse(qrCodeData) : {};
    const navigate = useNavigate();

    const truncateDescription = (description, maxLength) => {
        if (description.length <= maxLength) return description;
        return description.substring(0, maxLength) + ' . . .';
    };

    const handlePrint = () => {
        window.print();
    };

    const formatDate = (date) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options).replace(/ /g, ' / ');
    };

    const currentDate = new Date();

    return (
        <div className="p-10 bg-white text-black w-4/5 mx-auto shadow-lg rounded-lg mt-5 mb-5">
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-2xl font-bold">
                    Project 3D Building Details
                    </h1>
                <img src={Logo} alt="Logo" className="w-24 h-24" />
            </div>
            <div className="mb-5">
                <h2 className="font-bold text-lg">Project Title: <br /> <span className='font-normal'>{qrData.title}</span></h2>
                <h2 className="text-lg font-bold">Project Description: <br /> <span className='font-normal'>{truncateDescription(qrData.description, 150)}</span></h2>

                <h2 className="text-lg font-bold">Date: <br /> <span className='font-normal'>{formatDate(currentDate)}</span></h2>
            </div>
            <div className="flex justify-center">
                <QRCode value={qrCodeData} size={200} />
            </div>
            <div className="flex gap-5 items-center justify-center">
                <div className="mt-5 flex justify-center no-print">
                    <button
                        onClick={handlePrint}
                        className="px-5 py-2 bg-blue-500 text-white rounded transition duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-1"
                    >
                        Print
                    </button>
                </div>
                <div className="mt-5 flex justify-center no-print">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-5 py-2 bg-gray-500 text-white rounded transition duration-300 ease-in-out hover:bg-gray-700 hover:shadow-lg transform hover:-translate-y-1"
                    >
                        Back
                    </button>
                </div>
                <div className="mt-5 flex justify-center no-print">
                    <ButtonBlockchain />
                </div>
            </div>
        </div>
    );
};

export default PrintInvoice;
