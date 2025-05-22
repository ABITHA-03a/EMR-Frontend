import { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');

// Define the item width for the carousel. This should match the width of each image.
// Assuming your background images take the full screen width.
const ITEM_WIDTH = width; // Each image occupies the full screen width.

export default function BackgroundCarousel({ images }) {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Stop any existing interval to prevent multiple intervals running
    let intervalId;

    if (images && images.length > 0) {
      intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % images.length;
          // Ensure flatListRef.current exists before calling scrollToIndex
          if (flatListRef.current) {
            flatListRef.current.scrollToIndex({
              index: nextIndex,
              animated: true,
            });
          }
          return nextIndex;
        });
      }, 5000); // Change image every 5 seconds
    }

    return () => {
      // Clear the interval when the component unmounts or images change
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [images]); // Re-run effect if images array changes

  // This is the crucial part to fix the error
  const getItemLayout = (data, index) => ({
    length: ITEM_WIDTH, // The height/width of your item (the image)
    offset: ITEM_WIDTH * index, // The offset from the start of the list
    index, // The index of the item
  });

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={item} style={styles.image} resizeMode="cover" />
        )}
        // Add the getItemLayout prop here
        getItemLayout={getItemLayout}
        // Optional: If you want the automatic scrolling to update the index state
        // onScroll={(event) => {
        //   const newIndex = Math.round(event.nativeEvent.contentOffset.x / ITEM_WIDTH);
        //   if (newIndex !== currentIndex) {
        //     setCurrentIndex(newIndex);
        //   }
        // }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    ...StyleSheet.absoluteFillObject,
    // Add zIndex if you want it behind other elements
    // zIndex: -1,
  },
  image: {
    width: ITEM_WIDTH, // Make sure image width matches ITEM_WIDTH
    height: '100%', // Take full height of the container
  },
});