import { Image, View, FlatList } from 'native-base';
import { Dimensions } from 'react-native';
import { PhotoProps } from '../../hooks/usePhoto/types';

interface SliderProps {
  photos: string[];
}

export function Slider({ photos }: SliderProps) {
  const width = Dimensions.get('window').width;
  return (
    <View>
      <FlatList
        data={photos}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          return (
            <Image
              source={{ uri: item }}
              alt="Slider"
              width={width}
              height={280}
              resizeMode="cover"
            />
          );
        }}
        horizontal={true}
        pagingEnabled
      />
    </View>
  );
}
