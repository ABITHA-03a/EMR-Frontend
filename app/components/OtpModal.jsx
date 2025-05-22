// D:\my-login-app\app\components\OtpModal.jsx
import { useRouter } from 'expo-router';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';

const OtpModal = ({ visible, onClose, otpCode }) => { // otpCode prop is still there, but not directly displayed
  const router = useRouter();

  const handleConfirm = () => {
    // In a real application, you would verify the OTP here.
    // For this example, we'll just close the modal and navigate to login.
    onClose(); // Close the modal first
    router.push('/login'); // Navigate to the login page
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose} // For Android back button
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Registration Successful!</Text>
          <Text style={styles.message}>
            A 6-digit OTP has been sent to your email. Please enter it to verify your account.
          </Text>
          {/* MODIFICATION HERE: Display blanks instead of actual OTP */}
          <Text style={styles.otpCode}>_ _ _ _ _ _</Text> 
          {/* END MODIFICATION */}
          <Text style={styles.instruction}>
            {/* (For demonstration purposes, this is a placeholder OTP. In a real app, you'd have an input field for the user to enter the OTP and a "Resend OTP" option.) */}
          </Text>
          <Button
            mode="contained"
            onPress={handleConfirm}
            style={styles.button}
            labelStyle={styles.buttonLabel}
            buttonColor="#be123c"
          >
            Go to Login
          </Button>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark semi-transparent background
  },
  modalContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#401212', // Match your form's background
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
  },
  otpCode: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 8, // Space out the OTP digits
    marginBottom: 15,
    backgroundColor: '#501a1a',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  instruction: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    width: '80%',
    borderRadius: 5,
  },
  buttonLabel: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 15,
  },
  closeButtonText: {
    color: '#be123c',
    fontSize: 16,
  },
});

export default OtpModal;