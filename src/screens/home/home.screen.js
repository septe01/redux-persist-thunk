import * as React from 'react'
import {
    View,
    RefreshControl,
    Text,
    ScrollView,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import { useTheme } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable'
import Snackbar from 'react-native-snackbar'
import { SharedElement } from 'react-navigation-shared-element';

import { capitalize } from '../../utils/cummon'


const { width } = Dimensions.get('window')

const duration = 300000 //5 minute

const ListItem = (props) => {
    console.log(props)
    const { colors } = useTheme();
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => props.navigation.navigate('NewsDetail', {
            arguments: props
        })}>
            <Animatable.View animation="fadeInUp" delay={500 * (props.index / 2)} style={{ backgroundColor: colors.card, marginHorizontal: 16, marginVertical: 8, paddingBottom: 12, elevation: 3, borderRadius: 6 }}>
                <SharedElement id={`${props.cover}`}>
                    <Image
                        style={{ height: width / 2.8, borderTopRightRadius: 6, borderTopLeftRadius: 6 }}
                        resizeMode="cover"
                        source={{
                            uri: props.cover,
                        }} />
                
                <Text style={{ color: colors.text, fontSize: 16, fontWeight: 'bold', marginHorizontal: 12, marginTop: 12 }}>{props.title}</Text>
                <Text style={{ color: colors.text, fontSize: 14, marginHorizontal: 12, marginTop: 8 }}>{props.description}</Text>
                <View style={{ flexDirection: 'row', marginHorizontal: 13, marginTop: 18 }}>
                    {
                        props.tags.map((item, index) => {
                            return (
                                <Text key={index} style={{ color: colors.text, paddingHorizontal: 12, paddingVertical: 4, backgroundColor: colors.background, marginRight: 8 }}>{item.name}</Text>
                            )
                        })
                    }

                </View>
                </SharedElement>
            </Animatable.View>
        </TouchableOpacity>
    )
}

const CategoryItem = (props) => {
    const { colors } = useTheme();
    return (
        <Animatable.View animation="fadeInRight" delay={500 * (props.index / 2)} key={props.item} style={{ padding: 8 }}>
            <Text style={{
                fontSize: props.keyFilter == props.item ? 24 : 18,
                fontWeight: props.keyFilter == props.item ? 'bold' : 'normal', color: colors.text
            }}>{capitalize(props.item)}
            </Text>
        </Animatable.View>
    )
}

class HomeScreen extends React.Component {

    constructor() {
        super()
        this.state = {
            keyFilter: 'all',
            listCategory: [
                'all',
                'entertainment',
                'otomotif',
                'bisnis'
            ],
            offlineLoading: false
        }
        this.intervalGetData;
    }

    componentDidMount() {
        this.getData()
        this.intervalGetData = setInterval(() => {
            const { isConnected } = this.props
            if (isConnected) {
                this.getData()
            }

        }, duration);
    }

    getData = () => {
        this.props.getArticle()
    }

    getDataOffileMode = () => {
        this.setState({
            offlineLoading: true
        })
        setTimeout(() => {
            this.setState({
                offlineLoading: false
            })

            Snackbar.show({
                text: 'you are offline',
                duration: Snackbar.LENGTH_SHORT,
            });
        }, 3000)
    }

    componentWillUnmount() {
        clearInterval(this.intervalGetData)
    }

    render() {
        const { articleLoading, articles, isConnected } = this.props
        const { keyFilter, listCategory, offlineLoading } = this.state
        const filterArticle = keyFilter == null || keyFilter == 'all' ? articles : articles.filter(item => item.category == keyFilter)
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', height: 70, alignItems: 'center', paddingRight: 16, justifyContent: 'flex-end' }}>
                    {
                        listCategory.map((item, index) => {
                            return <TouchableOpacity key={index} onPress={() => this.setState({ keyFilter: item })}>
                                <CategoryItem item={item} keyFilter={keyFilter} index={index} />
                            </TouchableOpacity>
                        })
                    }

                </View>
                <ScrollView
                    refreshControl={
                        isConnected ? <RefreshControl refreshing={articleLoading} onRefresh={() => this.getData()} />
                            : <RefreshControl refreshing={offlineLoading} onRefresh={() => this.getDataOffileMode()} />
                    }
                >
                    {
                        filterArticle.map((item, index) => {
                            return (
                                <ListItem {...item} {...this.props} key={index} index={index} />
                            )
                        })
                    }
                </ScrollView>
            </View>
        )
    }
}

export default HomeScreen



// import * as React from 'react'
// import { View, Button, ActivityIndicator, Text, TouchableOpacity } from 'react-native'
// import { useTheme } from '@react-navigation/native';

// const axios = require('axios');


// const HomeScreen = (props) => {
//     const { colors } = useTheme();
//     const [isLoading, setLoading] = React.useState(false)
//     var [count, setCount] = React.useState(0)

//     var requestCounter = 0;

//     const requestToApi = () => {
//         setLoading(true)
//         requestCounter += 1
//         axios.get('http://www.mocky.io/v2/5e8321d13100005b00e641a8') // return status code 500 internal server error
//             .then(result => {
//                 console.log(result)
//             }).catch(err => {
//                 console.log({ err })
//                 const statusCode = err?.response?.status;

//                 // jalankan kembali request ke api selama 3 kali
//                 if (statusCode == 500 && requestCounter <= 3) {
//                     setCount(requestCounter)
//                     requestToApi()
//                 } else {
//                     requestCounter = 0
//                     // pada kondisi ini otomatis proses request akan berhenti
//                     setLoading(false)
//                 }
//             })
//     }

//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             <Text testID="counter-title" style={{ color: colors.text }}>counter request : {count} {props.title}</Text>
//             {
//                 isLoading ? <ActivityIndicator /> : <Button
//                     title="Request to API 500"
//                     disabled={isLoading}
//                     onPress={() => {
//                         // props.setTitle()
//                         setCount(0)
//                         requestToApi()
//                     }}
//                 />
//             }

//             <Button
//                 style={{ backgroundColor: colors.card }}
//                 title="Set Theme"
//                 onPress={() => {
//                     props.setTheme(!props.darkTheme)
//                 }}
//             />
//             <TouchableOpacity style={{ backgroundColor: colors.card }}>
//                 <Text style={{ color: colors.text }}>Button!</Text>
//             </TouchableOpacity>
//             <View style={{ height: 200, width: 200, backgroundColor: colors.card}}>

//             </View>

//         </View>
//     );
// }

// export default HomeScreen