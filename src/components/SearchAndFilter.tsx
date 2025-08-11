'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, X, Heart, HeartCrack, Minus, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProfileCard } from './ProfileCard';
import { Profile } from '@/types/profile';
import { cn } from '@/lib/utils';

interface SearchAndFilterProps {
  profiles: Profile[];
  onEditProfile: (profile: Profile) => void;
  onDeleteProfile: (id: string) => void;
  onViewProfile: (profile: Profile) => void;
}

export function SearchAndFilter({ profiles, onEditProfile, onDeleteProfile, onViewProfile }: SearchAndFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [feelingFilter, setFeelingFilter] = useState<string>('all');
  const [ratingFilter, setRatingFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('updated');
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>(profiles);

  useEffect(() => {
    let filtered = [...profiles];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(profile =>
        profile.name.toLowerCase().includes(query) ||
        profile.observations.toLowerCase().includes(query) ||
        profile.positivePoints.some(point => point.toLowerCase().includes(query)) ||
        profile.negativePoints.some(point => point.toLowerCase().includes(query)) ||
        profile.interestingPoints.some(point => point.toLowerCase().includes(query))
      );
    }

    // Filter by feeling
    if (feelingFilter !== 'all') {
      filtered = filtered.filter(profile => profile.feeling === feelingFilter);
    }

    // Filter by rating
    if (ratingFilter !== 'all') {
      const minRating = parseInt(ratingFilter);
      filtered = filtered.filter(profile => profile.rating >= minRating);
    }

    // Sort profiles
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.rating - a.rating;
        case 'created':
          return b.createdAt.getTime() - a.createdAt.getTime();
        case 'updated':
        default:
          return b.updatedAt.getTime() - a.updatedAt.getTime();
      }
    });

    setFilteredProfiles(filtered);
  }, [profiles, searchQuery, feelingFilter, ratingFilter, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setFeelingFilter('all');
    setRatingFilter('all');
    setSortBy('updated');
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchQuery.trim()) count++;
    if (feelingFilter !== 'all') count++;
    if (ratingFilter !== 'all') count++;
    return count;
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <Card className="bg-black/30 backdrop-blur-xl border-gray-600/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Search className="w-5 h-5" />
            Buscar y Filtrar Perfiles
            {getActiveFiltersCount() > 0 && (
              <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                {getActiveFiltersCount()} filtros activos
              </Badge>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre, observaciones o puntos..."
              className="pl-10 bg-white/10 border-gray-600 text-white placeholder-gray-400 focus:border-white/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:bg-white/20 rounded-full p-1 transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Feeling Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Sentimiento
              </label>
              <Select value={feelingFilter} onValueChange={setFeelingFilter}>
                <SelectTrigger className="bg-white/10 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-gray-600">
                  <SelectItem value="all" className="text-gray-300">Todos</SelectItem>
                  <SelectItem value="good" className="text-green-300">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      Me cae bien
                    </div>
                  </SelectItem>
                  <SelectItem value="neutral" className="text-gray-300">
                    <div className="flex items-center gap-2">
                      <Minus className="w-4 h-4" />
                      Neutral
                    </div>
                  </SelectItem>
                  <SelectItem value="bad" className="text-red-300">
                    <div className="flex items-center gap-2">
                      <HeartCrack className="w-4 h-4" />
                      Me cae mal
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Valoración mínima
              </label>
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger className="bg-white/10 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-gray-600">
                  <SelectItem value="all" className="text-gray-300">Todas</SelectItem>
                  {[5, 4, 3, 2, 1].map(rating => (
                    <SelectItem key={rating} value={rating.toString()} className="text-gray-300">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {rating}+ estrellas
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Ordenar por
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-white/10 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-gray-600">
                  <SelectItem value="updated" className="text-gray-300">Último actualizado</SelectItem>
                  <SelectItem value="created" className="text-gray-300">Más reciente</SelectItem>
                  <SelectItem value="name" className="text-gray-300">Nombre A-Z</SelectItem>
                  <SelectItem value="rating" className="text-gray-300">Mayor valoración</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <Button
                onClick={clearFilters}
                variant="outline"
                className="w-full border-gray-600 hover:bg-white/10 transition-all duration-300"
                disabled={getActiveFiltersCount() === 0}
              >
                <Filter className="w-4 h-4 mr-2" />
                Limpiar filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        {/* Results Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            Resultados
            <span className="text-gray-400 ml-2">
              ({filteredProfiles.length} de {profiles.length})
            </span>
          </h2>
        </div>

        {/* Profiles Grid */}
        {filteredProfiles.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProfiles.map(profile => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onEdit={onEditProfile}
                onDelete={onDeleteProfile}
                onView={onViewProfile}
              />
            ))}
          </div>
        ) : (
          <Card className="bg-black/30 backdrop-blur-xl border-gray-600/50">
            <CardContent className="py-12 text-center">
              <div className="text-gray-400 text-lg mb-2">
                {profiles.length === 0
                  ? 'No hay perfiles guardados'
                  : 'No se encontraron perfiles con los filtros aplicados'
                }
              </div>
              <div className="text-gray-500 text-sm">
                {profiles.length === 0
                  ? 'Crea tu primer perfil para empezar'
                  : 'Intenta ajustar los filtros de búsqueda'
                }
              </div>
              {getActiveFiltersCount() > 0 && (
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="mt-4 border-gray-600 hover:bg-white/10"
                >
                  Limpiar filtros
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
