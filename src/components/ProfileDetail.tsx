'use client';

import React from 'react';
import { ArrowLeft, Edit, Trash2, User, Calendar, Heart, HeartCrack, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StarRating } from './StarRating';
import { Profile } from '@/types/profile';
import { cn } from '@/lib/utils';

interface ProfileDetailProps {
  profile: Profile;
  onBack: () => void;
  onEdit: (profile: Profile) => void;
  onDelete: (id: string) => void;
}

export function ProfileDetail({ profile, onBack, onEdit, onDelete }: ProfileDetailProps) {
  const getFeelingIcon = () => {
    switch (profile.feeling) {
      case 'good':
        return <Heart className="w-5 h-5 text-green-400" />;
      case 'bad':
        return <HeartCrack className="w-5 h-5 text-red-400" />;
      default:
        return <Minus className="w-5 h-5 text-gray-400" />;
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

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Card */}
      <Card className="bg-black/30 backdrop-blur-xl border-gray-600/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="hover:bg-white/10 transition-all duration-300 hover:scale-110"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-white/10 backdrop-blur">
                  <User className="w-8 h-8 text-gray-300" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">{profile.name}</h1>
                  <div className="flex items-center gap-3 mt-2">
                    <StarRating rating={profile.rating} readonly size="md" />
                    <span className="text-gray-300">({profile.rating}/5)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => onEdit(profile)}
                variant="outline"
                className="border-gray-600 hover:bg-white/10 hover:scale-105 transition-all duration-300"
              >
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </Button>
              <Button
                onClick={() => onDelete(profile.id)}
                variant="outline"
                className="border-red-500/50 text-red-300 hover:bg-red-500/20 hover:scale-105 transition-all duration-300"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Eliminar
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex items-center gap-3">
            {getFeelingIcon()}
            <Badge
              variant="outline"
              className={cn('text-sm px-3 py-1', getFeelingColor())}
            >
              {getFeelingText()}
            </Badge>
            <div className="flex items-center gap-2 text-sm text-gray-400 ml-auto">
              <Calendar className="w-4 h-4" />
              Creado: {profile.createdAt.toLocaleDateString()}
              {profile.updatedAt.getTime() !== profile.createdAt.getTime() && (
                <span className="ml-2">
                  • Actualizado: {profile.updatedAt.toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Puntos Positivos */}
        {profile.positivePoints.length > 0 && (
          <Card className="bg-black/30 backdrop-blur-xl border-gray-600/50 hover:bg-black/40 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-green-300 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Puntos Positivos
                <Badge variant="outline" className="bg-green-500/20 text-green-300 border-green-500/30">
                  {profile.positivePoints.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {profile.positivePoints.map((point, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-200 text-sm hover:bg-green-500/20 transition-all duration-300 hover:scale-105"
                  >
                    {point}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Puntos Negativos */}
        {profile.negativePoints.length > 0 && (
          <Card className="bg-black/30 backdrop-blur-xl border-gray-600/50 hover:bg-black/40 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-red-300 flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                Puntos Negativos
                <Badge variant="outline" className="bg-red-500/20 text-red-300 border-red-500/30">
                  {profile.negativePoints.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {profile.negativePoints.map((point, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200 text-sm hover:bg-red-500/20 transition-all duration-300 hover:scale-105"
                  >
                    {point}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Puntos Interesantes */}
        {profile.interestingPoints.length > 0 && (
          <Card className="bg-black/30 backdrop-blur-xl border-gray-600/50 hover:bg-black/40 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-blue-300 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                Puntos Interesantes
                <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  {profile.interestingPoints.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {profile.interestingPoints.map((point, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-200 text-sm hover:bg-blue-500/20 transition-all duration-300 hover:scale-105"
                  >
                    {point}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Observaciones */}
      {profile.observations && (
        <Card className="bg-black/30 backdrop-blur-xl border-gray-600/50 hover:bg-black/40 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-gray-300 flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
              Observaciones Adicionales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg bg-white/5 border border-gray-600/30">
              <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                {profile.observations}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {profile.positivePoints.length === 0 &&
       profile.negativePoints.length === 0 &&
       profile.interestingPoints.length === 0 &&
       !profile.observations && (
        <Card className="bg-black/30 backdrop-blur-xl border-gray-600/50">
          <CardContent className="py-12 text-center">
            <div className="text-gray-400 text-lg mb-2">
              No hay información adicional disponible
            </div>
            <div className="text-gray-500 text-sm">
              Edita este perfil para agregar puntos y observaciones
            </div>
            <Button
              onClick={() => onEdit(profile)}
              variant="outline"
              className="mt-4 border-gray-600 hover:bg-white/10"
            >
              <Edit className="w-4 h-4 mr-2" />
              Editar Perfil
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
