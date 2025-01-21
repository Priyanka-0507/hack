import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router,Routes, Route, useNavigate,Link } from 'react-router-dom';
import Papa from 'papaparse';
import { supabase } from '../lib/supabase';
import { LayoutDashboard, User, Info, FileText,Pill, Search } from 'lucide-react';
import type { Word } from './type';
import Profile from './profile';


export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [words, setWords] = useState<Word[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [error, setError] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/signin');
      } else {
        setUser(user);
      }
    };

    checkUser();
  }, [navigate]);

  useEffect(() => {
    const loadWords = async () => {
      const response = await fetch('/src/data/words.csv');
      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          setWords(results.data as Word[]);
        },
      });
    };

    loadWords();
  }, []);

  const searchWord = () => {
    const foundWord = words.find(
      (word) => word.word.toLowerCase() === searchTerm.toLowerCase()
    );

    if (foundWord) {
      setCurrentWord(foundWord);
      setError('');
    } else {
      setError('Medicine not found in our library');
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/signin');
  };
  
  
  const AboutUs = () => (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">About Us</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p>About us content goes here...</p>
      </div>
    </div>
  );
  
  const Policy = () => (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Our Policy</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p>Policy information goes here...</p>
      </div>
    </div>
  );
  return (
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-green-100 p-4 relative shadow-sm">
        
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-green-200 rounded-lg transition-colors duration-200 ease-in-out"
          >
            <LayoutDashboard className="h-6 w-6 text-green-700" />
          </button>

          {isMenuOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-3 z-10 transform transition-all duration-200 ease-in-out">
              <div className="px-4 py-3 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-500 uppercase">Dashboard Menu</h3>
              </div>
              
              <Link
                to="/profile"
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-green-50 transition-colors duration-200 gap-3"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">User Profile Details</p>
                  <p className="text-sm text-gray-500">View and edit your profile</p>
                </div>
              </Link>
              
              <Link
                to="/about"
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-green-50 transition-colors duration-200 gap-3"
                onClick={() => setIsMenuOpen(false)}
              >
                <Info className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">About Us</p>
                  <p className="text-sm text-gray-500">Learn more about our company</p>
                </div>
              </Link>
              
              <Link
                to="/policy"
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-green-50 transition-colors duration-200 gap-3"
                onClick={() => setIsMenuOpen(false)}
              >
                <FileText className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Our Policy</p>
                  <p className="text-sm text-gray-500">Review our terms and policies</p>
                </div>
              </Link>
            </div>
          )}
        </nav>
    <main>
      <Routes>
        <Route
         path="/"
         element={ 
         <div className="min-h-[calc(100vh-4rem)]">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">Welcome to MediCare</h1>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700"
              >
                Sign out
              </button>
            </div>
          </header>
          
              <div className="min-h-screen bg-white">
                <div className="max-w-2xl mx-auto p-6">
                  <header className="flex items-center gap-2 mb-8">
                    <Pill className="w-8 h-8 text-green-600 animate-spin" />
                    <h1 className="text-2xl font-bold text-gray-800">Medicine Generator</h1>
                  </header>

                  <div className="flex gap-2 mb-8">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && searchWord()}
                      placeholder="Type a word..."
                      className="flex-1 px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      onClick={searchWord}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <Search className="w-4 h-4" />
                      Search
                    </button>
                  </div>

                  {error && <div className="text-red-500 mb-4">{error}</div>}

                  {currentWord && (
                    <div className="bg-green-50 rounded-xl p-6 shadow-sm">
                      <div className="grid grid-cols-[1fr,120px] gap-6">
                        <div>
                          <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            {currentWord.meaning}
                          </h2>
                          <div className="bg-white p-4 rounded-lg">
                            <p className="text-gray-700 italic">"{currentWord.example}"</p>
                          </div>
                        </div>

                        <div className="w-[120px] h-[120px] rounded-lg overflow-hidden">
                          <img
                            src={currentWord.image}
                            alt={currentWord.word}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                     )}
                     </div>
                   </div>
                  </div>
         }
         />
          <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/policy" element={<Policy />} />
            </Routes>

         
   
      </main>
     </div>
  );
}
