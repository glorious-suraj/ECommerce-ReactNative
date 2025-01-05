import React, { useEffect, useState } from 'react'
import { Image, TouchableOpacity, View, Dimensions, StyleSheet, FlatList, Text, Modal, ScrollView } from 'react-native'
import Export from '../assets/Export.svg'
import RectangleB from '../assets/RectangleB.svg'
import RectangleW from '../assets/RectangleW.svg'
import Icon from 'react-native-vector-icons/FontAwesome'
import Loader from '../component/Loader'
import ImageViewer from "react-native-image-zoom-viewer";
import Footer from '../component/Footer'
import Header from '../component/Header'
import { getProductDetails } from '../slices/product'
import { useDispatch, useSelector } from 'react-redux'

const { width, height } = Dimensions.get('window');
const responsiveWidth = (percent) => (width * percent) / 100;
const responsiveHeight = (percent) => (height * percent) / 100;
const responsiveFontSize = (percent) => (height * percent) / 100;

const ProductDetails = (route) => {
    const productId = route.route.params.item.id
    const dispatch = useDispatch()
    const { productDetails, isLoading } = useSelector(state => state.product)

    const [isModalVisible, setModalVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const imageUrls = productDetails?.productListings?.[0]?.mediaUrls?.map(url => ({
        url: url,
    }));

    const openImage = (index) => {
        setCurrentIndex(index);
        setModalVisible(true);
    };

    const closeImage = () => {
        setModalVisible(false);
    };

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const currentPage = Math.round(scrollPosition / width);
        setCurrentIndex(currentPage);
    };

    useEffect(() => {
        dispatch(getProductDetails(productId))
    }, [productId])

    const renderItem = ({ item, index }) => (
        <TouchableOpacity onPress={() => openImage(index)}>
            <Image source={{ uri: item }} style={styles.imageThumbnail} />
        </TouchableOpacity>
    );

    const footerComponent = () => (
        <>
            <View style={styles.itemContainer}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View>
                        <Text style={[styles.productName, { color: "#000000", }]}>{productDetails?.categories?.[0]}</Text>
                    </View>
                    <View>
                        <Export width={responsiveWidth(7)} height={responsiveHeight(2.5)} />
                    </View>
                </View>
                <Text numberOfLines={2} style={styles.productName}>{productDetails?.name}</Text>
                <Text style={[styles.productName, styles.priceTxt]}>${productDetails?.productListings?.[0]?.sellingPrice}</Text>
            </View>

            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.addToBasketButton}>
                    <View style={{ alignSelf: "center" }}>
                        <Text style={styles.plusTxt}>+</Text>
                    </View>
                    <View style={styles.basketTxt}>
                        <Text style={styles.buttonText}>ADD TO BASKET</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.heartContainer}>
                    {productDetails?.inWishlist === 0 ? (
                        <Icon name="heart-o" size={30} color="#fff" />
                    ) : (
                        <Icon name="heart" size={30} color="#DD8560" />
                    )}
                </View>
            </View>

            <View style={{ padding: responsiveWidth(8) }}>
                <Text style={styles.titleTxt}>TITLE</Text>
                <Text style={styles.titleDescription}>{productDetails?.seoTitle}</Text>
            </View>

            <View style={{ padding: responsiveWidth(8), alignSelf: "flex-start" }}>
                <Text style={styles.titleTxt}>DESCRIPTION</Text>
                <Text style={styles.titleDescription}>{productDetails?.seoDescription}</Text>
            </View>

            <Footer />
        </>
    )

    return (
        <View style={styles.mainContainer}>
            <View style={{ marginHorizontal: responsiveWidth(2) }}>
                <Header />
            </View>
            <Loader loading={isLoading} />
            <ScrollView contentContainerStyle={styles.container}>
                <View style={{ paddingHorizontal: responsiveWidth(2) }}>

                    <FlatList
                        data={productDetails?.productListings?.[0]?.mediaUrls}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        pagingEnabled
                        onScroll={handleScroll}
                        showsHorizontalScrollIndicator={false}
                        style={{ flexGrow: 1 }}
                    />

                    <View style={styles.paginationContainer}>
                        {productDetails?.productListings?.[0]?.mediaUrls?.map((_, index) => (
                            <View key={index} style={styles.dotContainer}>
                                {currentIndex === index ? (
                                    <RectangleB width={responsiveWidth(4)} height={responsiveHeight(2)} />
                                ) : (
                                    <RectangleW width={responsiveWidth(4)} height={responsiveHeight(2)} />
                                )}
                            </View>
                        ))}
                    </View>

                    <View style={{ paddingBottom: responsiveHeight(5) }}>
                        {footerComponent()}
                    </View>

                    <Modal visible={isModalVisible} transparent={true}>
                        <ImageViewer
                            imageUrls={imageUrls}
                            index={currentIndex}
                            onSwipeDown={closeImage}
                            enableSwipeDown={true}
                            onCancel={closeImage}
                        />
                    </Modal>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: responsiveHeight(5),
    },
    container: {
        flexGrow: 1,
    },
    itemContainer: {
        margin: responsiveWidth(3),
        marginTop: responsiveHeight(5)
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
        fontSize: responsiveFontSize(2.2),
        color: '#555555',
        width: responsiveWidth(70),
        marginTop: responsiveHeight(.6)
    },
    priceTxt: {
        fontSize: responsiveFontSize(2.5),
        color: "#DD8560",
        fontWeight: '600',
        width: responsiveWidth(70),
        marginTop: responsiveHeight(.2)
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: responsiveFontSize(2),
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#000",
        paddingVertical: responsiveWidth(3),
        marginVertical: responsiveWidth(5)
    },
    addToBasketButton: {
        flexDirection: "row",
    },
    plusTxt: {
        fontSize: responsiveHeight(4),
        color: "#fff"
    },
    basketTxt: {
        alignSelf: "center",
        marginLeft: responsiveWidth(4)
    },
    buttonText: {
        fontSize: responsiveHeight(2.6),
        marginLeft: responsiveWidth(5),
        color: "#fff"
    },
    heartContainer: {
        alignSelf: "center",
        marginLeft: responsiveWidth(8)
    },
    titleTxt: {
        fontSize: responsiveFontSize(3),
    },
    titleDescription: {
        fontSize: responsiveFontSize(2),
        color: "#555555"
    },

    imageThumbnail: {
        width: responsiveWidth(91),
        height: responsiveWidth(91),
        margin: responsiveWidth(2.5),
        borderRadius: 10,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: responsiveHeight(2),
    },
    dotContainer: {
        marginHorizontal: responsiveWidth(1),
        alignItems: 'center',
    },
});

export default ProductDetails;