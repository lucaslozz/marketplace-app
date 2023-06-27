import { useState } from 'react';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import * as T from './types';

import { AppError } from '../../utils/AppError';

interface usePhotoProps {
  isMultiplePhotos?: boolean;
}

export function usePhoto({ isMultiplePhotos = false }: usePhotoProps) {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [photo, setPhoto] = useState<T.PhotoProps[]>([]);
  const [photoError, setPhotoError] = useState<string | null>(null);

  async function savePhoto() {
    try {
      setPhotoIsLoading(true);
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) {
        return;
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = (await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri,
          { size: true },
        )) as T.FileInfoProps;

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          const message = new AppError(
            'Erro ao adicionar foto. A imagem deve ter menos de 5MB',
          );

          throw message;
        }

        const fileExtension = photoSelected.assets[0].uri.split('.').pop();

        const photoFile = {
          name: `avatar.${fileExtension}`.toLowerCase(),
          uri: photoSelected.assets[0].uri,
          type: `image/${fileExtension}`,
        } as any;

        if (isMultiplePhotos) {
          setPhoto([...photo, photoFile]);
        } else {
          setPhoto([photoFile]);
        }
      }
    } catch (error) {
      const isAppError = error instanceof AppError;

      const message = isAppError ? error.message : 'Erro ao adicionar foto';

      setPhotoError(message);
    } finally {
      setPhotoIsLoading(false);
    }
  }

  function removePhoto(id: string) {
    try {
      setPhotoIsLoading(true);
      const photoWithoutDeleted = photo.filter((item) => item.uri !== id);
      setPhoto(photoWithoutDeleted);
    } catch (error) {
      const message = new AppError(
        'Erro ao remover foto. Por gentileza, tente novamente.',
      );
      throw message;
    } finally {
      setPhotoIsLoading(false);
    }
  }

  return { photo, photoIsLoading, photoError, savePhoto, removePhoto };
}
