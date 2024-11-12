import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import { Video, ResizeMode } from 'expo-av'
import { icons, images } from '../../constants'
import CustomButton from '../../components/CustomButton'
import * as DocumentPicker from 'expo-document-picker'
import { router } from 'expo-router'
import videos from '../../components/VideoArray'

const Create = () => {
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: ''
  })

  const openPicker = async (storageType) => {
    const result = await DocumentPicker.getDocumentAsync(
      {
        type: storageType === 'image' ? ['image/png', 'image/jpg'] : ['video/mp4', 'video/gif']
      }
    )

    if (!result.canceled) {
      if (storageType === 'image') {
        setForm({ ...form, thumbnail: result.assets[0] })
      }
      if (storageType === 'video') {
        setForm({ ...form, video: result.assets[0] })
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document Picked", JSON.stringify(result, null, 2))
      }, 100)
    }
  }

  const submit = () => {
    if (!form.prompt || !form.thumbnail || !form.title || !form.video) {
      return Alert.alert("All fields are required")
    }

    setUploading(true);

    try {
      const newVideo = {
        title: form.title,
        video: form.video.uri,
        thumbnail: form.thumbnail.uri,
        prompt: form.prompt,
      };

      videos.push(newVideo);

      Alert.alert("Success", "Post Uploaded Successfully");
      router.push("/home")
    } catch (error) {
      Alert.alert("Error", error.message)
    } finally {
      setForm({
        title: '',
        video: null,
        thumbnail: null,
        prompt: ''
      })

      setUploading(false)
    }
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">
          Upload Video
        </Text>
        <FormField
          title={"Video Title"}
          value={form.title}
          placeholder={"Give your video a catchy title..."}
          handleChangeText={(text) => setForm({ ...form, title: text })}
          otherStyles={"mt-10"}
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity
            onPress={() => openPicker('video')}
          >
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    className="w-1/2 h-1/2"
                    resizeMode='contain'
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Thumbnail
          </Text>

          <TouchableOpacity
            onPress={() => openPicker('image')}
          >
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode='cover'
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row">
                <Image
                  source={icons.upload}
                  className="w-5 h-5 mr-2"
                  resizeMode='contain'
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title={"AI Prompt"}
          value={form.prompt}
          placeholder={"A prompt for your video..."}
          handleChangeText={(text) => setForm({ ...form, prompt: text })}
          otherStyles={"mt-7"}
        />

        <CustomButton
          title={"Submit & Publish"}
          handlePress={submit}
          containerStyle={"mt-7"}
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create