import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { useGlobalContext } from '../../context/GlobalProvider'
import { user } from '../../components/UserArray'

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = () => {
    if (form.email === "" || form.password === "") {
      return Alert.alert("Error", "All Fields are required")
    }

    setIsSubmitting(true)

    try {
      const userExists = user.filter(u => u.email === form.email);
      // console.log(userExists[0].password);
      if (!userExists) {
        return Alert.alert("User with this email not found");
      } else {
        if (userExists[0].password !== form.password) {
          return Alert.alert("Invalid Password");
        }
      }
      setUser(userExists[0]);
      setIsLoggedIn(true);

      Alert.alert("Success", "User Signed in successfully");
      router.replace("/home")
    } catch (error) {
      Alert.alert(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView
      className="bg-primary h-full"
    >
      <ScrollView>
        <View
          className="w-full justify-center min-h-[85vh] px-4 my-6"
        >
          <Image
            source={images.logo}
            className="w-[115px] h-[35px]"
            resizeMode='contain'
          />
          <Text
            className="text-2xl font-psemibold text-semibold text-white mt-10"
          >
            Log in to Aora
          </Text>

          <FormField
            title={'Email'}
            value={form.email}
            handleChangeText={(text) => setForm({ ...form, email: text })}
            otherStyles={"mt-7"}
            keyboardType="email-address"
          />

          <FormField
            title={"Password"}
            value={form.password}
            handleChangeText={(text) => setForm({ ...form, password: text })}
            otherStyles={"mt-7"}
          />

          <CustomButton
            title={'Sign In'}
            handlePress={submit}
            containerStyle={"mt-7"}
            isLoading={isSubmitting}
          />

          <View className="justify-center flex-row pt-5 gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Didn't have an account?
              <Link href={"/sign-up"} className='text-lg font-psemibold text-secondary'>Sign Up</Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn