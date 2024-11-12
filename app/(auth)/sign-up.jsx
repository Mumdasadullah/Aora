import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { useGlobalContext } from '../../context/GlobalProvider'
import { user } from "../../components/UserArray"


const SignUp = () => {
  const {setUser , setIsLoggedIn} = useGlobalContext();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const submit = () => {
    // Check if all fields are filled
    if (!form.username || !form.email || !form.password) {
      return Alert.alert("All Fields are required");
    }
    
    // Check if the user already exists
    const userExists = user.some(u => u.email === form.email);
    if (userExists) {
      return Alert.alert("User with this email already exists");
    }
    
    setIsSubmitting(true);
    
    try {
      // Create a new user object with a unique ID
      const newUser = {
        id: user.length + 1,  // generate ID based on current array length
        username: form.username,
        email: form.email,
        password: form.password
      };
      
      // Push new user to the array
      user.push(newUser);
      setUser(newUser);
      setIsLoggedIn(true);
      
      // Reset form and navigate
      setForm({ username: '', email: '', password: '' });
      // console.log(user);
      router.replace("/home");
    } catch (error) {
      Alert.alert(error.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <SafeAreaView
      className="bg-primary h-full"
    >
      <ScrollView>
        <View
          className="w-full justify-center h-full px-4 my-6"
        >
          <Image
            source={images.logo}
            className="w-[115px] h-[35px]"
            resizeMode='contain'
          />
          <Text
            className="text-2xl font-psemibold text-semibold text-white mt-10"
          >
            Sign up to Aora
          </Text>

          <FormField
            title={'Username'}
            value={form.username}
            handleChangeText={(text) => setForm({ ...form, username: text })}
            otherStyles={"mt-7"}
          />
          <FormField
            title={'Email'}
            value={form.email}
            handleChangeText={(text) => setForm({ ...form, email: text })}
            otherStyles={"mt-7"}
            keyboardType="email_address"
          />
          <FormField
            title={'Password'}
            value={form.password}
            handleChangeText={(text) => setForm({ ...form, password: text })}
            otherStyles={"mt-7"}
          />

          <CustomButton
            title={'Sign Up'}
            handlePress={submit}
            containerStyle={"mt-7"}
            isLoading={isSubmitting}
          />

          <View className="justify-center flex-row pt-5 gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
              <Link href={"/sign-in"} className='text-lg font-psemibold text-secondary'>Sign In</Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp