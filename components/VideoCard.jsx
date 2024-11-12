import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import { Video, ResizeMode } from 'expo-av'

const VideoCard = ({ video: { title, thumbnail, video } }) => {
    const [play, setPlay] = useState(false);
    return (
        <View className="flex-col items-center px-4 mb-14">
            <View className="flex-row gap-3 items-start">
                <View className="justify-center items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] rounded-lg justify-center items-center p-0.5 border border-secondary">
                        <Image
                            source={icons.avatar}
                            className="w-full h-full rounded-lg"
                            resizeMode='cover'
                        />
                    </View>
                    <View className="justify-center flex-1 ml-3 gap-y-1">
                        <Text className="font-psemibold text-white text-sm" numberOfLines={1}>
                            {title}
                        </Text>
                        <Text className="text-xs font-pregular text-gray-100">
                            jmastery
                        </Text>
                    </View>
                </View>
                <View className="pt-2">
                    <Image
                        source={icons.menu}
                        className="w-5 h-5"
                        resizeMode='contain'
                    />
                </View>
            </View>

            {play ? (
                <Video
                    source={{ uri: video }}
                    // className="h-full"
                    style={{ width: '100%', height: 200, borderRadius: 10, marginTop: 3 }}
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(status) => {
                        if (status.didJustFinish) {
                            setPlay(false);
                        }
                    }}
                />
                // <Text className="text-2xl text-white">Playing</Text>
            ) : (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setPlay(true)}
                className="w-full h-60 rounded-xl relative justify-center items-center"
            >
                <Image
                    source={{ uri: thumbnail }}
                    className="w-full h-full rounded-xl mt-3"
                    resizeMode='cover'
                />
                <Image
                    source={icons.play}
                    className="w-12 h-12 absolute"
                    resizeMode='contain'
                />
            </TouchableOpacity>
            )}
        </View>
    )
}

export default VideoCard