// D:\my-login-app\app\components\ImageCarousel.jsx
import { useRef, useState } from 'react';
import { Dimensions, FlatList, Image, Text, View } from 'react-native';

const { width } = Dimensions.get('window');
// We need to calculate carouselWidth based on the parent's actual width
// when it's rendered, or pass it as a prop.
// For now, let's assume the parent (w-2/5) passes enough context.

const ImageCarousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  if (!images || images.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-200">
        <Text className="text-gray-500">No images to display</Text>
      </View>
    );
  }

  // If only one image, render it directly with object-cover
  if (images.length === 1) {
    return (
      <Image
        source={images[0]}
        className="object-cover" // Changed from object-contain
        style={{ flex: 1, width: '100%', height: '100%' }}
        resizeMode="cover" // Changed from contain
      />
    );
  }

  // Calculate carouselWidth based on the assumption that the parent is w-2/5
  // This might need adjustment if your parent container isn't always exactly w-2/5
  // or if you want to handle dynamic widths more robustly.
  // For a reliable approach, you might pass the parent's width as a prop
  // or use `onLayout` to get the actual width of the FlatList container.
  // For now, we'll assume the w-2/5 context.
  const carouselWidth = (width * (2/5)); // Assuming parent is 2/5 of total screen width

  return (
    <View className="flex-1 w-full relative">
      <FlatList
        data={images}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        renderItem={({ item }) => (
          <View style={{ width: carouselWidth, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={item}
              className="object-cover" // Changed from object-contain
              style={{ flex: 1, width: '100%', height: '100%' }}
              resizeMode="cover" // Changed from contain
            />
          </View>
        )}
      />
      <View className="absolute bottom-4 left-0 right-0 flex-row justify-center">
        {images.map((_, index) => (
          <View
            key={index}
            className={`w-2 h-2 rounded-full mx-1 ${
              index === activeIndex ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </View>
    </View>
  );
};

export default ImageCarousel;