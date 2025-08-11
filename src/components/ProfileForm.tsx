'use client';

import React, { useState, useEffect } from 'react';
import { Plus, X, Save, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StarRating } from './StarRating';
import { Profile, ProfileFormData } from '@/types/profile';
import { cn } from '@/lib/utils';

interface ProfileFormProps {
  profile?: Profile;
  onSubmit: (data: ProfileFormData) => void;
  onCancel: () => void;
}

export function ProfileForm({ profile, onSubmit, onCancel }: ProfileFormProps) {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    feeling: 'neutral',
    rating: 3,
    positivePoints: [],
    negativePoints: [],
    interestingPoints: [],
    observations: '',
  });

  const [newPoint, setNewPoint] = useState('');
  const [currentPointType, setCurrentPointType] = useState<'positive' | 'negative' | 'interesting'>('positive');

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name,
        feeling: profile.feeling,
        rating: profile.rating,
        positivePoints: [...profile.positivePoints],
        negativePoints: [...profile.negativePoints],
        interestingPoints: [...profile.interestingPoints],
        observations: profile.observations,
      });
    }
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSubmit(formData);
    }
  };

  const addPoint = () => {
    if (!newPoint.trim()) return;

    const point = newPoint.trim();
    setFormData(prev => ({
      ...prev,
      [`${currentPointType}Points`]: [
        ...prev[`${currentPointType}Points` as keyof typeof prev] as string[],
        point
      ]
    }));
    setNewPoint('');
  };

  const removePoint = (type: 'positive' | 'negative' | 'interesting', index: number) => {
    setFormData(prev => ({
      ...prev,
      [`${type}Points`]: (prev[`${type}Points` as keyof typeof prev] as string[]).filter((_, i) => i !== index)
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addPoint();
    }
  };

  const getPointTypeColor = (type: string) => {
    switch (type) {
      case 'positive':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'negative':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'interesting':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-black/30 backdrop-blur-xl border-gray-600/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onCancel}
              className="hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <CardTitle className="text-white">
              {profile ? 'Editar Perfil' : 'Nuevo Perfil'}
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nombre *
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Nombre de la persona"
                className="bg-white/10 border-gray-600 text-white placeholder-gray-400 focus:border-white/50"
                required
              />
            </div>

            {/* Sentimiento */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                ¿Te cae bien o mal?
              </label>
              <Select
                value={formData.feeling}
                onValueChange={(value: 'good' | 'bad' | 'neutral') =>
                  setFormData(prev => ({ ...prev, feeling: value }))
                }
              >
                <SelectTrigger className="bg-white/10 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-gray-600">
                  <SelectItem value="good" className="text-green-300">Me cae bien</SelectItem>
                  <SelectItem value="neutral" className="text-gray-300">Neutral</SelectItem>
                  <SelectItem value="bad" className="text-red-300">Me cae mal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Valoración */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Valoración general
              </label>
              <div className="flex items-center gap-3">
                <StarRating
                  rating={formData.rating}
                  onRatingChange={(rating) => setFormData(prev => ({ ...prev, rating }))}
                  size="lg"
                />
                <span className="text-white">({formData.rating}/5)</span>
              </div>
            </div>

            {/* Puntos */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Agregar puntos
              </label>

              <div className="flex gap-2 mb-3">
                <Select
                  value={currentPointType}
                  onValueChange={(value: 'positive' | 'negative' | 'interesting') =>
                    setCurrentPointType(value)
                  }
                >
                  <SelectTrigger className="w-40 bg-white/10 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-gray-600">
                    <SelectItem value="positive" className="text-green-300">Positivos</SelectItem>
                    <SelectItem value="negative" className="text-red-300">Negativos</SelectItem>
                    <SelectItem value="interesting" className="text-blue-300">Interesantes</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  value={newPoint}
                  onChange={(e) => setNewPoint(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Escribe un punto y presiona Enter"
                  className="bg-white/10 border-gray-600 text-white placeholder-gray-400 focus:border-white/50"
                />

                <Button
                  type="button"
                  onClick={addPoint}
                  variant="outline"
                  size="icon"
                  className="border-gray-600 hover:bg-white/10"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {/* Mostrar puntos por categoría */}
              {(['positive', 'negative', 'interesting'] as const).map((type) => {
                const points = formData[`${type}Points`];
                const typeNames = {
                  positive: 'Puntos positivos',
                  negative: 'Puntos negativos',
                  interesting: 'Puntos interesantes'
                };

                if (points.length === 0) return null;

                return (
                  <div key={type} className="mb-4">
                    <div className="text-sm font-medium text-gray-400 mb-2">
                      {typeNames[type]} ({points.length})
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {points.map((point, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className={cn(
                            'text-sm px-3 py-1 flex items-center gap-2',
                            getPointTypeColor(type)
                          )}
                        >
                          {point}
                          <button
                            type="button"
                            onClick={() => removePoint(type, index)}
                            className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Observaciones */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Observaciones adicionales
              </label>
              <Textarea
                value={formData.observations}
                onChange={(e) => setFormData(prev => ({ ...prev, observations: e.target.value }))}
                placeholder="Cualquier información adicional..."
                className="bg-white/10 border-gray-600 text-white placeholder-gray-400 focus:border-white/50 min-h-[100px] resize-none"
              />
            </div>

            {/* Botones */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-white/20 hover:bg-white/30 transition-all duration-300"
              >
                <Save className="w-4 h-4 mr-2" />
                {profile ? 'Actualizar' : 'Guardar'} Perfil
              </Button>
              <Button
                type="button"
                onClick={onCancel}
                variant="outline"
                className="border-gray-600 hover:bg-white/10"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
