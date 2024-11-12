import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../constants'
import { StatusBar } from 'expo-status-bar'
import CustomButton from '../components/CustomButton'
import { Redirect, router } from 'expo-router'
import 'react-native-url-polyfill/auto'
import { useGlobalContext } from '../context/GlobalProvider'

// com.company.myapp

const index = () => {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href={"/home"} />


  return (
    <SafeAreaView
      className="bg-primary h-full"
    >
      <ScrollView
        contentContainerStyle={{ height: '100%' }}
      >
        <View
          className="w-full items-center justify-center h-full px-4"
        >
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode='contain'
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode='contain'
          />
          <View
            className="relative mt-5"
          >
            <Text
              className="text-white text-3xl font-bold text-center"
            >Discover Endless Possibilities with {' '}
              <Text
                className="text-secondary-200"
              >Aora</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[130px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode='contain'
            />

          </View>
          <Text
            className="text-sm text-gray-100 mt-7 text-center font-pregular"
          >
            Where creativity meets innovation: embark on
            a journey of limitless exploratoion of Aora
          </Text>

          <CustomButton
            title={'Continue with Email'}
            handlePress={() => router.push('/home')}
            containerStyle={"w-full mt-7"}
          />
        </View>
      </ScrollView>
      <StatusBar
        backgroundColor='#161622'
        style='light'
      />
    </SafeAreaView>
  )
}

export default index