import React, { useEffect, useState } from 'react'
import { Image, TouchableOpacity, View, Dimensions, StyleSheet, FlatList, Text } from 'react-native'
import Listview from '../assets/Listview.svg'
import Filter from '../assets/Filter.svg'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Loader from '../component/Loader'
import { useNavigation } from '@react-navigation/native'
import Footer from '../component/Footer'
import Header from '../component/Header'
import { getProductData } from '../slices/product';
import { useDispatch, useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');
const responsiveWidth = (percent) => (width * percent) / 100;
const responsiveHeight = (percent) => (height * percent) / 100;
const responsiveFontSize = (percent) => (height * percent) / 100;

const ProductList = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const {productList, isLoading} = useSelector(state => state.product)    

    useEffect(() => {
        dispatch(getProductData())
        console.log('onn');
        
    },[])

    const renderHeader = ({ item }) => (
        <View style={styles.headerContainer}>
            <View>
                <Text style={{ fontSize: responsiveFontSize(2.1) }}>{productList?.length} APPAREL</Text>
            </View>
         <View style={{flexDirection:"row"}}>
                <TouchableOpacity style={styles.dropdown}>
                    <Text style={styles.dropdownText}>New</Text>
                    <Icon2 name="chevron-down-outline" size={16} color="black" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton}>
                    <Listview name="grid-outline" size={20} color="black" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton}>
                    <Filter name="list-outline" size={20} color="black" />
                </TouchableOpacity>
         </View>
        </View>
    )

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.imageContainer}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("Product Details", { item: item })
                }} >
                    <Image source={{ uri: item.mediaUrl }} style={styles.image} />
                </TouchableOpacity>
                <View style={{ marginVertical: responsiveHeight(2) }}>
                    {item.inWishlist === 0 ? (
                        <Icon name="heart-o" size={30} color="#DD8560" style={styles.likeStyle} />
                    ) : (
                        <Icon name="heart" size={30} color="#DD8560" style={styles.likeStyle} />
                    )}
                </View>
            </View>
            <Text style={[styles.productName, { color: "#000000", }]}>{item?.category?.[0]?.name}</Text>
            <Text numberOfLines={2} style={styles.productName}>{item.name}</Text>
            <Text style={styles.priceTxt}>${item?.variants?.[0]?.sellingPrice}</Text>
        </View>
    )

    const renderFooter = (() => {
        return (
            <Footer />
        )
    })

    return (
        <View style={styles.container}>
            <Loader loading={isLoading} />
            <Header />

            <FlatList
                data={productList}
                ListHeaderComponent={renderHeader}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
                ListFooterComponent={renderFooter}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: responsiveHeight(5),
        paddingHorizontal: responsiveWidth(2)
    },
    headerContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: responsiveWidth(3),
        paddingTop: responsiveHeight(3),
        backgroundColor: '#fff',
    },
    dropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: responsiveWidth(2),
        paddingVertical: responsiveHeight(.4),
        borderRadius: 5,
        backgroundColor: '#f5f5f5',
    },
    dropdownText: {
        marginRight: 5,
        fontSize: responsiveFontSize(1.7),
        color: 'black',
    },
    iconButton: {
        padding: 8,
        borderRadius: 50,
        backgroundColor: '#f5f5f5',
        marginLeft: responsiveWidth(3),
    },
    itemContainer: {
        margin: responsiveWidth(1.2),
        alignItems: 'center',
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: responsiveHeight(3),
        borderWidth: 1,
        borderColor: 'lightgray',
        paddingHorizontal: responsiveWidth(2),
        marginBottom: responsiveHeight(1),
    },
    image: {
        width: responsiveWidth(40),
        height: responsiveHeight(30),
        resizeMode: 'stretch',
    },
    likeStyle: {
        position: "absolute",
        bottom: responsiveHeight(0),
        left: responsiveWidth(10),
    },
    productName: {
        fontSize: responsiveFontSize(2),
        color: '#555555',
        width: responsiveWidth(40),
        marginTop: responsiveHeight(.5)
    },
    priceTxt: {
        fontSize: responsiveFontSize(2.5),
        color: "#DD8560",
        fontWeight: '600',
        width: responsiveWidth(40),
        marginTop: responsiveHeight(.2)
    },
    row: {
        justifyContent: "space-between"
    },

});

export default ProductList;


