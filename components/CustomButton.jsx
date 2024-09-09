import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({ color, title, handlePress, isLoading, containerStyles, textStyle}) => {
  return (
    <TouchableOpacity className={`t`}>
        <Text className={``}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton