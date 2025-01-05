import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import Menu from '../assets/Menu.svg'
import Logo from '../assets/Logo.svg'
import Search from '../assets/Search.svg'
import Shoppingbag from '../assets/shoppingbag.svg'

const { width, height } = Dimensions.get('window');
const responsiveWidth = (percent) => (width * percent) / 100;
const responsiveHeight = (percent) => (height * percent) / 100;

const Header = () => {
    return (
        <View style={styles.header}>
            <TouchableOpacity>
                <Menu width={responsiveWidth(8)} height={responsiveHeight(4)} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoContainer}>
                <Logo width={responsiveWidth(28)} height={responsiveHeight(5)} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.searchBagContainer}>
                <Search width={responsiveWidth(8)} height={responsiveHeight(4)} />
                <Shoppingbag width={responsiveWidth(8)} height={responsiveHeight(4)} style={styles.shoppingBag} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingBottom: responsiveHeight(1)
    },
    logoContainer: {
        position: 'absolute',
        left: responsiveWidth(50),
        transform: [{ translateX: -responsiveWidth(15) }],
    },
    searchBagContainer: {
        flexDirection: 'row',
    },
    shoppingBag: {
        marginLeft: responsiveWidth(2),
    },
})

export default Header