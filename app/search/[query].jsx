import { View, Text, FlatList, SafeAreaView } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

import SearchInput from '../../components/Searchinput';
import VideoCard from '../../components/VideoCard';
import EmptyState from '../../components/EmptyState';
import { videos } from '../../components/VideoArray';

const Search = () => {
  const { query } = useLocalSearchParams();

  // Filter videos based on the search query
  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(query.toLowerCase()) ||
    video.prompt.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={filteredVideos} // Display filtered videos
        keyExtractor={(item) => item.title} // Unique key for each video
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 mt-20">
            <Text className="font-pmedium text-sm text-gray-100">Search Results</Text>
            <Text className="font-psemibold text-2xl text-white">{query}</Text>
            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No video found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
