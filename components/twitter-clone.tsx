"use client"

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useTheme } from 'next-themes';
import { useLanguage } from './language-provider';
import { Moon, Sun, Globe } from 'lucide-react';
import { UserProfile } from './user-profile';
import { TweetList } from './tweet-list';
import { ApiGuide } from './api-guide';
import Link from 'next/link';

export const TwitterClone: React.FC = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [tweets, setTweets] = useState([]);
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  const fetchUserData = async (user: string) => {
    try {
      const userResponse = await fetch(`https://api.mdcdev.me/v2/twitter/users/${user}`);
      const userData = await userResponse.json();
      setUserData(userData);

      const tweetsResponse = await fetch(`https://api.mdcdev.me/v2/twitter/users/${user}/tweets`);
      const tweetsData = await tweetsResponse.json();
      setTweets(tweetsData.tweets);

      toast({
        title: language === 'en' ? 'Success' : 'Éxito',
        description: language === 'en' ? 'User data fetched successfully' : 'Datos de usuario obtenidos con éxito',
      });
    } catch (error) {
      toast({
        title: language === 'en' ? 'Error' : 'Error',
        description: language === 'en' ? 'Failed to fetch user data' : 'Error al obtener datos de usuario',
        variant: 'destructive',
      });
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  const handleExampleClick = () => {
    const exampleUsers = ['X', 'ElonMusk', 'BlueyCommunity', 'OfficialBlueyTV', 'MDC_DEV', 'MiduDev'];
    const randomUser = exampleUsers[Math.floor(Math.random() * exampleUsers.length)];
    setUsername(randomUser);
    fetchUserData(randomUser);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#0a0a0a]">
      <div className="flex-grow space-y-4 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            {language === 'en' ? 'Twitter Clone' : 'Clon de Twitter'}
          </h1>
          <div className="space-x-2">
            <Button variant="outline" size="icon" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
            <Button variant="outline" size="icon" onClick={toggleLanguage}>
              <Globe className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Enter Twitter Username' : 'Ingrese el nombre de usuario de Twitter'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder={language === 'en' ? 'Username' : 'Nombre de usuario'}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button onClick={() => fetchUserData(username)}>
                {language === 'en' ? 'Fetch Data' : 'Obtener datos'}
              </Button>
              <Link href="#" onClick={handleExampleClick} passHref>
                <Button as="a">
                  {language === 'en' ? 'Example' : 'Ejemplo'}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        {userData && <UserProfile userData={userData} language={language} />}
        {tweets.length > 0 && <TweetList tweets={tweets} language={language} />}
        <ApiGuide language={language} />
      </div>
      <footer className="bg-gray-100 dark:bg-[#0a0a0a] py-4 text-center">
        <p>
          © {new Date().getFullYear()} <Link href="https://mdcdev.me" className="text-blue-600 dark:text-blue-400 hover:underline">MDCDEV</Link>. {language === 'en' ? 'All rights reserved.' : 'Todos los derechos reservados.'}
        </p>
        <p className="text-sm mt-1">
          {language === 'en' ? 'This project is not affiliated with Twitter/X.' : 'Este proyecto no está afiliado a Twitter/X.'}
        </p>
      </footer>
    </div>
  );
};