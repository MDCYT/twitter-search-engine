import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserProfileProps {
  userData: any;
  language: 'en' | 'es';
}

export const UserProfile: React.FC<UserProfileProps> = ({ userData, language }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === 'en' ? 'User Profile' : 'Perfil de Usuario'}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={userData.profileImage} alt={userData.fullName} />
            <AvatarFallback>{userData.fullName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{userData.fullName} {userData.isVerified ? "✔️" : ""}</h2>
            <p className="text-sm text-gray-500">@{userData.userName}</p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <p>{userData.description}</p>
          <p>{language === 'en' ? 'Location:' : 'Ubicación:'} {userData.location}</p>
          <div className="flex space-x-4">
            <p><strong>{language === 'en' ? 'Followers:' : 'Seguidores:'}</strong> {userData.followersCount}</p>
            <p><strong>{language === 'en' ? 'Following:' : 'Siguiendo:'}</strong> {userData.followingsCount}</p>
            <p><strong>{language === 'en' ? 'Tweets:' : 'Tweets:'}</strong> {userData.statusesCount}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};