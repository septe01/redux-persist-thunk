import * as React from 'react'
import { View, ScrollView, Image } from 'react-native'
import { useTheme } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';
import * as Animatable from 'react-native-animatable'



const NewsDetailScreen = ({ setDark, darkTheme, route }) => {
    const { colors } = useTheme();
    console.log(route.params)
    return (
        <View style={{ flex: 1, backgroundColor: colors.card }}>
            <ScrollView>
            <SharedElement id={`${route.params.arguments.cover}`}>
                <Image
                    style={{ height: 300 }}
                    resizeMode="cover"
                    source={{ uri: route.params.arguments.cover }} />
            </SharedElement>
            <Animatable.Text animation="fadeInUp" delay={300} style={{ color: colors.text, fontSize: 24, fontWeight: 'bold', marginHorizontal: 12, marginTop: 12, paddingRight: 50 }}>{route.params.arguments.title}</Animatable.Text>
            <Animatable.Text animation="fadeInUp" delay={500} style={{ color: colors.text, fontSize: 14, marginHorizontal: 12, marginTop: 20 }}>{route.params.arguments.description}Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</Animatable.Text>
            <Animatable.Text animation="fadeInUp" delay={500} style={{ color: colors.text, fontSize: 14, marginHorizontal: 12, marginTop: 20 }}>{route.params.arguments.description}Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</Animatable.Text>
            </ScrollView>
        </View>
    );
}

export default NewsDetailScreen