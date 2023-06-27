import * as FileSystem from 'expo-file-system';

type FileInfoProps = FileSystem.FileInfo & {
  size: number;
  md5?: string | undefined;
  modificationTime: number;
};

interface PhotoProps {
  name: string;
  uri: string;
  type: string;
}

export { FileInfoProps, PhotoProps };
