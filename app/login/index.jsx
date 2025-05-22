import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, IconButton, useTheme } from 'react-native-paper';
import Animated, { FadeIn } from 'react-native-reanimated';

import abstractAnimation from '../../assets/lottie/abstract_animation.json'; // <<< VERIFY THIS PATH!
import BackgroundCarousel from '../components/BackgroundCarousel';
import FormInput from '../components/FormInput';
import { backgroundImages } from '../constants/backgrounds';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

const responsiveFontSize = (size) => {
  const standardWidth = 375;
  const scale = width / standardWidth;
  const maxScale = 1.8;
  return Math.round(size * Math.min(scale, maxScale));
};

export default function LoginScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const lottieRef = useRef(null);

  const {
    control,
    handleSubmit,
    formState: { errors }, // 'errors' object for validation feedback
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    // Set validation mode to 'onBlur' or 'onChange' as desired, 'onSubmit' is default
    mode: 'onBlur', // Validate on blur
  });

  const onSubmit = (data) => {
    console.log('Login Data:', data);
    Alert.alert('Login Attempt', `Email: ${data.email}\nPassword: ${data.password}`);
    // In a real app, you would send this data to your backend for authentication
    // On success: router.replace('(app)'); // Navigate to authenticated part of your app
  };

  const handleInputFocus = () => {
    if (lottieRef.current && lottieRef.current.animation) {
      lottieRef.current.animation.setSpeed(1.5);
    }
  };

  const handleInputBlur = () => {
    if (lottieRef.current && lottieRef.current.animation) {
      lottieRef.current.animation.setSpeed(1);
    }
  };

  const headerGradientColors = ['#4d5dff', '#ff0066']; // Blue to Red/Pink from Lottie
  const buttonColor = '#ff0066'; // Vibrant Lottie Red/Pink for buttons

  const formInputColors = {
    inputTextColor: '#444444',
    inputPlaceholderColor: '#888888',
    inputOutlineColor: '#cccccc', // Light gray for inactive outline
    activeOutlineColor: '#4d5dff', // Lottie Blue for active outline
    labelColor: '#444444',
  };

  return (
    <View style={{ flex: 1 }}>
      <BackgroundCarousel images={backgroundImages} />

      <View style={styles.overlayContainer}>
        <Animated.View
          entering={FadeIn.duration(800)}
          style={[
            styles.card,
            isTablet && styles.cardTablet,
            { backgroundColor: 'rgba(255, 230, 230, 0.9)' }, // Lighter, slightly desaturated pink background
          ]}
        >
          {/* Lottie Animation (left side for tablet) */}
          {isTablet && (
            <View style={styles.animationContainer}>
              <LottieView
                ref={lottieRef}
                source={abstractAnimation}
                autoPlay={true}
                loop={true}
                style={styles.lottieAnimation}
                resizeMode="cover" // <<< ADDED/CONFIRMED HERE
              />
              <View style={styles.overlay} />
            </View>
          )}

          {/* Form Section (right side) */}
          <View style={isTablet ? styles.formContainerTablet : styles.formContainer}>
            <ScrollView
              contentContainerStyle={styles.scrollViewContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View style={{ width: '100%', maxWidth: 400, alignItems: 'center' }}>
                <IconButton
                  icon="lock"
                  size={isTablet ? 48 : responsiveFontSize(48)}
                  color={buttonColor}
                  style={styles.iconButton}
                />

                {/* --- Gradient Heading using MaskedView --- */}
                <MaskedView
                  style={styles.gradientMaskedView}
                  maskElement={
                    <Text
                      style={[
                        styles.heading,
                        { fontSize: isTablet ? 28 : responsiveFontSize(28) }
                      ]}
                    >
                      Welcome Back!
                    </Text>
                  }
                >
                  <LinearGradient
                    colors={headerGradientColors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientOverlay}
                  />
                </MaskedView>
                {/* ------------------------------------------ */}

                <FormInput
                  control={control}
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  errors={errors} // Pass the errors object for display
                  rules={{ // Define validation rules for email
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'Invalid email address',
                    },
                  }}
                  {...formInputColors}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />

                <FormInput
                  control={control}
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  secureTextEntry
                  errors={errors} // Pass the errors object for display
                  rules={{ // Define validation rules for password
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                    maxLength: {
                      value: 20,
                      message: 'Password cannot exceed 20 characters',
                    },
                  }}
                  {...formInputColors}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />

                <Button
                  mode="contained"
                  onPress={handleSubmit(onSubmit)} // This triggers validation before calling onSubmit
                  style={styles.submitButton}
                  labelStyle={[styles.submitButtonLabel, { fontSize: isTablet ? 18 : responsiveFontSize(18), color: '#fff' }]}
                  contentStyle={{ paddingVertical: 10 }}
                  buttonColor={buttonColor}
                >
                  Login
                </Button>

                <Link href="/register" asChild>
                  <Button
                    mode="text"
                    style={styles.linkButton}
                    labelStyle={[styles.linkButtonLabel, { color: buttonColor, fontSize: isTablet ? 14 : responsiveFontSize(14) }]}
                  >
                    Don't have an account? Register
                  </Button>
                </Link>

                <Link href="/forgot-password" asChild>
                  <Button
                    mode="text"
                    style={styles.linkButton}
                    labelStyle={[styles.linkButtonLabel, { color: buttonColor, fontSize: isTablet ? 14 : responsiveFontSize(14) }]}
                  >
                    Forgot Password?
                  </Button>
                </Link>
              </View>
            </ScrollView>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    flexDirection: 'column',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    elevation: 10,
    width: '100%',
    maxHeight: Dimensions.get('window').height * 0.95,
    minHeight: Dimensions.get('window').height * 0.6,
  },
  cardTablet: {
    flexDirection: 'row',
    width: '80%',
    height: 600,
  },
  animationContainer: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    //backgroundColor: '#000', // Optional: uncomment to see the container's background
  },
  lottieAnimation: {
    width: '140%', // Adjusted for better coverage
    height: '140%', // Adjusted for better coverage
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    opacity: 0.1,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainerTablet: {
    width: '60%',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // MaskedView related styles for gradient text
  gradientMaskedView: {
    width: '100%',
    height: 40, // Height must be sufficient to contain the text
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  heading: {
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'transparent', // Crucial for MaskedView text to work as a mask
  },
  iconButton: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 24,
    width: '100%',
    borderRadius: 8,
  },
  submitButtonLabel: {
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 12,
    alignSelf: 'center',
  },
  linkButtonLabel: {
    // color and fontSize handled by inline style
  },
});