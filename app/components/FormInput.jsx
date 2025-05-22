// D:\my-login-app\app\components\FormInput.jsx
import { Controller } from 'react-hook-form';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

const { width } = Dimensions.get('window');
const isMobileScreen = width < 768; // Screens narrower than 768px are considered mobile

const responsiveFontSize = (size) => {
  const standardWidth = 375; // Base width for scaling (e.g., iPhone 8 width)
  const scale = width / standardWidth;
  const maxScale = 1.8; // Example: text won't be more than 1.8x its base size
  return Math.round(size * Math.min(scale, maxScale));
};

export default function FormInput({
  control,
  name,
  label,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  errors, // This prop is used to receive validation errors
  rules,  // This prop is used to define validation rules
  inputTextColor = '#444444', // Changed default to a dark gray
  inputPlaceholderColor = '#888888', // Changed default to a lighter gray
  inputOutlineColor = '#cccccc', // Default light gray outline
  activeOutlineColor = '#ff0066', // Vibrant Lottie Red/Pink for active outline
  labelColor = '#444444', // Dark gray for label text
  onFocus,
  onBlur,
}) {
  const fieldError = errors[name]; // Get the error for this specific field

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        rules={rules} // Pass the rules to the Controller
        render={({ field: { onChange, onBlur: controllerOnBlur, value } }) => (
          <TextInput
            label={label}
            placeholder={placeholder}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            onChangeText={onChange}
            value={value}
            mode="outlined"
            onFocus={onFocus}
            onBlur={(e) => {
              controllerOnBlur();
              if (onBlur) onBlur(e);
            }}
            outlineColor={inputOutlineColor}
            activeOutlineColor={activeOutlineColor}
            textColor={inputTextColor}
            placeholderTextColor={inputPlaceholderColor}
            style={[
              styles.input,
              {
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                width: '100%',
              }
            ]}
            theme={{
              colors: {
                background: 'transparent',
                primary: activeOutlineColor,
                text: inputTextColor,
                placeholder: inputPlaceholderColor,
                onSurface: labelColor,
              },
            }}
            labelStyle={{ fontSize: responsiveFontSize(16), color: labelColor, fontWeight: '500' }}
            inputStyle={{ fontSize: responsiveFontSize(16) }}
          />
        )}
      />
      {/* Display error message if there is one for this field */}
      {fieldError && (
        <Text style={styles.errorText}>
          {fieldError.message}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
    alignSelf: 'stretch',
  },
  input: {
    borderRadius: 8,
  },
  errorText: {
    color: '#ff6b6b', // Distinct red for error text
    marginTop: 4,
    marginLeft: 12,
    fontSize: 12,
  },
});