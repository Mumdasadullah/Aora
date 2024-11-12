import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable'
import { icons } from '../constants'
import { Video, ResizeMode } from 'expo-av'


const zoomIn = {
    0: {
        scale: 0.9
    },
    1: {
        scale: 1
    }
}

const zoomOut = {
    0: {
        scale: 1
    },
    1: {
        scale: 0.9
    }
}

const TrendingItem = ({ activeItem, item }) => {
    const [play, setPlay] = useState(false)

    // console.log(activeItem.title, item.title)
    return (
        <Animatable.View
            className="mr-5"
            animation={activeItem.title === item.title ? zoomIn : zoomOut}
            // animation={zoomIn}
            duration={100}
        >
            {play ? (
                <Video
                    source={{ uri: item.video }}
                    style={{ width: 170, height: 230, borderRadius: 35, marginTop: 30 }}
                    // className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
                    resizeMode={ResizeMode.COVER}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(status) => {
                        // console.log(status)
                        if (status.didJustFinish) {
                            setPlay(false);
                        }
                    }}
                    onLoad={() => console.log("Video loaded")}
                    onError={(error) => console.log("Error loading video:", error)}
                />
            ) : (
                <TouchableOpacity
                    className="relative justify-center items-center"
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                >
                    <ImageBackground
                        source={{ uri: item.thumbnail }}
                        className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
                        resizeMode='cover'
                    />

                    <Image
                        source={icons.play}
                        className="w-12 h-12 absolute"
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            )}
        </Animatable.View>
    );
}

const Trending = ({ posts }) => {
    const [aciveItem, setActiveItem] = useState(posts[0])

    const viewableItemChanged = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
            // console.log(viewableItems[0].item)
            setActiveItem(viewableItems[0].item)
        }
    }

    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => (
                <TrendingItem
                    activeItem={aciveItem}
                    item={item}
                />
            )}
            onViewableItemsChanged={viewableItemChanged}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 70
            }}
            contentOffset={{ x: 170 }}
            horizontal
        />
    )
}

export default Trending