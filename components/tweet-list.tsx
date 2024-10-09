import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface TweetListProps {
  tweets: any[];
  language: 'en' | 'es';
}

export const TweetList: React.FC<TweetListProps> = ({ tweets, language }) => {
  const renderMedia = (tweet: any) => {
    if (!tweet.media || tweet.media.length === 0) return null;

    return (
      <div className="grid grid-cols-2 gap-2 mt-2">
        {tweet.media.slice(0, 4).map((media: any, index: number) => (
          <div key={index} className="relative aspect-square">
            {media.type === 'photo' ? (
              <Image
                src={`https://api.mdcdev.me/v2/twitter/tweets/${tweet.id}/media/${index + 1}/preview`}
                alt="Tweet media"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            ) : (
              <video
                src={`https://api.mdcdev.me/v2/twitter/tweets/${tweet.id}/media/${index + 1}/preview`}
                controls
                className="w-full h-full rounded-md"
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === 'en' ? 'Recent Tweets' : 'Tweets Recientes'}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tweets.map((tweet) => (
            <div key={tweet.id} className="border-b pb-4">
              <p>{tweet.fullText}</p>
              {renderMedia(tweet)}
              <div className="mt-2 text-sm text-gray-500 flex justify-between items-center">
                <div>
                  <span>{new Date(tweet.createdAt).toLocaleString()}</span>
                  <span className="ml-4">❤️ {tweet.likeCount}</span>
                  <span className="ml-4">🔁 {tweet.retweetCount}</span>
                  <span className="ml-4">👁️ {tweet.viewCount}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`https://twitter.com/i/web/status/${tweet.id}`, '_blank')}
                >
                  {language === 'en' ? 'View Tweet' : 'Ver Tweet'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};