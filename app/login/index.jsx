import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useCallback } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { useOAuth } from '@clerk/clerk-expo';
import { Colors } from '../../constants/Colors';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

// Hook to warm up the browser
export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

// Main component
export default function Login() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onPress = useCallback(async () => {
    try {
      // Construct the redirect URL
      const redirectUrl = Linking.createURL('/home', { scheme: 'myapp' });

      console.log('Redirect URL:', redirectUrl);

      // Start the OAuth flow
      const result = await startOAuthFlow({ redirectUrl });
      console.log('OAuth flow result:', result);

      const { createdSessionId, signIn, signUp, setActive } = result;

      if (createdSessionId) {
        console.log('Session created with ID:', createdSessionId);
        // Handle session creation or navigation
      } else {
        // Handle additional steps like MFA
        console.log('Sign-in or sign-up required');
      }
    } catch (err) {
      console.error('OAuth error:', err);
    }
  }, [startOAuthFlow]);

  return (
    <View>
      <Image
        source={require('../../assets/images/Dogs.png')}
        style={{ width: '100%', height: 500 }}
      />
      <View
        style={{
          backgroundColor: Colors.White,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          marginTop: -20,
          height: '100%',
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontFamily: 'outfit-medium',
            color: Colors.primary,
            textAlign: 'center',
            marginTop: 20,
            padding: 20,
          }}
        >
          Ready to Make a New Friend?
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'outfit',
            color: Colors.Gray,
            textAlign: 'center',
            marginTop: 10,
            padding: 20,
          }}
        >
          Let&apos;s adopt the pet which you like and make their life happy again
        </Text>

        <TouchableOpacity
          onPress={onPress}
          style={{
            backgroundColor: Colors.Black,
            padding: 20,
            borderRadius: 99,
            margin: 20,
            borderWidth: 1,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <SimpleLineIcons name="social-google" size={30} color="white" />
            <Text
              style={{
                color: Colors.White,
                textAlign: 'center',
                fontSize: 21,
                fontFamily: 'outfit',
              }}
            >
              Sign In With Google
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
