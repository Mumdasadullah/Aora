import { View, Alert, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import { router, usePathname } from 'expo-router'

const SearchInput = ({ initialQuery, placeholder }) => {
    const pathName = usePathname();
    const [query, setQuery] = useState(initialQuery || '');
    return (
        <View
            className="border-2 border-black-200 bg-black-100 w-full
        h-16 px-4 rounded-2xl focus:border-secondary
        items-center flex-row space-x-20"
        >
            <TextInput
                className="text-base font-pregular mt-0.5 text-white flex-1"
                value={query}
                placeholder={placeholder || "Search for a video topic"}
                placeholderTextColor={'#CDCDE0'}
                onChangeText={(text) => setQuery(text)}
            />

            <TouchableOpacity
                onPress={() => {
                    if (!query) {
                        Alert.alert("Missing query", "Please input search query");
                    }

                    if (pathName.startsWith("/start")) router.setParams({ query })
                    else router.push(`/search/${query}`)
                }}
            >
                <Image
                    source={icons.search}
                    className="w-5 h-5"
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View>
    )
}

export default SearchInput