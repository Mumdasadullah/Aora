import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import SearchInput from '../../components/Searchinput'
import Trending from '../../components/Trending'
import VideoCard from '../../components/VideoCard'
import { images } from '../../constants'
import EmptyState from '../../components/EmptyState'
import { videos } from '../../components/VideoArray'
import { user } from "../../components/UserArray";
import { useGlobalContext } from '../../context/GlobalProvider'

const Home = () => {
  // const { user } = useGlobalContext();
  // const { data: posts, refetch } = useAppWrite(getAllPosts);
  // const { data: latestposts } = useAppWrite(getLatestPosts);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true)
    // await refetch();
    setRefreshing(false)
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
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">Welcome Back</Text>
                <Text className="font-psemibold text-2xl text-white">JSMastery</Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode='contain'
                />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">Latest Videos</Text>
            </View>

            <Trending
              posts={videos || []}
            />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title={"No video found"}
            subtitle={"Be the first one to upload video"}
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />

    </SafeAreaView>
  )
}

export default Home