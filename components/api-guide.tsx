import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ApiGuideProps {
  language: 'en' | 'es';
}

export const ApiGuide: React.FC<ApiGuideProps> = ({ language }) => {
  const guideContent = {
    en: {
      title: 'API Usage Guide',
      userEndpoint: 'User Endpoint:',
      userDescription: 'Get user information:',
      tweetsEndpoint: 'Tweets Endpoint:',
      tweetsDescription: 'Get user tweets:',
      mediaEndpoint: 'Media Endpoint:',
      mediaDescription: 'Get tweet media (replace {tweet_id} and {media_number}):',
    },
    es: {
      title: 'Guía de Uso de la API',
      userEndpoint: 'Endpoint de Usuario:',
      userDescription: 'Obtener información del usuario:',
      tweetsEndpoint: 'Endpoint de Tweets:',
      tweetsDescription: 'Obtener tweets del usuario:',
      mediaEndpoint: 'Endpoint de Medios:',
      mediaDescription: 'Obtener medios del tweet (reemplaza {tweet_id} y {media_number}):',
    },
  };

  const content = guideContent[language];

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">{content.userEndpoint}</h3>
            <p>{content.userDescription}</p>
            <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
              https://api.mdcdev.me/v2/twitter/users/{'{username}'}
            </code>
          </div>
          <div>
            <h3 className="font-semibold">{content.tweetsEndpoint}</h3>
            <p>{content.tweetsDescription}</p>
            <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
              https://api.mdcdev.me/v2/twitter/users/{'{username}'}/tweets
            </code>
          </div>
          <div>
            <h3 className="font-semibold">{content.mediaEndpoint}</h3>
            <p>{content.mediaDescription}</p>
            <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded mt-1 overflow-x-auto">
              https://api.mdcdev.me/v2/twitter/tweets/{'{tweet_id}'}/media/{'{media_number}'}/preview
            </code>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};