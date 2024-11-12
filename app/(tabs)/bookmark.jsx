import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import SearchInput from '../../components/Searchinput'
import Trending from '../../components/Trending'
import VideoCard from '../../components/VideoCard'
import { images } from '../../constants'
import EmptyState from '../../components/EmptyState'
import { videos } from '../../components/VideoArray'

const Bookmark = () => {
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
                <Text className="font-psemibold text-2xl text-white">Saved Videos</Text>
              </View>
            </View>

            <SearchInput placeholder={"Search your saved videos"}/>

            
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

export default Bookmark