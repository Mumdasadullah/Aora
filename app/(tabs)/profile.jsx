import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import VideoCard from '../../components/VideoCard' 
import { icons, images } from '../../constants'
import EmptyState from '../../components/EmptyState'
import { videos } from '../../components/VideoArray'
import InfoBox from '../../components/InfoBox'
import { router } from 'expo-router'

const Profile = () => {
  const logout = () => {
    router.replace("/sign-in")
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        // data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        data={videos}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <VideoCard
            video={item}
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logout}
            >
              <Image
                source={icons.logout}
                className="w-6 h-6"
                resizeMode='contain'
              />
            </TouchableOpacity>

            <View
              className="w-16 h-16 border border-secondary rounded-xl justify-center items-center"
            >
              <Image
                source={icons.avatar}
                className="w-[90%] h-[90%] rounded-xl"
                resizeMode='cover'
              />
            </View>

            <InfoBox
              title={"JS Mastery"}
              containerStyles={"mt-5"}
              titleStyles={"text-lg"}
            />

            <View className="mt-5 flex-row">
              <InfoBox
                title={videos.length || 0}
                subtitle={"Posts"}
                containerStyles={"mr-10"}
                titleStyles={"text-xl"}
              />
              <InfoBox
                title={"1.2K"}
                subtitle={"Followers"}
                titleStyles={"text-xl"}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title={"No video found"}
            subtitle={"Be the first one to upload video"}
          />
        )}
      />

    </SafeAreaView>
  )
}

export default Profile