'use client';

import React from 'react';
import { Edit, Trash2, User, Heart, HeartCrack, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StarRating } from './StarRating';
import { Profile } from '@/types/profile';
import { cn } from '@/lib/utils';

interface ProfileCardProps {
  profile: Profile;
  onEdit: (profile: Profile) => void;
  onDelete: (id: string) => void;
  onView: (profile: Profile) => void;
}

export function ProfileCard({ profile, onEdit, onDelete, onView }: ProfileCardProps) {
  const getFeelingIcon = () => {
    switch (profile.feeling) {
      case 'good':
        return <Heart className="w-4 h-4 text-green-400" />;
      case 'bad':
        return <HeartCrack className="w-4 h-4 text-red-400" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getFeelingColor = () => {
    switch (profile.feeling) {
      case 'good':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'bad':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getFeelingText = () => {
    switch (profile.feeling) {
      case 'good':
        return 'Me cae bien';
      case 'bad':
        return 'Me cae mal';
      default:
        return 'Neutral';
    }
  };

  return (
    <Card
      className={cn(
        'group cursor-pointer transition-all duration-300 ease-out',
        'hover:scale-105 hover:shadow-2xl hover:shadow-white/10',
        'bg-black/30 backdrop-blur-xl border-gray-600/50',
        'hover:bg-black/40 hover:border-gray-500/70',
        'transform-gpu'
      )}
      onClick={() => onView(profile)}
    >
      <CardHeader className="relative pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
              <User className="w-5 h-5 text-gray-300" />
            </div>
            <div>
              <h3 className="font-semibold text-white group-hover:text-white transition-colors duration-300">
                {profile.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <StarRating rating={profile.rating} readonly size="sm" />
                <span className="text-xs text-gray-400">
                  ({profile.rating}/5)
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(profile);
              }}
              className="h-8 w-8 hover:bg-white/20 hover:scale-110 transition-all duration-200"
            >
              <Edit className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(profile.id);
              }}
              className="h-8 w-8 hover:bg-red-500/20 hover:text-red-300 hover:scale-110 transition-all duration-200"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          {getFeelingIcon()}
          <Badge
            variant="outline"
            className={cn(
              'text-xs transition-all duration-300',
              getFeelingColor()
            )}
          >
            {getFeelingText()}
          </Badge>
        </div>

        {profile.positivePoints.length > 0 && (
          <div>
            <div className="text-xs font-medium text-gray-400 mb-1">Puntos positivos</div>
            <div className="flex flex-wrap gap-1">
              {profile.positivePoints.slice(0, 2).map((point, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs bg-green-500/10 text-green-300 border-green-500/30"
                >
                  {point.length > 15 ? `${point.slice(0, 15)}...` : point}
                </Badge>
              ))}
              {profile.positivePoints.length > 2 && (
                <Badge variant="outline" className="text-xs bg-gray-500/10 text-gray-400">
                  +{profile.positivePoints.length - 2} más
                </Badge>
              )}
            </div>
          </div>
        )}

        {profile.observations && (
          <div>
            <div className="text-xs font-medium text-gray-400 mb-1">Observaciones</div>
            <p className="text-xs text-gray-300 line-clamp-2">
              {profile.observations.length > 80
                ? `${profile.observations.slice(0, 80)}...`
                : profile.observations
              }
            </p>
          </div>
        )}

        <div className="text-xs text-gray-500 pt-2 border-t border-gray-700/50">
          Actualizado: {profile.updatedAt.toLocaleDateString()}
        </div>
      </CardContent>

      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </Card>
  );
}
